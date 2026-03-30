import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata = { title: "AGB", description: "Allgemeine Geschäftsbedingungen der Plan A Immobilien & Finanzierung" };

export default function AgbPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: "linear-gradient(135deg,#2C1A0E,#1A0E05)", padding: "100px 0 60px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", color: "#D4A017", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>RECHTLICHES</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>Allgemeine Geschäftsbedingungen</h1>
          </div>
        </section>
        <section style={{ backgroundColor: "#fff", padding: "60px 0 80px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }} className="artikel-inhalt">
            <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Leistungen von Plan A Immobilien & Finanzierung, vertreten durch Ali Artun, Mosbacher Str. 75, 74821 Mosbach.</p>
            <h2>§ 1 Geltungsbereich</h2>
            <p>Diese AGB gelten für alle Verträge zwischen Plan A Immobilien & Finanzierung und dem Kunden. Abweichende Bedingungen des Kunden werden nicht anerkannt.</p>
            <h2>§ 2 Leistungsumfang</h2>
            <p>Plan A Immobilien & Finanzierung bietet Dienstleistungen im Bereich Immobilienvermittlung (§34c GewO) und Finanzierungsvermittlung (§34i GewO) an. Der genaue Leistungsumfang wird im jeweiligen Vertrag geregelt.</p>
            <h2>§ 3 Provision</h2>
            <p>Die Provisionshöhe und -fälligkeit wird im jeweiligen Maklervertrag individuell geregelt. Eine Provision ist nur bei erfolgreichem Vertragsabschluss fällig.</p>
            <h2>§ 4 Haftung</h2>
            <p>Plan A Immobilien & Finanzierung haftet nur für Schäden, die durch vorsätzliches oder grob fahrlässiges Handeln entstanden sind. Eine Haftung für leichte Fahrlässigkeit ist ausgeschlossen.</p>
            <h2>§ 5 Datenschutz</h2>
            <p>Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung und den gesetzlichen Bestimmungen der DSGVO.</p>
            <h2>§ 6 Schlussbestimmungen</h2>
            <p>Es gilt deutsches Recht. Gerichtsstand ist Mosbach. Sollten einzelne Bestimmungen dieser AGB unwirksam sein, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht.</p>
            <p><em>Stand: März 2026</em></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
