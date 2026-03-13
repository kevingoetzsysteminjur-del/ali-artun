"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Save } from "lucide-react";

type Lang = "de" | "en" | "tr";

type Section = {
  key: string;
  label: string;
};

const SECTIONS: Section[] = [
  { key: "hero", label: "Hero" },
  { key: "ueber-ali", label: "Über Ali" },
  { key: "leistungen", label: "Leistungen" },
  { key: "prozess", label: "Prozess" },
  { key: "kontakt", label: "Kontakt" },
];

const LANGS: { code: Lang; label: string }[] = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
];

const DEFAULT_CONTENT: Record<string, Record<Lang, string>> = {
  hero: {
    de: "Immobilienverkauf mit geprüfter Käuferfinanzierung. Planbare Abschlüsse durch Strategie, Struktur und Finanzierungsprüfung.",
    en: "Real estate sales with verified buyer financing. Reliable closings through strategy, structure and financing checks.",
    tr: "Onaylı alıcı finansmanıyla gayrimenkul satışı. Strateji, yapı ve finansman kontrolüyle güvenilir kapanışlar.",
  },
  "ueber-ali": {
    de: "Ali Artun ist Immobilienmakler und Finanzierungsvermittler in Mosbach. Mit einem klaren Fokus auf Qualität und Transparenz begleitet er Verkäufer und Käufer durch den gesamten Prozess.",
    en: "Ali Artun is a real estate agent and financing broker in Mosbach. With a clear focus on quality and transparency, he guides sellers and buyers through the entire process.",
    tr: "Ali Artun, Mosbach'ta bir emlak ve finansman komisyoncusudur. Kalite ve şeffaflığa odaklanarak satıcılara ve alıcılara tüm süreçte rehberlik eder.",
  },
  leistungen: {
    de: "Wir bieten Immobilienverkauf, Käuferfinanzierungsprüfung, Wertoptimierung und KfW-Förderberatung aus einer Hand.",
    en: "We offer real estate sales, buyer financing checks, value optimization and KfW funding advice from a single source.",
    tr: "Tek bir yerden gayrimenkul satışı, alıcı finansman kontrolü, değer optimizasyonu ve KfW teşvik danışmanlığı sunuyoruz.",
  },
  prozess: {
    de: "Unser 5-Schritte-Prozess: Analyse → Strategie → Vermarktung → Finanzierungssicherheit → Notartermin.",
    en: "Our 5-step process: Analysis → Strategy → Marketing → Financing security → Notary appointment.",
    tr: "5 adımlı sürecimiz: Analiz → Strateji → Pazarlama → Finansman güvencesi → Noter randevusu.",
  },
  kontakt: {
    de: "Kontaktieren Sie uns für ein kostenloses Erstgespräch. Telefon: 06261 / 123 456. E-Mail: info@plana-immobilien.de",
    en: "Contact us for a free initial consultation. Phone: 06261 / 123 456. Email: info@plana-immobilien.de",
    tr: "Ücretsiz ilk görüşme için bize ulaşın. Telefon: 06261 / 123 456. E-posta: info@plana-immobilien.de",
  },
};

export default function AdminInhaltePage() {
  const [contents, setContents] = useState<
    Record<string, Record<Lang, string>>
  >(DEFAULT_CONTENT);
  const [activeLang, setActiveLang] = useState<Lang>("de");
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savedSection, setSavedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("site_content")
      .select("*")
      .then(({ data }) => {
        if (data && data.length > 0) {
          const merged = { ...DEFAULT_CONTENT };
          data.forEach(
            (row: { section: string; lang: string; content: string }) => {
              if (!merged[row.section]) {
                merged[row.section] = { de: "", en: "", tr: "" };
              }
              merged[row.section][row.lang as Lang] = row.content;
            }
          );
          setContents(merged);
        }
        setLoading(false);
      });
  }, []);

  const handleSave = async (sectionKey: string) => {
    setSavingSection(sectionKey);
    const supabase = createClient();

    const langs: Lang[] = ["de", "en", "tr"];
    for (const lang of langs) {
      await supabase.from("site_content").upsert(
        {
          section: sectionKey,
          lang,
          content: contents[sectionKey]?.[lang] || "",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section,lang" }
      );
    }

    setSavingSection(null);
    setSavedSection(sectionKey);
    setTimeout(() => setSavedSection(null), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#C5A028", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

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
          Website-Inhalte
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          Texte für alle Sprachversionen bearbeiten
        </p>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 mb-6">
        {LANGS.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setActiveLang(lang.code)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background:
                activeLang === lang.code
                  ? "rgba(197,160,40,0.15)"
                  : "rgba(255,255,255,0.04)",
              color:
                activeLang === lang.code
                  ? "#C5A028"
                  : "rgba(255,255,255,0.4)",
              border:
                activeLang === lang.code
                  ? "1px solid rgba(197,160,40,0.3)"
                  : "1px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Section editors */}
      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div
            key={section.key}
            className="rounded-xl p-5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-sm font-semibold"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                {section.label}
              </h3>
              <div className="flex items-center gap-3">
                {savedSection === section.key && (
                  <span className="text-xs text-green-400">Gespeichert ✓</span>
                )}
                <button
                  onClick={() => handleSave(section.key)}
                  disabled={savingSection === section.key}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                  style={{
                    background: "rgba(197,160,40,0.15)",
                    color: "#C5A028",
                    border: "1px solid rgba(197,160,40,0.3)",
                    cursor: "pointer",
                  }}
                >
                  <Save size={12} />
                  {savingSection === section.key
                    ? "Wird gespeichert..."
                    : "Speichern"}
                </button>
              </div>
            </div>

            <textarea
              value={contents[section.key]?.[activeLang] || ""}
              onChange={(e) =>
                setContents((prev) => ({
                  ...prev,
                  [section.key]: {
                    ...prev[section.key],
                    [activeLang]: e.target.value,
                  },
                }))
              }
              rows={4}
              className="w-full rounded-lg px-3 py-2.5 text-sm resize-y focus:outline-none leading-relaxed"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.75)",
                minHeight: 80,
              }}
              placeholder={`Inhalt für ${section.label} (${activeLang.toUpperCase()})...`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
