"use client";
import { useState } from "react";
import Image from "next/image";

const betreffs = ["Immobilienverkauf", "Immobilienbewertung", "Finanzierung", "Partner werden", "Sonstiges"];

export default function KontaktClient() {
  const [form, setForm] = useState({ name: "", email: "", telefon: "", betreff: "Immobilienverkauf", nachricht: "" });
  const [sent, setSent] = useState(false);
  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const inp = { padding: "12px 16px", border: "1px solid #E5E7EB", borderRadius: "10px", fontSize: "14px", color: "#1A1A1A", outline: "none", width: "100%", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300, backgroundColor: "#fff" };
  const lbl = { fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#6B7280", display: "block", marginBottom: "6px" };

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#1B3A4B 0%,#0e2230 100%)", padding: "120px 0 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>KONTAKT</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "16px" }}>
            Plan A stellt sich vor.
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>Ihr Ansprechpartner: Ali Artun</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "60px", alignItems: "start" }} className="kontakt-grid">

            {/* Left – Ali */}
            <div>
              {/* Bild */}
              <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: "28px", maxWidth: "280px", aspectRatio: "3/4", backgroundColor: "#F7F5F2" }}>
                <Image src="/ali.png" alt="Ali Artun" width={280} height={373} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1A1A1A", marginBottom: "4px" }}>Ali Artun</h2>
              <p style={{ fontSize: "14px", color: "#C8A96E", fontWeight: 500, marginBottom: "24px" }}>Plan A Immobilien & Finanzierung</p>

              {/* Qualifikationen */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B7280", marginBottom: "12px" }}>Qualifikationen</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["§34c GewO (Immobilienmakler)", "§34i GewO (Darlehensvermittler)", "IHK Rhein-Neckar", "Reg.-Nr.: D-W-153-TH95-12", "Freier & unabhängiger Makler"].map((q) => (
                    <div key={q} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151", fontWeight: 300 }}>
                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#C8A96E", flexShrink: 0 }} />
                      {q}
                    </div>
                  ))}
                </div>
              </div>

              {/* Kontaktdaten */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B7280", marginBottom: "0" }}>Kontakt</p>
                {[
                  { icon: <svg width="16" height="16" fill="none" stroke="#C8A96E" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>, label: "0173-6259429", href: "tel:01736259429" },
                  { icon: <svg width="16" height="16" fill="none" stroke="#C8A96E" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label: "Info@plana-immobilien-finanzierung.com", href: "mailto:Info@plana-immobilien-finanzierung.com" },
                  { icon: <svg width="16" height="16" fill="none" stroke="#C8A96E" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Mosbacher Str. 75, 74821 Mosbach", href: undefined },
                ].map((c, i) => (
                  c.href ? (
                    <a key={i} href={c.href} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#1B3A4B", textDecoration: "none", fontWeight: 400, wordBreak: "break-all" }}>
                      {c.icon}{c.label}
                    </a>
                  ) : (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "#374151", fontWeight: 300 }}>
                      {c.icon}{c.label}
                    </div>
                  )
                ))}
                <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "4px" }}>Kostenlose Beratung: Mo–So 8–20 Uhr</p>
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "20px", padding: "12px 24px", backgroundColor: "#25D366", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "13px", fontWeight: 500 }}>
                <svg width="16" height="16" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp schreiben
              </a>

              {/* Google Maps Platzhalter */}
              <div style={{ marginTop: "24px", borderRadius: "12px", overflow: "hidden", border: "1px solid #E5E7EB", backgroundColor: "#F7F5F2", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: "12px", color: "#9CA3AF", textAlign: "center" }}>Google Maps<br/>Mosbacher Str. 75, Mosbach</p>
              </div>

              {/* Google Reviews Platzhalter */}
              <div style={{ marginTop: "16px", padding: "20px", border: "1px solid #E5E7EB", borderRadius: "12px", backgroundColor: "#F7F5F2" }}>
                <p style={{ fontSize: "12px", color: "#9CA3AF", textAlign: "center" }}>Google Bewertungen werden hier eingebunden</p>
                <p style={{ fontSize: "11px", color: "#C8A96E", textAlign: "center", marginTop: "4px" }}>→ Google My Business einrichten</p>
              </div>
            </div>

            {/* Right – Formular */}
            <div>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.8rem", color: "#1A1A1A", marginBottom: "32px" }}>Schreiben Sie uns</h2>
              {sent ? (
                <div style={{ padding: "48px", backgroundColor: "#F7F5F2", borderRadius: "16px", textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="22" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "8px" }}>Nachricht gesendet!</p>
                  <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: 300 }}>Wir melden uns schnellstmöglich bei Ihnen.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div><label style={lbl}>Name</label><input style={inp} type="text" required placeholder="Ihr Name" value={form.name} onChange={(e) => up("name", e.target.value)} /></div>
                    <div><label style={lbl}>Telefon</label><input style={inp} type="tel" placeholder="Ihre Telefonnummer" value={form.telefon} onChange={(e) => up("telefon", e.target.value)} /></div>
                  </div>
                  <div><label style={lbl}>E-Mail</label><input style={inp} type="email" required placeholder="Ihre E-Mail-Adresse" value={form.email} onChange={(e) => up("email", e.target.value)} /></div>
                  <div>
                    <label style={lbl}>Betreff</label>
                    <select style={{ ...inp }} value={form.betreff} onChange={(e) => up("betreff", e.target.value)}>
                      {betreffs.map((b) => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div><label style={lbl}>Nachricht</label><textarea style={{ ...inp, resize: "vertical" }} rows={5} placeholder="Wie können wir Ihnen helfen?" value={form.nachricht} onChange={(e) => up("nachricht", e.target.value)} /></div>
                  <button type="submit"
                    style={{ padding: "15px 32px", backgroundColor: "#1B3A4B", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer", alignSelf: "flex-start", transition: "background 0.25s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C8A96E")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B3A4B")}>
                    Nachricht senden →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.kontakt-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </>
  );
}
