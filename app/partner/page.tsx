import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Partner werden",
  description: "Werden Sie Plan A Immobilien-Vertreter. IHK-Qualifikation, verifizierte Leads und persönliche Betreuung.",
};

const steps = [
  { num: "01", title: "IHK-Qualifikation", text: "Erwerben Sie den §34c und §34i Schein bei der IHK. Plan A unterstützt und begleitet Sie in diesem Prozess." },
  { num: "02", title: "Selbstständiger Einstieg", text: "Starten Sie als eigenständiger Unternehmer. Kein teurer Kurs, keine versteckten Kosten." },
  { num: "03", title: "Leads & Schulung", text: "Verifizierte Leads vom ersten Tag. Überwiegend digitale Schulungen – flexibel und in Ihrem Tempo." },
  { num: "04", title: "Wachstum", text: "Plan A unterstützt Sie im Hintergrund. Betreuung, Materialien und Finanzierungsunterstützung. Deutschlandweit." },
];

const leistungen = [
  "Verifizierte Leads",
  "Schulungsmaterial (digital)",
  "Persönliche Betreuung in der Anfangszeit",
  "Unterstützung bei Finanzierungen",
  "Kein teurer Kurs, keine versteckten Kosten",
  "Attraktives Provisionsmodell (Details im Gespräch)",
];

export default function PartnerPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #D4A017", opacity: 0.05 }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="partner-hero-grid">
            <div>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A017", marginBottom: "16px" }}>PARTNER WERDEN</p>
              <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px" }}>
                Werden Sie Plan A{" "}<span style={{ color: "#D4A017" }}>Vertreter.</span>
              </h1>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "480px", marginBottom: "36px", fontWeight: 300 }}>
                Starten Sie Ihre Karriere in der Immobilienbranche. Mit IHK-Qualifikation, verifizierten Leads und der Unterstützung von Plan A im Hintergrund.
              </p>
              <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", marginTop: "8px", fontWeight: 300 }}>
                Nutzen Sie den Kontakt-Button am rechten Rand →
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", border: "1px solid rgba(212,160,23,0.2)" }} />
              <Image src="/maskottchen.png" alt="Plan A Partner" width={260} height={260}
                style={{ width: "clamp(180px,20vw,260px)", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.3))" }} />
            </div>
          </div>
        </section>
        <style>{`@media(max-width:768px){.partner-hero-grid{grid-template-columns:1fr!important;}}`}</style>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Werden Sie Teil des Plan A Netzwerks. Mit IHK-Qualifikation und unserer Unterstützung starten Sie als selbstständiger Immobilien-Vertreter – ohne teuren Kurs, ohne Risiko. Plan A steht hinter Ihnen.
            </p>
          </div>
        </section>

        {/* Bildungsweg */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A017", marginBottom: "12px" }}>IHR WEG</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "56px" }}>Ihr Bildungsweg</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "32px" }} className="steps-grid">
              {steps.map((s, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#D4A017" }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#2C1A0E" }}>{s.title}</h3>
                  <p style={{ fontSize: "13px", color: "#7A6548", lineHeight: 1.7, fontWeight: 300 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.steps-grid{grid-template-columns:1fr 1fr!important;}}@media(max-width:560px){.steps-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>

        {/* Was Sie bekommen */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="leist-grid">
              <div>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A017", marginBottom: "12px" }}>IHRE VORTEILE</p>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "36px" }}>Was Sie bekommen</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {leistungen.map((l) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "15px", color: "#2C1A0E", fontWeight: 300 }}>
                      <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#D4A017", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>
                      </span>
                      {l}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: "#2C1A0E", borderRadius: "20px", padding: "40px" }}>
                <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.5rem", color: "#fff", marginBottom: "16px", lineHeight: 1.4 }}>Wir melden uns persönlich.</p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontWeight: 300, marginBottom: "28px" }}>
                  Schreiben Sie uns – wir besprechen alles Weitere gemeinsam und unverbindlich.
                </p>
                <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", marginTop: "8px", fontWeight: 300 }}>
                  Nutzen Sie den Kontakt-Button am rechten Rand →
                </p>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:768px){.leist-grid{grid-template-columns:1fr!important;}}`}</style>
        </section>


      </main>
      <Footer />
    </>
  );
}
