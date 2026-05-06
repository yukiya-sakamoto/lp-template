import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { siteContent as c } from "../../lib/content";
import { DEFAULT_NAV } from "../../lib/nav";

export const metadata = { title: `料金案内 | ${c.meta.title}` };

export default function PricingPage() {
  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <PageHero
        label="PRICING"
        title="料金案内"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "料金案内", href: "/pricing/" },
        ]}
      />

      <main style={{ backgroundColor: "var(--color-cream)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* 保険診療 */}
          <div style={{ marginBottom: 40 }}>
            <span className="sec-label">保険診療</span>
            <h2 style={{ fontSize: "clamp(18px, 2.4vw, 24px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 20 }}>保険内料金表（目安）</h2>
            <div style={{ backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ backgroundColor: "var(--color-primary)", padding: "14px 22px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>施術内容</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textAlign: "center" }}>3割負担</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", textAlign: "center" }}>1割負担</div>
                </div>
              </div>
              <div style={{ padding: "0 22px" }}>
                {c.pricing.insurance.map(row => (
                  <div key={row.label} style={{ display: "grid", gridTemplateColumns: "1fr 100px 100px", borderBottom: "1px solid var(--color-warm)" }}>
                    <div style={{ fontSize: 15, color: "var(--color-text)", fontWeight: 600, padding: "16px 0" }}>{row.label}</div>
                    <div style={{ fontSize: 18, color: "var(--color-primary)", fontWeight: 700, textAlign: "center", padding: "16px 0" }}>{row.col1}</div>
                    <div style={{ fontSize: 18, color: "var(--color-green)", fontWeight: 700, textAlign: "center", padding: "16px 0" }}>{row.col2}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--color-text-light)", padding: "16px 22px", lineHeight: 1.8 }}>※ 窓口でいただく金額には、一部実費診療代が含まれる場合がございます。</p>
            </div>
          </div>

          {/* 適用保険種別 */}
          {c.pricing.insuranceTypes.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text)", marginBottom: 16 }}>取り扱い保険</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="grid-2">
                {c.pricing.insuranceTypes.map(t => (
                  <div key={t.title} style={{ backgroundColor: "var(--color-green-light)", border: "1px solid var(--color-green-border)", borderRadius: 8, padding: "16px 18px" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-green)", marginBottom: 6 }}>{t.title}</div>
                    <p style={{ fontSize: 13, color: "var(--color-text-body)", lineHeight: 1.8 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 実費診療 */}
          <div>
            <span className="sec-label">実費診療</span>
            <h2 style={{ fontSize: "clamp(18px, 2.4vw, 24px)", fontWeight: 700, color: "var(--color-text)", marginBottom: 20 }}>実費診療一例</h2>
            <div style={{ backgroundColor: "#fff", border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ backgroundColor: "var(--color-green)", padding: "14px 22px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>メニュー / 価格</div>
              </div>
              <div style={{ padding: "0 22px" }}>
                {c.pricing.extras.map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-warm)", padding: "14px 0" }}>
                    <span style={{ fontSize: 15, color: "var(--color-text)" }}>{row.label}</span>
                    <span style={{ fontSize: 15, color: "var(--color-primary)", fontWeight: 700 }}>{row.price}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "var(--color-text-light)", padding: "16px 22px", lineHeight: 1.8 }}>※ 症状によっては実費がかかる場合がございます。</p>
            </div>
          </div>

        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
