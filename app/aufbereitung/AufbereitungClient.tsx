"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { MAKLER } from "@/lib/config";

const services = [
  {
    emoji: "🧹",
    title: "Dachziegel abdampfen & reinigen",
    desc: "Professionelle Reinigung für einen frischen ersten Eindruck. Moos, Schmutz und Verwitterungen werden entfernt.",
  },
  {
    emoji: "🏠",
    title: "Außenfassade aufbereiten",
    desc: "Fassadenreinigung und -behandlung für optimale Außenwirkung – der erste Eindruck zählt.",
  },
  {
    emoji: "🧱",
    title: "Pflastersteine reinigen",
    desc: "Einfahrt und Wege professionell gereinigt – gepflegte Außenanlagen heben den Gesamteindruck erheblich.",
  },
  {
    emoji: "🌿",
    title: "Garten-Optimierung",
    desc: "Ein gepflegter Garten erhöht den wahrgenommenen Wert erheblich. Schnitt, Pflege, Gestaltung.",
  },
  {
    emoji: "🎨",
    title: "Innenanstrich / Renovierung",
    desc: "Frische Wände machen Räume heller und attraktiver. Kleiner Aufwand – große Wirkung.",
  },
  {
    emoji: "📸",
    title: "Professionelle Fotografie & Exposé",
    desc: "Der erste Eindruck online entscheidet – wir zeigen Ihr Objekt von seiner besten Seite.",
  },
];

const examples = [
  {
    label: "Fassade",
    before: "Verwitterte, verschmutzte Außenfassade mit Ablagerungen",
    after: "Frisch gereinigte und aufbereitete Fassade – wie neu",
    beforeColor: "#8B7355",
    afterColor: "#E8E0D0",
  },
  {
    label: "Garten",
    before: "Verwachsener, ungepflegter Garten mit überwuchertem Rasen",
    after: "Gepflegter Garten mit frisch gemähtem Rasen und geschnittenem Gehölz",
    beforeColor: "#5B7B3A",
    afterColor: "#7DB55A",
  },
  {
    label: "Innenraum",
    before: "Veraltete, dunkle Wände mit abgeblätterter Farbe",
    after: "Helle, frisch gestrichene Wände in modernem Weiß",
    beforeColor: "#A0917A",
    afterColor: "#F5F5F0",
  },
];

type SliderState = { [key: string]: number };

export default function AufbereitungClient() {
  const [sliders, setSliders] = useState<SliderState>({ Fassade: 50, Garten: 50, Innenraum: 50 });

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="bg-[#FAF8F4] py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
            <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Objektaufbereitung</p>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-6">
              Wir bereiten Ihr Objekt{" "}
              <span className="italic" style={{ color: "#C5A028" }}>professionell auf</span>
            </h1>
            <p className="text-stone-600 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Strategisch und nur wenn es sich lohnt – für den bestmöglichen Verkaufspreis.
            </p>
            <a
              href={MAKLER.whatsappMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm tracking-wide transition-all hover:scale-105"
              style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.35)", textDecoration: "none" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Kostenlos beraten lassen
            </a>
          </div>
        </section>

        {/* ── SERVICES GRID ────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Unsere Leistungen</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">Was wir für Sie tun</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="bg-[#FAF8F4] rounded-2xl p-7 border border-stone-100 hover:border-[#C5A028]/30 hover:-translate-y-1 transition-all duration-200 group"
                >
                  <div className="text-4xl mb-4">{s.emoji}</div>
                  <h3 className="font-heading font-bold text-stone-900 text-lg mb-2 group-hover:text-[#8A6A18] transition-colors">{s.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER SLIDER ────────────────────── */}
        <section className="bg-[#FAF8F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Ergebnisse</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">Vorher – Nachher</h2>
              <p className="text-stone-500 mt-4 text-lg">Schieben Sie den Regler um den Unterschied zu sehen</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {examples.map((ex) => (
                <div key={ex.label} className="space-y-3">
                  <h3 className="font-semibold text-stone-900 text-center">{ex.label}</h3>
                  {/* Comparison visual */}
                  <div className="relative rounded-xl overflow-hidden" style={{ height: 180 }}>
                    {/* After (full width) */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: ex.afterColor }}
                    >
                      <span className="text-stone-700 text-sm font-medium px-3 py-1 bg-white/70 rounded-lg">Nachher</span>
                    </div>
                    {/* Before (left side based on slider) */}
                    <div
                      className="absolute top-0 left-0 bottom-0 overflow-hidden flex items-center justify-center"
                      style={{ width: `${sliders[ex.label]}%`, background: ex.beforeColor }}
                    >
                      <span className="text-white text-sm font-medium px-3 py-1 bg-black/30 rounded-lg whitespace-nowrap">Vorher</span>
                    </div>
                    {/* Divider line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                      style={{ left: `${sliders[ex.label]}%` }}
                    />
                    {/* Handle */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center border-2 z-10 cursor-ew-resize"
                      style={{ left: `${sliders[ex.label]}%`, borderColor: "#C5A028" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M4 7 L1 4 M4 7 L1 10 M10 7 L13 4 M10 7 L13 10" stroke="#C5A028" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="4" y1="7" x2="10" y2="7" stroke="#C5A028" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                  {/* Range input */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliders[ex.label]}
                    onChange={(e) => setSliders(prev => ({ ...prev, [ex.label]: Number(e.target.value) }))}
                    className="gold-slider w-full"
                    style={{
                      background: `linear-gradient(to right, #C5A028 0%, #C5A028 ${sliders[ex.label]}%, #e5e1d8 ${sliders[ex.label]}%, #e5e1d8 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-stone-400">
                    <span>Vorher</span>
                    <span>Nachher</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HINWEIS BOX ──────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-8">
            <div
              className="rounded-2xl p-8 flex gap-5 items-start"
              style={{ background: "rgba(197,160,40,0.06)", border: "1.5px solid rgba(197,160,40,0.35)" }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "rgba(197,160,40,0.1)" }}
              >
                💡
              </div>
              <div>
                <h3 className="font-heading font-bold text-stone-900 text-xl mb-2">Unser ehrlicher Rat</h3>
                <p className="text-stone-600 text-base leading-relaxed">
                  Nicht bei jedem Objekt ist eine Aufbereitung rentabel. Wir beraten Sie ehrlich und unverbindlich,
                  ob eine Aufbereitung für Ihre Immobilie sinnvoll ist und welche Maßnahmen den größten Mehrwert bringen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="bg-stone-900 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-8 text-center space-y-6">
            <h2 className="font-heading text-3xl font-bold text-white">Bereit für den bestmöglichen Verkaufspreis?</h2>
            <p className="text-stone-400 text-lg">Lassen Sie uns gemeinsam prüfen, was bei Ihrer Immobilie Sinn ergibt.</p>
            <a
              href={MAKLER.whatsappMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm tracking-wide transition-all hover:scale-105"
              style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.35)", textDecoration: "none" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Kostenlos beraten lassen
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
