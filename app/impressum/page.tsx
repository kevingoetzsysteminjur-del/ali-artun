import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Impressum – Plan A Immobilien & Finanzierung",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F8F5] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-stone-900 mb-10">
            Impressum
          </h1>

          <section className="space-y-8 text-stone-700 text-lg leading-[1.75]">
            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                Ali Artun
                <br />
                Plan A Immobilien &amp; Finanzierung
                <br />
                <span className="text-[#C5A028] font-medium">
                  [Straße und Hausnummer – bitte eintragen]
                </span>
                <br />
                <span className="text-[#C5A028] font-medium">
                  [PLZ] Mosbach, Neckar-Odenwald-Kreis
                </span>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Kontakt
              </h2>
              <p>
                Telefon:{" "}
                <span className="text-[#C5A028] font-medium">
                  [Telefonnummer – bitte eintragen]
                </span>
                <br />
                E-Mail:{" "}
                <span className="text-[#C5A028] font-medium">
                  [E-Mail-Adresse – bitte eintragen]
                </span>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Steuernummer
              </h2>
              <p>
                <span className="text-[#C5A028] font-medium">
                  [Steuernummer – bitte eintragen]
                </span>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Handelsregister
              </h2>
              <p>
                <span className="text-[#C5A028] font-medium">
                  [Handelsregisternummer und Registergericht – falls vorhanden,
                  bitte eintragen, sonst diese Zeile entfernen]
                </span>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Berufsrechtliche Regelungen
              </h2>
              <p>
                Gewerbetreibender gemäß § 34c GewO (Immobilienmakler).
                Zuständige Behörde:{" "}
                <span className="text-[#C5A028] font-medium">
                  [zuständige Gewerbebehörde – bitte eintragen]
                </span>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                EU-Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900 transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Verbraucherstreitbeilegung
              </h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
