"use client";

import { ShieldCheck, UserCheck, MapPin, Clock } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Stats() {
  const { t } = useLanguage();

  const usps = [
    {
      icon: ShieldCheck,
      title: t("stats.item1_title"),
      description: t("stats.item1_desc"),
      counterTarget: 100,
      counterSuffix: "%",
      counterLabel: t("stats.item1_label"),
    },
    {
      icon: UserCheck,
      title: t("stats.item2_title"),
      description: t("stats.item2_desc"),
      counterTarget: 1,
      counterSuffix: "",
      counterLabel: t("stats.item2_label"),
    },
    {
      icon: MapPin,
      title: t("stats.item3_title"),
      description: t("stats.item3_desc"),
      counterTarget: 100,
      counterSuffix: "%",
      counterLabel: t("stats.item3_label"),
    },
    {
      icon: Clock,
      title: t("stats.item4_title"),
      description: t("stats.item4_desc"),
      counterTarget: 98,
      counterSuffix: "%",
      counterLabel: t("stats.item4_label"),
    },
  ];

  return (
    <section className="bg-[#EDE8DF] border-y border-[#B8860B]/25 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="reveal text-center text-stone-900 font-heading text-3xl lg:text-4xl font-bold mb-3">
          {t("stats.label")}
        </h2>
        <p className="reveal text-center text-stone-500 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          {t("stats.sub")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} bg-[#FAF8F4] rounded-2xl p-7 border border-[#B8860B]/20 shadow-sm hover:border-[#B8860B]/45 hover:shadow-md transition-all`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(197,160,40,0.12)" }}
                >
                  <Icon size={22} style={{ color: "#B8860B" }} />
                </div>
                <div
                  className="font-heading text-3xl font-bold mb-1"
                  style={{ color: "#B8860B" }}
                >
                  <AnimatedCounter target={usp.counterTarget} suffix={usp.counterSuffix} />
                </div>
                <p className="text-stone-400 text-xs mb-4">{usp.counterLabel}</p>
                <h3 className="text-stone-900 font-bold text-lg mb-3 leading-snug">
                  {usp.title}
                </h3>
                <p className="text-stone-500 text-base leading-relaxed">
                  {usp.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
