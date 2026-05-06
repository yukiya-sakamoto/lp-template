"use client";
import Link from "next/link";

interface Props {
  label: string;
  title: string;
  breadcrumb?: { label: string; href: string }[];
}

export default function PageHero({ label, title, breadcrumb }: Props) {
  return (
    <div style={{ backgroundColor: "#F7F0E6", borderBottom: "1px solid #EDE0CC", paddingTop: 88 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 28px 28px" }}>
        {breadcrumb && (
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 14 }}>
            {breadcrumb.map((b, i) => (
              <span key={b.href} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: "#C8B8A2", fontSize: 11 }}>/</span>}
                <Link href={b.href} style={{ fontSize: 12, color: "#888", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#D96B0B"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#888"}>
                  {b.label}
                </Link>
              </span>
            ))}
          </div>
        )}
        <div style={{ fontSize: 10, color: "#D96B0B", fontWeight: 700, letterSpacing: "0.2em", marginBottom: 8 }}>{label}</div>
        <h1 style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 700, color: "#2D2D2D", letterSpacing: "-0.01em" }}>{title}</h1>
      </div>
    </div>
  );
}
