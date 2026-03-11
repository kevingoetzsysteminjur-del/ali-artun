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
                <div className="h-0.5 w-10 bg-[#C5A028]" />
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#C5A028" }}
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
                    className="flex items-center gap-4 p-5 bg-white rounded-xl border border-[#C5A028]/20 hover:border-[#C5A028]/50 hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(197,160,40,0.1)" }}
                    >
                      <Icon size={20} style={{ color: "#C5A028" }} />
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
          <div className="bg-white rounded-2xl p-8 lg:p-10 border border-[#C5A028]/25 shadow-md shadow-[#C5A028]/5">
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
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    Nachname
                  </label>
                  <input
                    type="text"
                    placeholder="Mustermann"
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
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
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  placeholder="max@beispiel.de"
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Art der Immobilie
                </label>
                <select className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all appearance-none cursor-pointer">
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
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base placeholder:text-stone-300 focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
              >
                Anfrage kostenlos absenden
                <span className="btn-arrow">→</span>
              </button>

              <p className="text-stone-400 text-sm text-center leading-relaxed">
                Ihre Daten werden vertraulich behandelt.{" "}
                <a href="/datenschutz" className="underline hover:text-[#C5A028]">
                  Datenschutzerklärung
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-[#C5A028]/20 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41882.48!2d9.1125!3d49.3523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47985c3d57b8f1af%3A0x5cd56f1dc7e3a24c!2sMosbach!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde"
            width="100%"
            height="300"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Plan A Immobilien – Mosbach"
          />
        </div>
      </div>
    </section>
  );
}
