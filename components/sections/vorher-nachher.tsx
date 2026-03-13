"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

const REFERENZEN = [
  {
    src: "/images/referenzen/ali-1.png",
    titel: "Fassadenreinigung",
    beschreibung: "Hausfassade professionell gereinigt und aufgewertet",
    kategorie: "Aufbereitung",
    featured: true,
  },
  {
    src: "/images/referenzen/ali-2.png",
    titel: "Fassadensanierung",
    beschreibung: "Vollständige Außenreinigung vor dem Verkauf",
    kategorie: "Aufbereitung",
    featured: false,
  },
  {
    src: "/images/referenzen/ali-3.png",
    titel: "Einfamilienhaus",
    beschreibung: "Gepflegtes Objekt optimal für den Markt vorbereitet",
    kategorie: "Objekt",
    featured: false,
  },
  {
    src: "/images/referenzen/ali-4.png",
    titel: "Dachreinigung",
    beschreibung: "Professionelle Dachsanierung steigert den Immobilienwert",
    kategorie: "Wertoptimierung",
    featured: true,
  },
  {
    src: "/images/referenzen/ali-5.png",
    titel: "Dachziegel",
    beschreibung: "Dachfläche vollständig erneuert – Vorher & Nachher",
    kategorie: "Wertoptimierung",
    featured: false,
  },
  {
    src: "/images/referenzen/ali-6.png",
    titel: "Einfahrt",
    beschreibung: "Einfahrt und Pflasterfläche gereinigt und aufgefrischt",
    kategorie: "Außenbereich",
    featured: false,
  },
  {
    src: "/images/referenzen/ali-7.png",
    titel: "Gehwegreinigung",
    beschreibung: "Zufahrt und Gehweg vor dem Verkauf aufbereitet",
    kategorie: "Außenbereich",
    featured: false,
  },
  {
    src: "/images/referenzen/ali-8.png",
    titel: "Gartengestaltung",
    beschreibung: "Gartenbereich neu gestaltet – mehr Anziehungskraft für Käufer",
    kategorie: "Außenbereich",
    featured: false,
  },
];

const KATEGORIE_FARBE: Record<string, string> = {
  Aufbereitung: "#C5A028",
  Objekt: "#6B7280",
  Wertoptimierung: "#C5A028",
  Außenbereich: "#92835A",
};

export default function VorherNachher() {
  const { t } = useLanguage();

  const featured = REFERENZEN.filter((r) => r.featured);
  const rest = REFERENZEN.filter((r) => !r.featured);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              {t("vorherNachher.eyebrow")}
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            {t("vorherNachher.title")}
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
            {t("vorherNachher.sub")}
          </p>
        </div>

        {/* Featured Row (2 große Bilder) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 reveal reveal-delay-1">
          {featured.map((item) => (
            <div key={item.src} className="group relative overflow-hidden" style={{ borderRadius: "8px", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
              <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={item.src}
                  alt={item.titel}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent" style={{ borderRadius: "8px" }} />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className="inline-block text-[10px] font-semibold uppercase tracking-[0.18em] px-2.5 py-1 mb-2"
                  style={{ backgroundColor: KATEGORIE_FARBE[item.kategorie] ?? "#C5A028", color: "#fff", borderRadius: "4px" }}
                >
                  {item.kategorie}
                </span>
                <h3 className="text-white font-heading font-bold text-xl mb-1">{item.titel}</h3>
                <p className="text-white/75 text-sm leading-snug">{item.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Rest Grid (6 kleinere Bilder) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 reveal reveal-delay-2">
          {rest.map((item) => (
            <div key={item.src} className="group relative overflow-hidden" style={{ borderRadius: "8px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)" }}>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={item.src}
                  alt={item.titel}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/65 via-transparent to-transparent" style={{ borderRadius: "8px" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span
                  className="inline-block text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 mb-1.5"
                  style={{ backgroundColor: KATEGORIE_FARBE[item.kategorie] ?? "#C5A028", color: "#fff", borderRadius: "3px" }}
                >
                  {item.kategorie}
                </span>
                <h3 className="text-white font-heading font-bold text-base leading-tight">{item.titel}</h3>
                <p className="text-white/70 text-xs leading-snug mt-0.5 hidden sm:block">{item.beschreibung}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hinweis */}
        <p className="text-center text-stone-400 text-sm mt-8 reveal reveal-delay-3">
          {t("vorherNachher.note")}
        </p>

        {/* CTA */}
        <div className="text-center mt-8 reveal reveal-delay-3">
          <a href="#kontakt" className="btn-primary">
            {t("vorherNachher.cta")}
          </a>
        </div>

      </div>
    </section>
  );
}
