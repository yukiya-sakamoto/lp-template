import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { siteContent as c } from "../../lib/content";
import { DEFAULT_NAV } from "../../lib/nav";

export const metadata = { title: `施術の流れ | ${c.meta.title}` };

export default function FlowPage() {
  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <PageHero
        label="FLOW"
        title="施術の流れ"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "施術の流れ", href: "/flow/" },
        ]}
      />

      <main style={{ backgroundColor: "var(--color-cream)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <span className="sec-label">はじめての方へ</span>
          <h2 style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 40, lineHeight: 1.5 }}>はじめての方も安心の流れ</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {c.flow.map((step, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 32, alignItems: "center", backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }} className="grid-2">
                <div style={{ position: "relative", aspectRatio: "200 / 140", overflow: "hidden", backgroundColor: "var(--color-warm)" }}>
                  <img src={step.image} alt={step.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, backgroundColor: "var(--color-primary)", padding: "6px 14px", fontSize: 11, fontWeight: 700, color: "#fff", borderBottomRightRadius: 8 }}>STEP {step.n}</div>
                </div>
                <div style={{ padding: "24px 28px 24px 0" }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "var(--color-text)", marginBottom: 10 }}>{step.title}</div>
                  <p style={{ fontSize: 15, color: "var(--color-text-body)", lineHeight: 2.0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 56, backgroundColor: "var(--color-primary-light)", border: "1px solid var(--color-primary-border)", borderRadius: 10, padding: "32px", textAlign: "center" }}>
            <div style={{ fontSize: 12, color: "var(--color-green)", fontWeight: 700, marginBottom: 8 }}>予約不要・当日来院OK</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)", marginBottom: 20 }}>お気軽にご来院ください</div>
            <a href={`tel:${c.clinic.tel}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "var(--color-primary)", color: "#fff", padding: "14px 36px", borderRadius: 6, textDecoration: "none", fontSize: 18, fontWeight: 700 }}>
              {c.clinic.telFormatted}
            </a>
          </div>
        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
