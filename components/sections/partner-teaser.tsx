"use client";

import { Check } from "lucide-react";
import Maskottchen from "@/components/Maskottchen";
import { MAKLER } from "@/lib/config";

const benefits = [
  "Nebenberuflich starten – kein Risiko",
  "Professionelle Ausbildung inklusive",
  "Attraktive Provisionsmodelle",
  "Zugang zu 300+ Partnerbanken",
];

export default function PartnerTeaser() {
  return (
    <section className="bg-stone-900 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="space-y-6">
            <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase">Partnerschaft</p>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white leading-tight">
              Werde{" "}
              <span className="italic" style={{ color: "#C5A028" }}>selbstständiger Makler</span>{" "}
              mit Plan A
            </h2>
            <p className="text-stone-400 text-base leading-relaxed">
              Starte nebenberuflich als Immobilienmakler-Partner bei Plan A –
              mit voller Unterstützung, professioneller Ausbildung und attraktiven Provisionen.
            </p>

            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(197,160,40,0.15)", border: "1px solid rgba(197,160,40,0.4)" }}
                  >
                    <Check size={12} style={{ color: "#C5A028" }} />
                  </span>
                  <span className="text-stone-300 text-sm">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="/partner"
                className="btn-primary"
              >
                Partner werden
                <span className="btn-arrow">→</span>
              </a>
              <a
                href={MAKLER.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
                style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.3)", textDecoration: "none" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Jetzt bewerben
              </a>
            </div>
          </div>

          {/* Right: Mascot */}
          <div className="flex flex-col items-center gap-6">
            <div
              className="rounded-3xl p-8 flex flex-col items-center gap-4 text-center w-full max-w-xs"
              style={{ background: "rgba(197,160,40,0.07)", border: "1px solid rgba(197,160,40,0.2)" }}
            >
              <Maskottchen size={140} animate={true} variant="full" />
              <div>
                <p className="font-heading font-bold text-white text-xl">Ihr Partner</p>
                <p className="text-stone-400 text-sm mt-1">{MAKLER.name}</p>
                <p className="text-[#C5A028] text-xs tracking-wide mt-1">{MAKLER.firma}</p>
              </div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
              {[
                { val: "300+", label: "Banken" },
                { val: "100%", label: "Kostenlos" },
                { val: "Top", label: "Provision" },
              ].map((s) => (
                <div key={s.val} className="text-center">
                  <p className="font-heading font-bold text-xl" style={{ color: "#C5A028" }}>{s.val}</p>
                  <p className="text-stone-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
