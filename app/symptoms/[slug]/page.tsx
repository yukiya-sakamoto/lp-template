import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import PageHero from "../../../components/PageHero";
import Link from "next/link";
import { siteContent as c } from "../../../lib/content";
import { DEFAULT_NAV } from "../../../lib/nav";

export function generateStaticParams() {
  return c.symptoms.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = c.symptoms.find(s => s.slug === slug);
  return { title: `${s?.name} | 症状・施術 | ${c.meta.title}` };
}

export default async function SymptomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = c.symptoms.find(s => s.slug === slug);
  if (!s) notFound();

  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <PageHero
        label={s.nameEn.toUpperCase()}
        title={s.name}
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "症状・施術", href: "/symptoms/" },
          { label: s.name, href: `/symptoms/${s.slug}/` },
        ]}
      />

      <main style={{ backgroundColor: "var(--color-cream)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* 概要 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start", marginBottom: 72 }} className="grid-2">
            <div>
              <span className="sec-label">概要</span>
              <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 20, lineHeight: 1.5 }}>{s.name}について</h2>
              <p style={{ fontSize: 15, color: "var(--color-text-body)", lineHeight: 2.2, marginBottom: 24 }}>{s.lead}</p>
              <div style={{ backgroundColor: "var(--color-green-light)", border: "1px solid var(--color-green-border)", borderRadius: 10, padding: "20px 24px" }}>
                <div style={{ fontSize: 12, color: "var(--color-green)", fontWeight: 700, marginBottom: 10, letterSpacing: "0.06em" }}>当院の施術方針</div>
                <p style={{ fontSize: 15, color: "var(--color-text)", lineHeight: 2.0 }}>{s.treatment}</p>
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
              <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 28, lineHeight: 1.5 }}>施術の様子</h2>
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
              <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 28, lineHeight: 1.5 }}>来院された方のお声</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
                {s.cases.map((cs, i) => (
                  <div key={i} style={{ backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, padding: "24px 20px" }}>
                    <p style={{ fontSize: 14, color: "var(--color-text-body)", lineHeight: 2.1, marginBottom: 16 }}>{cs.text}</p>
                    <div style={{ fontSize: 13, color: "var(--color-green)", fontWeight: 700, borderTop: "1px solid var(--color-border)", paddingTop: 12 }}>{cs.who}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ backgroundColor: "var(--color-primary-light)", border: "1px solid var(--color-primary-border)", borderRadius: 10, padding: "36px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--color-green)", fontWeight: 700, marginBottom: 6 }}>予約不要・当日来院OK</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)" }}>お気軽にご来院ください</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`tel:${c.clinic.tel}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "var(--color-primary)", color: "#fff", padding: "14px 28px", borderRadius: 6, textDecoration: "none", fontSize: 16, fontWeight: 700 }}>
                {c.clinic.telFormatted}
              </a>
              <Link href="/access/" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid var(--color-border)", color: "var(--color-text-body)", padding: "13px 22px", borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 600, backgroundColor: "#fff" }}>
                アクセスを見る
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <Link href="/symptoms/" style={{ fontSize: 14, color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>
              ← 症状・施術一覧に戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
