import type { SiteContent } from "../lib/content";

interface Props {
  features: SiteContent["features"];
}

export default function Features({ features }: Props) {
  return (
    <section style={{ backgroundColor: "var(--color-cream)", padding: "80px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <span className="sec-label">当院の特長</span>
          <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "var(--color-text)", lineHeight: 1.5 }}>
            地域の皆さまに安心してご来院いただくために
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }} className="grid-2">
          {features.map(f => (
            <div key={f.num} style={{ backgroundColor: "#fff", borderRadius: 10, padding: "32px 28px", border: "1px solid var(--color-border)", display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "var(--color-primary-border)", flexShrink: 0, lineHeight: 1, marginTop: 4 }}>{f.num}</div>
              <div>
                <div style={{ width: 28, height: 3, backgroundColor: "var(--color-primary)", borderRadius: 2, marginBottom: 12 }} />
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 10, lineHeight: 1.5 }}>{f.title}</div>
                <p style={{ fontSize: 14, color: "var(--color-text-body)", lineHeight: 2.0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
