"use client";

import { useState, useMemo } from "react";
import { Calculator, Home, TrendingUp } from "lucide-react";

// ── Grunderwerbsteuer nach Bundesland ─────────────────────────
const BUNDESLAENDER: { kuerzel: string; name: string; steuer: number }[] = [
  { kuerzel: "BW", name: "Baden-Württemberg", steuer: 5.0 },
  { kuerzel: "BY", name: "Bayern", steuer: 3.5 },
  { kuerzel: "BE", name: "Berlin", steuer: 6.0 },
  { kuerzel: "BB", name: "Brandenburg", steuer: 6.5 },
  { kuerzel: "HB", name: "Bremen", steuer: 5.0 },
  { kuerzel: "HH", name: "Hamburg", steuer: 4.5 },
  { kuerzel: "HE", name: "Hessen", steuer: 6.0 },
  { kuerzel: "MV", name: "Mecklenburg-Vorpommern", steuer: 6.0 },
  { kuerzel: "NI", name: "Niedersachsen", steuer: 5.0 },
  { kuerzel: "NW", name: "Nordrhein-Westfalen", steuer: 6.5 },
  { kuerzel: "RP", name: "Rheinland-Pfalz", steuer: 5.0 },
  { kuerzel: "SL", name: "Saarland", steuer: 6.5 },
  { kuerzel: "SN", name: "Sachsen", steuer: 3.5 },
  { kuerzel: "ST", name: "Sachsen-Anhalt", steuer: 5.0 },
  { kuerzel: "SH", name: "Schleswig-Holstein", steuer: 6.5 },
  { kuerzel: "TH", name: "Thüringen", steuer: 6.5 },
];

const fmt = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const fmtEur = (n: number) => fmt(n) + " €";

// ── Hilfs-Komponente: Gold-Slider ──────────────────────────────
function GoldSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  displayValue,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  displayValue?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-stone-600 text-sm font-medium">{label}</label>
        <span className="text-stone-900 font-semibold text-sm tabular-nums">
          {displayValue ?? fmtEur(value)}
        </span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute left-0 right-0 h-1.5 bg-[#EDE8DF] rounded-full" />
        <div
          className="absolute left-0 h-1.5 bg-[#C5A028] rounded-full"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="gold-slider absolute w-full"
          aria-label={label}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-stone-400 text-xs">{displayValue ? min + "%" : fmtEur(min)}</span>
        <span className="text-stone-400 text-xs">{displayValue ? max + "%" : fmtEur(max)}</span>
      </div>
    </div>
  );
}

// ── Balken-Chart ───────────────────────────────────────────────
function BalkenChart({ items }: { items: { label: string; wert: number; farbe: string }[] }) {
  const max = Math.max(...items.map((i) => i.wert));
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-stone-600">{item.label}</span>
            <span className="font-semibold text-stone-900 tabular-nums">{fmtEur(item.wert)}</span>
          </div>
          <div className="h-2 bg-[#EDE8DF] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.wert / max) * 100}%`,
                backgroundColor: item.farbe,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TAB 1: Nebenkostenrechner ──────────────────────────────────
function Nebenkostenrechner() {
  const [kaufpreis, setKaufpreis] = useState(350000);
  const [bundesland, setBundesland] = useState("BW");

  const bl = BUNDESLAENDER.find((b) => b.kuerzel === bundesland)!;

  const kosten = useMemo(() => {
    const grunderwerbsteuer = kaufpreis * (bl.steuer / 100);
    const notar = kaufpreis * 0.015;
    const grundbuch = kaufpreis * 0.005;
    const makler = kaufpreis * 0.0357;
    const gesamt = grunderwerbsteuer + notar + grundbuch + makler;
    return { grunderwerbsteuer, notar, grundbuch, makler, gesamt };
  }, [kaufpreis, bl]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Eingaben */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-stone-900 mb-6">
          Ihre Angaben
        </h3>

        <GoldSlider
          label="Kaufpreis"
          value={kaufpreis}
          min={50000}
          max={2000000}
          step={10000}
          onChange={setKaufpreis}
        />

        <div className="mb-5">
          <label className="block text-stone-600 text-sm font-medium mb-2">
            Bundesland
          </label>
          <select
            value={bundesland}
            onChange={(e) => setBundesland(e.target.value)}
            className="w-full border border-[#C5A028]/30 rounded-xl px-4 py-3 text-stone-900 bg-white focus:outline-none focus:border-[#C5A028] focus:ring-2 focus:ring-[#C5A028]/20 text-sm transition-all"
          >
            {BUNDESLAENDER.map((bl) => (
              <option key={bl.kuerzel} value={bl.kuerzel}>
                {bl.name} ({bl.steuer} %)
              </option>
            ))}
          </select>
        </div>

        {/* Erklärung */}
        <div className="bg-[#FAF8F4] rounded-xl p-4 border border-[#C5A028]/15 text-sm text-stone-500 leading-relaxed">
          <p className="font-medium text-stone-700 mb-1">Kostenübersicht</p>
          <p>• Grunderwerbsteuer: {bl.steuer}% (je nach Bundesland)</p>
          <p>• Notarkosten: ca. 1,5%</p>
          <p>• Grundbucheintrag: ca. 0,5%</p>
          <p>• Maklerprovision: 3,57% (inkl. MwSt.)</p>
        </div>
      </div>

      {/* Ergebnisse */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-stone-900 mb-6">
          Ihre Nebenkosten
        </h3>

        {/* Gesamtkosten-Box */}
        <div className="bg-gradient-to-br from-[#C5A028] to-[#A08020] rounded-2xl p-6 text-white mb-6 shadow-lg">
          <p className="text-white/80 text-sm mb-1">Kaufpreis + Nebenkosten</p>
          <p className="text-4xl font-bold tabular-nums">
            {fmtEur(kaufpreis + kosten.gesamt)}
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:justify-between text-white/90 text-sm gap-1">
            <span>Kaufpreis: {fmtEur(kaufpreis)}</span>
            <span>Nebenkosten: {fmtEur(kosten.gesamt)}</span>
          </div>
        </div>

        {/* Balken-Chart */}
        <BalkenChart
          items={[
            {
              label: `Grunderwerbsteuer (${bl.steuer}%)`,
              wert: kosten.grunderwerbsteuer,
              farbe: "#C5A028",
            },
            { label: "Notarkosten (1,5%)", wert: kosten.notar, farbe: "#D4B44A" },
            { label: "Grundbucheintrag (0,5%)", wert: kosten.grundbuch, farbe: "#E8CC7A" },
            { label: "Maklerprovision (3,57%)", wert: kosten.makler, farbe: "#A08020" },
          ]}
        />

        <div className="mt-4 pt-4 border-t border-[#C5A028]/20 flex justify-between font-semibold text-stone-900">
          <span>Gesamte Nebenkosten</span>
          <span className="text-[#C5A028] tabular-nums">{fmtEur(kosten.gesamt)}</span>
        </div>
      </div>
    </div>
  );
}

// ── TAB 2: Finanzierungsrechner ───────────────────────────────
function Finanzierungsrechner() {
  const [kaufpreis, setKaufpreis] = useState(350000);
  const [eigenkapital, setEigenkapital] = useState(80000);
  const [zinssatz, setZinssatz] = useState(3.5);
  const [tilgung, setTilgung] = useState(2.0);
  const [laufzeit, setLaufzeit] = useState(10);

  const ergebnis = useMemo(() => {
    const darlehen = Math.max(0, kaufpreis - eigenkapital);
    if (darlehen <= 0) return null;
    const rMonatlich = zinssatz / 100 / 12;
    const annuatRate = (zinssatz + tilgung) / 100 / 12;
    const monatlicheRate = darlehen * annuatRate;

    // Gesamtlaufzeit bis vollständige Rückzahlung
    let gesamtMonate = 0;
    if (rMonatlich > 0 && annuatRate > rMonatlich) {
      gesamtMonate = Math.ceil(
        -Math.log(1 - (rMonatlich / annuatRate)) / Math.log(1 + rMonatlich)
      );
    } else {
      gesamtMonate = Math.ceil(darlehen / monatlicheRate);
    }

    // Restschuld nach gewählter Laufzeit
    const k = laufzeit * 12;
    let restschuld = 0;
    if (k < gesamtMonate && rMonatlich > 0) {
      restschuld = Math.max(
        0,
        darlehen * Math.pow(1 + rMonatlich, k) -
          monatlicheRate * (Math.pow(1 + rMonatlich, k) - 1) / rMonatlich
      );
    }

    const gesamtzahlung = monatlicheRate * gesamtMonate;
    const gesamtzinsen = gesamtzahlung - darlehen;
    const eigenkap_pct = Math.round((eigenkapital / kaufpreis) * 100);

    return {
      darlehen,
      monatlicheRate,
      gesamtzinsen,
      gesamtJahre: Math.ceil(gesamtMonate / 12),
      restschuld,
      eigenkap_pct,
    };
  }, [kaufpreis, eigenkapital, zinssatz, tilgung, laufzeit]);

  const maxEK = Math.min(kaufpreis, 800000);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Eingaben */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-stone-900 mb-6">
          Ihre Angaben
        </h3>

        <GoldSlider
          label="Kaufpreis"
          value={kaufpreis}
          min={50000}
          max={2000000}
          step={10000}
          onChange={setKaufpreis}
        />
        <GoldSlider
          label="Eigenkapital"
          value={eigenkapital}
          min={0}
          max={maxEK}
          step={5000}
          onChange={(v) => setEigenkapital(Math.min(v, kaufpreis))}
        />
        <GoldSlider
          label="Zinssatz (p.a.)"
          value={zinssatz}
          min={0.5}
          max={8.0}
          step={0.1}
          onChange={setZinssatz}
          displayValue={zinssatz.toFixed(1) + " %"}
        />
        <GoldSlider
          label="Anfangstilgung (p.a.)"
          value={tilgung}
          min={0.5}
          max={6.0}
          step={0.1}
          onChange={setTilgung}
          displayValue={tilgung.toFixed(1) + " %"}
        />

        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-stone-600 text-sm font-medium">
              Zinsbindung
            </label>
            <span className="text-stone-900 font-semibold text-sm">{laufzeit} Jahre</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[5, 10, 15, 20, 25, 30].map((j) => (
              <button
                key={j}
                onClick={() => setLaufzeit(j)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  laufzeit === j
                    ? "bg-[#C5A028] text-white border-[#C5A028]"
                    : "bg-white text-stone-600 border-stone-200 hover:border-[#C5A028]/50"
                }`}
              >
                {j} J.
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ergebnis */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-stone-900 mb-6">
          Ihre Finanzierung
        </h3>

        {ergebnis ? (
          <>
            {/* Monatliche Rate – Highlight */}
            <div className="bg-gradient-to-br from-[#C5A028] to-[#A08020] rounded-2xl p-6 text-white mb-5 shadow-lg">
              <p className="text-white/80 text-sm mb-1">Monatliche Rate</p>
              <p className="text-4xl font-bold tabular-nums">
                {fmtEur(Math.round(ergebnis.monatlicheRate))}
              </p>
              <p className="text-white/80 text-xs mt-2">
                Zinssatz {zinssatz.toFixed(1)}% + Tilgung {tilgung.toFixed(1)}%
              </p>
            </div>

            {/* Weitere Kennzahlen */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white rounded-xl border border-[#C5A028]/20 p-4">
                <p className="text-stone-400 text-xs mb-1">Darlehensbetrag</p>
                <p className="text-stone-900 font-bold text-lg tabular-nums">
                  {fmtEur(ergebnis.darlehen)}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#C5A028]/20 p-4">
                <p className="text-stone-400 text-xs mb-1">Eigenkapital-Quote</p>
                <p className="text-stone-900 font-bold text-lg">
                  {ergebnis.eigenkap_pct} %
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#C5A028]/20 p-4">
                <p className="text-stone-400 text-xs mb-1">Gesamtzinsen</p>
                <p className="text-stone-900 font-bold text-lg tabular-nums">
                  {fmtEur(Math.round(ergebnis.gesamtzinsen))}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-[#C5A028]/20 p-4">
                <p className="text-stone-400 text-xs mb-1">Laufzeit bis Tilgung</p>
                <p className="text-stone-900 font-bold text-lg">
                  ca. {ergebnis.gesamtJahre} Jahre
                </p>
              </div>
            </div>

            {/* Restschuld */}
            {ergebnis.restschuld > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-700 text-sm font-medium mb-0.5">
                  Restschuld nach {laufzeit} Jahren
                </p>
                <p className="text-amber-900 font-bold text-xl tabular-nums">
                  {fmtEur(Math.round(ergebnis.restschuld))}
                </p>
                <p className="text-amber-600 text-xs mt-1">
                  Anschlussfinanzierung erforderlich
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="bg-stone-50 rounded-2xl p-8 text-center border border-stone-200">
            <p className="text-stone-400">
              Eigenkapital übersteigt den Kaufpreis — kein Darlehen nötig.
            </p>
          </div>
        )}

        <p className="text-stone-400 text-xs mt-4 leading-relaxed">
          * Alle Angaben sind unverbindliche Richtwerte. Für eine individuelle
          Finanzierungsberatung sprechen Sie direkt mit Ali Artun.
        </p>
      </div>
    </div>
  );
}

// ── Haupt-Komponente ──────────────────────────────────────────
export default function RechnerClient() {
  const [tab, setTab] = useState<"nebenkosten" | "finanzierung">("nebenkosten");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-0.5 w-10 bg-[#C5A028]" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
            Kostenlos berechnen
          </span>
          <div className="h-0.5 w-10 bg-[#C5A028]" />
        </div>
        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
          Immobilien-Rechner
        </h1>
        <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
          Berechnen Sie Nebenkosten oder Ihre monatliche Finanzierungsrate –
          schnell, einfach und kostenlos.
        </p>
      </div>

      {/* Tab-Switcher */}
      <div className="flex rounded-2xl bg-[#EDE8DF] p-1 mb-8 w-full sm:max-w-md sm:mx-auto">
        <button
          onClick={() => setTab("nebenkosten")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
            tab === "nebenkosten"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          <Home size={15} />
          Nebenkosten
        </button>
        <button
          onClick={() => setTab("finanzierung")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
            tab === "finanzierung"
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          <TrendingUp size={15} />
          Finanzierung
        </button>
      </div>

      {/* Rechner-Box */}
      <div className="bg-white rounded-3xl border border-[#C5A028]/15 shadow-sm p-5 sm:p-8 lg:p-10 mb-10">
        {tab === "nebenkosten" ? <Nebenkostenrechner /> : <Finanzierungsrechner />}
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 sm:p-8 lg:p-10 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(197,160,40,0.2)" }}
        >
          <Calculator size={28} style={{ color: "#C5A028" }} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-3">
          Individuelle Beratung?
        </h3>
        <p className="text-stone-400 text-base mb-6 max-w-md mx-auto leading-relaxed">
          Die Rechner liefern erste Orientierungswerte. Für eine persönliche
          Analyse sprechen Sie direkt mit Ali Artun — kostenlos und unverbindlich.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/#kontakt" className="btn-primary">
            Beratungsgespräch anfragen
            <span className="btn-arrow">→</span>
          </a>
          <a
            href="tel:+4962611234560"
            className="btn-secondary"
            style={{ borderColor: "rgba(197,160,40,0.5)", color: "#C5A028" }}
          >
            06261 / 123 456
          </a>
        </div>
      </div>
    </div>
  );
}
