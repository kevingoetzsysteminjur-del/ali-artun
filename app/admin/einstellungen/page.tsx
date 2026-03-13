"use client";

import { useState } from "react";
import { Save } from "lucide-react";

type Settings = {
  telefon: string;
  whatsapp: string;
  email: string;
  oeffnungszeiten: string;
  slogan: string;
  adresse: string;
};

const DEFAULT_SETTINGS: Settings = {
  telefon: "06261 / 123 456",
  whatsapp: "496261123456",
  email: "info@plana-immobilien.de",
  oeffnungszeiten: "Mo–Fr: 9:00–18:00 Uhr",
  slogan: "Entscheidungen auf einem anderen Niveau.",
  adresse: "Mosbach, Neckar-Odenwald-Kreis",
};

export default function AdminEinstellungenPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // In a real implementation, this would save to Supabase
    // For now we just simulate saving
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fieldClass =
    "w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-all";
  const fieldStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.8)",
  };
  const focusStyle = {
    borderColor: "rgba(197,160,40,0.5)",
  };

  const update = (key: keyof Settings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Einstellungen
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          Kontaktdaten und allgemeine Website-Einstellungen
        </p>
      </div>

      <form onSubmit={handleSave} className="max-w-xl">
        <div
          className="rounded-xl p-6 space-y-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            className="text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Kontaktdaten
          </h2>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Telefon
            </label>
            <input
              type="text"
              value={settings.telefon}
              onChange={(e) => update("telefon", e.target.value)}
              className={fieldClass}
              style={fieldStyle}
              onFocus={(e) =>
                Object.assign(e.target.style, fieldStyle, focusStyle)
              }
              onBlur={(e) => Object.assign(e.target.style, fieldStyle)}
              placeholder="06261 / 123 456"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              WhatsApp-Nummer{" "}
              <span style={{ opacity: 0.5 }}>(nur Zahlen, mit Ländercode)</span>
            </label>
            <input
              type="text"
              value={settings.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              className={fieldClass}
              style={fieldStyle}
              placeholder="496261123456"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              E-Mail
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => update("email", e.target.value)}
              className={fieldClass}
              style={fieldStyle}
              placeholder="info@plana-immobilien.de"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Adresse / Standort
            </label>
            <input
              type="text"
              value={settings.adresse}
              onChange={(e) => update("adresse", e.target.value)}
              className={fieldClass}
              style={fieldStyle}
              placeholder="Mosbach, Neckar-Odenwald-Kreis"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Öffnungszeiten
            </label>
            <input
              type="text"
              value={settings.oeffnungszeiten}
              onChange={(e) => update("oeffnungszeiten", e.target.value)}
              className={fieldClass}
              style={fieldStyle}
              placeholder="Mo–Fr: 9:00–18:00 Uhr"
            />
          </div>

          <div
            className="pt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2
              className="text-sm font-semibold mb-5"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Website-Texte
            </h2>
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Slogan / Claim
              </label>
              <input
                type="text"
                value={settings.slogan}
                onChange={(e) => update("slogan", e.target.value)}
                className={fieldClass}
                style={fieldStyle}
                placeholder="Entscheidungen auf einem anderen Niveau."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)",
              color: "#fff",
              border: "none",
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            <Save size={15} />
            {saving ? "Wird gespeichert..." : "Einstellungen speichern"}
          </button>
          {saved && (
            <span className="text-sm text-green-400">Gespeichert ✓</span>
          )}
        </div>

        <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Hinweis: Einstellungen werden in Ihrem Supabase-Projekt gespeichert.
          Für Produktivbetrieb empfehlen wir eine eigene{" "}
          <code
            className="px-1 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            settings
          </code>{" "}
          Tabelle.
        </p>
      </form>
    </div>
  );
}
