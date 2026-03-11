"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Properties() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("process.step1"),
      description: t("process.step1_desc"),
    },
    {
      number: "02",
      title: t("process.step2"),
      description: t("process.step2_desc"),
    },
    {
      number: "03",
      title: t("process.step3"),
      description: t("process.step3_desc"),
    },
    {
      number: "04",
      title: t("process.step4"),
      description: t("process.step4_desc"),
    },
  ];

  return (
    <section id="prozess" className="bg-[#EDE8DF] border-y border-[#C5A028]/25 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#C5A028" }}
            >
              {t("process.label")}
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            {t("process.heading")}
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed">
            {t("process.sub")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-[#FAF8F4] rounded-2xl p-5 sm:p-8 border border-[#C5A028]/20 shadow-sm hover:border-[#C5A028]/45 hover:shadow-md transition-all flex gap-4 sm:gap-6 items-start"
            >
              {/* Step number */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-[#C5A028]/30 flex items-center justify-center">
                <span
                  className="font-heading font-bold text-xl"
                  style={{ color: "#C5A028" }}
                >
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-stone-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-lg leading-[1.7]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 bg-[#C5A028] hover:bg-[#B8952A] text-white font-semibold px-8 py-4 rounded-full transition-all hover:shadow-xl hover:shadow-[#C5A028]/30 hover:ring-4 hover:ring-[#C5A028]/15 text-lg"
          >
            {t("process.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
