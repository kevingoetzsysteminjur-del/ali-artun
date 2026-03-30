"use client";

import { useState, useMemo } from "react";
import { Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";

export default function RechnerPreview() {
  const { t } = useLanguage();
  const [kaufpreis, setKaufpreis] = useState(350000);

  const nebenkosten = useMemo(() => {
    return Math.round(kaufpreis * (0.05 + 0.015 + 0.005 + 0.0357));
  }, [kaufpreis]);

  const pct = ((kaufpreis - 100000) / (900000 - 100000)) * 100;

  return (
    <section className="bg-[#EDE8DF] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-0.5 w-10 bg-[#B8860B]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B8860B]">
                {t("rechner.eyebrow")}
              </span>
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-5">
              {t("rechner.title")}
            </h2>
            <p className="text-stone-600 text-xl leading-[1.75] mb-6">
              {t("rechner.sub")}
            </p>
            <ul className="space-y-2 text-stone-600 mb-8">
              {[
                t("rechner.item1"),
                t("rechner.item2"),
                t("rechner.item3"),
                t("rechner.item4"),
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span style={{ color: "#B8860B" }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <a href="/rechner" className="btn-primary">
              {t("rechner.btnFull")}
              <span className="btn-arrow">→</span>
            </a>
          </div>

          {/* Mini-Rechner */}
          <div className="reveal reveal-delay-1">
            <div className="bg-white rounded-3xl border border-[#B8860B]/20 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(197,160,40,0.12)" }}
                >
                  <Calculator size={18} style={{ color: "#B8860B" }} />
                </div>
                <span className="font-semibold text-stone-900">{t("rechner.quickTitle")}</span>
              </div>

              {/* Slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-stone-500 text-sm">{t("rechner.priceLabel")}</span>
                  <span className="font-bold text-stone-900 tabular-nums">{fmt(kaufpreis)}</span>
                </div>
                <div className="relative h-5 flex items-center">
                  <div className="absolute left-0 right-0 h-1.5 bg-[#EDE8DF] rounded-full" />
                  <div
                    className="absolute left-0 h-1.5 bg-[#B8860B] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                  <input
                    type="range"
                    min={100000}
                    max={1000000}
                    step={10000}
                    value={kaufpreis}
                    onChange={(e) => setKaufpreis(Number(e.target.value))}
                    className="gold-slider absolute w-full"
                    aria-label={t("rechner.priceLabel")}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-stone-400 text-xs">100.000 €</span>
                  <span className="text-stone-400 text-xs">1.000.000 €</span>
                </div>
              </div>

              {/* Ergebnis */}
              <div className="bg-gradient-to-br from-[#B8860B] to-[#A08020] rounded-2xl p-5 text-white mb-4">
                <p className="text-white/80 text-sm mb-1">{t("rechner.resultLabel")}</p>
                <p className="text-3xl font-bold tabular-nums">{fmt(nebenkosten)}</p>
                <p className="text-white/70 text-xs mt-2">
                  ca. {((nebenkosten / kaufpreis) * 100).toFixed(1)}%
                </p>
              </div>

              <p className="text-stone-400 text-xs leading-relaxed mb-4">
                {t("rechner.breakdown")}
              </p>

              <a
                href="/rechner"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#B8860B]/40 text-[#B8860B] text-sm font-medium hover:bg-[#B8860B]/5 transition-colors"
              >
                {t("rechner.btnAll")}
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
