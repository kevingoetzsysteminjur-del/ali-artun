"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Wie läuft ein Immobilienverkauf mit Plan A Immobilien ab?",
    a: "Wir starten mit einem kostenlosen Analysegespräch, in dem wir Ihre Immobilie und Ihre Ziele kennenlernen. Dann erstellen wir eine Marktwerteinschätzung, entwickeln eine Vermarktungsstrategie und begleiten Sie persönlich bis zum notariellen Abschluss.",
  },
  {
    q: "Was kostet die Vermittlung durch einen Makler?",
    a: "Die Maklerprovision wird beim Immobilienverkauf in der Regel zwischen Käufer und Verkäufer aufgeteilt. In Baden-Württemberg sind 3,57 % (inkl. MwSt.) pro Seite üblich. Wir besprechen alle Konditionen transparent im Erstgespräch.",
  },
  {
    q: "Was bedeutet geprüfte Käuferfinanzierung?",
    a: "Bevor wir einen Kaufinteressenten zu Ihrer Immobilie vermitteln, prüfen wir seine Finanzierungsfähigkeit. Nur Käufer mit einer bestätigten Finanzierungszusage ihrer Bank werden vorgestellt — das verhindert Rückabwicklungen und spart Ihnen Zeit.",
  },
  {
    q: "Wie wird der Wert meiner Immobilie ermittelt?",
    a: "Wir analysieren vergleichbare Verkäufe in Ihrer Region, berücksichtigen Lage, Zustand, Ausstattung und aktuelle Markttrends. Das Ergebnis ist ein realistischer Marktpreis, der Ihre Immobilie weder unter- noch überbewertet.",
  },
  {
    q: "Wie lange dauert ein Immobilienverkauf im Durchschnitt?",
    a: "Mit der richtigen Strategie und vorqualifizierten Käufern ist ein Verkauf in 4–12 Wochen realistisch. Die genaue Dauer hängt von Objekt, Lage und Preissegment ab. Durch unsere Finanzierungsprüfung reduzieren wir unnötige Verzögerungen deutlich.",
  },
  {
    q: "Muss ich bei Besichtigungen dabei sein?",
    a: "Nein, das ist nicht erforderlich. Wir führen Besichtigungen professionell durch und geben Ihnen danach Feedback. Falls Sie dabei sein möchten, koordinieren wir die Termine selbstverständlich mit Ihnen.",
  },
  {
    q: "Was ist der Unterschied zwischen Angebotspreis und Kaufpreis?",
    a: "Der Angebotspreis ist der Preis, zu dem wir die Immobilie am Markt anbieten. Der Kaufpreis ist der tatsächlich erzielte Preis nach Verhandlung. Eine realistische Preisfindung von Anfang an verhindert lange Vermarktungszeiten und Preisabschläge.",
  },
  {
    q: "Können Sie auch bei der Finanzierung für Käufer helfen?",
    a: "Ja. Als Finanzierungsvermittler helfen wir Kaufinteressenten dabei, die passende Bankfinanzierung zu finden. Das beschleunigt den Kaufprozess für Sie als Verkäufer erheblich und sorgt für sichere Abschlüsse.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              Häufige Fragen
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            Ihre Fragen, unsere Antworten
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed">
            Alles Wichtige rund um den Immobilienverkauf — klar und
            verständlich erklärt.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#C5A028]/20 overflow-hidden hover:border-[#C5A028]/40 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-stone-900 font-semibold text-lg leading-snug pr-2">
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor:
                      open === i
                        ? "rgba(197,160,40,1)"
                        : "rgba(197,160,40,0.12)",
                  }}
                >
                  {open === i ? (
                    <Minus size={14} className="text-white" />
                  ) : (
                    <Plus size={14} style={{ color: "#C5A028" }} />
                  )}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: open === i ? "500px" : "0px",
                }}
              >
                <p className="px-6 pb-6 text-stone-500 text-lg leading-[1.75]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
