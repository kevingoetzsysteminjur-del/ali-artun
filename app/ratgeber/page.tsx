import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export const metadata = {
  title: "Immobilien-Ratgeber",
  description: "Expertenwissen rund um Immobilien, Finanzierung und Förderungen von Plan A Immobilien & Finanzierung.",
};

const artikel = [
  {
    id: "immobilie-verkaufen-tipps",
    titel: "Immobilie verkaufen: 7 Tipps für den besten Preis",
    excerpt: "Der Verkauf einer Immobilie ist eine der wichtigsten finanziellen Entscheidungen. Mit der richtigen Strategie erzielen Sie deutlich mehr.",
    kategorie: "Verkauf",
    datum: "12. März 2026",
    lesedauer: "5 Min.",
    farbe: "#1B3A4B",
  },
  {
    id: "kfw-foerderung-2026",
    titel: "KFW-Förderung 2026: Was sich ändert",
    excerpt: "Die KFW-Programme werden 2026 angepasst. Wir erklären, welche Fördertöpfe jetzt besonders attraktiv sind und wie Sie profitieren.",
    kategorie: "Finanzierung",
    datum: "5. März 2026",
    lesedauer: "4 Min.",
    farbe: "#C8A96E",
  },
  {
    id: "immobilienbewertung",
    titel: "Was ist meine Immobilie wert? So funktioniert die Bewertung",
    excerpt: "Lage, Zustand, Ausstattung – was bestimmt den Wert Ihrer Immobilie wirklich? Ein verständlicher Überblick über die wichtigsten Faktoren.",
    kategorie: "Bewertung",
    datum: "22. Feb. 2026",
    lesedauer: "6 Min.",
    farbe: "#1B3A4B",
  },
  {
    id: "eigenkapital-hauskauf",
    titel: "Eigenkapital beim Hauskauf: Wie viel brauche ich?",
    excerpt: "Banken erwarten mindestens 20 % Eigenkapital. Doch es gibt Wege, mit weniger zu starten. Was wirklich zählt – und worauf Sie achten müssen.",
    kategorie: "Finanzierung",
    datum: "14. Feb. 2026",
    lesedauer: "5 Min.",
    farbe: "#C8A96E",
  },
  {
    id: "home-staging",
    titel: "Home Staging: So verkaufen Sie Ihre Immobilie schneller",
    excerpt: "Professionelle Aufbereitung kann den Verkaufspreis um 5–15 % steigern. Wir zeigen, was wirklich wirkt – und was Plan A kostenlos übernimmt.",
    kategorie: "Verkauf",
    datum: "2. Feb. 2026",
    lesedauer: "4 Min.",
    farbe: "#1B3A4B",
  },
  {
    id: "partner-werden",
    titel: "Partner werden: Ihr Weg in die Immobilienbranche",
    excerpt: "Selbstständig als Immobilienmakler starten – ohne teure Ausbildung, ohne Vorerfahrung. Was Plan A bietet und was Sie mitbringen sollten.",
    kategorie: "Partner",
    datum: "20. Jan. 2026",
    lesedauer: "3 Min.",
    farbe: "#C8A96E",
  },
];

const gradients: Record<string, string> = {
  "#1B3A4B": "linear-gradient(135deg,#1B3A4B,#0e2230)",
  "#C8A96E": "linear-gradient(135deg,#C8A96E,#a07840)",
};

export default function RatgeberPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#1B3A4B 0%,#0e2230 100%)", padding: "120px 0 80px" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>WISSEN & RATGEBER</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "20px", maxWidth: "700px" }}>
              Immobilien-<span style={{ color: "#C8A96E" }}>Ratgeber.</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", fontWeight: 300 }}>
              Expertenwissen rund um Immobilienverkauf, Finanzierung und staatliche Förderungen – verständlich erklärt.
            </p>
          </div>
        </section>

        {/* Artikel Grid */}
        <section style={{ backgroundColor: "#F7F5F2", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }} className="ratgeber-grid">
              {artikel.map((a) => (
                <article key={a.id} className="ratgeber-card" style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #E5E7EB" }}>
                  {/* Image placeholder */}
                  <div style={{ height: "200px", background: gradients[a.farbe], display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A96E", padding: "3px 10px", backgroundColor: "rgba(200,169,110,0.1)", borderRadius: "50px" }}>{a.kategorie}</span>
                      <span style={{ fontSize: "11px", color: "#9CA3AF" }}>{a.datum}</span>
                      <span style={{ fontSize: "11px", color: "#9CA3AF" }}>· {a.lesedauer}</span>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.15rem", color: "#1A1A1A", marginBottom: "10px", lineHeight: 1.3 }}>{a.titel}</h2>
                    <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, marginBottom: "20px" }}>{a.excerpt}</p>
                    <Link href={`/kontakt?betreff=${encodeURIComponent(a.kategorie)}`}
                      style={{ fontSize: "13px", color: "#1B3A4B", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                      Artikel lesen →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ backgroundColor: "#1B3A4B", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>KOSTENLOSE BERATUNG</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#fff", marginBottom: "16px" }}>Fragen? Wir beraten Sie persönlich.</h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", fontWeight: 300, marginBottom: "36px", maxWidth: "480px", margin: "0 auto 36px" }}>
              Kostenlos und unverbindlich. Rufen Sie uns an oder schreiben Sie uns.
            </p>
            <Link href="/kontakt"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
              Jetzt Beratung anfragen →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){.ratgeber-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:560px){.ratgeber-grid{grid-template-columns:1fr!important;}}
        .ratgeber-card{transition:box-shadow 0.3s,transform 0.3s;}
        .ratgeber-card:hover{box-shadow:0 16px 48px rgba(0,0,0,0.1);transform:translateY(-4px);}
      `}</style>
    </>
  );
}
