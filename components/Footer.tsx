import Link from "next/link";
import type { SiteContent } from "../lib/content";
import type { NavItem } from "../lib/nav";

interface Props {
  clinic: SiteContent["clinic"];
  symptoms: SiteContent["symptoms"];
  nav: NavItem[];
}

export default function Footer({ clinic, symptoms, nav }: Props) {
  const symptomLinks = symptoms.slice(0, 6);
  return (
    <footer style={{ backgroundColor: "#2A1F18", padding: "56px 28px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 32, marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="footer-grid">
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
              {clinic.name}<span style={{ color: "var(--color-primary)", marginLeft: 6 }}>{clinic.branch}</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", marginBottom: 18 }}>{clinic.nameEn}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", marginBottom: 16, lineHeight: 2.1 }}>
              {clinic.address}<br />
              {clinic.access.join(" / ")}
            </div>
            <a href={`tel:${clinic.tel}`} style={{ display: "block", fontSize: 22, fontWeight: 700, color: "var(--color-primary)", textDecoration: "none", marginBottom: 4 }}>{clinic.telFormatted}</a>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{clinic.insurance}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--color-green)", fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>MENU</div>
            {nav.map(({ label, href }) => (
              <Link key={label} href={href} className="footer-link">{label}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--color-green)", fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>症状別</div>
            {symptomLinks.map(s => (
              <Link key={s.slug} href={`/symptoms/${s.slug}/`} className="footer-link">{s.name}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, color: "var(--color-green)", fontWeight: 700, letterSpacing: "0.16em", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>HOURS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {clinic.hours.map(h => (
                <div key={h.label}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", marginBottom: 2 }}>{h.label}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{h.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.18)" }}>
          &copy; {new Date().getFullYear()} {clinic.name} {clinic.branch}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
