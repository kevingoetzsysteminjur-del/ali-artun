"use client";

import { Shield, Star, Lock, MapPin, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TrustBadges() {
  const { t } = useLanguage();

  const badges = [
    { icon: Shield, label: t("trustbadges.item1"), sub: t("trustbadges.item1_sub") },
    { icon: Star, label: t("trustbadges.item2"), sub: t("trustbadges.item2_sub") },
    { icon: Lock, label: t("trustbadges.item3"), sub: t("trustbadges.item3_sub") },
    { icon: MapPin, label: t("trustbadges.item4"), sub: t("trustbadges.item4_sub") },
    { icon: CheckCircle, label: t("trustbadges.item5"), sub: t("trustbadges.item5_sub") },
  ];

  return (
    <section className="bg-stone-50 border-y border-[#C5A028]/15 py-10">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex flex-col items-center gap-2 text-center min-w-[100px]"
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(197,160,40,0.12)" }}
                >
                  <Icon size={20} style={{ color: "#C5A028" }} />
                </div>
                <p className="text-stone-800 font-semibold text-sm leading-tight">
                  {badge.label}
                </p>
                <p className="text-stone-400 text-xs">{badge.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
