"use client";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export default function SuchauftragPage() {
  const [form, setForm] = useState({ was: "Haus", kaufMiete: "Kaufen", region: "", budgetVon: "", budgetBis: "", zimmer: "", flaeche: "", email: "", datenschutz: false });
  const [sent, setSent] = useState(false);
  const up = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const inp: React.CSSProperties = { width: "100%", padding: "12px 16px", border: "1px solid #E8E0D8", borderRadius: "10px", fontSize: "14px", color: "#1C1917", outline: "none", fontFamily: "var(--font-outfit, sans-serif)", fontWeight: 300, backgroundColor: "#FEFDFB", boxSizing: "border-box" as const };
  const lbl: React.CSSProperties = { fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#78716C", display: "block", marginBottom: "6px" };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#1A3040 0%,#0d1f29 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #BFA36D", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "16px" }}>SUCHAUFTRAG</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "640px" }}>
              Ihre Wunschimmobilie{" "}<span style={{ color: "#BFA36D" }}>gefunden.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "0", fontWeight: 300 }}>
              Teilen Sie uns Ihre Wünsche mit und wir melden uns, sobald wir etwas Passendes finden.
            </p>
          </div>
        </section>

        {/* Context text */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#78716C", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Sie suchen eine bestimmte Immobilie? Teilen Sie uns Ihre Wünsche mit und wir melden uns, sobald wir etwas Passendes finden. Kostenlos und unverbindlich.
            </p>
          </div>
        </section>

        {/* Form */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "64px 0 96px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>
            {sent ? (
              <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "64px", textAlign: "center", border: "1px solid #E8E0D8" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#BFA36D", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <svg width="26" height="22" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
                </div>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1C1917", marginBottom: "12px" }}>Suchauftrag eingegangen!</h2>
                <p style={{ fontSize: "15px", color: "#78716C", fontWeight: 300, marginBottom: "32px", lineHeight: 1.7 }}>
                  Wir haben Ihre Wünsche notiert und melden uns, sobald ein passendes Objekt verfügbar ist.
                </p>
                <Link href="/"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", background: "linear-gradient(135deg,#1A3040,#243E4F)", color: "#fff", borderRadius: "60px", textDecoration: "none", fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Zur Startseite
                </Link>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "44px", border: "1px solid #E8E0D8", display: "flex", flexDirection: "column", gap: "20px", boxShadow: "0 4px 24px rgba(28,25,23,0.05)" }}>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1C1917", marginBottom: "4px" }}>Suchauftrag stellen</h2>
                <p style={{ fontSize: "14px", color: "#78716C", fontWeight: 300, marginTop: 0 }}>Kostenlos und unverbindlich – wir melden uns persönlich.</p>

                {/* Objektart */}
                <div>
                  <label style={lbl}>Ich suche</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {["Haus", "Wohnung", "Grundstück", "Gewerbe", "Mehrfamilienhaus"].map(w => (
                      <button key={w} type="button" onClick={() => up("was", w)}
                        style={{ padding: "9px 18px", border: `1.5px solid ${form.was === w ? "#1A3040" : "#E8E0D8"}`, borderRadius: "50px", backgroundColor: form.was === w ? "#1A3040" : "#FEFDFB", color: form.was === w ? "#fff" : "#78716C", fontSize: "13px", cursor: "pointer", fontWeight: 400, transition: "all 0.2s" }}>
                        {w}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kaufen/Mieten */}
                <div>
                  <label style={lbl}>Art</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Kaufen", "Mieten"].map(k => (
                      <button key={k} type="button" onClick={() => up("kaufMiete", k)}
                        style={{ flex: 1, padding: "10px", border: `1.5px solid ${form.kaufMiete === k ? "#1A3040" : "#E8E0D8"}`, borderRadius: "8px", backgroundColor: form.kaufMiete === k ? "#1A3040" : "#FEFDFB", color: form.kaufMiete === k ? "#fff" : "#78716C", fontSize: "14px", cursor: "pointer", fontWeight: 400, transition: "all 0.2s" }}>
                        {k}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="suchform-grid">
                  <div>
                    <label style={lbl}>Region / PLZ</label>
                    <input style={inp} required placeholder="z. B. Mosbach, 74821" value={form.region} onChange={e => up("region", e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Zimmer (mind.)</label>
                    <input style={inp} placeholder="z. B. 3" value={form.zimmer} onChange={e => up("zimmer", e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Budget von (€)</label>
                    <input style={inp} placeholder="z. B. 200.000" value={form.budgetVon} onChange={e => up("budgetVon", e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Budget bis (€)</label>
                    <input style={inp} placeholder="z. B. 400.000" value={form.budgetBis} onChange={e => up("budgetBis", e.target.value)} />
                  </div>
                </div>

                <div>
                  <label style={lbl}>Wohnfläche (mind., m²)</label>
                  <input style={inp} placeholder="z. B. 100 m²" value={form.flaeche} onChange={e => up("flaeche", e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Ihre E-Mail</label>
                  <input type="email" style={inp} required placeholder="ihre@email.de" value={form.email} onChange={e => up("email", e.target.value)} />
                </div>

                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "12px", color: "#78716C", fontWeight: 300, lineHeight: 1.6 }}>
                  <input type="checkbox" required checked={form.datenschutz} onChange={e => up("datenschutz", e.target.checked)} style={{ marginTop: "3px", flexShrink: 0, accentColor: "#1A3040" }} />
                  Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                  <Link href="/datenschutz" style={{ color: "#BFA36D" }}>Datenschutzerklärung</Link> zu.
                </label>

                <button type="submit"
                  style={{ padding: "16px 36px", background: "linear-gradient(135deg,#1A3040,#243E4F)", color: "#fff", border: "none", borderRadius: "60px", fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase", transition: "all 400ms cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 4px 20px rgba(27,58,75,0.2)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#BFA36D,#D4B87E)"; e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,#1A3040,#243E4F)"; e.currentTarget.style.transform = "scale(1)"; }}>
                  Suchauftrag absenden →
                </button>
              </form>
            )}
          </div>
          <style>{`@media(max-width:600px){.suchform-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>
      </main>
      <Footer />
    </>
  );
}
