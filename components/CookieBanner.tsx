"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CookieBanner() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "all");
    setShow(false);
  };

  const necessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-stone-200 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">
          {t("cookie.text")}{" "}
          <a href="/datenschutz" className="text-[#C5A028] underline hover:text-stone-900 transition-colors">
            {t("cookie.privacy")}
          </a>
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={necessary}
            className="text-sm text-stone-500 hover:text-stone-800 transition-colors px-4 py-2 border border-stone-200 rounded-full"
          >
            {t("cookie.necessary")}
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold text-white bg-[#C5A028] hover:bg-[#B8952A] transition-colors px-5 py-2 rounded-full"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
