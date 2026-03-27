"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const serviceLinks = [
    t("footer.link1"),
    t("footer.link2"),
    t("footer.link3"),
    t("footer.link4"),
  ];

  const companyLinks: [string, string][] = [
    [t("footer.nav1"), "#ueber-uns"],
    [t("footer.nav2"), "#prozess"],
    ["Finanzierung", "/finanzierung"],
    [t("footer.nav3"), "/ratgeber"],
    [t("footer.nav4"), "/immobilienbewertung"],
    [t("footer.nav5"), "#kontakt"],
    [t("footer.nav6"), "/impressum"],
    [t("footer.nav7"), "/datenschutz"],
  ];

  return (
    <footer className="bg-stone-900 text-white border-t-2 border-[#C5A028]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/logo.png"
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
                  style={{ color: "#C5A028" }}
                >
                  Immobilien
                </p>
              </div>
            </div>
            <p className="text-stone-400 text-base leading-relaxed">
              {t("footer.brand")}
            </p>
            <div className="space-y-3">
              <a
                href="tel:+491736259429"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <Phone size={15} style={{ color: "#C5A028" }} />
                0173-6259429
              </a>
              <a
                href="mailto:Info@plana-immobilien-finanzierung.com"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <Mail size={15} style={{ color: "#C5A028" }} />
                Info@plana-immobilien-finanzierung.com
              </a>
              <a
                href="https://wa.me/491736259429"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15, color: "#C5A028" }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <div className="flex items-start gap-3 text-stone-500 text-base">
                <MapPin
                  size={15}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "#C5A028" }}
                />
                <span>Mosbacher Str. 75, 74821 Mosbach · Deutschlandweit</span>
              </div>
            </div>
          </div>

          {/* Service Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">
              {t("footer.servicesHeading")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
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

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-5">
              {t("footer.companyHeading")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(([label, href]) => (
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
            {t("footer.rights")}
          </p>
          <p className="text-stone-700 text-sm">{t("footer.location")}</p>
        </div>
      </div>
    </footer>
  );
}
