import Image from "next/image";
import { CheckCircle, Phone } from "lucide-react";

const points = [
  "Zertifizierter Immobilienmakler (IHK)",
  "Mitglied im IVD (Immobilienverband Deutschland)",
  "Spezialist für geprüfte Käuferfinanzierung",
  "Persönliche Beratung auf Augenhöhe",
  "Für Sie erreichbar: Deutsch, Englisch, Türkisch",
];

export default function About() {
  return (
    <section
      id="ueber-uns"
      className="bg-[#FAF8F4] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Photo */}
          <div className="flex flex-col items-center lg:items-start gap-5 order-2 lg:order-1 reveal reveal-left">
            <div
              className="relative rounded-full overflow-hidden flex-shrink-0"
              style={{
                width: 280,
                height: 280,
                border: "3px solid #C5A028",
                boxShadow: "0 0 0 6px rgba(197,160,40,0.12)",
              }}
            >
              <Image
                src="/ali.png"
                alt="Ali Artun – Ihr Immobilienberater in Mosbach"
                fill
                className="object-cover"
                style={{
                  objectPosition: "28% 41.5%", transform: "scale(1.2)", transformOrigin: "center 50%",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-7 order-1 lg:order-2 reveal reveal-right">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-0.5 w-10 bg-[#C5A028]" />
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#C5A028" }}
                >
                  Über Ali Artun
                </span>
              </div>
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 leading-[1.1] mb-5">
                Ihr persönlicher
                <br />
                <span className="italic" style={{ color: "#C5A028" }}>
                  Ansprechpartner.
                </span>
              </h2>
              <p className="text-stone-600 text-xl leading-[1.75]">
                Als Gründer von Plan A Immobilien habe ich mir von Anfang an
                ein Ziel gesetzt: Den Immobilienverkauf so zu gestalten, wie
                ich ihn selbst als Verkäufer erleben möchte — ehrlich,
                persönlich und ohne unangenehme Überraschungen.
              </p>
            </div>

            <p className="text-stone-500 text-lg leading-[1.75]">
              Mein Konzept der geprüften Käuferfinanzierung stellt sicher, dass
              Sie als Verkäufer nur mit Interessenten sprechen, die auch
              wirklich kaufen können. Das spart Ihnen Zeit, Nerven und schützt
              Sie vor Enttäuschungen.
            </p>

            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: "#C5A028" }}
                  />
                  <span className="text-stone-700 text-lg">{p}</span>
                </li>
              ))}
            </ul>

            {/* Signatur mit rundem Profilbild */}
            <div className="flex items-center gap-4 py-5 border-t border-b border-[#C5A028]/20">
              <div
                className="relative flex-shrink-0 rounded-full overflow-hidden"
                style={{
                  width: 56,
                  height: 56,
                  border: "2px solid rgba(197,160,40,0.55)",
                  boxShadow: "0 0 0 4px rgba(197,160,40,0.12)",
                }}
              >
                <Image
                  src="/ali.png"
                  alt="Ali Artun"
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: "28% 41.5%",
                    transform: "scale(1.2)",
                    transformOrigin: "center 50%",
                  }}
                />
              </div>
              <div>
                <p className="font-heading font-semibold text-stone-900 text-lg leading-tight">
                  Ali Artun
                </p>
                <p className="text-stone-500 text-sm">
                  Geschäftsführer · Plan A Immobilien
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#kontakt"
                className="btn-primary"
              >
                Persönliches Gespräch
                <span className="btn-arrow">→</span>
              </a>
              <a
                href="tel:+4962619123456"
                className="inline-flex items-center gap-2 text-stone-600 hover:text-[#C5A028] transition-colors text-lg"
              >
                <Phone size={17} />
                06261 / 123 456
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
