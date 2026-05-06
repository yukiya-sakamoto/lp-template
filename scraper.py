#!/usr/bin/env python3
"""
scraper.py — LP制作用 汎用Webスクレイパー

Requirements:
  pip install requests beautifulsoup4
  Python 3.9+

Usage:
  python scraper.py <BASE_URL> [options]

  python scraper.py https://example-clinic.com
  python scraper.py https://example-clinic.com --sitemap --max-pages 80
  python scraper.py https://example-clinic.com --no-crawl --out ./out
  python scraper.py https://example-clinic.com --ignore-robots

Options:
  --max-pages N       最大取得ページ数 (default: 50)
  --delay SECONDS     リクエスト間隔秒数 (default: 1.0)
  --out DIR           出力ディレクトリ (default: scraped/<domain>)
  --sitemap           sitemap.xml からURLも収集する
  --no-crawl          クロールせず BASE_URL の1ページのみ取得
  --ignore-robots     robots.txt を無視する (明示的 opt-in)

Output:
  <out>/scraped.json       全ページの構造化データ (JSON)
  <out>/scraped_text.txt   人間が読みやすいテキストまとめ
"""

from __future__ import annotations  # Python 3.9 互換の型アノテーション

import re
import sys
import json
import time
import argparse
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag, urlencode, parse_qs
from urllib.robotparser import RobotFileParser

import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# 定数
# ---------------------------------------------------------------------------

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

HEADERS = {
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
}

# HTML から消すタグ（メタ情報・リンク・画像抽出の後に適用）
NOISE_TAGS = ["script", "style", "noscript", "link"]

# class/id にこのキーワードが含まれる要素を除去
# ※ banner/footer は整骨院サイトで重要コンテンツを含むことが多いため対象外
NOISE_PATTERN = re.compile(
    r"(cookie|gdpr|popup|modal|overlay|advertisement|pagenav|"
    r"breadcrumb|pagination|sidebar|widget|"
    r"sp-nav|hamburger|scroll-top|back-to-top|fixed-cta)",
    re.I,
)

# 除去するトラッキング系クエリパラメータ (page_id / p などコンテンツ識別子は保持)
TRACKING_PARAMS = frozenset({
    "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
    "fbclid", "gclid", "msclkid", "mc_cid", "mc_eid",
    "_ga", "yclid", "dclid",
})

# YouTube 動画ID (embed / v / watch?v= / youtu.be / nocookie / shorts / live)
YOUTUBE_RE = re.compile(
    r"(?:"
    r"(?:www\.|m\.)?youtube(?:-nocookie)?\.com"
    r"(?:/embed/|/v/|/shorts/|/live/|/watch\?[^\"'\s]*v=)"
    r"|youtu\.be/"
    r")"
    r"([A-Za-z0-9_-]{11})"
)

# ---------------------------------------------------------------------------
# robots.txt キャッシュ
# ---------------------------------------------------------------------------

class RobotsCache:
    def __init__(self) -> None:
        self._parsers: dict[str, RobotFileParser] = {}
        self._delays: dict[str, float] = {}

    def _load(self, base_url: str, session: requests.Session) -> RobotFileParser:
        if base_url in self._parsers:
            return self._parsers[base_url]
        rp = RobotFileParser()
        robots_url = base_url.rstrip("/") + "/robots.txt"
        try:
            r = session.get(robots_url, headers=HEADERS, timeout=10)
            if r.status_code == 200:
                rp.parse(r.text.splitlines())
            cd = rp.crawl_delay("*")
            if cd:
                self._delays[base_url] = float(cd)
        except Exception:
            pass  # 取得失敗はすべて許可扱い
        self._parsers[base_url] = rp
        return rp

    def can_fetch(self, url: str, base_url: str, session: requests.Session) -> bool:
        rp = self._load(base_url, session)
        return rp.can_fetch("*", url)

    def crawl_delay(self, base_url: str, default: float) -> float:
        return self._delays.get(base_url, default)

# ---------------------------------------------------------------------------
# ユーティリティ
# ---------------------------------------------------------------------------

def normalize_url(url: str) -> str:
    url, _ = urldefrag(url)
    parsed = urlparse(url)
    # トラッキング系クエリのみ除去。page_id / p などコンテンツ識別子は保持する
    if parsed.query:
        qs = parse_qs(parsed.query, keep_blank_values=True)
        filtered = {k: v for k, v in qs.items() if k not in TRACKING_PARAMS}
        clean_query = urlencode(filtered, doseq=True)
    else:
        clean_query = ""
    return parsed._replace(query=clean_query, fragment="").geturl().rstrip("/") or "/"


def is_internal(url: str, base: str) -> bool:
    return urlparse(url).netloc == urlparse(base).netloc


def is_html(headers: dict) -> bool:
    return "text/html" in headers.get("content-type", "")


def fix_encoding(r: requests.Response) -> None:
    # サーバーが charset を返していない or requests デフォルト (ISO-8859-1) の場合のみ
    # apparent_encoding で補正する。正しい charset が返っている場合は上書きしない。
    if r.encoding is None or r.encoding.upper() in ("ISO-8859-1", "LATIN-1"):
        detected = r.apparent_encoding
        if detected:
            r.encoding = detected


def fetch(url: str, session: requests.Session, timeout: int = 15) -> requests.Response | None:
    try:
        r = session.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        fix_encoding(r)
        return r
    except Exception as e:
        print(f"  [FETCH ERROR] {e}", file=sys.stderr)
        return None

# ---------------------------------------------------------------------------
# sitemap.xml 収集
# ---------------------------------------------------------------------------

def collect_sitemap_urls(base_url: str, session: requests.Session) -> list[str]:
    urls: list[str] = []
    sitemap_queue = [
        base_url.rstrip("/") + "/sitemap.xml",
        base_url.rstrip("/") + "/sitemap_index.xml",
    ]
    visited_sitemaps: set[str] = set()

    while sitemap_queue:
        sm_url = sitemap_queue.pop(0)
        if sm_url in visited_sitemaps:
            continue
        visited_sitemaps.add(sm_url)

        r = fetch(sm_url, session)
        if not r or r.status_code != 200:
            continue
        ct = r.headers.get("content-type", "")
        if "xml" not in ct and "html" not in ct:
            continue

        # lxml-xml があれば使用、なければ regex で <loc> を取る
        try:
            soup = BeautifulSoup(r.text, "lxml-xml")
            locs = [tag.get_text(strip=True) for tag in soup.find_all("loc")]
        except Exception:
            locs = re.findall(r"<loc>\s*(.*?)\s*</loc>", r.text)

        for loc in locs:
            if loc.endswith(".xml"):
                # sitemap index の子 sitemap を再帰取得
                if loc not in visited_sitemaps:
                    sitemap_queue.append(loc)
            else:
                u = normalize_url(loc)
                if is_internal(u, base_url) and u not in urls:
                    urls.append(u)

    if urls:
        print(f"  sitemap: {len(urls)} URLs 取得")
    return urls

# ---------------------------------------------------------------------------
# ページ解析
# ---------------------------------------------------------------------------

def extract_page(url: str, html: str, base_url: str) -> dict:
    # YouTube ID は生HTMLから抽出（data属性・コメントも含めて確実に拾うため）
    youtube_ids = list(dict.fromkeys(YOUTUBE_RE.findall(html)))

    soup = BeautifulSoup(html, "html.parser")

    # ── メタ情報・リンク・画像は NOISE_TAGS 除去の前に抽出 ──

    title_tag = soup.find("title")
    title = title_tag.get_text(strip=True) if title_tag else ""

    desc_tag = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    description = desc_tag.get("content", "").strip() if desc_tag else ""

    h1_tag = soup.find("h1")
    h1 = h1_tag.get_text(strip=True) if h1_tag else ""

    h2_texts = [h.get_text(strip=True) for h in soup.find_all("h2")]
    h3_texts = [h.get_text(strip=True) for h in soup.find_all("h3")]

    images: list[dict] = []
    seen_srcs: set[str] = set()
    for img in soup.find_all("img"):
        src = (
            img.get("src")
            or img.get("data-src")
            or img.get("data-lazy-src")
            or img.get("data-original")
        )
        if not src or src.startswith("data:"):
            continue
        abs_src = urljoin(url, src)
        if abs_src in seen_srcs:
            continue
        seen_srcs.add(abs_src)
        images.append({"src": abs_src, "alt": img.get("alt", "").strip()})

    internal_links: list[str] = []
    seen_links: set[str] = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if not href or href.startswith(("javascript:", "mailto:", "tel:", "#")):
            continue
        abs_href = normalize_url(urljoin(url, href))
        if abs_href in seen_links:
            continue
        seen_links.add(abs_href)
        if is_internal(abs_href, base_url):
            internal_links.append(abs_href)

    # ── ノイズ除去後にテキスト抽出 ──

    for tag in soup(NOISE_TAGS):
        tag.decompose()
    for tag in soup.find_all(class_=NOISE_PATTERN):
        tag.decompose()
    for tag in soup.find_all(id=NOISE_PATTERN):
        tag.decompose()

    raw_text = soup.get_text(separator="\n", strip=True)
    text = "\n".join(line for line in raw_text.splitlines() if line.strip())

    return {
        "url": url,
        "title": title,
        "description": description,
        "h1": h1,
        "h2": h2_texts,
        "h3": h3_texts,
        "text": text,
        "images": images,
        "youtube_ids": youtube_ids,
        "internal_links": internal_links,
    }

# ---------------------------------------------------------------------------
# クロール
# ---------------------------------------------------------------------------

def crawl(
    base_url: str,
    max_pages: int,
    delay: float,
    use_sitemap: bool,
    ignore_robots: bool,
) -> dict[str, dict]:
    session = requests.Session()
    robots = RobotsCache()
    visited: set[str] = set()
    queue: list[str] = [normalize_url(base_url)]
    results: dict[str, dict] = {}

    # robots.txt を先読み（crawl-delay の取得も兼ねる）
    if not ignore_robots:
        robots.can_fetch(base_url, base_url, session)
        effective_delay = robots.crawl_delay(base_url, delay)
        if effective_delay != delay:
            print(f"  robots.txt Crawl-delay: {effective_delay}s に設定")
    else:
        effective_delay = delay

    if use_sitemap:
        for u in collect_sitemap_urls(base_url, session):
            if u not in queue:
                queue.append(u)

    while queue and len(results) < max_pages:
        url = queue.pop(0)
        if url in visited:
            continue
        visited.add(url)

        if not ignore_robots and not robots.can_fetch(url, base_url, session):
            print(f"  [ROBOTS] skip: {url}")
            continue

        print(f"[{len(results)+1}/{max_pages}] {url}")
        r = fetch(url, session)
        if r is None or r.status_code != 200:
            print(f"  → skip (status={getattr(r, 'status_code', 'error')})")
            continue
        if not is_html(r.headers):
            print(f"  → skip (not HTML)")
            continue

        page = extract_page(url, r.text, base_url)
        results[url] = page
        print(
            f"  → chars={len(page['text'])}, "
            f"imgs={len(page['images'])}, "
            f"yt={page['youtube_ids'] or '-'}"
        )

        for link in page["internal_links"]:
            if link not in visited and link not in queue:
                queue.append(link)

        if effective_delay > 0:
            time.sleep(effective_delay)

    return results

# ---------------------------------------------------------------------------
# 出力
# ---------------------------------------------------------------------------

def write_outputs(results: dict[str, dict], out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    json_path = out_dir / "scraped.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    txt_path = out_dir / "scraped_text.txt"
    with open(txt_path, "w", encoding="utf-8") as f:

        # YouTube ID サマリ（冒頭にまとめる）
        all_yt = list(dict.fromkeys(
            vid
            for page in results.values()
            for vid in page.get("youtube_ids", [])
        ))
        if all_yt:
            f.write("=" * 60 + "\n")
            f.write("YouTube IDs (全ページ)\n")
            f.write("=" * 60 + "\n")
            for vid in all_yt:
                f.write(f"  https://www.youtube.com/watch?v={vid}\n")
            f.write("\n\n")

        for page in results.values():
            f.write("=" * 60 + "\n")
            f.write(f"URL         : {page['url']}\n")
            f.write(f"TITLE       : {page['title']}\n")
            f.write(f"DESCRIPTION : {page['description']}\n")
            f.write(f"H1          : {page['h1']}\n")
            if page["h2"]:
                f.write(f"H2          : {' / '.join(page['h2'])}\n")
            f.write("=" * 60 + "\n")
            f.write(page["text"])
            if page["images"]:
                f.write("\n\n--- IMAGES ---\n")
                for img in page["images"]:
                    line = f"  {img['src']}"
                    if img["alt"]:
                        line += f"  [{img['alt']}]"
                    f.write(line + "\n")
            if page["youtube_ids"]:
                f.write("\n--- YOUTUBE ---\n")
                for vid in page["youtube_ids"]:
                    f.write(f"  {vid}\n")
            f.write("\n\n")

    print(f"\n完了:")
    print(f"  {json_path}")
    print(f"  {txt_path}")
    print(f"  取得ページ数: {len(results)}")

# ---------------------------------------------------------------------------
# エントリポイント
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="LP制作用 汎用Webスクレイパー",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("base_url", help="スクレイピング対象のベースURL")
    parser.add_argument("--max-pages", type=int, default=50, metavar="N",
                        help="最大取得ページ数 (default: 50)")
    parser.add_argument("--delay", type=float, default=1.0, metavar="SEC",
                        help="リクエスト間隔秒数 (default: 1.0)")
    parser.add_argument("--out", metavar="DIR",
                        help="出力ディレクトリ (default: scraped/<domain>)")
    parser.add_argument("--sitemap", action="store_true",
                        help="sitemap.xml からURLも収集する")
    parser.add_argument("--no-crawl", action="store_true",
                        help="クロールせず base_url の1ページのみ取得")
    parser.add_argument("--ignore-robots", action="store_true",
                        help="robots.txt を無視する (明示的 opt-in)")
    args = parser.parse_args()

    base_url = args.base_url.rstrip("/")
    domain = urlparse(base_url).netloc.replace(".", "-")
    out_dir = Path(args.out) if args.out else Path("scraped") / domain

    max_pages = 1 if args.no_crawl else args.max_pages
    delay = 0.0 if args.no_crawl else args.delay

    results = crawl(
        base_url,
        max_pages=max_pages,
        delay=delay,
        use_sitemap=args.sitemap,
        ignore_robots=args.ignore_robots,
    )

    if not results:
        print("取得できたページがありません", file=sys.stderr)
        sys.exit(1)

    write_outputs(results, out_dir)


if __name__ == "__main__":
    main()
