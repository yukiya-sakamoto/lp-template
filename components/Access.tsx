import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  clinic: SiteContent["clinic"];
  images: SiteContent["images"];
}

export default function Access({ clinic, images }: Props) {
  return (
    <section id="access" style={{ backgroundColor: "#FDFAF6", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="sec-label">アクセス</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "#2D2D2D" }}>ご来院のご案内</h2>
          </div>
          <Link href="/access/" style={{ fontSize: 14, color: "#D96B0B", fontWeight: 700, textDecoration: "none" }}>詳しく見る →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="grid-2">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
              <img src={images.exterior} alt="外観" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                <img src={images.interior} alt="院内" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                <img src={images.parking} alt="駐車場" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#2D2D2D", marginBottom: 4 }}>{clinic.name} {clinic.branch}</div>
            <div style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>{clinic.address}</div>
            <div style={{ borderTop: "1px solid #EDE0CC", marginBottom: 24 }}>
              {[
                ["最寄り駅", clinic.access.join(" / ")],
                ["駐車場",   clinic.parking],
                ["保険",     clinic.insurance],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16, borderBottom: "1px solid #EDE0CC", padding: "14px 0", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, color: "#D96B0B", fontWeight: 700, backgroundColor: "#FEF3E8", padding: "3px 10px", borderRadius: 4, flexShrink: 0, marginTop: 2 }}>{label}</span>
                  <span style={{ fontSize: 14, color: "#2D2D2D", lineHeight: 1.75 }}>{val}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#EAF7F1", border: "1px solid #A8E0C4", borderRadius: 10, padding: "18px 22px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#05AF4B", fontWeight: 700, marginBottom: 14 }}>受付時間</div>
              {clinic.hours.map(h => (
                <div key={h.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #A8E0C4", padding: "10px 0" }}>
                  <span style={{ fontSize: 14, color: "#4A4A4A", fontWeight: 600 }}>{h.label}</span>
                  <span style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 700 }}>{h.time}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={`tel:${clinic.tel}`} style={{ display: "block", backgroundColor: "#D96B0B", color: "#fff", textAlign: "center", padding: "16px", textDecoration: "none", fontSize: 20, fontWeight: 700, borderRadius: 6 }}>
                {clinic.telFormatted}
              </a>
              <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", border: "1.5px solid #EDE0CC", color: "#4A4A4A", textAlign: "center", padding: "13px", textDecoration: "none", fontSize: 14, fontWeight: 600, borderRadius: 6, backgroundColor: "#fff" }}>
                Google マップで見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
