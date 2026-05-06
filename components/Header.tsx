"use client";
import { useState } from "react";
import Link from "next/link";
import type { SiteContent } from "../lib/content";

interface Props {
  clinic: SiteContent["clinic"];
  nav: { label: string; href: string }[];
}

export default function Header({ clinic, nav }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: "#fff", borderBottom: "1px solid #EDE0CC", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
      <div className="hide-sp" style={{ backgroundColor: "#F7F0E6", borderBottom: "1px solid #EDE0CC", padding: "5px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "#666259" }}>
            {clinic.hours.map(h => `${h.label} ${h.time}`).join("　")}
          </span>
          <a href={`tel:${clinic.tel}`} style={{ fontSize: 13, fontWeight: 700, color: "#D96B0B", textDecoration: "none" }}>
            {clinic.telFormatted}
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#D96B0B", lineHeight: 1.15 }}>{clinic.name}</div>
          <div style={{ fontSize: 10, color: "#999", letterSpacing: "0.12em", marginTop: 1 }}>{clinic.branch}</div>
        </Link>

        <nav className="hide-sp" style={{ display: "flex", gap: 24, flex: 1, justifyContent: "center" }}>
          {nav.map(n => (
            <Link key={n.label} href={n.href}
              style={{ fontSize: 13, color: "#2D2D2D", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap", borderBottom: "2px solid transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#D96B0B"; (e.currentTarget as HTMLElement).style.borderBottomColor = "#D96B0B"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#2D2D2D"; (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent"; }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <a href={`tel:${clinic.tel}`} className="hide-sp" style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#D96B0B", color: "#fff", padding: "10px 22px", borderRadius: 6, textDecoration: "none", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
          お電話でのご相談
        </a>

        <button onClick={() => setOpen(!open)} className="show-sp" style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <line x1="0" y1="1" x2="22" y2="1" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="8" x2="22" y2="8" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
            <line x1="0" y1="15" x2="22" y2="15" stroke="#2D2D2D" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ backgroundColor: "#FDFAF6", borderTop: "1px solid #EDE0CC", padding: "8px 20px 20px" }}>
          {nav.map(n => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: 15, color: "#2D2D2D", textDecoration: "none", borderBottom: "1px solid #EDE0CC", fontWeight: 600 }}>
              {n.label}
            </Link>
          ))}
          <a href={`tel:${clinic.tel}`} style={{ display: "block", marginTop: 18, backgroundColor: "#D96B0B", color: "#fff", textAlign: "center", padding: "16px", borderRadius: 6, textDecoration: "none", fontSize: 18, fontWeight: 700 }}>
            {clinic.telFormatted}
          </a>
        </div>
      )}
    </header>
  );
}
