import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  symptoms: SiteContent["symptoms"];
}

export default function Symptoms({ symptoms }: Props) {
  return (
    <section id="symptoms" style={{ backgroundColor: "var(--color-warm)", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="sec-label">症状・施術メニュー</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "var(--color-text)" }}>こんなお悩みに対応しています</h2>
          </div>
          <Link href="/symptoms/" style={{ fontSize: 14, color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>すべての症状を見る →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="grid-3">
          {symptoms.map(s => (
            <Link key={s.slug} href={`/symptoms/${s.slug}/`} className="symptom-card">
              <div style={{ width: 24, height: 3, backgroundColor: "var(--color-green)", borderRadius: 2, marginBottom: 12 }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 6 }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.8, marginBottom: 14 }}>{s.desc}</div>
              <div style={{ fontSize: 13, color: "var(--color-primary)", fontWeight: 700 }}>詳しく見る →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
