import type { SiteContent } from "../lib/content";

interface Props {
  hero: SiteContent["hero"];
  clinic: SiteContent["clinic"];
}

export default function Hero({ hero, clinic }: Props) {
  const headerH = 88;
  return (
    <section style={{ paddingTop: headerH, backgroundColor: "var(--color-cream)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", minHeight: 480 }} className="grid-2">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "56px 40px 56px 0" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "var(--color-green-light)", border: "1px solid var(--color-green-border)", borderRadius: 20, padding: "4px 14px", marginBottom: 24, width: "fit-content" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--color-green)", flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-green)", letterSpacing: "0.06em" }}>{hero.subcopy}</span>
            </div>
            <h1 style={{ fontSize: "clamp(26px, 3.8vw, 46px)", fontWeight: 800, color: "var(--color-text)", lineHeight: 1.45, letterSpacing: "-0.01em", marginBottom: 20 }}>
              {hero.catchcopy}
            </h1>
            <p style={{ fontSize: 15, color: "var(--color-text-body)", lineHeight: 2.0, marginBottom: 32, maxWidth: 380 }}>{hero.lead}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`tel:${clinic.tel}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "var(--color-primary)", color: "#fff", padding: "15px 28px", borderRadius: 6, textDecoration: "none", fontSize: 17, fontWeight: 700 }}>
                {clinic.telFormatted}
              </a>
              <a href="/access/" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1.5px solid var(--color-primary)", color: "var(--color-primary)", padding: "14px 22px", borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 700 }}>
                アクセスを見る
              </a>
            </div>
          </div>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "0 0 0 20px" }}>
            <img src={hero.image} alt={clinic.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", minHeight: 360 }} />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="grid-4">
          {[
            { label: "各種保険取扱",    sub: clinic.insurance },
            { label: "予約不要",         sub: "当日来院・飛び込みOK" },
            { label: "駐車場完備",       sub: clinic.parking },
            { label: clinic.access[0],   sub: clinic.name },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: "18px 24px", borderRight: i < 3 ? "1px solid var(--color-border)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 4, height: 32, backgroundColor: "var(--color-primary)", borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text)" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: "var(--color-text-light)", marginTop: 2 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
