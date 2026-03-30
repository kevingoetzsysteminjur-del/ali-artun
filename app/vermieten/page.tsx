import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Immobilie vermieten",
  description: "Plan A findet den passenden Mieter für Ihre Immobilie – schnell, sicher und mit Bonitätsprüfung.",
};

const leistungen = [
  { icon: "📊", title: "Mietpreisermittlung", text: "Wir ermitteln den optimalen Mietpreis auf Basis aktueller Marktdaten in Ihrer Region." },
  { icon: "📸", title: "Professionelle Inserate", text: "Hochwertige Fotos, ansprechende Texte und Schaltung auf allen relevanten Portalen." },
  { icon: "✓", title: "Mieter-Vorauswahl & Bonitätsprüfung", text: "Wir prüfen jeden Interessenten vor der Besichtigung – nur solvente Mieter kommen infrage." },
  { icon: "📋", title: "Besichtigungen & Vertragsabwicklung", text: "Plan A koordiniert alle Besichtigungen und begleitet Sie durch die gesamte Vertragsabwicklung." },
];

const objektarten = [
  { icon: "🏢", label: "Wohnungen" },
  { icon: "🏠", label: "Häuser" },
  { icon: "🏪", label: "Gewerbeimmobilien" },
];

export default function VermietenPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #B8860B", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>VERMIETUNG</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "640px" }}>
              Immobilie vermieten <span style={{ color: "#B8860B" }}>mit Plan A.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", fontWeight: 300 }}>
              Sie suchen zuverlässige Mieter für Ihre Immobilie? Plan A findet den passenden Mieter – schnell, sicher und professionell.
            </p>
          </div>
        </section>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Sie suchen zuverlässige Mieter für Ihre Immobilie? Plan A findet den passenden Mieter – schnell, sicher und professionell. Mit Bonitätsprüfung und persönlicher Vorauswahl.
            </p>
          </div>
        </section>

        {/* Leistungen */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>WAS WIR ÜBERNEHMEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "48px" }}>Unsere Vermietungs-Leistungen</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="vm-grid">
              {leistungen.map((l, i) => (
                <div key={i} style={{ backgroundColor: "#F5EDE0", borderRadius: "16px", padding: "32px", border: "1px solid #E8D9C5" }}>
                  <div style={{ fontSize: "28px", marginBottom: "16px" }}>{l.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#2C1A0E", marginBottom: "10px" }}>{l.title}</h3>
                  <p style={{ fontSize: "14px", color: "#7A6548", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:768px){.vm-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* Für welche Objekte */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>OBJEKTARTEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "40px" }}>Für welche Objekte?</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {objektarten.map((o) => (
                <div key={o.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "20px 36px", backgroundColor: "#FFFCF7", border: "1px solid #E8D9C5", borderRadius: "12px", fontSize: "16px", color: "#2C1A0E", fontWeight: 400 }}>
                  <span style={{ fontSize: "28px" }}>{o.icon}</span>
                  {o.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ansatz */}
        <section style={{ backgroundColor: "#2C1A0E", padding: "80px 0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "20px" }}>UNSER ANSATZ</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFFF", lineHeight: 1.4, marginBottom: "20px" }}>
              „Wir finden nicht irgendeinen Mieter – wir finden den richtigen."
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", margin: "0 auto 24px" }} />
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontWeight: 300 }}>
              Mit Bonitätsprüfung und persönlicher Vorauswahl schützen wir Sie vor unzuverlässigen Mietern. Plan A steht für Qualität – nicht Quantität.
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
