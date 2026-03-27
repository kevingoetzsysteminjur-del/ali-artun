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
                Mosbacher Str. 75
                <br />
                74821 Mosbach
              </p>
              <p className="mt-3 text-stone-500 text-base italic">
                Hinweis: Die Geschäftsadresse kann sich in den kommenden Monaten ändern.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Kontakt
              </h2>
              <p>
                Telefon: 0173-6259429
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:Info@plana-immobilien-finanzierung.com"
                  className="underline hover:text-stone-900 transition-colors"
                >
                  Info@plana-immobilien-finanzierung.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Steuernummer
              </h2>
              <p>40154/31132</p>
            </div>

            <div>
              <h2 className="font-semibold text-stone-900 text-xl mb-2">
                Berufsrechtliche Regelungen
              </h2>
              <p>
                Erlaubnis nach § 34c Absatz 1 Satz 1 GewO (Immobilienmakler)
                <br />
                Erlaubnis nach § 34i Abs. 1 S. 1 GewO (Immobiliendarlehensvermittler)
                <br />
                Registrierungsnummer: D-W-153-TH95-12
                <br />
                Aufsichtsbehörde: IHK Rhein-Neckar
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
