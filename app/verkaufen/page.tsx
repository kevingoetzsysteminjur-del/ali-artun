import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Immobilie verkaufen",
  description: "Verkaufen Sie Ihre Immobilie mit Plan A – strategisch, professionell und mit Bonitätsprüfung aller Kaufinteressenten.",
};

const gruende = [
  { title: "Kostenlose Wertermittlung", text: "Wir ermitteln den optimalen Marktpreis auf Basis aktueller Daten – kostenlos und unverbindlich." },
  { title: "Professionelles Exposé", text: "Hochwertiges Exposé mit professionellen Fotos, Grundrissen und überzeugenden Texten." },
  { title: "Vermarktung auf allen Portalen", text: "Maximale Reichweite durch Schaltung auf allen relevanten Immobilienportalen." },
  { title: "Qualifizierte Besichtigungen", text: "Kein Besichtigungstourismus – nur vorqualifizierte, ernsthafte Kaufinteressenten." },
  { title: "Bonitätsprüfung aller Interessenten", text: "Nur Käufer mit bestätigter Finanzierungszusage kommen in die engere Wahl." },
  { title: "Begleitung bis zum Notartermin", text: "Wir begleiten Sie durch den gesamten Prozess – vom ersten Gespräch bis zur Schlüsselübergabe." },
];

const typen = [
  { icon: "🏢", label: "Eigentumswohnung" },
  { icon: "🏠", label: "Einfamilienhaus" },
  { icon: "🏘️", label: "Mehrfamilienhaus" },
  { icon: "🏪", label: "Gewerbeobjekt" },
  { icon: "🌿", label: "Grundstück" },
];

export default function VerkaufenPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #B8860B", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>IMMOBILIENVERKAUF</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "640px" }}>
              Immobilie verkaufen <span style={{ color: "#B8860B" }}>mit Plan A.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", fontWeight: 300 }}>
              Sie möchten Ihre Immobilie verkaufen? Plan A begleitet Sie strategisch – von der Bewertung bis zum Notartermin.
            </p>
          </div>
        </section>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Sie möchten Ihre Immobilie verkaufen? Plan A begleitet Sie strategisch – von der Bewertung bis zum Notartermin. Professionell, sicher und zum besten Preis.
            </p>
          </div>
        </section>

        {/* Warum Plan A */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>IHRE VORTEILE</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "48px" }}>Warum mit Plan A verkaufen?</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="vk-grid">
              {gruende.map((g, i) => (
                <div key={i} style={{ padding: "28px", borderLeft: "3px solid #B8860B", backgroundColor: "#F5EDE0", borderRadius: "0 12px 12px 0" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#B8860B", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <svg width="16" height="13" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 16 13"><polyline points="1 6 5 10 15 1"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.05rem", color: "#2C1A0E", marginBottom: "8px" }}>{g.title}</h3>
                  <p style={{ fontSize: "13px", color: "#7A6548", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{g.text}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.vk-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:560px){.vk-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* Objekttypen */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>OBJEKTARTEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "40px" }}>Welche Immobilie möchten Sie verkaufen?</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {typen.map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "18px 28px", backgroundColor: "#FFFCF7", border: "1px solid #E8D9C5", borderRadius: "12px", fontSize: "15px", color: "#2C1A0E", fontWeight: 400, transition: "all 0.2s", boxShadow: "0 2px 8px rgba(44,26,14,0.04)" }}>
                  <span style={{ fontSize: "24px" }}>{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>
            <p style={{ fontSize: "14px", color: "#7A6548", fontWeight: 300, marginTop: "24px" }}>
              Egal welche Objektart – Plan A hat die Erfahrung und das Netzwerk für Ihren erfolgreichen Verkauf.
            </p>
          </div>
        </section>

        {/* Versprechen */}
        <section style={{ backgroundColor: "#2C1A0E", padding: "80px 0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "20px" }}>UNSER VERSPRECHEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFFF", lineHeight: 1.4, marginBottom: "20px" }}>
              „Wir verkaufen nicht einfach – wir beraten strategisch."
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", margin: "0 auto 24px" }} />
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontWeight: 300 }}>
              Jede Immobilie bekommt einen individuellen Vermarktungsplan. Wir analysieren den Markt, positionieren Ihr Objekt optimal und begleiten Sie bis zum Notartermin – persönlich und transparent.
            </p>
          </div>
        </section>

        {/* Hint */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "56px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#7A6548", fontWeight: 300, margin: "0 0 8px" }}>Interesse? Wir freuen uns von Ihnen zu hören.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: 500, color: "#2C1A0E", margin: 0 }}>Nutzen Sie den Kontakt-Button am rechten Rand</p>
              <svg width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
