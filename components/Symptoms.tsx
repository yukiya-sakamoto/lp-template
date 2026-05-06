"use client";
import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  symptoms: SiteContent["symptoms"];
}

export default function Symptoms({ symptoms }: Props) {
  return (
    <section id="symptoms" style={{ backgroundColor: "#F7F0E6", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="sec-label">症状・施術メニュー</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "#2D2D2D" }}>こんなお悩みに対応しています</h2>
          </div>
          <Link href="/symptoms/" style={{ fontSize: 14, color: "#D96B0B", fontWeight: 700, textDecoration: "none" }}>すべての症状を見る →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
          {symptoms.map(s => (
            <Link key={s.slug} href={`/symptoms/${s.slug}/`}
              style={{ backgroundColor: "#fff", border: "1px solid #EDE0CC", borderRadius: 10, padding: "22px 20px", textDecoration: "none", display: "block" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(217,107,11,0.12)"; (e.currentTarget as HTMLElement).style.borderColor = "#F5DCC2"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = "#EDE0CC"; }}>
              <div style={{ width: 24, height: 3, backgroundColor: "#05AF4B", borderRadius: 2, marginBottom: 12 }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2D2D2D", marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "#666259", lineHeight: 1.8, marginBottom: 14 }}>{s.desc}</div>
              <div style={{ fontSize: 13, color: "#D96B0B", fontWeight: 700 }}>詳しく見る →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
