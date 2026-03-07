import { Home, Calculator, Users, FileCheck } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Immobilienverkauf",
    description:
      "Wir vermarkten Ihre Immobilie professionell und diskret — und stellen sicher, dass nur ernsthafte Käufer mit bestätigter Finanzierung an Ihren Tisch kommen.",
  },
  {
    icon: Calculator,
    title: "Kostenlose Bewertung",
    description:
      "Sie erhalten eine ehrliche, marktgerechte Einschätzung des Wertes Ihrer Immobilie — ohne Druck, ohne versteckte Kosten.",
  },
  {
    icon: Users,
    title: "Käuferprüfung & Finanzierung",
    description:
      "Unser Alleinstellungsmerkmal: Wir prüfen die Finanzierungsfähigkeit jedes Kaufinteressenten vor einer Besichtigung. Nur wer wirklich kaufen kann, bekommt einen Termin.",
  },
  {
    icon: FileCheck,
    title: "Begleitung bis zum Notartermin",
    description:
      "Von der ersten Beratung bis zur Schlüsselübergabe sind wir an Ihrer Seite. Wir kümmern uns um alle Formalitäten und erklären jeden Schritt verständlich.",
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="bg-[#FAF8F4] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-0.5 w-10 bg-[#C9A96E]" />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: "#C9A96E" }}
            >
              Unsere Leistungen
            </span>
          </div>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-4">
            Alles aus einer Hand.
          </h2>
          <p className="text-stone-500 text-xl leading-relaxed">
            Wir begleiten Sie Schritt für Schritt — verständlich, persönlich
            und ohne Fachjargon.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="bg-white border border-[#C9A96E]/20 rounded-2xl p-8 hover:border-[#C9A96E]/50 hover:shadow-lg hover:shadow-[#C9A96E]/8 transition-all"
              >
                <div
                  className="w-13 h-13 rounded-xl flex items-center justify-center mb-5 w-14 h-14"
                  style={{ backgroundColor: "rgba(201,169,110,0.12)" }}
                >
                  <Icon size={26} style={{ color: "#C9A96E" }} />
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
      </div>
    </section>
  );
}
