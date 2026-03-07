import { ShieldCheck, UserCheck, MapPin, Clock } from "lucide-react";

const usps = [
  {
    icon: ShieldCheck,
    title: "Geprüfte Käuferfinanzierung",
    description:
      "Wir vermitteln ausschließlich Kaufinteressenten mit einer bestätigten Finanzierungszusage ihrer Bank.",
  },
  {
    icon: UserCheck,
    title: "Persönliche Beratung",
    description:
      "Kein anonymes Callcenter. Sie sprechen immer direkt mit Ali Artun — Ihrem festen Ansprechpartner.",
  },
  {
    icon: MapPin,
    title: "Lokale Expertise",
    description:
      "Wir kennen den Immobilienmarkt im Neckar-Odenwald-Kreis und der Region Mosbach genau.",
  },
  {
    icon: Clock,
    title: "Schneller Abschluss",
    description:
      "Vorqualifizierte Käufer bedeuten kürzere Verhandlungen und sichere Abschlüsse ohne Überraschungen.",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#EDE8DF] border-y border-[#C9A96E]/25 py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-center text-stone-900 font-heading text-3xl lg:text-4xl font-bold mb-3">
          Was uns unterscheidet
        </h2>
        <p className="text-center text-stone-500 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Unser Ansatz schützt Sie vor den häufigsten Fallen beim
          Immobilienverkauf.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, i) => {
            const Icon = usp.icon;
            return (
              <div
                key={i}
                className="bg-[#FAF8F4] rounded-2xl p-7 border border-[#C9A96E]/20 shadow-sm hover:border-[#C9A96E]/45 hover:shadow-md transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(201,169,110,0.12)" }}
                >
                  <Icon size={22} style={{ color: "#C9A96E" }} />
                </div>
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
