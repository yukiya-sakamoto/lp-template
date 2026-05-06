import type { SiteContent } from "../lib/content";

interface Props {
  about: SiteContent["about"];
}

export default function About({ about }: Props) {
  const d = about.director;
  return (
    <section id="about" style={{ backgroundColor: "#fff", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="grid-2">
          <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 16 }}>
            <img src={d.image} alt={d.name} style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
          <div>
            <span className="sec-label">院長ご挨拶</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "#2D2D2D", marginBottom: 8, lineHeight: 1.5 }}>
              {about.heading}
            </h2>
            <div style={{ width: 36, height: 3, backgroundColor: "#D96B0B", borderRadius: 2, marginBottom: 28 }} />
            {about.body.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 2.2, marginBottom: 18 }}>{p}</p>
            ))}
            <div style={{ backgroundColor: "#FEF3E8", border: "1px solid #F5DCC2", borderRadius: 10, padding: "20px 24px", display: "flex", alignItems: "flex-start", gap: 16 }}>
              <div style={{ width: 4, minHeight: 44, backgroundColor: "#D96B0B", borderRadius: 2, flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#2D2D2D", marginBottom: 3 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: "#D96B0B", marginBottom: 6 }}>{d.role}</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.7 }}>{d.qualifications.join(" / ")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
