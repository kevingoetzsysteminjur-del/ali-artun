import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Käuferfinder",
  description: "Plan A findet den passenden Käufer für Ihre Immobilie – qualifiziert, bonitätsgeprüft und ernsthaft interessiert.",
};

const schritte = [
  { num: "01", title: "Sie beschreiben Ihre Immobilie", text: "Art, Lage, Zustand, Preisvorstellung – wir nehmen alle relevanten Informationen auf." },
  { num: "02", title: "Abgleich mit unserer Datenbank", text: "Wir gleichen Ihre Immobilie mit unserer qualifizierten Interessenten-Datenbank ab." },
  { num: "03", title: "Nur qualifizierte Käufer erhalten Zugang", text: "Jeder Interessent wird auf Bonität und Finanzierungsfähigkeit geprüft – bevor er Ihre Immobilie sieht." },
  { num: "04", title: "Besichtigung & Verhandlung", text: "Wir koordinieren Besichtigungen mit den besten Kandidaten und begleiten die Verhandlung bis zum Abschluss." },
];

export default function KaeuferfinderPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #B8860B", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>KÄUFERFINDER</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "640px" }}>
              Den richtigen Käufer <span style={{ color: "#B8860B" }}>finden.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", fontWeight: 300 }}>
              Wir finden den passenden Käufer für Ihre Immobilie – qualifiziert, bonitätsgeprüft und ernsthaft interessiert.
            </p>
          </div>
        </section>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Wir finden den passenden Käufer für Ihre Immobilie – qualifiziert, bonitätsgeprüft und ernsthaft interessiert. Kein Besichtigungstourismus. Nur ernsthafte Interessenten.
            </p>
          </div>
        </section>

        {/* So funktioniert es */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>DER PROZESS</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "56px" }}>So funktioniert der Käuferfinder</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {schritte.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "28px", padding: "28px 0", borderBottom: i < schritte.length - 1 ? "1px solid #E8D9C5" : "none" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#B8860B" }}>{s.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#2C1A0E", marginBottom: "8px" }}>{s.title}</h3>
                    <p style={{ fontSize: "15px", color: "#7A6548", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kein Besichtigungstourismus */}
        <section style={{ backgroundColor: "#2C1A0E", padding: "80px 0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "20px" }}>UNSER VERSPRECHEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFFF", lineHeight: 1.4, marginBottom: "20px" }}>
              „Kein Besichtigungstourismus."
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", margin: "0 auto 24px" }} />
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontWeight: 300 }}>
              Wir filtern vor – damit nur ernsthafte Interessenten Ihre Immobilie besichtigen. Jeder Käufer wird auf Bonität und Finanzierungsfähigkeit geprüft. Das spart Ihnen Zeit und schützt Ihre Privatsphäre.
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
