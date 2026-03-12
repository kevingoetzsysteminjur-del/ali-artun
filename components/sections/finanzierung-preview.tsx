"use client";

import { Building2, BadgeCheck, Zap } from "lucide-react";
import { MAKLER } from "@/lib/config";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FinanzierungPreview() {
  const { t } = useLanguage();

  const highlights = [
    { icon: <Building2 size={22} />, text: t("finanzierungPreview.h1") },
    { icon: <BadgeCheck size={22} />, text: t("finanzierungPreview.h2") },
    { icon: <Zap size={22} />, text: t("finanzierungPreview.h3") },
  ];

  const steps = [
    { num: "1", title: t("finanzierungPreview.step1Title"), desc: t("finanzierungPreview.step1Desc") },
    { num: "2", title: t("finanzierungPreview.step2Title"), desc: t("finanzierungPreview.step2Desc") },
    { num: "3", title: t("finanzierungPreview.step3Title"), desc: t("finanzierungPreview.step3Desc") },
  ];

  return (
    <section className="bg-[#FAF8F4] py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div
          className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.08)" }}
        >
          {/* Left: dark panel */}
          <div
            className="relative p-10 lg:p-12 flex flex-col justify-between gap-8"
            style={{ background: "linear-gradient(135deg, #1a1614 0%, #2d2520 100%)" }}
          >
            {/* Gold glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 0% 80%, rgba(197,160,40,0.15) 0%, transparent 60%)" }}
            />
            <div className="relative space-y-5">
              <p className="text-[#C5A028] text-xs font-semibold tracking-[0.2em] uppercase">
                {t("finanzierungPreview.eyebrow")}
              </p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white leading-tight">
                {t("finanzierungPreview.title")}{" "}
                <span className="italic" style={{ color: "#C5A028" }}>
                  {t("finanzierungPreview.titleItalic")}
                </span>
              </h2>
              <p className="text-stone-400 text-base leading-relaxed">
                {t("finanzierungPreview.sub")}
              </p>
            </div>

            <div className="relative space-y-3">
              {highlights.map((h) => (
                <div key={h.text} className="flex items-center gap-3">
                  <span style={{ color: "#C5A028" }}>{h.icon}</span>
                  <span className="text-stone-300 text-sm font-medium">{h.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: light panel */}
          <div className="bg-white p-10 lg:p-12 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <h3 className="font-heading text-2xl font-bold text-stone-900">
                {t("finanzierungPreview.stepsTitle")}
              </h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div key={step.num} className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #C5A028 0%, #A08020 100%)" }}
                    >
                      {step.num}
                    </div>
                    <div>
                      <p className="font-semibold text-stone-900 text-sm">{step.title}</p>
                      <p className="text-stone-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={MAKLER.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
                style={{ background: "#25D366", boxShadow: "0 4px 14px rgba(37,211,102,0.3)", textDecoration: "none" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t("finanzierungPreview.btnWhatsapp")}
              </a>
              <a
                href="/finanzierung"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all hover:bg-[#C5A028]/10"
                style={{ border: "1px solid rgba(197,160,40,0.3)", color: "#8A6A18", textDecoration: "none" }}
              >
                {t("finanzierungPreview.btnMore")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
