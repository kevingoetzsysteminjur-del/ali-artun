import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Ratgeber Immobilien Mosbach | Plan A Immobilien",
  description:
    "Nützliche Tipps und Ratgeber rund um Immobilienverkauf, Bewertung und Finanzierung im Neckar-Odenwald-Kreis. Von Experte Ali Artun, Plan A Immobilien Mosbach.",
  keywords: [
    "Immobilien Ratgeber Mosbach",
    "Immobilie verkaufen Tipps",
    "Immobilienbewertung Neckar-Odenwald-Kreis",
    "Baufinanzierung Mosbach",
  ],
};

const articles = [
  {
    category: "Verkauf",
    title: "Immobilie verkaufen in Mosbach – Das müssen Sie wissen",
    excerpt:
      "Der Immobilienmarkt in Mosbach und dem Neckar-Odenwald-Kreis hat seine eigenen Spielregeln. Erfahren Sie, worauf es beim erfolgreichen Verkauf wirklich ankommt.",
    gradient: "from-amber-100 via-orange-50 to-stone-100",
    href: "#",
  },
  {
    category: "Finanzierung",
    title: "Geprüfte Käuferfinanzierung – So funktioniert es",
    excerpt:
      "Warum scheitern so viele Immobilienverkäufe kurz vor dem Notartermin? Und wie schützt eine vorgeprüfte Finanzierung Verkäufer und Käufer gleichermaßen.",
    gradient: "from-stone-100 via-amber-50 to-orange-100",
    href: "#",
  },
  {
    category: "Markt",
    title: "Wann ist der richtige Zeitpunkt zum Verkauf?",
    excerpt:
      "Frühjahr, Herbst oder doch im Winter? Wir erklären, welche Faktoren den Verkaufszeitpunkt wirklich beeinflussen — und warum der richtige Preis wichtiger ist als die Jahreszeit.",
    gradient: "from-orange-50 via-stone-100 to-amber-100",
    href: "#",
  },
  {
    category: "Bewertung",
    title: "Immobilienbewertung: Diese Faktoren bestimmen den Preis",
    excerpt:
      "Lage, Zustand, Baujahr — was wirklich zählt. Ein Überblick über die wichtigsten Wertfaktoren und häufige Fehler bei der Preisfindung.",
    gradient: "from-amber-50 via-orange-50 to-stone-50",
    href: "#",
  },
];

export default function RatgeberPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F8F5] pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E]">
              Wissen & Ratgeber
            </span>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 mt-3 mb-4 leading-[1.1]">
              Ihr Immobilien-Ratgeber
            </h1>
            <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
              Praxisnahe Informationen für Verkäufer und Käufer im
              Neckar-Odenwald-Kreis — direkt von Ali Artun.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl border border-[#C9A96E]/15 overflow-hidden hover:border-[#C9A96E]/40 hover:shadow-md transition-all duration-300 group"
              >
                {/* Image placeholder with gradient */}
                <div
                  className={`h-48 bg-gradient-to-br ${article.gradient} flex items-center justify-center`}
                >
                  <span className="text-[#C9A96E]/40 text-6xl font-heading font-bold">
                    {article.category[0]}
                  </span>
                </div>

                <div className="p-7">
                  <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#C9A96E] bg-[#C9A96E]/10 px-3 py-1 rounded-full mb-4">
                    {article.category}
                  </span>
                  <h2 className="font-heading text-xl font-bold text-stone-900 mb-3 leading-snug group-hover:text-[#C9A96E] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-stone-500 text-base leading-relaxed mb-5">
                    {article.excerpt}
                  </p>
                  <a
                    href={article.href}
                    className="inline-flex items-center gap-2 text-[#C9A96E] font-semibold text-base hover:gap-3 transition-all"
                  >
                    Weiterlesen →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-white rounded-2xl border border-[#C9A96E]/25 p-10 text-center shadow-sm">
            <h2 className="font-heading text-3xl font-bold text-stone-900 mb-4">
              Haben Sie eine konkrete Frage?
            </h2>
            <p className="text-stone-500 text-xl mb-8 leading-relaxed">
              Sprechen Sie direkt mit Ali Artun — kostenlos und unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+4962619123456"
                className="bg-[#C9A96E] hover:bg-[#B8952A] text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-lg text-base"
              >
                06261 / 123 456 anrufen
              </a>
              <a
                href="/#kontakt"
                className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white font-semibold px-8 py-4 rounded-xl transition-all text-base"
              >
                Nachricht senden
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
