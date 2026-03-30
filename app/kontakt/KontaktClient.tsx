"use client";
import { useState } from "react";
import Image from "next/image";

const betreffs = ["Immobilienverkauf", "Immobilienbewertung", "Finanzierung", "Partner werden", "Sonstiges"];

const badges = ["§34c GewO", "§34i GewO", "IHK Rhein-Neckar"];

const infos = [
  {
    icon: <svg width="20" height="20" fill="none" stroke="#BFA36D" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    label: "Mosbacher Str. 75\n74821 Mosbach",
  },
  {
    icon: <svg width="20" height="20" fill="none" stroke="#BFA36D" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    label: "0173-6259429",
    href: "tel:01736259429",
  },
  {
    icon: <svg width="20" height="20" fill="none" stroke="#BFA36D" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    label: "Info@plana-immobilien-finanzierung.com",
    href: "mailto:Info@plana-immobilien-finanzierung.com",
  },
];

export default function KontaktClient() {
  const [form, setForm] = useState({ name: "", email: "", telefon: "", betreff: "Immobilienverkauf", nachricht: "" });
  const [sent, setSent] = useState(false);
  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <>
      <style>{`
        .k-inp {
          padding: 14px 18px;
          border: 1.5px solid #E5DDD3;
          border-radius: 12px;
          font-size: 14px;
          color: #1C1917;
          outline: none;
          width: 100%;
          font-family: var(--font-inter, sans-serif);
          font-weight: 300;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .k-inp:focus {
          border-color: #BFA36D;
          box-shadow: 0 0 0 3px rgba(191,163,109,0.12);
        }
        .k-lbl {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #78716C;
          display: block;
          margin-bottom: 7px;
          font-family: var(--font-inter, sans-serif);
        }
        .k-send-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 36px;
          background: linear-gradient(135deg, #BFA36D, #D4B87E);
          color: #fff;
          border: none;
          border-radius: 60px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 400ms cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 4px 20px rgba(191,163,109,0.35);
          font-family: var(--font-inter, sans-serif);
        }
        .k-send-btn:hover {
          background: linear-gradient(135deg, #1A3040, #243E4F);
          transform: scale(1.03);
        }
        .info-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 24px 20px;
          background: #fff;
          border: 1px solid #E8E0D8;
          border-radius: 16px;
          text-align: center;
          flex: 1;
        }
        @media(max-width:768px){
          .kontakt-grid{grid-template-columns:1fr!important;}
          .info-row{flex-direction:column!important;}
        }
        @media(max-width:600px){
          .form-name-tel{grid-template-columns:1fr!important;}
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#1A3040 0%,#0d1f29 100%)", padding: "120px 0 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "16px" }}>KONTAKT</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "16px", maxWidth: "600px" }}>
            Kontakt.
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
            Wir freuen uns auf Ihre Nachricht. Kostenlos und unverbindlich.
          </p>
        </div>
      </section>

      {/* Main */}
      <section style={{ backgroundColor: "#F5F1EC", padding: "72px 0 96px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>

          {/* Card */}
          <div
            style={{ background: "#fff", borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)", overflow: "hidden" }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: "320px 1fr", minHeight: "600px" }}
              className="kontakt-grid"
            >

              {/* Left – Ali */}
              <div style={{ backgroundColor: "#FEFDFB", borderRight: "1px solid #F0EBE3", padding: "48px 36px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

                {/* Bild */}
                <div style={{
                  width: "160px", height: "160px", borderRadius: "50%",
                  border: "3px solid #BFA36D",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  marginBottom: "20px",
                  flexShrink: 0,
                }}>
                  <Image
                    src="/ali.png"
                    alt="Ali Artun"
                    width={200}
                    height={200}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Name */}
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.5rem", color: "#1C1917", marginBottom: "4px" }}>
                  Ali Artun
                </h2>
                <p style={{ fontSize: "13px", color: "#BFA36D", fontWeight: 500, marginBottom: "20px", fontFamily: "var(--font-inter, sans-serif)" }}>
                  Plan A Immobilien & Finanzierung
                </p>

                {/* Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
                  {badges.map((b) => (
                    <span key={b} style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-inter, sans-serif)",
                      color: "#78716C",
                      background: "#F5F1EC",
                      border: "1px solid #E5DDD3",
                      borderRadius: "20px",
                      padding: "6px 14px",
                    }}>{b}</span>
                  ))}
                </div>

                {/* Reg-Nr + Typ */}
                <p style={{ fontSize: "12px", color: "#A8A29E", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300, marginBottom: "4px" }}>
                  Reg.-Nr.: D-W-153-TH95-12
                </p>
                <p style={{ fontSize: "12px", color: "#A8A29E", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300, marginBottom: "32px" }}>
                  Freier & unabhängiger Makler
                </p>

                {/* Trennlinie */}
                <div style={{ width: "40px", height: "1px", backgroundColor: "#E8E0D8", marginBottom: "24px" }} />

                {/* WhatsApp */}
                <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#25D366", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "13px", fontWeight: 500, fontFamily: "var(--font-inter, sans-serif)" }}>
                  <svg width="15" height="15" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>

                <p style={{ fontSize: "11px", color: "#A8A29E", marginTop: "16px", fontFamily: "var(--font-inter, sans-serif)" }}>
                  Mo–So · 8–20 Uhr
                </p>
              </div>

              {/* Right – Formular */}
              <div style={{ padding: "48px 48px 40px" }}>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.7rem", color: "#1C1917", marginBottom: "8px" }}>
                  Schreiben Sie uns
                </h2>
                <p style={{ fontSize: "14px", color: "#78716C", fontWeight: 300, marginBottom: "32px", fontFamily: "var(--font-inter, sans-serif)" }}>
                  Wir antworten in der Regel innerhalb von 24 Stunden.
                </p>

                {sent ? (
                  <div style={{ padding: "48px 32px", backgroundColor: "#F5F1EC", borderRadius: "16px", textAlign: "center" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#BFA36D", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <svg width="22" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1C1917", marginBottom: "8px" }}>Nachricht gesendet!</p>
                    <p style={{ fontSize: "14px", color: "#78716C", fontWeight: 300 }}>Wir melden uns schnellstmöglich bei Ihnen.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="form-name-tel">
                      <div>
                        <label className="k-lbl">Name</label>
                        <input className="k-inp" type="text" required placeholder="Ihr Name" value={form.name} onChange={(e) => up("name", e.target.value)} />
                      </div>
                      <div>
                        <label className="k-lbl">Telefon</label>
                        <input className="k-inp" type="tel" placeholder="Ihre Telefonnummer" value={form.telefon} onChange={(e) => up("telefon", e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="k-lbl">E-Mail</label>
                      <input className="k-inp" type="email" required placeholder="Ihre E-Mail-Adresse" value={form.email} onChange={(e) => up("email", e.target.value)} />
                    </div>
                    <div>
                      <label className="k-lbl">Betreff</label>
                      <select className="k-inp" value={form.betreff} onChange={(e) => up("betreff", e.target.value)}>
                        {betreffs.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="k-lbl">Nachricht</label>
                      <textarea className="k-inp" style={{ resize: "vertical" }} rows={5} placeholder="Wie können wir Ihnen helfen?" value={form.nachricht} onChange={(e) => up("nachricht", e.target.value)} />
                    </div>
                    <div>
                      <button type="submit" className="k-send-btn">
                        Nachricht senden
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Info-Boxen */}
          <div style={{ display: "flex", gap: "16px", marginTop: "24px" }} className="info-row">
            {infos.map((info, i) => (
              <div key={i} className="info-box">
                {info.icon}
                {info.href ? (
                  <a href={info.href} style={{ fontSize: "13px", color: "#1A3040", textDecoration: "none", fontWeight: 400, fontFamily: "var(--font-inter, sans-serif)", wordBreak: "break-all" }}>
                    {info.label}
                  </a>
                ) : (
                  <p style={{ fontSize: "13px", color: "#78716C", fontWeight: 300, margin: 0, fontFamily: "var(--font-inter, sans-serif)", whiteSpace: "pre-line" }}>
                    {info.label}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
