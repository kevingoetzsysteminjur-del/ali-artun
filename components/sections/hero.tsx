"use client";

import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MAKLER } from "@/lib/config";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#FAF8F4] pt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center">
          {/* Left: Text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase">
              {t("hero.eyebrow")}
            </p>

            {/* Headline */}
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-stone-900 leading-[1.1]">
              {t("hero.headline1")}
              <br />
              {t("hero.headline2")}{" "}
              <span className="italic" style={{ color: "#C5A028" }}>
                {t("hero.headline3")}
                <br />
                {t("hero.headline4")}
              </span>
            </h1>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-[#C5A028]" />

            {/* Second tagline / slogan */}
            <div className="inline-flex items-center gap-2">
              <span
                className="text-sm font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, rgba(197,160,40,0.12) 0%, rgba(197,160,40,0.06) 100%)",
                  border: "1px solid rgba(197,160,40,0.35)",
                  color: "#8A6A18",
                }}
              >
                {t("heroExtra.strategyTag")}
              </span>
            </div>

            {/* Claim */}
            <p className="text-2xl lg:text-3xl text-stone-700 font-heading leading-snug">
              {t("hero.claim")}
            </p>

            {/* Body text */}
            <p className="text-stone-600 text-xl leading-[1.75]">
              {t("hero.body").split(t("hero.bodyBold"))[0]}
              <strong className="text-stone-800 font-semibold">
                {t("hero.bodyBold")}
              </strong>
              {t("hero.body").split(t("hero.bodyBold"))[1]}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Primary: WhatsApp */}
              <a
                href={MAKLER.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "#25D366",
                  boxShadow: "0 4px 18px rgba(37,211,102,0.35)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={18} />
                {t("heroExtra.whatsappBtn")}
              </a>
              {/* Secondary: Kostenlose Bewertung */}
              <a
                href="/immobilienbewertung"
                className="btn-secondary"
              >
                {t("heroExtra.valuationBtn")}
                <span className="btn-arrow">→</span>
              </a>
            </div>

            {/* Phone hint */}
            <a
              href={MAKLER.telefonHref}
              className="inline-flex items-center gap-3 text-stone-500 hover:text-[#C5A028] transition-colors"
            >
              <Phone size={17} className="text-[#C5A028]" />
              <span className="text-lg">
                {t("hero.callLabel")}{" "}
                <span className="font-semibold text-stone-700">
                  {MAKLER.telefon}
                </span>
              </span>
            </a>
          </div>

          {/* Right: Ali's Photo + Maskottchen */}
          <div className="flex flex-col items-center justify-center gap-5 h-full relative">
            {/* Foto + Maskottchen nebeneinander */}
            <div className="flex items-end gap-4">
              {/* Rundes Profilbild */}
              <div
                className="relative rounded-full overflow-hidden flex-shrink-0 w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px]"
                style={{
                  border: "3px solid #C5A028",
                  boxShadow: "0 0 0 6px rgba(197,160,40,0.12)",
                }}
              >
                <Image
                  src="/ali.png"
                  alt={t("hero.photoAlt")}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "40% 20%" }}
                  priority
                />
              </div>

              {/* Maskottchen — nur Desktop */}
              <div className="hidden lg:block flex-shrink-0" style={{ marginBottom: -8 }}>
                <Image
                  src="/images/maskottchen.png"
                  alt="Plan A Maskottchen"
                  width={100}
                  height={140}
                  style={{ width: 100, height: "auto", objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Name unter dem Foto */}
            <div className="text-center">
              <p className="font-heading font-semibold text-stone-900 text-xl">
                {t("hero.photoName")}
              </p>
              <p className="text-stone-500 text-sm">
                {t("hero.photoSub")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
