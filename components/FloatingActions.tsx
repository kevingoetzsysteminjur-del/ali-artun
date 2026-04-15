"use client";
import { useState } from "react";
import Link from "next/link";

function KontaktPanel({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", telefon: "", email: "", anliegen: "Immobilienverkauf", datenschutz: false });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const up = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const inp: React.CSSProperties = { width: "100%", padding: "11px 14px", border: "1px solid #E8D9C5", borderRadius: "8px", fontSize: "14px", color: "#2C1A0E", outline: "none", fontFamily: "var(--font-outfit, sans-serif)", fontWeight: 300, backgroundColor: "#FFFCF7", boxSizing: "border-box" as const };
  const lbl: React.CSSProperties = { fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A6548", display: "block", marginBottom: "5px" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", justifyContent: "flex-end" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ backgroundColor: "#fff", width: "100%", maxWidth: "440px", height: "100%", overflowY: "auto", boxShadow: "-8px 0 40px rgba(44,26,14,0.18)", display: "flex", flexDirection: "column", animation: "slideInRight 0.3s ease-out" }}>
        {/* Panel header */}
        <div style={{ backgroundColor: "#2C1A0E", padding: "28px 28px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", margin: "0 0 6px" }}>PLAN A IMMOBILIEN</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.5rem", color: "#FFFFFF", margin: 0 }}>Kontakt aufnehmen</h2>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px", flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
            <a href="tel:01736259429" style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "12px" }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              0173-6259429
            </a>
            <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#B8860B", textDecoration: "none", fontSize: "12px" }}>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Panel body */}
        <div style={{ padding: "28px", flex: 1 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#B8860B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="24" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
              </div>
              <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#2C1A0E", marginBottom: "10px" }}>Anfrage eingegangen!</p>
              <p style={{ fontSize: "14px", color: "#7A6548", fontWeight: 300 }}>Wir melden uns innerhalb von 24 Stunden.</p>
              <button onClick={onClose} style={{ marginTop: "28px", padding: "13px 32px", background: "linear-gradient(135deg,#2C1A0E,#3D2512)", color: "#fff", border: "none", borderRadius: "60px", fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Schließen
              </button>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              setSending(true);
              await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: form.name,
                  email: form.email,
                  telefon: form.telefon,
                  betreff: form.anliegen,
                  nachricht: `Kontaktanfrage über das Floating-Panel.\nAnliegen: ${form.anliegen}`,
                }),
              });
              setSending(false);
              setSent(true);
            }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={lbl}>Name</label>
                <input style={inp} required placeholder="Ihr Name" value={form.name} onChange={e => up("name", e.target.value)} />
              </div>
              <div>
                <label style={lbl}>Telefon</label>
                <input style={inp} type="tel" required placeholder="0173 12345678" value={form.telefon} onChange={e => up("telefon", e.target.value)} />
              </div>
              <div>
                <label style={lbl}>E-Mail</label>
                <input style={inp} type="email" placeholder="ihre@email.de" value={form.email} onChange={e => up("email", e.target.value)} />
              </div>
              <div>
                <label style={lbl}>Anliegen</label>
                <select style={inp} value={form.anliegen} onChange={e => up("anliegen", e.target.value)}>
                  {["Immobilienverkauf", "Immobilienbewertung", "Finanzierung", "Suchauftrag", "Partner werden", "Sonstiges"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "12px", color: "#7A6548", fontWeight: 300, lineHeight: 1.6 }}>
                <input type="checkbox" required checked={form.datenschutz} onChange={e => up("datenschutz", e.target.checked)} style={{ marginTop: "3px", flexShrink: 0, accentColor: "#2C1A0E" }} />
                Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                <Link href="/datenschutz" style={{ color: "#B8860B" }} target="_blank">Datenschutzerklärung</Link> zu.
              </label>
              <button type="submit" disabled={sending}
                style={{ padding: "15px 32px", background: sending ? "#A89070" : "linear-gradient(135deg,#2C1A0E,#3D2512)", color: "#fff", border: "none", borderRadius: "60px", fontSize: "13px", fontWeight: 500, cursor: sending ? "not-allowed" : "pointer", letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 400ms cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 4px 20px rgba(44,26,14,0.2)" }}
                onMouseEnter={e => { if (!sending) { e.currentTarget.style.background = "linear-gradient(135deg,#B8860B,#D4B87E)"; e.currentTarget.style.transform = "scale(1.02)"; } }}
                onMouseLeave={e => { if (!sending) { e.currentTarget.style.background = "linear-gradient(135deg,#2C1A0E,#3D2512)"; e.currentTarget.style.transform = "scale(1)"; } }}>
                {sending ? "Wird gesendet…" : "Anfrage senden →"}
              </button>
              <div style={{ borderTop: "1px solid #E8D9C5", paddingTop: "16px", display: "flex", gap: "12px" }}>
                <a href="tel:01736259429"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", backgroundColor: "#F5EDE0", color: "#2C1A0E", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Anrufen
                </a>
                <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer"
                  style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "12px", backgroundColor: "#25D366", color: "#fff", borderRadius: "10px", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
                  WhatsApp
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{`@keyframes slideInRight{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );
}

export default function FloatingActions() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      {panelOpen && <KontaktPanel onClose={() => setPanelOpen(false)} />}

      {/* Desktop: vertical KONTAKT tab on right edge */}
      <button
        className="kontakt-tab"
        onClick={() => setPanelOpen(true)}
        aria-label="Kontakt"
        style={{
          position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)",
          zIndex: 900, display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: "0",
          backgroundColor: "#2C1A0E", borderLeft: "3px solid #B8860B",
          border: "none", cursor: "pointer", padding: "20px 12px",
          borderRadius: "8px 0 0 8px",
          boxShadow: "-4px 0 20px rgba(44,26,14,0.2)",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#B8860B")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#2C1A0E")}
      >
        <span style={{
          color: "#FFFFFF", fontSize: "11px", fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase",
          writingMode: "vertical-rl", textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}>
          KONTAKT
        </span>
      </button>

      {/* Mobile: fixed bottom bar */}
      <div className="mobile-bottom-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 900, backgroundColor: "#2C1A0E", display: "flex", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Link href="/" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
          Start
        </Link>
        <Link href="/immobilienverkauf" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 20h20M4 20V10l8-7 8 7v10"/></svg>
          Verkaufen
        </Link>
        <Link href="/finanzierung" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
          Finanzierung
        </Link>
        <button onClick={() => setPanelOpen(true)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", backgroundColor: "transparent", border: "none", color: "#B8860B", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Kontakt
        </button>
      </div>

      <style>{`
        @media(min-width: 769px) { .mobile-bottom-bar { display: none !important; } }
        @media(max-width: 768px) { .kontakt-tab { display: none !important; } }
      `}</style>
    </>
  );
}
