import { Award, Users, FileCheck, ShieldCheck } from "lucide-react";

const ZERTIFIKATE = [
  {
    icon: FileCheck,
    titel: "§ 34c GewO",
    untertitel: "Gewerbezulassung",
    beschreibung:
      "Staatlich zugelassener Immobilienmakler gemäß § 34c Gewerbeordnung – Voraussetzung für die professionelle Immobilienvermittlung in Deutschland.",
    farbe: "#C5A028",
  },
  {
    icon: Award,
    titel: "IHK Zertifiziert",
    untertitel: "Geprüfter Immobilienmakler",
    beschreibung:
      "IHK-zertifizierte Ausbildung und Sachkunde im Immobilien- und Maklerrecht, Wertermittlung und Verkaufsprozessen.",
    farbe: "#C5A028",
  },
  {
    icon: Users,
    titel: "IVD Mitglied",
    untertitel: "Immobilienverband Deutschland",
    beschreibung:
      "Mitglied im Immobilienverband IVD – dem führenden Fachverband für Immobilienberufe mit verbindlichem Ethik-Kodex.",
    farbe: "#C5A028",
  },
  {
    icon: ShieldCheck,
    titel: "DSGVO Konform",
    untertitel: "Datenschutz & Sicherheit",
    beschreibung:
      "Alle Kundendaten werden gemäß DSGVO verarbeitet und gespeichert. Transparenter Umgang mit Ihren Informationen.",
    farbe: "#C5A028",
  },
];

export default function Auszeichnungen() {
  return (
    <section className="bg-[#FAF8F4] py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-10 bg-[#C5A028]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A028]">
              Qualifikationen
            </span>
            <div className="h-0.5 w-10 bg-[#C5A028]" />
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900 leading-tight mb-3">
            Zertifiziert & zugelassen
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Ihre Immobilie ist in professionellen Händen – mit allen notwendigen
            Zulassungen und Qualifikationen.
          </p>
        </div>

        {/* Karten-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ZERTIFIKATE.map((z, i) => {
            const Icon = z.icon;
            return (
              <div
                key={z.titel}
                className={`reveal reveal-delay-${i + 1} bg-white rounded-2xl border border-[#C5A028]/20 p-6 flex flex-col hover:shadow-md transition-shadow duration-200`}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{
                    background: "rgba(197,160,40,0.1)",
                    border: "1px solid rgba(197,160,40,0.25)",
                  }}
                >
                  <Icon size={22} style={{ color: z.farbe }} />
                </div>

                {/* Titel */}
                <p className="text-stone-900 font-bold text-base mb-0.5">{z.titel}</p>
                <p className="text-[#C5A028] text-xs font-semibold mb-3 tracking-wide">
                  {z.untertitel}
                </p>

                {/* Beschreibung */}
                <p className="text-stone-500 text-sm leading-relaxed flex-1">{z.beschreibung}</p>

                {/* Gold bottom accent */}
                <div className="mt-4 h-0.5 w-8 bg-[#C5A028]/40 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
