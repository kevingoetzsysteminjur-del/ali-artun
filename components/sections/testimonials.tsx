export default function Testimonials() {
  return (
    <section
      id="referenzen"
      className="bg-[#EDE8DF] border-y border-[#C5A028]/25 py-20 lg:py-28"
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              Kundenstimmen
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
            Echte Erfahrungen zählen mehr als leere Versprechen. Hier entsteht gerade etwas.
          </p>
        </div>

        {/* Platzhalter-Karte */}
        <div className="reveal reveal-delay-1 bg-white rounded-3xl border border-[#C5A028]/20 shadow-sm overflow-hidden max-w-3xl mx-auto">
          {/* Gold accent top bar */}
          <div className="h-1 bg-gradient-to-r from-[#C5A028]/40 via-[#C5A028] to-[#C5A028]/40" />

          <div className="px-10 py-12 text-center">
            {/* Big quotation mark */}
            <div
              className="text-[80px] leading-none font-heading font-bold mb-4"
              style={{ color: "#C5A028", opacity: 0.35 }}
              aria-hidden="true"
            >
              ❝
            </div>

            <p className="text-stone-600 text-xl leading-[1.8] mb-8 max-w-xl mx-auto">
              Wir sammeln gerade die ersten Erfahrungsberichte unserer Kunden.
              Bald finden Sie hier echte Bewertungen von zufriedenen Verkäufern
              aus der Region Mosbach und dem Neckar-Odenwald-Kreis.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="h-px flex-1 max-w-[80px] bg-[#C5A028]/25" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A028]/50" />
              <div className="h-px flex-1 max-w-[80px] bg-[#C5A028]/25" />
            </div>

            {/* Google Bewertung Platzhalter */}
            <div className="inline-flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-6 py-3.5 mb-8">
              {/* Google "G" icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#C5A028", fontSize: "15px" }}>★</span>
                  ))}
                </div>
                <p className="text-stone-500 text-xs">Bewerten Sie uns auf Google</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://g.page/r/plan-a-immobilien/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Bewertung abgeben
                <span className="btn-arrow">→</span>
              </a>
              <a href="#kontakt" className="btn-secondary">
                Erfahrung mitteilen
              </a>
            </div>
          </div>
        </div>

        {/* Subtile Vertrauensnote darunter */}
        <p className="text-center text-stone-400 text-sm mt-8 reveal reveal-delay-2">
          Wir arbeiten transparent — keine erfundenen Bewertungen, nur echte Stimmen.
        </p>
      </div>
    </section>
  );
}
