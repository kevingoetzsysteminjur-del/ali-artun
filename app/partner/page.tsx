import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata = {
  title: "Partner werden",
  description: "Werden Sie Plan A Immobilien-Vertreter. IHK-Qualifikation, selbstständiger Start und persönliche Betreuung.",
};

const steps = [
  {
    num: "01",
    title: "IHK-Qualifikation",
    text: "Erwerben Sie den §34c und §34i Schein bei der IHK. Wir unterstützen Sie dabei. Die Schulungen sind überwiegend digital.",
  },
  {
    num: "02",
    title: "Selbstständiger Start",
    text: "Steigen Sie als selbstständiger Plan A Vertreter ein. Kein teurer Kurs, keine versteckten Kosten.",
  },
  {
    num: "03",
    title: "Leads & Support",
    text: "Sie erhalten verifizierte Leads und persönliche Betreuung. Plan A unterstützt im Hintergrund.",
  },
  {
    num: "04",
    title: "Wachstum",
    text: "Überwiegend digitale Schulungen. Flexibel, in Ihrem Tempo. Deutschlandweit.",
  },
];

const leistungen = [
  "Verifizierte Leads",
  "Schulungsmaterial",
  "Persönliche Betreuung in der Anfangszeit",
  "Unterstützung bei Finanzierungen",
  "Kein teurer Kurs, keine versteckten Kosten",
];

export default function PartnerPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section style={{ backgroundColor: "#F7F5F2", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>PARTNER WERDEN</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.2 }}>
              Werden Sie Plan A Partner
            </h1>
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, maxWidth: "520px", fontWeight: 300 }}>
              Starten Sie selbstständig in der Immobilienbranche – mit der Unterstützung von Plan A im Hintergrund.
            </p>
          </div>
        </section>

        {/* Ihr Weg */}
        <section style={{ backgroundColor: "#FFFFFF", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>IHR WEG</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A1A1A", marginBottom: "48px" }}>Ihr Bildungsweg</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "3rem", color: "#C8A96E", lineHeight: 1 }}>{step.num}</div>
                  <div style={{ width: "36px", height: "1.5px", backgroundColor: "#C8A96E" }} />
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1A1A1A" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Was Sie bekommen */}
        <section style={{ backgroundColor: "#F7F5F2", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>VORTEILE</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1A1A1A", marginBottom: "36px" }}>Was Sie bekommen</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
              {leistungen.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", fontSize: "15px", color: "#374151", fontWeight: 300 }}>
                  <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 12 10">
                      <polyline points="1 5 4 8 11 1"/>
                    </svg>
                  </span>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#1B3A4B", paddingTop: "60px", paddingBottom: "60px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#FFFFFF", marginBottom: "12px" }}>
              Wir melden uns persönlich.
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontWeight: 300 }}>
              Schreiben Sie uns – wir besprechen alles Weitere gemeinsam.
            </p>
            <Link
              href="/kontakt?betreff=Partner werden"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "50px", padding: "14px 32px", backgroundColor: "#C8A96E", color: "#FFFFFF", fontFamily: "var(--font-inter, sans-serif)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", border: "none", borderRadius: "50px", textDecoration: "none" }}
            >
              Kontakt aufnehmen →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
