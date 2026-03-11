"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

const BEISPIELE = [
  {
    titel: "Wohnzimmer",
    vorher: { from: "#d1cfc9", to: "#a8a49e", label: "Vorher – unrenoviert" },
    nachher: { from: "#fef9f0", to: "#f0e8d8", label: "Nachher – professionell aufbereitet" },
  },
  {
    titel: "Außenansicht",
    vorher: { from: "#c5c3be", to: "#8f8d87", label: "Vorher – einfache Aufnahme" },
    nachher: { from: "#e8f4f8", to: "#c8e6f0", label: "Nachher – professionelle Fotografie" },
  },
  {
    titel: "Küche",
    vorher: { from: "#ccc8c0", to: "#9e9a92", label: "Vorher – Handyfoto" },
    nachher: { from: "#fdf6ee", to: "#ede0cc", label: "Nachher – Homestaging & Profiaufnahme" },
  },
];

function SliderKarte({ beispiel }: { beispiel: typeof BEISPIELE[0] }) {
  const [wert, setWert] = useState(50);

  return (
    <div className="flex flex-col">
      <div
        className="relative overflow-hidden rounded-2xl shadow-md"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Nachher (Hintergrund) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${beispiel.nachher.from} 0%, ${beispiel.nachher.to} 100%)`,
          }}
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-stone-600 px-2.5 py-1 rounded-full">
          Nachher
        </span>

        {/* Vorher (geclippt) */}
        <div
          className="absolute inset-0 transition-none"
          style={{
            background: `linear-gradient(135deg, ${beispiel.vorher.from} 0%, ${beispiel.vorher.to} 100%)`,
            clipPath: `inset(0 ${100 - wert}% 0 0)`,
          }}
        />
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-stone-600 px-2.5 py-1 rounded-full">
          Vorher
        </span>

        {/* Trennlinie */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.25)] pointer-events-none"
          style={{ left: `${wert}%` }}
        />

        {/* Handle-Kreis */}
        <div
          className="absolute top-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none"
          style={{ left: `${wert}%`, transform: "translate(-50%, -50%)" }}
        >
          <ArrowLeftRight size={14} style={{ color: "#C5A028" }} />
        </div>

        {/* Unsichtbarer Range-Input */}
        <input
          type="range"
          min={0}
          max={100}
          value={wert}
          onChange={(e) => setWert(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label={`${beispiel.titel} Vergleichs-Slider`}
        />
      </div>

      <p className="text-stone-500 text-sm text-center mt-3 font-medium">
        {beispiel.titel}
      </p>
    </div>
  );
}

export default function VorherNachher() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              Unsere Arbeit
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            So präsentieren wir Ihre Immobilie
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
            Professionell aufbereitet für den bestmöglichen Verkaufspreis.
            Ziehen Sie den Regler und sehen Sie den Unterschied.
          </p>
        </div>

        {/* Slider-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal reveal-delay-1">
          {BEISPIELE.map((b) => (
            <SliderKarte key={b.titel} beispiel={b} />
          ))}
        </div>

        {/* Hinweis */}
        <p className="text-center text-stone-400 text-sm mt-8 reveal reveal-delay-2">
          Beispielbilder mit Platzhalter-Grafiken — echte Objektfotos folgen.
        </p>

        {/* CTA */}
        <div className="text-center mt-10 reveal reveal-delay-3">
          <a href="#kontakt" className="btn-primary">
            Immobilie professionell vermarkten lassen
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
