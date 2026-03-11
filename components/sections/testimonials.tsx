const testimonials = [
  {
    name: "Familie M.",
    location: "Mosbach",
    text: "Herr Artun hat unsere Immobilie professionell bewertet und innerhalb von 6 Wochen zum gewünschten Preis verkauft. Die Käuferprüfung gab uns Sicherheit.",
    sterne: 5,
    initial: "M",
  },
  {
    name: "Thomas K.",
    location: "Neckar-Odenwald-Kreis",
    text: "Dank der geprüften Finanzierung lief alles reibungslos. Vom ersten Gespräch bis zum Notartermin wurde alles transparent kommuniziert.",
    sterne: 5,
    initial: "T",
  },
  {
    name: "Sabine & Klaus R.",
    location: "Mosbach",
    text: "Endlich ein Makler, der wirklich mitdenkt. Die Kombination aus Vermarktung und Finanzierungsprüfung ist einzigartig.",
    sterne: 5,
    initial: "S",
  },
];

export default function Testimonials() {
  return (
    <section
      id="referenzen"
      className="bg-[#EDE8DF] border-y border-[#C9A96E]/25 py-20 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C9A96E]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E]">
              Kundenstimmen
            </span>
            <div className="h-0.5 w-10 bg-[#C9A96E]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed">
            Echte Erfahrungen von Menschen aus der Region.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl p-7 border border-[#C9A96E]/15 shadow-sm`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array(t.sterne)
                  .fill(0)
                  .map((_, s) => (
                    <span key={s} style={{ color: "#C9A96E", fontSize: "16px" }}>
                      ★
                    </span>
                  ))}
              </div>

              <p className="text-stone-600 text-lg leading-[1.75] mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-stone-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                  style={{ backgroundColor: "#C9A96E" }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-stone-900 font-semibold text-base">
                    {t.name}
                  </p>
                  <p className="text-stone-400 text-sm">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
