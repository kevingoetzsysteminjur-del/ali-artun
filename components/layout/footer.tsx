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
                href="tel:+4962619123456"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <Phone size={15} style={{ color: "#C5A028" }} />
                06261 / 123 456
              </a>
              <a
                href="mailto:Info@plana-immobilien-finanzierung.com"
                className="flex items-center gap-3 text-stone-400 text-base hover:text-white transition-colors"
              >
                <Mail size={15} style={{ color: "#C5A028" }} />
                Info@plana-immobilien-finanzierung.com
              </a>
              <div className="flex items-start gap-3 text-stone-500 text-base">
                <MapPin
                  size={15}
                  className="flex-shrink-0 mt-1"
                  style={{ color: "#C5A028" }}
                />
                <span>Mosbach, Neckar-Odenwald-Kreis</span>
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
