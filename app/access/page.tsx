import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import { siteContent as c } from "../../lib/content";
import { DEFAULT_NAV } from "../../lib/nav";

export const metadata = { title: `アクセス | ${c.meta.title}` };

function buildEmbedSrc(mapUrl: string): string {
  try {
    const u = new URL(mapUrl);
    u.searchParams.set("output", "embed");
    return u.toString();
  } catch {
    return "";
  }
}

export default function AccessPage() {
  const embedSrc = buildEmbedSrc(c.clinic.mapUrl);
  return (
    <>
      <Header clinic={c.clinic} nav={[...DEFAULT_NAV]} />
      <PageHero
        label="ACCESS"
        title="ご来院のご案内"
        breadcrumb={[
          { label: "ホーム", href: "/" },
          { label: "アクセス", href: "/access/" },
        ]}
      />

      <main style={{ backgroundColor: "#FDFAF6", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }} className="grid-2">

            {/* 写真 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                <img src={c.images.exterior} alt="外観" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                  <img src={c.images.interior} alt="院内" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}>
                  <img src={c.images.parking} alt="駐車場" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
              </div>
            </div>

            {/* 情報 */}
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#2D2D2D", marginBottom: 4 }}>{c.clinic.name} {c.clinic.branch}</div>
              <div style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>{c.clinic.address}</div>

              <div style={{ borderTop: "1px solid var(--color-border)", marginBottom: 28 }}>
                {([
                  ["最寄り駅", c.clinic.access.join(" / ")],
                  ["駐車場",   c.clinic.parking],
                  ["保険",     c.clinic.insurance],
                ] as [string, string][]).map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 16, borderBottom: "1px solid var(--color-border)", padding: "14px 0", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 11, color: "var(--color-primary)", fontWeight: 700, backgroundColor: "var(--color-primary-light)", padding: "3px 10px", borderRadius: 4, flexShrink: 0, marginTop: 2 }}>{label}</span>
                    <span style={{ fontSize: 14, color: "#2D2D2D", lineHeight: 1.75 }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: "var(--color-green-light)", border: "1px solid var(--color-green-border)", borderRadius: 10, padding: "20px 22px", marginBottom: 24 }}>
                <div style={{ fontSize: 12, color: "var(--color-green)", fontWeight: 700, marginBottom: 14 }}>受付時間</div>
                {c.clinic.hours.map(h => (
                  <div key={h.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-green-border)", padding: "10px 0" }}>
                    <span style={{ fontSize: 14, color: "#4A4A4A", fontWeight: 600 }}>{h.label}</span>
                    <span style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 700 }}>{h.time}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={`tel:${c.clinic.tel}`} style={{ display: "block", backgroundColor: "var(--color-primary)", color: "#fff", textAlign: "center", padding: "16px", textDecoration: "none", fontSize: 20, fontWeight: 700, borderRadius: 6 }}>
                  {c.clinic.telFormatted}
                </a>
                <a href={c.clinic.mapUrl} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", border: "1.5px solid var(--color-border)", color: "#4A4A4A", textAlign: "center", padding: "13px", textDecoration: "none", fontSize: 14, fontWeight: 600, borderRadius: 6, backgroundColor: "#fff" }}>
                  Google マップで見る
                </a>
              </div>
            </div>
          </div>

          {/* マップ埋め込み枠 */}
          <div style={{ marginTop: 56, borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", aspectRatio: "16 / 5" }}>
            <iframe
              src={embedSrc}
              width="100%"
              height="100%"
              style={{ border: "none", display: "block" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p style={{ fontSize: 12, color: "#888", marginTop: 8, textAlign: "center" }}>
            <a href={c.clinic.mapUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Google マップで大きく見る</a>
          </p>
        </div>
      </main>

      <Footer clinic={c.clinic} symptoms={c.symptoms} nav={[...DEFAULT_NAV]} />
    </>
  );
}
