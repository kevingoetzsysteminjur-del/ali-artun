import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata = {
  title: "Immobilienverkauf",
  description: "Strategischer Immobilienverkauf mit Plan A. Bewertung, Aufbereitung, Vermarktung und Finanzierungssicherheit aus einer Hand.",
};

const leistungen = [
  { title: "Marktgerechte Bewertung", text: "Wir ermitteln den optimalen Verkaufspreis auf Basis aktueller Marktdaten." },
  { title: "Professionelle Vermarktung", text: "Hochwertiges Exposé, professionelle Fotos und zielgruppengerechte Werbung." },
  { title: "Geprüfte Käufer", text: "Nur Interessenten mit bestätigter Finanzierungszusage werden vermittelt." },
  { title: "Sichere Abwicklung", text: "Von der Besichtigung bis zum Notartermin – wir begleiten Sie durch den gesamten Prozess." },
];

const immobilienarten = [
  "Eigentumswohnungen",
  "Einfamilienhäuser",
  "Mehrfamilienhäuser",
  "Gewerbeobjekte",
  "Grundstücke",
];

export default function ImmobilienverkaufPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section style={{ backgroundColor: "#F7F5F2", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>IMMOBILIENVERKAUF</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.2 }}>
              Immobilienverkauf mit Strategie
            </h1>
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, maxWidth: "520px", fontWeight: 300, marginBottom: "32px" }}>
              Wir beraten Sie strategisch und unverbindlich. Vom ersten Gespräch bis zum Notartermin – Plan A ist Ihr Partner.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <Link href="/kontakt?betreff=Immobilienbewertung" className="btn-primary">Kostenlose Bewertung anfragen</Link>
              <Link href="/kontakt?betreff=Immobilienverkauf" className="btn-secondary">Beratungsgespräch</Link>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>LEISTUNGEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A1A1A", marginBottom: "40px" }}>Was Plan A für Sie übernimmt</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              {leistungen.map((l, i) => (
                <div key={i} style={{ padding: "28px", borderLeft: "3px solid #C8A96E" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "10px" }}>{l.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Immobilienarten */}
        <section style={{ backgroundColor: "#F7F5F2", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>OBJEKTARTEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A1A1A", marginBottom: "32px" }}>Welche Immobilien wir verkaufen</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {immobilienarten.map((art, i) => (
                <span key={i} style={{ padding: "10px 20px", border: "1px solid #E5E7EB", borderRadius: "50px", fontSize: "14px", color: "#374151", backgroundColor: "#FFFFFF", fontWeight: 400 }}>
                  {art}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Objekt-Aufbereitung */}
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>OBJEKT-AUFBEREITUNG</p>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A1A1A", marginBottom: "16px" }}>
                  Professionelle Aufbereitung – aktuell kostenlos
                </h2>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.75, fontWeight: 300, marginBottom: "28px" }}>
                  Wir bereiten Ihre Immobilie professionell auf – für den bestmöglichen ersten Eindruck. Fotos, Grundrisse, Exposé – alles inklusive.
                </p>
                <Link href="/kontakt?betreff=Immobilienbewertung" className="btn-primary">Jetzt anfragen</Link>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} style={{ aspectRatio: "4/3", borderRadius: "12px", backgroundColor: "#F7F5F2", border: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "12px", color: "#9CA3AF" }}>Vorher/Nachher</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Wertermittlung CTA */}
        <section style={{ backgroundColor: "#1B3A4B", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>KOSTENLOS</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#FFFFFF", marginBottom: "12px" }}>
              Was ist Ihre Immobilie wert?
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontWeight: 300 }}>
              Kostenlose Bewertung in 24 Stunden.
            </p>
            <Link
              href="/kontakt?betreff=Immobilienbewertung"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "50px", padding: "14px 32px", backgroundColor: "#C8A96E", color: "#FFFFFF", fontFamily: "var(--font-inter, sans-serif)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", border: "none", borderRadius: "50px", textDecoration: "none" }}
            >
              Jetzt bewerten lassen →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
