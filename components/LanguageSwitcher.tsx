"use client";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-0.5">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <button
            onClick={() => setLang(l.code)}
            className={`text-xs font-semibold px-1.5 py-1 rounded transition-all ${
              lang === l.code
                ? "text-[#B8860B]"
                : "text-stone-400 hover:text-stone-600"
            }`}
            style={{ letterSpacing: "0.05em" }}
            aria-label={`Sprache: ${l.label}`}
          >
            {l.label}
          </button>
          {i < LANGS.length - 1 && (
            <span className="text-stone-300 text-xs select-none">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
