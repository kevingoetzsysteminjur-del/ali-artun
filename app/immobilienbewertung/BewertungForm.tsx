"use client";

import { useState } from "react";
import { Home, Building2, Layers, Briefcase, CheckCircle2 } from "lucide-react";

type ObjectType = "haus" | "wohnung" | "grundstueck" | "gewerbe" | "";
type Condition = "renovierungsbedarf" | "gepflegt" | "modernisiert" | "neuwertig" | "";

interface FormData {
  objectType: ObjectType;
  area: string;
  year: string;
  plz: string;
  condition: Condition;
  name: string;
  phone: string;
  email: string;
}

const objectTypes = [
  { value: "haus", label: "Haus", icon: Home },
  { value: "wohnung", label: "Wohnung", icon: Building2 },
  { value: "grundstueck", label: "Grundstück", icon: Layers },
  { value: "gewerbe", label: "Gewerbe", icon: Briefcase },
] as const;

const conditions = [
  { value: "renovierungsbedarf", label: "Renovierungsbedarf" },
  { value: "gepflegt", label: "Gepflegt" },
  { value: "modernisiert", label: "Modernisiert" },
  { value: "neuwertig", label: "Neuwertig" },
] as const;

export default function BewertungForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    objectType: "",
    area: "",
    year: "",
    plz: "",
    condition: "",
    name: "",
    phone: "",
    email: "",
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const canNextStep1 = form.objectType !== "";
  const canNextStep2 = form.area !== "" && form.plz !== "";
  const canSubmit = form.name !== "" && form.phone !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#C5A028]/25 shadow-md text-center">
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
          style={{ backgroundColor: "rgba(197,160,40,0.12)" }}
        >
          <CheckCircle2 size={40} style={{ color: "#C5A028" }} />
        </div>
        <h2 className="font-heading text-3xl font-bold text-stone-900 mb-3">
          Vielen Dank!
        </h2>
        <p className="text-stone-500 text-xl leading-relaxed mb-8">
          Ihre Anfrage ist bei uns eingegangen. Ali Artun meldet sich
          persönlich bei Ihnen — in der Regel innerhalb von 24 Stunden.
        </p>
        <div className="bg-[#F9F8F5] rounded-xl p-6 mb-8 text-left space-y-2">
          <p className="text-stone-500 text-sm">Ihr Objekt:</p>
          <p className="text-stone-900 font-semibold text-lg capitalize">
            {form.objectType} · PLZ {form.plz}
          </p>
        </div>
        <a
          href="/"
          className="btn-primary"
        >
          Zurück zur Startseite
          <span className="btn-arrow">→</span>
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#C5A028]/25 shadow-md overflow-hidden">
      {/* Progress bar */}
      <div className="h-1.5 bg-stone-100">
        <div
          className="h-full bg-[#C5A028] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-5 sm:p-8 lg:p-10">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  s === step
                    ? "bg-[#C5A028] text-white"
                    : s < step
                    ? "bg-[#C5A028]/20 text-[#C5A028]"
                    : "bg-stone-100 text-stone-400"
                }`}
              >
                {s < step ? "✓" : s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-8 sm:w-12 transition-all ${
                    s < step ? "bg-[#C5A028]" : "bg-stone-200"
                  }`}
                />
              )}
            </div>
          ))}
          <p className="ml-3 text-stone-400 text-sm">
            Schritt {step} von {totalSteps}
          </p>
        </div>

        {/* Step 1: Object type */}
        {step === 1 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">
              Was möchten Sie bewerten lassen?
            </h2>
            <p className="text-stone-500 mb-7">
              Wählen Sie den Typ Ihrer Immobilie.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {objectTypes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, objectType: value }))}
                  className={`p-6 rounded-xl border-2 text-center transition-all hover:border-[#C5A028]/60 ${
                    form.objectType === value
                      ? "border-[#C5A028] bg-[#C5A028]/5"
                      : "border-stone-200"
                  }`}
                >
                  <Icon
                    size={28}
                    className="mx-auto mb-3"
                    style={{
                      color:
                        form.objectType === value ? "#C5A028" : "#9ca3af",
                    }}
                  />
                  <span
                    className={`font-semibold text-base ${
                      form.objectType === value
                        ? "text-stone-900"
                        : "text-stone-500"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!canNextStep1}
              onClick={() => setStep(2)}
              className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              Weiter
              <span className="btn-arrow">→</span>
            </button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">
              Details zur Immobilie
            </h2>
            <p className="text-stone-500 mb-7">
              Diese Informationen helfen uns bei der Einschätzung.
            </p>
            <div className="space-y-5 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    Wohnfläche (m²)
                  </label>
                  <input
                    type="number"
                    placeholder="z. B. 120"
                    value={form.area}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, area: e.target.value }))
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold text-sm mb-2">
                    Baujahr
                  </label>
                  <input
                    type="number"
                    placeholder="z. B. 1985"
                    value={form.year}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, year: e.target.value }))
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Postleitzahl
                </label>
                <input
                  type="text"
                  placeholder="z. B. 74821"
                  value={form.plz}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, plz: e.target.value }))
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-3">
                  Zustand der Immobilie
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {conditions.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, condition: value }))
                      }
                      className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                        form.condition === value
                          ? "border-[#C5A028] bg-[#C5A028]/5 text-stone-900"
                          : "border-stone-200 text-stone-500 hover:border-[#C5A028]/40"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-stone-200 text-stone-600 font-semibold py-4 rounded-xl transition-all hover:border-stone-400 text-base"
              >
                ← Zurück
              </button>
              <button
                type="button"
                disabled={!canNextStep2}
                onClick={() => setStep(3)}
                className="btn-primary flex-grow justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                Weiter
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 className="font-heading text-2xl font-bold text-stone-900 mb-2">
              Ihre Kontaktdaten
            </h2>
            <p className="text-stone-500 mb-7">
              Damit wir uns persönlich bei Ihnen melden können.
            </p>
            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Ihr Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Vor- und Nachname"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  Telefonnummer *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="06261 / 123 456"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold text-sm mb-2">
                  E-Mail (optional)
                </label>
                <input
                  type="email"
                  placeholder="ihre@email.de"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-base focus:outline-none focus:border-[#C5A028] focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="border border-stone-200 text-stone-600 font-semibold py-4 px-6 rounded-xl transition-all hover:border-stone-400 text-base"
              >
                ← Zurück
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-primary flex-grow justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                Kostenlose Bewertung anfragen
                <span className="btn-arrow">→</span>
              </button>
            </div>
            <p className="text-stone-400 text-sm text-center mt-4">
              Ihre Daten sind sicher.{" "}
              <a
                href="/datenschutz"
                className="underline hover:text-[#C5A028]"
              >
                Datenschutzerklärung
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
