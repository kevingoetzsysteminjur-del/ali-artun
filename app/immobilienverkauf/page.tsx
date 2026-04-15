import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";

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
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
            <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #B8860B" }} />
          </div>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>IMMOBILIENVERKAUF</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "700px" }}>
              Immobilienverkauf{" "}<span style={{ color: "#B8860B" }}>mit Strategie.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "36px", fontWeight: 300 }}>
              Wir beraten Sie strategisch und unverbindlich. Plan A verkauft Ihre Immobilie – professionell, sicher und zum besten Preis.
            </p>
            <Link href="/wertermittlung"
              style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", background: "linear-gradient(135deg,#B8860B,#D4B87E)", color: "#fff", borderRadius: "60px", textDecoration: "none", fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Kostenlose Wertermittlung →
            </Link>
          </div>
        </section>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Ihre Immobilie verdient eine strategische Vermarktung. Plan A begleitet Sie von der Bewertung über die professionelle Aufbereitung bis zum erfolgreichen Notartermin – deutschlandweit und mit persönlicher Betreuung.
            </p>
          </div>
        </section>

        {/* Unser Rat */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "48px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px 36px", borderLeft: "4px solid #B8860B", display: "flex", alignItems: "flex-start", gap: "20px" }}>
              <svg width="28" height="28" fill="none" stroke="#B8860B" strokeWidth="1.5" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "4px" }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
              </svg>
              <div>
                <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#2C1A0E", marginBottom: "6px" }}>Unser Rat</p>
                <p style={{ fontSize: "15px", color: "#7A6548", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
                  Wir beraten Sie strategisch und unverbindlich – bevor Sie entscheiden. Denn der richtige Zeitpunkt und die richtige Strategie machen den Unterschied zwischen einem guten und einem sehr guten Verkaufspreis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leistungen */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>LEISTUNGEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "48px" }}>Was Plan A für Sie übernimmt</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="leist-grid">
              {leistungen.map((l, i) => (
                <div key={i} style={{ padding: "28px", borderLeft: "3px solid #B8860B", backgroundColor: "#F5EDE0", borderRadius: "0 12px 12px 0" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#2C1A0E", marginBottom: "10px" }}>{l.title}</h3>
                  <p style={{ fontSize: "13px", color: "#7A6548", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>{l.text}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.leist-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:560px){.leist-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* Immobilienarten */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>OBJEKTARTEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "36px" }}>Welche Immobilien wir verkaufen</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {immobilienarten.map((art) => (
                <div key={art.title} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 22px", backgroundColor: "#fff", border: "1px solid #E8D9C5", borderRadius: "50px", fontSize: "14px", color: "#2C1A0E", fontWeight: 400 }}>
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
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>OBJEKT-AUFBEREITUNG</p>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "20px" }}>
                  Professionelle Aufbereitung für den besten ersten Eindruck.
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                  {["Home Staging & Einrichtungsberatung", "Professionelle Immobilienfotografie", "Virtuelle Rundgänge (3D)", "Hochwertiges digitales Exposé"].map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#2C1A0E", fontWeight: 300 }}>
                      <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#B8860B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>
                      </span>
                      {b}
                    </div>
                  ))}
                </div>
                <></>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { src: "/images/referenzen/ali-1.png", label: "Hausfassade – vor und nach der Aufbereitung" },
                  { src: "/images/referenzen/ali-2.png", label: "Reihenhausfassade – vor und nach der Reinigung" },
                ].map((img) => (
                  <div key={img.src} style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #E8D9C5" }}>
                    <Image
                      src={img.src}
                      alt={img.label}
                      width={800}
                      height={450}
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                    <p style={{ fontSize: "12px", color: "#7A6548", fontWeight: 300, padding: "10px 14px", margin: 0, backgroundColor: "#FFFCF7" }}>{img.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.aufb-grid{grid-template-columns:1fr!important;}.ref-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>


        {/* Käuferfinder */}
        <section id="kaeufer" style={{ backgroundColor: "#F5EDE0", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }} className="kauf-grid">
              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>KÄUFERFINDER</p>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "16px" }}>
                  Wir finden den passenden Käufer.
                </h2>
                <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", margin: "16px 0 24px" }} />
                <p style={{ fontSize: "15px", color: "#7A6548", lineHeight: 1.8, fontWeight: 300, marginBottom: "28px" }}>
                  Kein Besichtigungstourismus. Nur qualifizierte Interessenten mit bestätigter Finanzierungszusage.
                </p>
                {[
                  "Qualifizierte Interessenten-Datenbank",
                  "Bonitätsprüfung vor der Besichtigung",
                  "Nur Käufer mit Finanzierungszusage",
                  "Diskrete Vermarktung auf Wunsch",
                ].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#2C1A0E", fontWeight: 300, marginBottom: "12px" }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#B8860B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>
                    </span>
                    {b}
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>UNSERE VERMARKTUNGSSTRATEGIE</p>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.4rem", color: "#2C1A0E", marginBottom: "24px" }}>7 Schritte zum Erfolg</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    "Kostenlose Wertermittlung",
                    "Professionelles Exposé mit Fotos",
                    "Vermarktung auf allen großen Portalen",
                    "Qualifizierte Besichtigungen",
                    "Bonitätsprüfung der Interessenten",
                    "Begleitung bis zum Notartermin",
                    "After-Sale Service",
                  ].map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 20px", backgroundColor: "#fff", borderRadius: "10px", border: "1px solid #E8D9C5" }}>
                      <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#B8860B", minWidth: "28px" }}>0{i + 1}</span>
                      <span style={{ fontSize: "14px", color: "#2C1A0E", fontWeight: 300 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.kauf-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* Energieausweis */}
        <section id="energieausweis" style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ backgroundColor: "#F5EDE0", borderRadius: "20px", padding: "48px", display: "grid", gridTemplateColumns: "1fr auto", gap: "40px", alignItems: "center" }} className="ener-grid">
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", backgroundColor: "rgba(212,160,23,0.1)", borderRadius: "50px", marginBottom: "16px", border: "1px solid rgba(212,160,23,0.2)" }}>
                  <svg width="14" height="14" fill="none" stroke="#B8860B" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <span style={{ fontSize: "11px", fontWeight: 500, color: "#B8860B", letterSpacing: "0.1em" }}>ENERGIEAUSWEIS SERVICE</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: "#2C1A0E", marginBottom: "12px" }}>
                  Benötigen Sie einen Energieausweis?
                </h2>
                <p style={{ fontSize: "15px", color: "#7A6548", lineHeight: 1.8, fontWeight: 300, maxWidth: "560px" }}>
                  Seit 2014 ist ein Energieausweis beim Verkauf oder der Vermietung einer Immobilie Pflicht. Der Ausweis informiert über den energetischen Zustand des Gebäudes und ist für Kaufinteressenten relevant. Wir helfen Ihnen, den richtigen Energieausweis zu beantragen.
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.ener-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#2C1A0E", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>KOSTENLOSE BEWERTUNG</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#fff", marginBottom: "12px" }}>Was ist Ihre Immobilie wert?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", marginBottom: "36px", fontWeight: 300 }}>Kostenlose Bewertung in 24 Stunden.</p>
            <Link href="/wertermittlung"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 40px", backgroundColor: "#B8860B", color: "#fff", borderRadius: "60px", textDecoration: "none", fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Zur kostenlosen Wertermittlung →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
