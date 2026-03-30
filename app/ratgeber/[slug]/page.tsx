import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

const artikel: Record<string, {
  titel: string;
  kategorie: string;
  datum: string;
  lesedauer: string;
  bild: string;
  inhalt: { heading?: string; text: string }[];
}> = {
  "immobilie-verkaufen-tipps": {
    titel: "Immobilie verkaufen: 7 Tipps für den besten Preis",
    kategorie: "VERKAUF",
    datum: "12. März 2026",
    lesedauer: "5 Min. Lesezeit",
    bild: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    inhalt: [
      {
        text: "Die eigene Immobilie zu verkaufen ist eine der größten finanziellen Entscheidungen im Leben. Wer strategisch vorgeht, erzielt deutlich bessere Ergebnisse.",
      },
      {
        heading: "Tipp 1 – Den richtigen Zeitpunkt wählen",
        text: "Der Immobilienmarkt unterliegt saisonalen Schwankungen. Frühling und Herbst gelten als besonders gute Verkaufszeiten, da viele Käufer aktiv auf der Suche sind.",
      },
      {
        heading: "Tipp 2 – Realistische Preisfindung",
        text: "Viele Eigentümer überschätzen den Wert ihrer Immobilie. Eine professionelle Wertermittlung schafft Klarheit und verhindert, dass Ihre Immobilie zu lange am Markt bleibt.",
      },
      {
        heading: "Tipp 3 – Professionelle Fotos",
        text: "Der erste Eindruck zählt. Hochwertige Fotos bei gutem Licht machen einen enormen Unterschied. Räumen Sie auf, schaffen Sie Ordnung und zeigen Sie Ihre Immobilie von ihrer besten Seite.",
      },
      {
        heading: "Tipp 4 – Home Staging nutzen",
        text: "Leere Räume wirken kleiner als möblierte. Home Staging hilft Interessenten, sich das Leben in Ihrer Immobilie vorzustellen.",
      },
      {
        heading: "Tipp 5 – Aussagekräftiges Exposé",
        text: "Ein gutes Exposé enthält alle wichtigen Daten, ansprechende Fotos und eine ehrliche Beschreibung. Vermeiden Sie Übertreibungen – Käufer merken das bei der Besichtigung.",
      },
      {
        heading: "Tipp 6 – Die richtige Vermarktungsstrategie",
        text: "Nutzen Sie mehrere Kanäle: Online-Portale, Social Media, lokale Netzwerke. Je mehr qualifizierte Interessenten Ihre Immobilie sehen, desto besser.",
      },
      {
        heading: "Tipp 7 – Professionelle Unterstützung",
        text: "Ein erfahrener Makler kennt den Markt, filtert Interessenten vor und begleitet Sie sicher bis zum Notar. Das spart Zeit, Nerven und oft auch Geld.",
      },
    ],
  },
  "kfw-foerderung-2026": {
    titel: "KFW-Förderung 2026: Was sich ändert",
    kategorie: "FINANZIERUNG",
    datum: "5. März 2026",
    lesedauer: "4 Min. Lesezeit",
    bild: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    inhalt: [
      {
        text: "Die KFW-Förderprogramme werden regelmäßig angepasst. Für Bauherren und Sanierer ist es wichtig, die aktuellen Konditionen zu kennen.",
      },
      {
        heading: "Aktuelle Programme im Überblick",
        text: "Das KFW-Programm 297/298 unterstützt klimafreundlichen Neubau mit günstigen Zinssätzen. Wer ein Effizienzhaus baut, profitiert von besonders attraktiven Konditionen.",
      },
      {
        heading: "Sanierung und Bestandsimmobilien",
        text: "Für energetische Sanierungen bietet die KFW verschiedene Kreditprogramme mit Tilgungszuschüssen. Je besser die energetische Bilanz nach der Sanierung, desto höher der Zuschuss.",
      },
      {
        heading: "Was bedeutet das für Sie",
        text: "Die Förderlandschaft ist komplex. Welches Programm für Ihre Situation das richtige ist, hängt von vielen Faktoren ab. Eine unabhängige Beratung hilft, keine Förderung zu verpassen.",
      },
      {
        heading: "Unser Rat",
        text: "Lassen Sie sich beraten, bevor Sie bauen oder sanieren. Oft lassen sich durch die richtige Kombination aus KFW-Kredit und BAFA-Förderung mehrere tausend Euro sparen.",
      },
    ],
  },
  "immobilienbewertung": {
    titel: "Was ist meine Immobilie wert? So funktioniert die Bewertung",
    kategorie: "BEWERTUNG",
    datum: "22. Feb. 2026",
    lesedauer: "6 Min. Lesezeit",
    bild: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    inhalt: [
      {
        text: "Den Wert der eigenen Immobilie zu kennen ist der erste Schritt – egal ob Sie verkaufen, finanzieren oder einfach nur wissen möchten, wo Sie stehen.",
      },
      {
        heading: "Drei Bewertungsverfahren",
        text: "Professionelle Gutachter nutzen drei anerkannte Verfahren: das Vergleichswertverfahren, das Ertragswertverfahren und das Sachwertverfahren. Welches zum Einsatz kommt, hängt von der Art der Immobilie ab.",
      },
      {
        heading: "Vergleichswertverfahren",
        text: "Das gängigste Verfahren für Wohnimmobilien. Es vergleicht Ihre Immobilie mit kürzlich verkauften, ähnlichen Objekten in der Umgebung. Lage, Größe, Zustand und Ausstattung fließen ein.",
      },
      {
        heading: "Ertragswertverfahren",
        text: "Kommt vor allem bei Mehrfamilienhäusern und Gewerbeimmobilien zum Einsatz. Hier zählt, welche Mieteinnahmen die Immobilie erwirtschaftet.",
      },
      {
        heading: "Sachwertverfahren",
        text: "Berechnet den Wert anhand der Herstellungskosten abzüglich Alterswertminderung. Wird oft bei Einfamilienhäusern ohne Vergleichsobjekte angewandt.",
      },
      {
        heading: "Wichtige Faktoren",
        text: "Die Lage ist und bleibt der wichtigste Faktor. Aber auch Baujahr, energetischer Zustand, Modernisierungen und die aktuelle Marktlage spielen eine entscheidende Rolle.",
      },
    ],
  },
  "eigenkapital-hauskauf": {
    titel: "Eigenkapital beim Hauskauf: Wie viel brauche ich?",
    kategorie: "FINANZIERUNG",
    datum: "14. Feb. 2026",
    lesedauer: "5 Min. Lesezeit",
    bild: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
    inhalt: [
      {
        text: "Die Frage nach dem Eigenkapital ist eine der ersten beim Immobilienkauf. Die kurze Antwort: Je mehr, desto besser. Die lange Antwort ist differenzierter.",
      },
      {
        heading: "Die Faustregel",
        text: "Experten empfehlen mindestens 20 Prozent des Kaufpreises als Eigenkapital. Damit erhalten Sie bessere Zinskonditionen und reduzieren Ihr monatliches Risiko.",
      },
      {
        heading: "Nebenkosten nicht vergessen",
        text: "Zusätzlich zum Kaufpreis fallen Nebenkosten an: Grunderwerbsteuer, Notar- und Grundbuchkosten sowie eventuell Maklergebühren. In Baden-Württemberg sind das zusammen etwa 10 bis 12 Prozent des Kaufpreises. Diese sollten idealerweise aus Eigenkapital bezahlt werden.",
      },
      {
        heading: "Vollfinanzierung – möglich aber riskant",
        text: "Einige Banken bieten Finanzierungen ohne Eigenkapital an. Das klingt verlockend, bedeutet aber höhere Zinsen und eine längere Laufzeit. Nur bei sehr sicherem und hohem Einkommen sinnvoll.",
      },
      {
        heading: "Alternativen zum klassischen Sparen",
        text: "Bausparverträge, KFW-Zuschüsse oder Schenkungen aus der Familie können das Eigenkapital ergänzen. Auch bestehende Immobilien oder Grundstücke können als Sicherheit dienen.",
      },
    ],
  },
  "home-staging": {
    titel: "Home Staging: So verkaufen Sie schneller",
    kategorie: "VERKAUF",
    datum: "2. Feb. 2026",
    lesedauer: "4 Min. Lesezeit",
    bild: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    inhalt: [
      {
        text: "Home Staging bedeutet, eine Immobilie für den Verkauf optimal in Szene zu setzen. Was nach Aufwand klingt, zahlt sich in der Regel deutlich aus.",
      },
      {
        heading: "Was ist Home Staging",
        text: "Beim Home Staging wird eine Immobilie so hergerichtet, dass sich potenzielle Käufer sofort wohlfühlen. Dazu gehören Aufräumen, Entrümpeln, gezielte Dekoration und manchmal auch Möblierung leerer Räume.",
      },
      {
        heading: "Warum es funktioniert",
        text: "Menschen kaufen emotional. Wer sich beim Betreten einer Immobilie wohlfühlt, ist bereit, mehr zu zahlen. Studien zeigen, dass professionell aufbereitete Immobilien im Schnitt schneller und zu besseren Preisen verkauft werden.",
      },
      {
        heading: "Unsere Leistung",
        text: "Plan A bietet professionelle Objekt-Aufbereitung aktuell kostenlos für Verkäufer an. Von der Beratung bis zur Umsetzung – wir sorgen dafür, dass Ihre Immobilie den bestmöglichen Eindruck macht.",
      },
    ],
  },
  "partner-werden": {
    titel: "Partner werden: Ihr Weg in die Immobilienbranche",
    kategorie: "PARTNER",
    datum: "20. Jan. 2026",
    lesedauer: "3 Min. Lesezeit",
    bild: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
    inhalt: [
      {
        text: "Die Immobilienbranche bietet attraktive Möglichkeiten für Quereinsteiger. Mit der richtigen Unterstützung und einer IHK-Qualifikation können Sie sich selbstständig machen.",
      },
      {
        heading: "Der Einstieg",
        text: "Für die Tätigkeit als Immobilienmakler benötigen Sie eine Erlaubnis nach §34c GewO. Für die Finanzierungsvermittlung zusätzlich nach §34i GewO. Beide Qualifikationen können Sie bei Ihrer lokalen IHK erwerben.",
      },
      {
        heading: "Selbstständig ohne Risiko",
        text: "Anders als bei vielen Franchise-Modellen entstehen bei Plan A keine hohen Einstiegskosten. Kein teurer Kurs, keine versteckten Gebühren. Die Schulungen finden überwiegend digital statt.",
      },
      {
        heading: "Was Plan A bietet",
        text: "Als Plan A Vertreter erhalten Sie verifizierte Leads, Schulungsmaterial und persönliche Betreuung in der Anfangszeit. Sie arbeiten selbstständig, aber nicht allein.",
      },
      {
        heading: "Für wen ist das geeignet",
        text: "Menschen mit Kommunikationsstärke, Interesse an Immobilien und dem Wunsch nach Selbstständigkeit. Branchenerfahrung ist kein Muss – Motivation schon.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(artikel).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = artikel[slug];
  if (!a) return {};
  return { title: a.titel, description: a.inhalt[0]?.text };
}

export default async function ArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = artikel[slug];
  if (!a) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero mit Bild */}
        <section style={{ position: "relative", height: "480px", overflow: "hidden" }}>
          <img
            src={a.bild}
            alt={a.titel}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,48,64,0.45) 0%, rgba(13,31,41,0.85) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 56px" }}>
            <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "14px" }}>
                {a.kategorie} · {a.datum} · {a.lesedauer}
              </p>
              <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#FFFFFF", lineHeight: 1.2, margin: 0, maxWidth: "760px" }}>
                {a.titel}
              </h1>
            </div>
          </div>
        </section>

        {/* Artikel-Inhalt */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "72px 0 96px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
            {a.inhalt.map((block, i) => (
              <div key={i} style={{ marginBottom: "32px" }}>
                {block.heading && (
                  <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.35rem", color: "#1A3040", marginBottom: "10px", paddingLeft: "16px", borderLeft: "3px solid #BFA36D" }}>
                    {block.heading}
                  </h2>
                )}
                <p style={{ fontSize: "17px", color: "#44403C", lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
                  {block.text}
                </p>
              </div>
            ))}

            {/* Zurück-Link */}
            <div style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid #E8E0D8" }}>
              <Link
                href="/ratgeber"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#1A3040", textDecoration: "none" }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Zurück zum Ratgeber
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
