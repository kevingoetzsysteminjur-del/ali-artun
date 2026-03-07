import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section id="kontakt" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-0.5 w-10 bg-[#C9A96E]" />
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#C9A96E" }}
                >
                  Kontakt
                </span>
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-5">
                Sprechen Sie mit uns.
              </h2>
              <p className="text-stone-600 text-xl leading-[1.75]">
                Sie möchten Ihre Immobilie bewerten lassen oder haben Fragen
                zum Verkauf? Wir sind für Sie da — persönlich, unverbindlich
                und kostenlos.
              </p>
            </div>

            {/* Contact methods */}
            <div className="space-y-4">
              {[
                {
                  icon: Phone,
                  label: "Telefon",
                  value: "06261 / 123 456",
                  sub: "Mo–Fr 9:00–18:00 Uhr",
                  href: "tel:+4962619123456",
                },
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "+49 6261 / 123 456",
                  sub: "Schreiben Sie uns direkt",
                  href: "https://wa.me/4962619123456",
                },
                {
                  icon: Mail,
                  label: "E-Mail",
                  value: "info@plana-immobilien.de",
                  sub: "Antwort innerhalb von 24 Stunden",
                  href: "mailto:info@plana-immobilien.de",
                },
                {
                  icon: MapPin,
                  label: "Büro",
                  value: "Mosbach",
                  sub: "Neckar-Odenwald-Kreis",
                  href: "#",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[#C9A96E]/20 hover:border-[#C9A96E]/50 hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(201,169,110,0.1)" }}
                    >
                      <Icon size={20} style={{ color: "#C9A96E" }} />
                    </div>
                    <div>
                      <p className="text-stone-400 text-sm mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-stone-900 font-semibold text-lg leading-tight">
                        {item.value}
                      </p>
                      <p className="text-stone-400 text-sm">{item.sub}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#C9A96E]/25 shadow-md shadow-[#C9A96E]/5">
            <h3 className="font-heading text-2xl font-bold text-stone-900 mb-2">
              Kostenlose Erstberatung anfragen
            </h3>
            <p className="text-stone-500 text-base mb-8">
              Wir melden uns persönlich bei Ihnen — werktags innerhalb von 24 Stunden.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    Vorname
                  </label>
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C9A96E] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    Nachname
                  </label>
                  <input
                    type="text"
                    placeholder="Mustermann"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C9A96E] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  placeholder="Ihre Rufnummer"
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C9A96E] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  placeholder="max@beispiel.de"
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C9A96E] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Art der Immobilie
                </label>
                <select className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-base focus:outline-none focus:border-[#C9A96E] focus:bg-white transition-all appearance-none cursor-pointer">
                  <option value="">Bitte wählen...</option>
                  <option value="haus">Haus</option>
                  <option value="wohnung">Wohnung</option>
                  <option value="grundstueck">Grundstück</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Ihre Nachricht (optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Haben Sie weitere Informationen oder Fragen?"
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C9A96E] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#C9A96E] hover:bg-[#B8952A] text-white font-bold py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-[#C9A96E]/30 hover:ring-4 hover:ring-[#C9A96E]/15 text-lg"
              >
                Anfrage kostenlos absenden
              </button>

              <p className="text-stone-400 text-sm text-center leading-relaxed">
                Ihre Daten werden vertraulich behandelt.{" "}
                <a href="#" className="underline hover:text-[#C9A96E]">
                  Datenschutzerklärung
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
