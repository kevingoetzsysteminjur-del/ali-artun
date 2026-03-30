"use client";
import { useState } from "react";
import Link from "next/link";

/* ─── Rückruf Modal ─────────────────────────────────────────── */
function RueckrufModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ anrede: "Herr", vorname: "", nachname: "", telefon: "", anliegen: "Immobilienverkauf", wann: "Vormittags", datenschutz: false });
  const [sent, setSent] = useState(false);
  const up = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const inp = { width: "100%", padding: "11px 14px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px", color: "#1A1A1A", outline: "none", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300 };
  const lbl = { fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#6B7280", display: "block", marginBottom: "5px" };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", padding: "20px" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "40px", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="24" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
            </div>
            <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.4rem", color: "#1A1A1A", marginBottom: "10px" }}>Rückruf vereinbart!</p>
            <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: 300 }}>Wir rufen Sie zur gewünschten Zeit zurück.</p>
            <button onClick={onClose} style={{ marginTop: "24px", padding: "12px 32px", backgroundColor: "#1B3A4B", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>Schließen</button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "8px" }}>KOSTENFREI</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1A1A1A", marginBottom: "24px" }}>Rückruf vereinbaren</h2>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "10px" }}>
                {["Herr", "Frau"].map(a => (
                  <button key={a} type="button" onClick={() => up("anrede", a)}
                    style={{ flex: 1, padding: "10px", border: `1.5px solid ${form.anrede === a ? "#1B3A4B" : "#E5E7EB"}`, borderRadius: "8px", backgroundColor: form.anrede === a ? "#1B3A4B" : "#fff", color: form.anrede === a ? "#fff" : "#6B7280", fontSize: "14px", cursor: "pointer", fontWeight: 400 }}>
                    {a}
                  </button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div><label style={lbl}>Vorname</label><input style={inp} required placeholder="Max" value={form.vorname} onChange={e => up("vorname", e.target.value)} /></div>
                <div><label style={lbl}>Nachname</label><input style={inp} required placeholder="Mustermann" value={form.nachname} onChange={e => up("nachname", e.target.value)} /></div>
              </div>
              <div><label style={lbl}>Telefon</label><input style={inp} type="tel" required placeholder="0173 12345678" value={form.telefon} onChange={e => up("telefon", e.target.value)} /></div>
              <div>
                <label style={lbl}>Anliegen</label>
                <select style={{ ...inp }} value={form.anliegen} onChange={e => up("anliegen", e.target.value)}>
                  {["Immobilienverkauf", "Immobilienbewertung", "Finanzierung", "Partner werden", "Sonstiges"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Wann erreichen wir Sie?</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {["Vormittags", "Mittags", "Nachmittags", "Abends"].map(w => (
                    <label key={w} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", border: `1.5px solid ${form.wann === w ? "#1B3A4B" : "#E5E7EB"}`, borderRadius: "8px", cursor: "pointer", fontSize: "14px", color: form.wann === w ? "#1B3A4B" : "#6B7280", fontWeight: form.wann === w ? 500 : 300 }}>
                      <input type="radio" name="wann" value={w} checked={form.wann === w} onChange={() => up("wann", w)} style={{ display: "none" }} />
                      {w}
                    </label>
                  ))}
                </div>
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "12px", color: "#6B7280", fontWeight: 300, lineHeight: 1.6 }}>
                <input type="checkbox" required checked={form.datenschutz} onChange={e => up("datenschutz", e.target.checked)} style={{ marginTop: "3px", flexShrink: 0, accentColor: "#1B3A4B" }} />
                Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                <Link href="/datenschutz" style={{ color: "#C8A96E" }} target="_blank">Datenschutzerklärung</Link> zu.
              </label>
              <button type="submit"
                style={{ padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "background 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C8A96E")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1B3A4B")}>
                Jetzt Rückruf vereinbaren →
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Floating Actions ───────────────────────────────────────── */
export default function FloatingActions() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <RueckrufModal onClose={() => setModalOpen(false)} />}

      {/* Desktop: fixed right sidebar */}
      <div className="floating-sidebar" style={{ position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 900, display: "flex", flexDirection: "column", gap: "2px" }}>
        <Link href="/#suche"
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", backgroundColor: "#1B3A4B", color: "#fff", textDecoration: "none", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", borderRadius: "8px 0 0 0", transition: "background 0.2s, padding-right 0.2s", whiteSpace: "nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C8A96E"; e.currentTarget.style.paddingRight = "18px"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#1B3A4B"; e.currentTarget.style.paddingRight = "14px"; }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Suche
        </Link>
        <button onClick={() => setModalOpen(true)}
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", backgroundColor: "#1B3A4B", color: "#fff", border: "none", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer", transition: "background 0.2s, padding-right 0.2s", whiteSpace: "nowrap", textAlign: "left" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C8A96E"; e.currentTarget.style.paddingRight = "18px"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#1B3A4B"; e.currentTarget.style.paddingRight = "14px"; }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Rückruf
        </button>
        <Link href="/kontakt"
          style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 14px", backgroundColor: "#1B3A4B", color: "#fff", textDecoration: "none", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", borderRadius: "0 0 0 8px", transition: "background 0.2s, padding-right 0.2s", whiteSpace: "nowrap" }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C8A96E"; e.currentTarget.style.paddingRight = "18px"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#1B3A4B"; e.currentTarget.style.paddingRight = "14px"; }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Kontakt
        </Link>
      </div>

      {/* Mobile: fixed bottom bar */}
      <div className="mobile-bottom-bar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 900, backgroundColor: "#1B3A4B", display: "flex", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <Link href="/#suche"
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          Suche
        </Link>
        <Link href="/immobilienverkauf"
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
          Verkaufen
        </Link>
        <button onClick={() => setModalOpen(true)}
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", backgroundColor: "transparent", border: "none", color: "#C8A96E", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", cursor: "pointer", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
          Rückruf
        </button>
        <Link href="/kontakt"
          style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px 14px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", gap: "4px" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Kontakt
        </Link>
      </div>

      <style>{`
        @media(min-width: 769px) { .mobile-bottom-bar { display: none !important; } }
        @media(max-width: 768px) { .floating-sidebar { display: none !important; } }
      `}</style>
    </>
  );
}
