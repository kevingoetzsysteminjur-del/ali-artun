import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white border-t-2 border-[#C9A96E]/30">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/logo_transparent.png"
                  alt="Plan A Immobilien"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <p className="font-heading font-bold text-xl text-white">
                  Plan A
                </p>
                <p
                  className="text-xs tracking-[0.2em] uppercase font-semibold"
                  style={{ color: "#C9A96E" }}
                >
                  Immobilien
                </p>
              </div>
            </div>
            <p className="text-stone-400 text-base leading-relaxed">
              Ihr Partner für den sicheren Immobilienverkauf im
              Neckar-Odenwald-Kreis. Persönlich. Diskret. Zuverlässig.
            </p>
            <div className="space-y-3">
              <a
                href="tel:+4962619123456"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <Phone size={15} style={{ color: "#C9A96E" }} />
                06261 / 123 456
              </a>
              <a
                href="mailto:info@plana-immobilien.de"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <Mail size={15} style={{ color: "#C9A96E" }} />
                info@plana-immobilien.de
              </a>
              <div className="flex items-start gap-3 text-stone-500 text-base">
                <MapPin
                  size={15}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "#C9A96E" }}
                />
                <span>Mosbach, Neckar-Odenwald-Kreis</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">
              Leistungen
            </h4>
            <ul className="space-y-3">
              {[
                "Immobilienverkauf",
                "Kostenlose Bewertung",
                "Käuferprüfung & Finanzierung",
                "Begleitung bis Notartermin",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#leistungen"
                    className="text-stone-400 text-base hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-base mb-5">
              Unternehmen
            </h4>
            <ul className="space-y-3">
              {[
                ["Über Ali Artun", "#ueber-uns"],
                ["So funktioniert es", "#prozess"],
                ["Kontakt", "#kontakt"],
                ["Impressum", "#"],
                ["Datenschutz", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-stone-400 text-base hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-600 text-sm">
            © {new Date().getFullYear()} Plan A Immobilien · Ali Artun
          </p>
          <p className="text-stone-700 text-sm">Mosbach · Neckar-Odenwald-Kreis</p>
        </div>
      </div>
    </footer>
  );
}
