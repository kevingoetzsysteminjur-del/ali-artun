import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata = {
  title: "Immobilien-Ratgeber",
  description: "Expertenwissen rund um Immobilien, Finanzierung und Förderungen von Plan A Immobilien & Finanzierung.",
};

const artikel = [
  {
    slug: "immobilie-verkaufen-tipps",
    titel: "Immobilie verkaufen: 7 Tipps für den besten Preis",
    excerpt: "Der Verkauf einer Immobilie ist eine der wichtigsten finanziellen Entscheidungen. Mit der richtigen Strategie erzielen Sie deutlich mehr.",
    kategorie: "Verkauf",
    datum: "12. März 2026",
    lesedauer: "5 Min.",
    bild: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  },
  {
    slug: "kfw-foerderung-2026",
    titel: "KFW-Förderung 2026: Was sich ändert",
    excerpt: "Die KFW-Programme werden 2026 angepasst. Wir erklären, welche Fördertöpfe jetzt besonders attraktiv sind und wie Sie profitieren.",
    kategorie: "Finanzierung",
    datum: "5. März 2026",
    lesedauer: "4 Min.",
    bild: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    slug: "immobilienbewertung",
    titel: "Was ist meine Immobilie wert? So funktioniert die Bewertung",
    excerpt: "Lage, Zustand, Ausstattung – was bestimmt den Wert Ihrer Immobilie wirklich? Ein verständlicher Überblick über die wichtigsten Faktoren.",
    kategorie: "Bewertung",
    datum: "22. Feb. 2026",
    lesedauer: "6 Min.",
    bild: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  {
    slug: "eigenkapital-hauskauf",
    titel: "Eigenkapital beim Hauskauf: Wie viel brauche ich?",
    excerpt: "Banken erwarten mindestens 20 % Eigenkapital. Doch es gibt Wege, mit weniger zu starten. Was wirklich zählt – und worauf Sie achten müssen.",
    kategorie: "Finanzierung",
    datum: "14. Feb. 2026",
    lesedauer: "5 Min.",
    bild: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
  },
  {
    slug: "home-staging",
    titel: "Home Staging: So verkaufen Sie schneller",
    excerpt: "Professionelle Aufbereitung kann den Verkaufspreis deutlich steigern. Wir zeigen, was wirklich wirkt – und was Plan A kostenlos übernimmt.",
    kategorie: "Verkauf",
    datum: "2. Feb. 2026",
    lesedauer: "4 Min.",
    bild: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    slug: "partner-werden",
    titel: "Partner werden: Ihr Weg in die Immobilienbranche",
    excerpt: "Selbstständig als Immobilienmakler starten – ohne teure Ausbildung, ohne Vorerfahrung. Was Plan A bietet und was Sie mitbringen sollten.",
    kategorie: "Partner",
    datum: "20. Jan. 2026",
    lesedauer: "3 Min.",
    bild: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
  },
];

const kategoriefarbe: Record<string, string> = {
  Verkauf: "#2C1A0E",
  Finanzierung: "#B8860B",
  Bewertung: "#2C1A0E",
  Partner: "#B8860B",
};

export default function RatgeberPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>WISSEN & RATGEBER</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "20px", maxWidth: "700px" }}>
              Immobilien-<span style={{ color: "#B8860B" }}>Ratgeber.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", fontWeight: 300 }}>
              Expertenwissen rund um Immobilienverkauf, Finanzierung und staatliche Förderungen – verständlich erklärt.
            </p>
          </div>
        </section>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Wissen ist der erste Schritt zur richtigen Entscheidung. Unser Ratgeber bietet Ihnen fundierte Informationen rund um Immobilien, Finanzierung und Förderungen.
            </p>
          </div>
        </section>

        {/* Artikel Grid */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "64px 0 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }} className="ratgeber-grid">
              {artikel.map((a) => (
                <Link
                  key={a.slug}
                  href={`/ratgeber/${a.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                  className="ratgeber-card"
                >
                  <article style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #E8D9C5", height: "100%" }}>
                    {/* Cover-Bild */}
                    <div style={{ height: "210px", overflow: "hidden" }}>
                      <img
                        src={a.bild}
                        alt={a.titel}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                        className="ratgeber-img"
                      />
                    </div>
                    <div style={{ padding: "24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
                        <span style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "#FFFFFF",
                          padding: "3px 10px",
                          backgroundColor: kategoriefarbe[a.kategorie] ?? "#2C1A0E",
                          borderRadius: "50px"
                        }}>{a.kategorie}</span>
                        <span style={{ fontSize: "11px", color: "#7A6548" }}>{a.datum}</span>
                        <span style={{ fontSize: "11px", color: "#7A6548" }}>· {a.lesedauer}</span>
                      </div>
                      <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#2C1A0E", marginBottom: "10px", lineHeight: 1.35 }}>{a.titel}</h2>
                      <p style={{ fontSize: "13px", color: "#7A6548", lineHeight: 1.75, fontWeight: 300, marginBottom: "20px", margin: "0 0 20px" }}>{a.excerpt}</p>
                      <span style={{ fontSize: "13px", color: "#2C1A0E", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        Artikel lesen
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#2C1A0E", padding: "80px 0" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>FRAGEN?</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#FFFFFF", marginBottom: "16px" }}>Haben Sie Fragen zu unseren Themen?</h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", fontWeight: 300, marginBottom: "0" }}>
              Nutzen Sie den Kontakt-Button am rechten Rand der Seite →
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.ratgeber-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:560px){.ratgeber-grid{grid-template-columns:1fr!important;}}
        .ratgeber-card{transition:transform 0.3s,box-shadow 0.3s;}
        .ratgeber-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,0.1);}
        .ratgeber-card:hover .ratgeber-img{transform:scale(1.04);}
      `}</style>
    </>
  );
}
