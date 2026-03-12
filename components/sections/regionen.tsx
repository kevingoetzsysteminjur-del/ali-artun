"use client";

import { MapPin } from "lucide-react";
import { MAKLER } from "@/lib/config";

const CITIES = [
  { name: "Mosbach", label: "Hauptsitz", highlight: true },
  { name: "Heidelberg" },
  { name: "Mannheim" },
  { name: "Heilbronn" },
  { name: "Stuttgart" },
  { name: "Karlsruhe" },
  { name: "Würzburg" },
  { name: "Darmstadt" },
  { name: "Frankfurt am Main" },
  { name: "Aschaffenburg" },
];

export default function Regionen() {
  return (
    <section className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-[#C5A028]" />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#C5A028" }}
            >
              Einzugsgebiet
            </span>
            <div className="h-px w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
            Unser{" "}
            <span className="italic" style={{ color: "#C5A028" }}>
              Großraum
            </span>
          </h2>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto leading-relaxed">
            Ali Artun ist nicht nur in Mosbach aktiv – er betreut Eigentümer und Käufer im
            gesamten Rhein-Neckar-Raum und darüber hinaus.
          </p>
        </div>

        {/* City grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
          {CITIES.map((city) => (
            <div
              key={city.name}
              className="relative flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border transition-all duration-200 text-center group"
              style={
                city.highlight
                  ? {
                      background: "linear-gradient(135deg, rgba(197,160,40,0.1) 0%, rgba(197,160,40,0.05) 100%)",
                      border: "1.5px solid rgba(197,160,40,0.5)",
                    }
                  : {
                      background: "white",
                      border: "1px solid rgba(197,160,40,0.15)",
                    }
              }
            >
              {/* Hauptsitz badge */}
              {city.highlight && (
                <span
                  className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "#C5A028",
                    color: "white",
                    whiteSpace: "nowrap",
                  }}
                >
                  Hauptsitz
                </span>
              )}

              <MapPin
                size={20}
                style={{ color: city.highlight ? "#C5A028" : "#A09080" }}
                className="group-hover:text-[#C5A028] transition-colors"
              />
              <span
                className="font-semibold text-sm leading-snug"
                style={{ color: city.highlight ? "#8A6A18" : "#4A3728" }}
              >
                {city.name}
              </span>
            </div>
          ))}
        </div>

        {/* Callout bar */}
        <div
          className="rounded-2xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #1a1614 0%, #2d2520 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(197,160,40,0.15)" }}
            >
              <MapPin size={22} style={{ color: "#C5A028" }} />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-lg leading-tight">
                Auch außerhalb dieser Städte?
              </p>
              <p className="text-stone-400 text-sm mt-0.5">
                Sprechen Sie uns an – wir helfen auch im gesamten Umland.
              </p>
            </div>
          </div>
          <a
            href={MAKLER.whatsappMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105 whitespace-nowrap"
            style={{
              background: "#25D366",
              boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
              textDecoration: "none",
            }}
          >
            Anfrage stellen
          </a>
        </div>

      </div>
    </section>
  );
}
