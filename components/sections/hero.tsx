import Image from "next/image";
import { Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#FAF8F4] pt-20">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center justify-center">
          {/* Left: Text */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase">
              Plan A Immobilien · Mosbach
            </p>

            {/* Headline */}
            <h1 className="font-heading text-4xl lg:text-5xl xl:text-[3.4rem] font-bold text-stone-900 leading-[1.1]">
              Immobilienverkauf
              <br />
              mit{" "}
              <span className="italic" style={{ color: "#C5A028" }}>
                geprüfter
                <br />
                Käufer&shy;finanzierung.
              </span>
            </h1>

            {/* Divider */}
            <div className="w-16 h-0.5 bg-[#C5A028]" />

            {/* Claim */}
            <p className="text-2xl lg:text-3xl text-stone-700 font-heading leading-snug">
              Entscheidungen auf einem anderen Niveau.
            </p>

            {/* Body text */}
            <p className="text-stone-600 text-xl leading-[1.75]">
              Sie möchten Ihre Immobilie verkaufen — sicher, zum richtigen
              Preis und ohne böse Überraschungen? Wir präsentieren Ihnen
              ausschließlich Käufer mit{" "}
              <strong className="text-stone-800 font-semibold">
                bestätigter Finanzierung
              </strong>
              . Kein Warten. Kein Abspringen.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#kontakt"
                className="btn-primary"
              >
                Jetzt kostenlos beraten lassen
                <span className="btn-arrow">→</span>
              </a>
            </div>

            {/* Phone hint */}
            <a
              href="tel:+4962619123456"
              className="inline-flex items-center gap-3 text-stone-500 hover:text-[#C5A028] transition-colors"
            >
              <Phone size={17} className="text-[#C5A028]" />
              <span className="text-lg">
                Oder rufen Sie uns an:{" "}
                <span className="font-semibold text-stone-700">
                  06261 / 123 456
                </span>
              </span>
            </a>
          </div>

          {/* Right: Ali's Photo */}
          <div className="flex flex-col items-center justify-center gap-5 h-full">
            {/* Rundes Profilbild */}
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
                style={{ objectPosition: "40% 20%" }}
                priority
              />
            </div>

            {/* Name unter dem Foto */}
            <div className="text-center">
              <p className="font-heading font-semibold text-stone-900 text-xl">
                Ali Artun
              </p>
              <p className="text-stone-500 text-sm">
                Ihr Immobilienberater · Mosbach
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
