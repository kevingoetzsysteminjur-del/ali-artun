"use client";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function KontoDashboard() {
  const { user, profile } = useAuth();
  const displayName = profile?.name || user?.email?.split("@")[0] || "Kunde";

  const cards = [
    {
      href: "/konto/merkzettel",
      icon: <svg width="22" height="22" fill="none" stroke="#C8A45A" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
      title: "Merkzettel",
      text: "Gespeicherte Immobilien ansehen und verwalten.",
    },
    {
      href: "/konto/suchprofil",
      icon: <svg width="22" height="22" fill="none" stroke="#C8A45A" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
      title: "Suchprofil",
      text: "Ihre Suchkriterien für passende Immobilien hinterlegen.",
    },
    {
      href: "/konto/profil",
      icon: <svg width="22" height="22" fill="none" stroke="#C8A45A" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      title: "Mein Profil",
      text: "Name, Telefon und Passwort aktualisieren.",
    },
    {
      href: "/wertermittlung",
      icon: <svg width="22" height="22" fill="none" stroke="#C8A45A" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-4"/></svg>,
      title: "Wertermittlung",
      text: "Kostenlosen Immobilienwert berechnen lassen.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "36px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A45A", marginBottom: "8px" }}>WILLKOMMEN</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#1A1A1A", margin: 0 }}>
          Guten Tag, {displayName}.
        </h1>
        <p style={{ fontSize: "15px", color: "#7A6548", marginTop: "8px", fontWeight: 300 }}>
          Ihr persönlicher Bereich bei Plan A Immobilien & Finanzierung.
        </p>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }} className="konto-grid">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} style={{
            display: "block", background: "#FFFFFF", borderRadius: "16px",
            padding: "28px", border: "1px solid #EAE0D5", textDecoration: "none",
            transition: "all 0.25s", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#FBF5EC", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              {c.icon}
            </div>
            <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "6px" }}>{c.title}</h3>
            <p style={{ fontSize: "13px", color: "#7A6548", lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{c.text}</p>
          </Link>
        ))}
      </div>

      {/* Kontakt-Banner */}
      <div style={{ marginTop: "32px", background: "linear-gradient(135deg,#1A1A1A,#2C1A0E)", borderRadius: "16px", padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A45A", marginBottom: "6px" }}>PERSÖNLICHE BERATUNG</p>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#FDFAF7", margin: 0 }}>Fragen? Ali Artun hilft Ihnen gerne weiter.</p>
        </div>
        <a href="tel:01736259429" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "12px 24px", background: "linear-gradient(135deg,#B8860B,#C8A45A)",
          color: "#fff", borderRadius: "50px", textDecoration: "none",
          fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", flexShrink: 0,
        }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          0173-6259429
        </a>
      </div>

      <style>{`@media(max-width:640px){.konto-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
