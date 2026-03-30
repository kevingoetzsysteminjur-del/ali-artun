import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Datenschutzerklärung – Plan A Immobilien & Finanzierung",
  robots: "noindex, nofollow",
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FFFCF7] pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-bold text-stone-900 mb-10">
            Datenschutzerklärung
          </h1>

          <div className="space-y-10 text-stone-700 text-lg leading-[1.75]">
            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="font-semibold text-stone-900 mb-2">
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können. Ausführliche
                Informationen zum Thema Datenschutz entnehmen Sie unserer unter
                diesem Text aufgeführten Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                2. Verantwortliche Stelle
              </h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="mt-3">
                Ali Artun
                <br />
                Plan A Immobilien &amp; Finanzierung
                <br />
                Mosbacher Str. 75, 74821 Mosbach
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:Info@plana-immobilien-finanzierung.com"
                  className="underline hover:text-stone-900 transition-colors"
                >
                  Info@plana-immobilien-finanzierung.com
                </a>
                <br />
                Telefon: 0173-6259429
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                3. Datenerfassung auf dieser Website
              </h2>
              <h3 className="font-semibold text-stone-900 mb-2">
                Wer ist verantwortlich für die Datenerfassung?
              </h3>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                dieser Website entnehmen.
              </p>

              <h3 className="font-semibold text-stone-900 mt-5 mb-2">
                Wie erfassen wir Ihre Daten?
              </h3>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
                mitteilen, z. B. durch Eingabe in unser Kontaktformular. Andere
                Daten werden automatisch oder nach Ihrer Einwilligung beim
                Besuch der Website durch unsere IT-Systeme erfasst. Das sind
                vor allem technische Daten (z. B. Internetbrowser,
                Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>

              <h3 className="font-semibold text-stone-900 mt-5 mb-2">
                Wofür nutzen wir Ihre Daten?
              </h3>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie
                Bereitstellung der Website zu gewährleisten. Andere Daten
                können zur Analyse Ihres Nutzerverhaltens oder zur
                Kontaktaufnahme verwendet werden.
              </p>

              <h3 className="font-semibold text-stone-900 mt-5 mb-2">
                Welche Rechte haben Sie bezüglich Ihrer Daten?
              </h3>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                Herkunft, Empfänger und Zweck Ihrer gespeicherten
                personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                Recht, die Berichtigung oder Löschung dieser Daten zu
                verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung
                erteilt haben, können Sie diese Einwilligung jederzeit für die
                Zukunft widerrufen. Außerdem haben Sie das Recht, unter
                bestimmten Umständen die Einschränkung der Verarbeitung Ihrer
                personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen
                ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                4. Hosting
              </h2>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen
                Daten, die auf dieser Website erfasst werden, werden auf den
                Servern des Hosters gespeichert. Hierbei kann es sich v. a. um
                IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und
                sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p className="mt-3">
                Die Verwendung des Hosters erfolgt zum Zwecke der
                Vertragserfüllung gegenüber unseren potenziellen und
                bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im
                Interesse einer sicheren, schnellen und effizienten
                Bereitstellung unseres Online-Angebots durch einen
                professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                5. Kontaktformular
              </h2>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen,
                werden Ihre Angaben aus dem Anfrageformular inklusive der von
                Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                Anfrage und für den Fall von Anschlussfragen bei uns
                gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung
                weiter.
              </p>
              <p className="mt-3">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6
                Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung
                eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen
                Fällen beruht die Verarbeitung auf unserem berechtigten
                Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese
                abgefragt wurde.
              </p>
              <p className="mt-3">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben
                bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung
                zur Speicherung widerrufen oder der Zweck für die
                Datenspeicherung entfällt (z. B. nach abgeschlossener
                Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen
                – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                6. Ihre Rechte
              </h2>
              <p>
                Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
                betreffenden personenbezogenen Daten:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                <li>
                  Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
                </li>
                <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
              </ul>
              <p className="mt-3">
                Sie haben außerdem das Recht, sich bei einer
                Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
                personenbezogenen Daten durch uns zu beschweren. Zuständige
                Aufsichtsbehörde in Baden-Württemberg ist der Landesbeauftragte
                für Datenschutz und Informationsfreiheit Baden-Württemberg
                (LfDI BW).
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-stone-900 mb-3">
                7. Cookies
              </h2>
              <p>
                Diese Website verwendet keine Tracking-Cookies. Technisch
                notwendige Cookies, die für den Betrieb der Website erforderlich
                sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
                gesetzt. Ein Widerspruch ist möglich, sofern nicht zwingende
                schutzwürdige Gründe unsererseits überwiegen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
