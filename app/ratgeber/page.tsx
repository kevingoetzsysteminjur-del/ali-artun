import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ratgeber Immobilien Mosbach | Plan A Immobilien",
  description: "Expertenwissen rund um Immobilienverkauf, Käuferfinanzierung und Marktentwicklung im Neckar-Odenwald-Kreis. Tipps von Ali Artun, Plan A Immobilien.",
};

const artikel = [
  {
    slug: "immobilie-verkaufen-mosbach",
    kategorie: "Verkauf",
    kategorieColor: "#2D6A4F",
    titel: "Immobilie verkaufen in Mosbach – Das müssen Sie wissen",
    vorschau: "Wer seine Immobilie im Neckar-Odenwald-Kreis verkaufen möchte, steht vor vielen Fragen. Erfahren Sie, worauf es wirklich ankommt – von der Bewertung bis zum Notartermin.",
    datum: "15. März 2026",
    lesezeit: "8 Min.",
    gradient: "linear-gradient(135deg, #E8DDD0 0%, #D4C4A8 50%, #C5A02822 100%)",
    icon: "🏡",
  },
  {
    slug: "kaeuferfinanzierung-erklaert",
    kategorie: "Finanzierung",
    kategorieColor: "#1B4F72",
    titel: "Geprüfte Käuferfinanzierung – Was bedeutet das für Sie?",
    vorschau: "Viele Immobilienverkäufe scheitern kurz vor dem Notartermin an geplatzten Finanzierungen. Plan A Immobilien geht dieses Risiko anders an – mit geprüfter Käuferfinanzierung.",
    datum: "10. März 2026",
    lesezeit: "7 Min.",
    gradient: "linear-gradient(135deg, #D6E4F0 0%, #AED6F1 50%, #1B4F7222 100%)",
    icon: "🏦",
  },
  {
    slug: "richtiger-zeitpunkt-verkauf",
    kategorie: "Markt",
    kategorieColor: "#7B3F00",
    titel: "Wann ist der richtige Zeitpunkt, Ihre Immobilie zu verkaufen?",
    vorschau: "Viele Eigentümer warten auf den 'perfekten Moment'. Doch wann ist der wirklich? Wir erklären, welche Faktoren den optimalen Verkaufszeitpunkt bestimmen.",
    datum: "5. März 2026",
    lesezeit: "6 Min.",
    gradient: "linear-gradient(135deg, #FAF0E6 0%, #EDCFB0 50%, #C5A02833 100%)",
    icon: "📅",
  },
  {
    slug: "immobilienbewertung-tipps",
    kategorie: "Bewertung",
    kategorieColor: "#4A3728",
    titel: "Immobilienbewertung – So erfahren Sie den wahren Wert Ihrer Immobilie",
    vorschau: "Was ist Ihre Immobilie wirklich wert? Online-Rechner geben grobe Schätzwerte – doch für einen erfolgreichen Verkauf brauchen Sie eine präzise Marktpreisanalyse.",
    datum: "1. März 2026",
    lesezeit: "9 Min.",
    gradient: "linear-gradient(135deg, #F5F0E8 0%, #E8D8C0 50%, #A0802022 100%)",
    icon: "📊",
  },
];

export default function RatgeberPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "120px 16px 60px", backgroundColor: "#FAF8F4", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A028", marginBottom: "14px" }}>
          Expertenwissen
        </p>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 400, letterSpacing: "0.06em", color: "#1a1a1a", marginBottom: "16px" }}>
          Ratgeber & Einblicke
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "#6B5E4E", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
          Fundiertes Wissen rund um Immobilienverkauf, Finanzierung und Marktentwicklung im Neckar-Odenwald-Kreis.
        </p>
      </section>

      {/* Artikel Grid */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 16px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
          {artikel.map((a) => (
            <article
              key={a.slug}
              className="ratgeber-card"
              style={{ backgroundColor: "#fff", border: "1px solid rgba(197,160,40,0.2)", overflow: "hidden" }}
            >
              {/* Bild-Bereich */}
              <div style={{ height: "200px", background: a.gradient, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ fontSize: "56px" }}>{a.icon}</span>
                <span style={{ position: "absolute", top: "16px", left: "16px", padding: "4px 12px", backgroundColor: "rgba(255,255,255,0.9)", color: a.kategorieColor, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "var(--font-body)", fontWeight: 600, borderRadius: "20px" }}>
                  {a.kategorie}
                </span>
              </div>
              {/* Content */}
              <div style={{ padding: "28px" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 400, color: "#1a1a1a", marginBottom: "12px", lineHeight: 1.4, letterSpacing: "0.02em" }}>
                  {a.titel}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#6B5E4E", lineHeight: 1.7, marginBottom: "20px" }}>
                  {a.vorschau}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(197,160,40,0.15)", paddingTop: "16px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#9E9189" }}>
                    {a.datum} · {a.lesezeit}
                  </span>
                  <Link
                    href={`/ratgeber/${a.slug}`}
                    className="btn-secondary"
                    style={{ fontSize: "11px", padding: "7px 16px" }}
                  >
                    Weiterlesen <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Box */}
        <div style={{ marginTop: "64px", textAlign: "center", padding: "48px 32px", backgroundColor: "#FAF8F4", border: "1px solid rgba(197,160,40,0.25)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C5A028", marginBottom: "12px" }}>Persönliche Beratung</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", fontWeight: 400, color: "#1a1a1a", marginBottom: "12px", letterSpacing: "0.04em" }}>
            Fragen zu Ihrer Immobilie?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#6B5E4E", marginBottom: "28px", maxWidth: "400px", margin: "0 auto 28px" }}>
            Ali Artun berät Sie persönlich und kostenlos – vor Ort im Neckar-Odenwald-Kreis.
          </p>
          <a href="/#kontakt" className="btn-primary">
            Kostenloses Erstgespräch <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
