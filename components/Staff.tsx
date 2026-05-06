import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  staff: SiteContent["staff"];
}

export default function Staff({ staff }: Props) {
  return (
    <section id="staff" style={{ backgroundColor: "#fff", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="sec-label">スタッフ紹介</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "var(--color-text)" }}>スタッフ一同でお待ちしています</h2>
          </div>
          <Link href="/staff/" style={{ fontSize: 14, color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>詳細を見る →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }} className="grid-5">
          {staff.map(s => (
            <div key={s.name} style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ aspectRatio: "230 / 275", overflow: "hidden", backgroundColor: "var(--color-warm)" }}>
                <img src={s.image} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
              </div>
              <div style={{ padding: "16px 14px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 11, color: "var(--color-text-light)", marginBottom: 8, lineHeight: 1.55 }}>{s.profile}</div>
                <p style={{ fontSize: 13, color: "var(--color-text-body)", lineHeight: 1.9 }}>{s.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
