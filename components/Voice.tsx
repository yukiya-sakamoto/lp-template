import type { SiteContent } from "../lib/content";

interface Props {
  voices: SiteContent["voices"];
}

export default function Voice({ voices }: Props) {
  return (
    <section id="voice" style={{ backgroundColor: "#fff", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="sec-label" style={{ color: "var(--color-green)", display: "block", textAlign: "center" }}>患者様の声</span>
          <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "var(--color-text)" }}>来院された方からのお声</h2>
          <p style={{ fontSize: 14, color: "var(--color-text-light)", marginTop: 10 }}>実際にご来院いただいた患者様からいただいたお声です</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="grid-3">
          {voices.map((v, i) => (
            <div key={i} style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border)", borderRadius: 10, padding: "28px 24px" }}>
              <div style={{ display: "inline-block", fontSize: 11, color: "var(--color-green)", backgroundColor: "var(--color-green-light)", border: "1px solid var(--color-green-border)", padding: "3px 12px", borderRadius: 20, fontWeight: 700, marginBottom: 14 }}>{v.tag}</div>
              <div style={{ fontSize: 22, color: "var(--color-primary)", fontWeight: 800, lineHeight: 1, marginBottom: 4, opacity: 0.3 }}>"</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)", marginBottom: 10, lineHeight: 1.6 }}>{v.title}</div>
              <p style={{ fontSize: 14, color: "var(--color-text-body)", lineHeight: 2.0, marginBottom: 16 }}>{v.text}</p>
              <div style={{ fontSize: 12, color: "var(--color-text-light)", borderTop: "1px solid var(--color-border)", paddingTop: 12 }}>{v.who}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
