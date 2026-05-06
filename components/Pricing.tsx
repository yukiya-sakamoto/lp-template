import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  pricing: SiteContent["pricing"];
}

export default function Pricing({ pricing }: Props) {
  return (
    <section id="pricing" style={{ backgroundColor: "var(--color-warm)", padding: "88px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span className="sec-label">料金</span>
            <h2 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, color: "var(--color-text)" }}>料金のご案内</h2>
          </div>
          <Link href="/pricing/" style={{ fontSize: 14, color: "var(--color-primary)", fontWeight: 700, textDecoration: "none" }}>詳細を見る →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 860 }} className="grid-2">
          <div style={{ backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ backgroundColor: "var(--color-primary)", padding: "14px 22px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>保険内料金表（目安）</div>
            </div>
            <div style={{ padding: "22px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", marginBottom: 4 }}>
                <div />
                <div style={{ fontSize: 11, color: "var(--color-text-light)", fontWeight: 700, textAlign: "center", padding: "6px 0", borderBottom: "1px solid var(--color-border)" }}>3割負担</div>
                <div style={{ fontSize: 11, color: "var(--color-text-light)", fontWeight: 700, textAlign: "center", padding: "6px 0", borderBottom: "1px solid var(--color-border)" }}>1割負担</div>
              </div>
              {pricing.insurance.map(row => (
                <div key={row.label} style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", borderBottom: "1px solid var(--color-warm)" }}>
                  <div style={{ fontSize: 14, color: "var(--color-text)", fontWeight: 600, padding: "14px 0" }}>{row.label}</div>
                  <div style={{ fontSize: 17, color: "var(--color-primary)", fontWeight: 700, textAlign: "center", padding: "14px 0" }}>{row.col1}</div>
                  <div style={{ fontSize: 17, color: "var(--color-green)", fontWeight: 700, textAlign: "center", padding: "14px 0" }}>{row.col2}</div>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "var(--color-text-light)", marginTop: 14, lineHeight: 1.8 }}>※ 窓口でいただく金額には、一部実費診療代が含まれる場合がございます。</p>
            </div>
          </div>
          <div style={{ backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ backgroundColor: "var(--color-green)", padding: "14px 22px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>実費診療一例</div>
            </div>
            <div style={{ padding: "22px" }}>
              {pricing.extras.map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-warm)", padding: "11px 0" }}>
                  <span style={{ fontSize: 14, color: "var(--color-text)" }}>{row.label}</span>
                  <span style={{ fontSize: 14, color: "var(--color-primary)", fontWeight: 700 }}>{row.price}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: "var(--color-text-light)", marginTop: 14, lineHeight: 1.8 }}>※ 症状によっては実費がかかる場合がございます。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
