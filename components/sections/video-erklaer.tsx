"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function VideoErklaer() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#F9F8F5] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              {t("videoErklaer.eyebrow")}
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            {t("videoErklaer.title")}
          </h2>
        </div>

        {/* Video */}
        <div
          className="reveal reveal-delay-1 mx-auto"
          style={{ maxWidth: 700 }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 12px rgba(197,160,40,0.10)",
            }}
          >
            <iframe
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              src="https://www.youtube.com/embed/TY9aF0GQq-U"
              title="Plan A Immobilien – Erklärungsvideo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Untertext */}
          <p className="text-center text-stone-500 text-lg leading-relaxed mt-6 reveal reveal-delay-2">
            {t("videoErklaer.sub")}
          </p>
        </div>

      </div>
    </section>
  );
}
