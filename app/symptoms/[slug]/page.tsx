import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import Link from "next/link";
import content from "../../../content.json";
import type { SiteContent } from "../../../lib/content";

const c = content as SiteContent;

const defaultNav = [
  { label: "院長ご挨拶", href: "/#about" },
  { label: "症状・施術", href: "/symptoms/" },
  { label: "施術の流れ", href: "/flow/" },
  { label: "患者様の声", href: "/#voice" },
  { label: "スタッフ",   href: "/staff/" },
  { label: "料金",       href: "/pricing/" },
  { label: "アクセス",   href: "/access/" },
];

export function generateStaticParams() {
  return c.symptoms.map(s => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const s = c.symptoms.find(s => s.slug === params.slug);
  return { title: `${s?.name} | 症状・施術 | ${c.meta.title}` };
}

export default function SymptomPage({ params }: { params: { slug: string } }) {
  const s = c.symptoms.find(s => s.slug === params.slug);
  if (!s) return null;

  return (
    <>
      <Header clinic={c.clinic} nav={defaultNav} />
      <PageHero
        label={s.nameEn.toUpperCase()}
        title={s.name}
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "症状・施術", href: "/symptoms/" },
          { label: s.name, href: `/symptoms/${s.slug}/` },
        ]}
      />

      <main style={{ backgroundColor: "#FDFAF6", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* 概要 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start", marginBottom: 72 }} className="grid-2">
            <div>
              <span className="sec-label">概要</span>
              <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "#2D2D2D", marginBottom: 20, lineHeight: 1.5 }}>{s.name}について</h2>
              <p style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 2.2, marginBottom: 24 }}>{s.lead}</p>
              <div style={{ backgroundColor: "#EAF7F1", border: "1px solid #A8E0C4", borderRadius: 10, padding: "20px 24px" }}>
                <div style={{ fontSize: 12, color: "#05AF4B", fontWeight: 700, marginBottom: 10, letterSpacing: "0.06em" }}>当院の施術方針</div>
                <p style={{ fontSize: 15, color: "#2D2D2D", lineHeight: 2.0 }}>{s.treatment}</p>
              </div>
            </div>
            <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <img src={s.image} alt={s.name} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>

          {/* 動画 */}
          {s.videos && s.videos.length > 0 && (
            <div style={{ marginBottom: 72 }}>
              <span className="sec-label">施術動画</span>
              <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "#2D2D2D", marginBottom: 28, lineHeight: 1.5 }}>施術の様子</h2>
              <div style={{ display: "grid", gridTemplateColumns: s.videos.length === 1 ? "1fr" : "1fr 1fr", gap: 20, maxWidth: s.videos.length === 1 ? 640 : "100%" }} className={s.videos.length > 1 ? "grid-2" : ""}>
                {s.videos.map(id => (
                  <div key={id} style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${id}`}
                      title={s.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 患者様の声 */}
          {s.cases.length > 0 && (
            <div style={{ marginBottom: 64 }}>
              <span className="sec-label">患者様の声</span>
              <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "#2D2D2D", marginBottom: 28, lineHeight: 1.5 }}>来院された方のお声</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
                {s.cases.map((c, i) => (
                  <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #EDE0CC", borderRadius: 10, padding: "24px 20px" }}>
                    <p style={{ fontSize: 14, color: "#4A4A4A", lineHeight: 2.1, marginBottom: 16 }}>{c.text}</p>
                    <div style={{ fontSize: 13, color: "#05AF4B", fontWeight: 700, borderTop: "1px solid #EDE0CC", paddingTop: 12 }}>{c.who}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ backgroundColor: "#FEF3E8", border: "1px solid #F5DCC2", borderRadius: 10, padding: "36px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: "#05AF4B", fontWeight: 700, marginBottom: 6 }}>予約不要・当日来院OK</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#2D2D2D" }}>お気軽にご来院ください</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`tel:${c.clinic.tel}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#D96B0B", color: "#fff", padding: "14px 28px", borderRadius: 6, textDecoration: "none", fontSize: 16, fontWeight: 700 }}>
                {c.clinic.telFormatted}
              </a>
              <Link href="/access/" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid #EDE0CC", color: "#4A4A4A", padding: "13px 22px", borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 600, backgroundColor: "#fff" }}>
                アクセスを見る
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Link href="/symptoms/" style={{ fontSize: 14, color: "#D96B0B", textDecoration: "none", fontWeight: 600 }}>
              ← 症状・施術一覧に戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={defaultNav} />
    </>
  );
}
