import { Shield, Star, Lock, MapPin, CheckCircle } from "lucide-react";

const badges = [
  { icon: Shield, label: "IHK Zertifiziert", sub: "Gewerberecht §34c" },
  { icon: Star, label: "IVD Mitglied", sub: "Immobilienverband" },
  { icon: Lock, label: "DSGVO Konform", sub: "Datenschutz" },
  { icon: MapPin, label: "Lokaler Experte", sub: "Neckar-Odenwald-Kreis" },
  { icon: CheckCircle, label: "Geprüfte Finanzierung", sub: "Nur geprüfte Käufer" },
];

export default function TrustBadges() {
  return (
    <section className="bg-stone-50 border-y border-[#C9A96E]/15 py-10">
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
                  style={{ backgroundColor: "rgba(201,169,110,0.12)" }}
                >
                  <Icon size={20} style={{ color: "#C9A96E" }} />
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
