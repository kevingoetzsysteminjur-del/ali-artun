"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FAQSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
    { q: t("faq.q8"), a: t("faq.a8") },
  ];

  return (
    <section className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#B8860B]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#B8860B]">
              {t("faq.label")}
            </span>
            <div className="h-0.5 w-10 bg-[#B8860B]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            {t("faq.heading")}
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed">
            {t("faq.sub")}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#B8860B]/20 overflow-hidden hover:border-[#B8860B]/40 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 text-left"
              >
                <span className="text-stone-900 font-semibold text-lg leading-snug pr-2">
                  {faq.q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor:
                      open === i
                        ? "rgba(197,160,40,1)"
                        : "rgba(197,160,40,0.12)",
                  }}
                >
                  {open === i ? (
                    <Minus size={14} className="text-white" />
                  ) : (
                    <Plus size={14} style={{ color: "#B8860B" }} />
                  )}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxHeight: open === i ? "500px" : "0px",
                }}
              >
                <p className="px-4 pb-4 sm:px-6 sm:pb-6 text-stone-500 text-base sm:text-lg leading-[1.75]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
