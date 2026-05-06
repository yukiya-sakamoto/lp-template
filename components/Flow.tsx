import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  flow: SiteContent["flow"];
}

export default function Flow({ flow }: Props) {
  return (
    <section id="flow" style={{ backgroundColor: "#FDFAF6", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="sec-label">施術の流れ</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "#2D2D2D" }}>はじめての方も安心の流れ</h2>
          </div>
          <Link href="/flow/" style={{ fontSize: 14, color: "#D96B0B", fontWeight: 700, textDecoration: "none" }}>詳しく見る →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="grid-5">
          {flow.map((s, i) => (
            <div key={i} style={{ backgroundColor: "#fff", border: "1px solid #EDE0CC", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ position: "relative" }}>
                <img src={s.image} alt={s.title} style={{ width: "100%", height: "auto", display: "block" }} />
                <div style={{ position: "absolute", top: 0, left: 0, backgroundColor: "#D96B0B", padding: "6px 12px", fontSize: 11, fontWeight: 700, color: "#fff", borderBottomRightRadius: 8 }}>STEP {s.n}</div>
              </div>
              <div style={{ padding: "16px 14px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#2D2D2D", marginBottom: 6 }}>{s.title}</div>
                <p style={{ fontSize: 13, color: "#666259", lineHeight: 1.85 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
