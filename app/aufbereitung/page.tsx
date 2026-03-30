import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Objekt-Aufbereitung – Plan A Immobilien",
  description: "Professionelle Aufbereitung Ihrer Immobilie für den Verkauf – Home Staging, Fotos und Exposé von Plan A.",
};

const leistungen = [
  {
    num: "01",
    title: "Analyse & Beratung",
    text: "Wir besichtigen Ihre Immobilie und erarbeiten gemeinsam, welche Maßnahmen den größten Eindruck bei Kaufinteressenten hinterlassen.",
  },
  {
    num: "02",
    title: "Home Staging",
    text: "Gezielte Einrichtung und Dekoration, die Räume größer und einladender wirken lässt. Leere Räume werden möbliert, überladene Räume entrümpelt.",
  },
  {
    num: "03",
    title: "Professionelle Fotografie",
    text: "Hochwertige Fotos bei optimalen Lichtverhältnissen. Der erste Eindruck in Online-Portalen entscheidet über die Anzahl der Anfragen.",
  },
  {
    num: "04",
    title: "Exposé-Erstellung",
    text: "Wir erstellen ein ansprechendes Exposé mit allen relevanten Informationen, Grundrissen und professionellen Fotos.",
  },
];

export default function AufbereitungPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#1A3040 0%,#0d1f29 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #BFA36D", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "16px" }}>OBJEKT-AUFBEREITUNG</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "640px" }}>
              Ihre Immobilie <span style={{ color: "#BFA36D" }}>optimal präsentieren.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", fontWeight: 300 }}>
              Der erste Eindruck entscheidet. Wir bereiten Ihre Immobilie professionell auf – damit sie beim richtigen Käufer den richtigen Eindruck macht.
            </p>
          </div>
        </section>

        {/* Kontext */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#78716C", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Professionell aufbereitete Immobilien erzielen bessere Preise und werden schneller verkauft. Plan A übernimmt die komplette Aufbereitung – von der Beratung bis zum fertigen Exposé.
            </p>
          </div>
        </section>

        {/* Leistungen */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "12px" }}>UNSER PROZESS</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1C1917", marginBottom: "56px" }}>So läuft die Aufbereitung ab</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {leistungen.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "28px", padding: "28px 0", borderBottom: i < leistungen.length - 1 ? "1px solid #E8E0D8" : "none" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#1A3040", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#BFA36D" }}>{l.num}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1C1917", marginBottom: "8px" }}>{l.title}</h3>
                    <p style={{ fontSize: "15px", color: "#78716C", lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{l.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Versprechen */}
        <section style={{ backgroundColor: "#1A3040", padding: "80px 0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "20px" }}>UNSER VERSPRECHEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#FFFFFF", lineHeight: 1.4, marginBottom: "20px" }}>
              „Professionelle Aufbereitung – aktuell kostenlos für Verkäufer."
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#BFA36D", margin: "0 auto 24px" }} />
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", lineHeight: 1.85, fontWeight: 300 }}>
              Wir investieren in die Aufbereitung Ihrer Immobilie, weil wir überzeugt sind: Ein guter erster Eindruck zahlt sich für beide Seiten aus.
            </p>
          </div>
        </section>

        {/* Hint */}
        <section style={{ backgroundColor: "#F5F1EC", padding: "56px 24px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#78716C", fontWeight: 300, margin: "0 0 8px" }}>Interesse? Wir freuen uns von Ihnen zu hören.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <p style={{ fontSize: "16px", fontWeight: 500, color: "#1A3040", margin: 0 }}>Nutzen Sie den Kontakt-Button am rechten Rand</p>
              <svg width="20" height="20" fill="none" stroke="#BFA36D" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
