"use client";

import { Play } from "lucide-react";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const VIDEO_PLATZHALTER = [
    {
      name: t("testimonials.v1_name"),
      beschreibung: t("testimonials.v1_desc"),
      gradient: "from-stone-200 to-stone-300",
    },
    {
      name: t("testimonials.v2_name"),
      beschreibung: t("testimonials.v2_desc"),
      gradient: "from-amber-100 to-amber-200",
    },
    {
      name: t("testimonials.v3_name"),
      beschreibung: t("testimonials.v3_desc"),
      gradient: "from-stone-100 to-stone-200",
    },
  ];

  return (
    <section
      id="referenzen"
      className="bg-[#EDE8DF] border-y border-[#C5A028]/25 py-20 lg:py-28"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              {t("testimonials.label")}
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            {t("testimonials.heading")}
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed max-w-2xl mx-auto">
            {t("testimonials.sub")}
          </p>
        </div>

        {/* Text + Google Widget nebeneinander */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 reveal reveal-delay-1 items-start">

        {/* Text-Platzhalter */}
        <div className="bg-white rounded-3xl border border-[#C5A028]/20 shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#C5A028]/40 via-[#C5A028] to-[#C5A028]/40" />
          <div className="px-5 py-8 sm:px-10 sm:py-12 text-center">
            <div
              className="text-[80px] leading-none font-heading font-bold mb-4"
              style={{ color: "#C5A028", opacity: 0.35 }}
              aria-hidden="true"
            >
              ❝
            </div>
            <p className="text-stone-600 text-xl leading-[1.8] mb-8 max-w-xl mx-auto">
              {t("testimonials.placeholder")}
            </p>
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="h-px flex-1 max-w-[80px] bg-[#C5A028]/25" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A028]/50" />
              <div className="h-px flex-1 max-w-[80px] bg-[#C5A028]/25" />
            </div>
            <div className="inline-flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-2xl px-6 py-3.5 mb-8">
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <div className="text-left">
                <div className="flex gap-0.5 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#C5A028", fontSize: "15px" }}>★</span>
                  ))}
                </div>
                <p className="text-stone-500 text-xs">{t("testimonials.rateOnGoogle")}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://g.page/r/plan-a-immobilien/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {t("testimonials.giveReview")}
                <span className="btn-arrow">→</span>
              </a>
              <a href="#kontakt" className="btn-secondary">
                {t("testimonials.shareExperience")}
              </a>
            </div>
          </div>
        </div>

        {/* Google Reviews Widget */}
        <GoogleReviewsWidget />

        </div>{/* end grid */}

        {/* Video-Testimonials */}
        <div className="reveal reveal-delay-2">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#C5A028]/40" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-stone-400">
                {t("testimonials.videoLabel")}
              </span>
              <div className="h-px w-8 bg-[#C5A028]/40" />
            </div>
            <p className="text-stone-500 text-base">
              {t("testimonials.videoSoon")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {VIDEO_PLATZHALTER.map((v, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[#C5A028]/15 bg-white shadow-sm"
              >
                {/* Thumbnail-Platzhalter */}
                <div className={`aspect-video bg-gradient-to-br ${v.gradient} relative`}>
                  {/* Play-Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <Play size={20} style={{ color: "#C5A028", marginLeft: "2px" }} fill="#C5A028" />
                    </div>
                  </div>
                  {/* Coming soon badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-stone-500 px-2 py-1 rounded-full">
                    {t("testimonials.comingSoon")}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-stone-900 font-semibold text-sm mb-0.5">{v.name}</p>
                  <p className="text-stone-400 text-xs leading-relaxed">{v.beschreibung}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hinweis */}
        <p className="text-center text-stone-400 text-sm mt-10 reveal reveal-delay-3">
          {t("testimonials.transparencyNote")}
        </p>
      </div>
    </section>
  );
}
