import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata = {
  title: "Immobilienverkauf",
  description: "Strategischer Immobilienverkauf mit Plan A. Von der Bewertung bis zum Notartermin – professionell, sicher und planbar.",
};

const leistungen = [
  { title: "Kostenlose Wertermittlung", text: "Wir ermitteln den optimalen Marktpreis auf Basis aktueller Daten – kostenlos und unverbindlich." },
  { title: "Professionelles Exposé", text: "Hochwertiges Exposé mit professionellen Fotos, Grundrissen und überzeugenden Texten." },
  { title: "Vermarktung auf allen Portalen", text: "Maximale Reichweite durch Schaltung auf allen relevanten Immobilienportalen." },
  { title: "Qualifizierte Besichtigungen", text: "Kein Besichtigungstourismus – nur vorqualifizierte, ernsthafte Kaufinteressenten." },
  { title: "Bonitätsprüfung der Käufer", text: "Nur Käufer mit bestätigter Finanzierungszusage. Sicherheit für Sie als Verkäufer." },
  { title: "Begleitung bis zum Notartermin", text: "Wir begleiten Sie durch den gesamten Prozess – vom ersten Gespräch bis zur Schlüsselübergabe." },
];

const immobilienarten = [
  { title: "Eigentumswohnungen", icon: "🏢" },
  { title: "Einfamilienhäuser", icon: "🏠" },
  { title: "Mehrfamilienhäuser", icon: "🏘️" },
  { title: "Gewerbeobjekte", icon: "🏪" },
  { title: "Grundstücke", icon: "🌿" },
];

export default function ImmobilienverkaufPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#1B3A4B 0%,#0e2230 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
            <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #C8A96E" }} />
          </div>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>IMMOBILIENVERKAUF</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "700px" }}>
              Immobilienverkauf{" "}<span style={{ color: "#C8A96E" }}>mit Strategie.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "36px", fontWeight: 300 }}>
              Wir beraten Sie strategisch und unverbindlich. Plan A verkauft Ihre Immobilie – professionell, sicher und zum besten Preis.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
              <Link href="/kontakt?betreff=Immobilienbewertung"
                style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
                Kostenlose Bewertung anfragen
              </Link>
              <Link href="/kontakt?betreff=Immobilienverkauf"
                style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "transparent", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1.5px solid rgba(255,255,255,0.35)" }}>
                Beratungsgespräch
              </Link>
            </div>
          </div>
        </section>

        {/* Unser Rat */}
        <section style={{ backgroundColor: "#F7F5F2", padding: "48px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px 36px", borderLeft: "4px solid #C8A96E", display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <svg width="28" height="28" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "4px" }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              <div>
                <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#1B3A4B", marginBottom: "6px" }}>Unser Rat</p>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  Wir beraten Sie strategisch und unverbindlich – bevor Sie entscheiden. Denn der richtige Zeitpunkt und die richtige Strategie machen den Unterschied zwischen einem guten und einem sehr guten Verkaufspreis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>LEISTUNGEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1A1A1A", marginBottom: "48px" }}>Was Plan A für Sie übernimmt</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="leist-grid">
              {leistungen.map((l, i) => (
                <div key={i} style={{ padding: "28px", borderLeft: "3px solid #C8A96E", backgroundColor: "#F7F5F2", borderRadius: "0 12px 12px 0" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "10px" }}>{l.title}</h3>
                  <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.leist-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:560px){.leist-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* Immobilienarten */}
        <section style={{ backgroundColor: "#F7F5F2", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>OBJEKTARTEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1A1A1A", marginBottom: "36px" }}>Welche Immobilien wir verkaufen</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {immobilienarten.map((art) => (
                <div key={art.title} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 22px", backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "50px", fontSize: "14px", color: "#374151", fontWeight: 400 }}>
                  <span>{art.icon}</span> {art.title}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Objekt-Aufbereitung */}
        <section id="aufbereitung" style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="aufb-grid">
              <div>
                <div style={{ display: "inline-block", padding: "5px 14px", backgroundColor: "rgba(22,163,74,0.1)", borderRadius: "50px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "12px", color: "#16A34A", fontWeight: 500 }}>✓ Aktuell kostenlos</span>
                </div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>OBJEKT-AUFBEREITUNG</p>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1A1A1A", marginBottom: "20px" }}>
                  Professionelle Aufbereitung für den besten ersten Eindruck.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {["Home Staging & Einrichtungsberatung", "Professionelle Immobilienfotografie", "Virtuelle Rundgänge (3D)", "Hochwertiges digitales Exposé"].map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", fontWeight: 300 }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
                <Link href="/kontakt?betreff=Aufbereitung"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
                  Jetzt anfragen →
                </Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {["Vorher", "Nachher", "Vorher", "Nachher"].map((label, i) => (
                  <div key={i} style={{ aspectRatio: "4/3", borderRadius: "12px", backgroundColor: "#F7F5F2", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 500, color: i % 2 === 1 ? "#C8A96E" : "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</span>
                    <span style={{ fontSize: "11px", color: "#C8C9CA" }}>Bild folgt</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.aufb-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#1B3A4B", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>KOSTENLOSE BEWERTUNG</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", marginBottom: "12px" }}>Was ist Ihre Immobilie wert?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", marginBottom: "36px", fontWeight: 300 }}>Kostenlose Bewertung in 24 Stunden.</p>
            <Link href="/kontakt?betreff=Immobilienbewertung"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 40px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
              Jetzt bewerten lassen →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
