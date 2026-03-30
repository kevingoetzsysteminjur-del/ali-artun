"use client";

import { Home, Calculator, Users, FileCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Home,
      title: t("services.s1_title"),
      description: t("services.s1_desc"),
    },
    {
      icon: Calculator,
      title: t("services.s2_title"),
      description: t("services.s2_desc"),
    },
    {
      icon: Users,
      title: t("services.s3_title"),
      description: t("services.s3_desc"),
    },
    {
      icon: FileCheck,
      title: t("services.s4_title"),
      description: t("services.s4_desc"),
    },
  ];

  return (
    <section id="leistungen" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 reveal">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#B8860B]" />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#B8860B" }}
            >
              {t("services.label")}
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            {t("services.heading")}
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed">
            {t("services.sub")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} bg-white border border-[#B8860B]/20 rounded-2xl p-5 sm:p-8 hover:border-[#B8860B]/50 hover:shadow-lg hover:shadow-[#B8860B]/8 transition-all`}
              >
                <div
                  className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 w-14 h-14"
                  style={{ backgroundColor: "rgba(197,160,40,0.12)" }}
                >
                  <Icon size={26} style={{ color: "#B8860B" }} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-stone-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-stone-600 text-lg leading-[1.7]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Immobilienarten */}
        <div className="mt-12 pt-10 border-t border-stone-200">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-5"
            style={{ color: "#B8860B" }}
          >
            Wir vermarkten alle Immobilienarten
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "Eigentumswohnungen",
              "Einfamilienhäuser",
              "Mehrfamilienhäuser",
              "Gewerbeobjekte",
              "Grundstücke",
            ].map((typ) => (
              <span
                key={typ}
                className="px-4 py-2 rounded-full text-sm font-medium text-stone-700 bg-white border border-[#B8860B]/25"
              >
                {typ}
              </span>
            ))}
          </div>
          <p className="text-stone-500 text-base mt-4">
            Wir sind <strong className="text-stone-700">deutschlandweit</strong> für Sie da.
          </p>
        </div>
      </div>
    </section>
  );
}
