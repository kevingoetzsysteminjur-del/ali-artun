import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

const seiten: Record<string, {
  titel: string;
  kontext: string;
  bild: string;
  inhalt: { heading?: string; text: string }[];
}> = {
  "kfw-beratung": {
    titel: "KFW-Beratung",
    kontext: "Die KFW bietet zahlreiche Förderprogramme für Neubau, Sanierung und Modernisierung. Wir helfen Ihnen, das richtige Programm zu finden.",
    bild: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    inhalt: [
      {
        heading: "Was ist die KFW?",
        text: "Die Kreditanstalt für Wiederaufbau ist eine staatliche Förderbank. Sie unterstützt Bauherren, Käufer und Sanierer mit günstigen Krediten und Zuschüssen. Das Ziel: Energieeffizientes Bauen und Wohnen fördern.",
      },
      {
        heading: "Wann lohnt sich eine KFW-Beratung?",
        text: "Wenn Sie eine Immobilie kaufen, bauen oder energetisch sanieren möchten. Die KFW-Programme sind komplex – welches Programm für Ihre Situation passt, hängt von vielen Faktoren ab.",
      },
      {
        heading: "Was Plan A für Sie tut",
        text: "Wir analysieren Ihre Situation und prüfen, welche KFW-Programme für Sie in Frage kommen. Wir begleiten Sie durch den Antragsprozess und stellen sicher, dass Sie keine Förderung verpassen.",
      },
      {
        heading: "Wichtig zu wissen",
        text: "KFW-Anträge müssen VOR Baubeginn oder Kaufvertrag gestellt werden. Eine frühzeitige Beratung ist daher entscheidend.",
      },
    ],
  },
  "kfw-kredite": {
    titel: "KFW-Kredite",
    kontext: "Günstige Kredite der KFW für Neubau und Sanierung – mit Tilgungszuschüssen und attraktiven Zinssätzen.",
    bild: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80",
    inhalt: [
      {
        heading: "KFW-Kredite für Neubau",
        text: "Das Programm Klimafreundlicher Neubau unterstützt den Bau von energieeffizienten Gebäuden. Je besser der Energiestandard, desto günstiger die Konditionen. Kreditbeträge bis zu 150.000 Euro pro Wohneinheit sind möglich.",
      },
      {
        heading: "KFW-Kredite für Sanierung",
        text: "Wer eine Bestandsimmobilie energetisch saniert, kann ebenfalls KFW-Kredite mit Tilgungszuschüssen nutzen. Einzelmaßnahmen wie Dämmung, Fensteraustausch oder Heizungstausch werden gefördert.",
      },
      {
        heading: "Konditionen",
        text: "Die Zinssätze bei KFW-Krediten liegen in der Regel unter dem Marktniveau. Zusätzlich gibt es bei vielen Programmen einen Tilgungszuschuss – das bedeutet, ein Teil des Kredits muss nicht zurückgezahlt werden.",
      },
      {
        heading: "Voraussetzungen",
        text: "Antragstellung vor Baubeginn oder Kauf. Einbindung eines Energieeffizienz-Experten bei bestimmten Programmen. Die Immobilie muss definierte Energiestandards erfüllen.",
      },
    ],
  },
  "bafa": {
    titel: "BAFA-Förderung",
    kontext: "Das Bundesamt für Wirtschaft und Ausfuhrkontrolle fördert energetische Einzelmaßnahmen an Bestandsgebäuden.",
    bild: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
    inhalt: [
      {
        heading: "Was fördert die BAFA?",
        text: "Die BAFA fördert einzelne Sanierungsmaßnahmen an bestehenden Gebäuden. Anders als bei der KFW müssen Sie nicht das gesamte Gebäude sanieren – auch Einzelmaßnahmen werden bezuschusst.",
      },
      {
        heading: "Geförderte Maßnahmen",
        text: "Dämmung von Wänden, Dach und Geschossdecken. Austausch von Fenstern und Außentüren. Optimierung bestehender Heizungsanlagen. Einbau von Lüftungsanlagen. Heizungstausch auf erneuerbare Energien.",
      },
      {
        heading: "Förderhöhe",
        text: "Die BAFA übernimmt bis zu 20 Prozent der förderfähigen Kosten als Zuschuss. Bei einem Heizungstausch auf Wärmepumpe oder Biomasse können es sogar bis zu 40 Prozent sein.",
      },
      {
        heading: "Unser Service",
        text: "Plan A prüft, welche BAFA-Förderungen für Ihre Immobilie in Frage kommen und unterstützt Sie bei der Antragstellung.",
      },
    ],
  },
  "staatliche-foerderung": {
    titel: "Staatliche Förderungen",
    kontext: "Bund, Länder und Kommunen bieten zahlreiche Förderprogramme für Immobilienkäufer, Bauherren und Sanierer. Wir behalten den Überblick.",
    bild: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=80",
    inhalt: [
      {
        heading: "Die Förderlandschaft im Überblick",
        text: "Neben KFW und BAFA gibt es zahlreiche weitere Fördermöglichkeiten: Landesförderprogramme, kommunale Zuschüsse, Wohn-Riester und steuerliche Vorteile.",
      },
      {
        heading: "Landesförderungen Baden-Württemberg",
        text: "Das Land Baden-Württemberg bietet eigene Förderprogramme für den Erwerb von Wohneigentum und energetische Sanierungen über die L-Bank.",
      },
      {
        heading: "Wohnungsbauprämie",
        text: "Wer in einen Bausparvertrag einzahlt, kann eine staatliche Prämie von bis zu 70 Euro pro Jahr erhalten. Die Einkommensgrenzen wurden zuletzt angehoben.",
      },
      {
        heading: "Steuerliche Vorteile",
        text: "Energetische Sanierungsmaßnahmen an selbstgenutztem Wohneigentum können steuerlich geltend gemacht werden – bis zu 20 Prozent der Kosten über drei Jahre verteilt.",
      },
      {
        heading: "Warum Beratung wichtig ist",
        text: "Die verschiedenen Förderprogramme haben unterschiedliche Voraussetzungen und können teilweise kombiniert werden. Ohne professionelle Beratung lassen viele Eigentümer Geld auf dem Tisch liegen.",
      },
    ],
  },
  "privatkredite": {
    titel: "Privatkredite",
    kontext: "Wir vergleichen für Sie die am Markt verfügbaren Kredite und finden den günstigsten Zinssatz – unabhängig und transparent.",
    bild: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80",
    inhalt: [
      {
        heading: "Warum über Plan A?",
        text: "Als freier Makler sind wir an keine Bank gebunden. Wir vergleichen Angebote verschiedener Banken und Kreditinstitute, um für Sie den günstigsten Zinssatz zu finden.",
      },
      {
        heading: "Was wir vergleichen",
        text: "Zinssätze, Laufzeiten, Sondertilgungsmöglichkeiten, Bereitstellungszinsen und Gesamtkosten. Nicht nur der Zinssatz zählt – die Gesamtkonditionen machen den Unterschied.",
      },
      {
        heading: "Für wen ist ein Privatkredit sinnvoll?",
        text: "Für Modernisierungen, Renovierungen oder kleinere Investitionen, bei denen eine klassische Baufinanzierung zu aufwändig wäre. Auch für die Überbrückung bis zur endgültigen Finanzierung kann ein Privatkredit sinnvoll sein.",
      },
      {
        heading: "Unser Ansatz",
        text: "Wir holen für Sie mehrere Angebote ein, vergleichen die Konditionen und empfehlen Ihnen die beste Option. Die Beratung ist kostenlos und unverbindlich.",
      },
    ],
  },
  "modernisierung": {
    titel: "Modernisierungsdarlehen",
    kontext: "Kredite für Modernisierungen am Bestandsobjekt – mit langer Laufzeit und niedrigen Raten.",
    bild: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
    inhalt: [
      {
        heading: "Was ist ein Modernisierungsdarlehen?",
        text: "Ein spezieller Kredit für Umbau-, Renovierungs- und Modernisierungsarbeiten an bestehenden Immobilien. Im Vergleich zu normalen Konsumkrediten bieten Modernisierungsdarlehen in der Regel bessere Konditionen.",
      },
      {
        heading: "Typische Einsatzbereiche",
        text: "Badsanierung, Küchenerneuerung, Dachsanierung, neue Heizung, Fensteraustausch, barrierefreier Umbau, Anbau oder Ausbau.",
      },
      {
        heading: "Vorteile",
        text: "Lange Laufzeiten bis zu 30 Jahre möglich. Niedrige monatliche Raten. Kein Grundbucheintrag nötig bei kleineren Summen. Oft kombinierbar mit KFW- oder BAFA-Förderung.",
      },
      {
        heading: "Unser Service",
        text: "Plan A vergleicht Modernisierungsdarlehen verschiedener Anbieter und findet die günstigste Lösung für Ihr Vorhaben.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(seiten).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = seiten[slug];
  if (!s) return {};
  return { title: `${s.titel} – Plan A Finanzierung`, description: s.kontext };
}

export default async function FinanzierungSubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = seiten[slug];
  if (!s) notFound();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero mit Bild */}
        <section style={{ position: "relative", height: "420px", overflow: "hidden" }}>
          <img
            src={s.bild}
            alt={s.titel}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,48,64,0.5) 0%, rgba(13,31,41,0.88) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 0 52px" }}>
            <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px", width: "100%" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#BFA36D", marginBottom: "12px" }}>FINANZIERUNG</p>
              <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#FFFFFF", lineHeight: 1.15, margin: 0 }}>
                {s.titel}
              </h1>
            </div>
          </div>
        </section>

        {/* Kontext */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "17px", color: "#78716C", lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
              {s.kontext}
            </p>
          </div>
        </section>

        {/* Inhalt */}
        <section style={{ backgroundColor: "#FEFDFB", padding: "64px 0 96px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
            {s.inhalt.map((block, i) => (
              <div key={i} style={{ marginBottom: "36px" }}>
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

            {/* Hint */}
            <div style={{ marginTop: "64px", padding: "32px", backgroundColor: "#F5F1EC", borderRadius: "16px", textAlign: "center" }}>
              <p style={{ fontSize: "14px", color: "#78716C", fontWeight: 300, margin: "0 0 8px" }}>Haben Sie Fragen?</p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                <p style={{ fontSize: "16px", fontWeight: 500, color: "#1A3040", margin: 0 }}>Nutzen Sie den Kontakt-Button am rechten Rand</p>
                <svg width="18" height="18" fill="none" stroke="#BFA36D" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>

            {/* Zurück-Link */}
            <div style={{ marginTop: "40px" }}>
              <Link
                href="/finanzierung"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 500, color: "#1A3040", textDecoration: "none" }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Zurück zur Finanzierung
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
