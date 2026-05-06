import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import Link from "next/link";
import { siteContent as c } from "../../lib/content";
import { DEFAULT_NAV } from "../../lib/nav";

export const metadata = { title: `症状・施術 | ${c.meta.title}` };

export default function SymptomsPage() {
  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <PageHero
        label="SYMPTOMS"
        title="症状・施術メニュー"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "症状・施術", href: "/symptoms/" },
        ]}
      />

      <main style={{ backgroundColor: "#FDFAF6", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="sec-label">施術メニュー</span>
          <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "#2D2D2D", marginBottom: 40, lineHeight: 1.5 }}>こんなお悩みに対応しています</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-3">
            {c.symptoms.map(s => (
              <Link key={s.slug} href={`/symptoms/${s.slug}/`} className="symptom-card">
                <div style={{ marginBottom: 14, borderRadius: 8, overflow: "hidden", backgroundColor: "var(--color-warm)" }}>
                  <img src={s.image} alt={s.name} style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ width: 24, height: 3, backgroundColor: "var(--color-green)", borderRadius: 2, marginBottom: 10 }} />
                <div style={{ fontSize: 15, fontWeight: 700, color: "#2D2D2D", marginBottom: 8 }}>{s.name}</div>
                <p style={{ fontSize: 13, color: "#666259", lineHeight: 1.85, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ fontSize: 13, color: "var(--color-primary)", fontWeight: 700 }}>詳しく見る →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
