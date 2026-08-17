import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { exposeListings } from "@/lib/expose-listings";

export const metadata = {
  title: "Unsere Exposés",
  description: "Alle aktuellen Objekt-Exposés von Plan A Immobilien & Finanzierung – digital, übersichtlich und jederzeit abrufbar.",
};

export default function UnsereExposePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #B8860B", opacity: 0.05, pointerEvents: "none" }} />
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>OBJEKTDOKUMENTATION</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "0", maxWidth: "640px" }}>
              Unsere <span style={{ color: "#B8860B" }}>Exposés.</span>
            </h1>
          </div>
        </section>

        {/* Was ist ein Exposé */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "80px 0" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: "#2C1A0E", marginBottom: "24px" }}>
              Was ist ein Exposé?
            </h2>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, marginBottom: "20px" }}>
              Ein Exposé ist die vollständige, professionell aufbereitete Objektdokumentation zu einer Immobilie — mit hochwertigen Fotos, maßstabsgetreuen Grundrissen, allen relevanten Eckdaten und dem amtlichen Energieausweis. Es gibt Ihnen alles an die Hand, um eine Immobilie in Ruhe zu prüfen, bevor ein Besichtigungstermin ansteht.
            </p>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
              Bei Plan A Immobilien &amp; Finanzierung erhalten Sie jedes Exposé mit amtlich geprüften Angaben zur Aufteilung, klar strukturierten Grundrissen im eigenen Design und allen Unterlagen an einem Ort — digital, übersichtlich und jederzeit abrufbar.
            </p>
          </div>
        </section>

        {/* Aktuelle Exposés */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "80px 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px", textAlign: "center" }}>OBJEKTE</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#2C1A0E", marginBottom: "56px", textAlign: "center" }}>
              Aktuelle Exposés
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" }}>
              {exposeListings.map((listing) => (
                <div key={listing.titel} style={{ backgroundColor: "#FFFCF7", border: "1px solid #E8D9C5", borderRadius: "20px", padding: "36px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#2C1A0E", margin: 0 }}>
                    {listing.titel}
                  </h3>
                  <p style={{ fontSize: "15px", color: "#7A6548", lineHeight: 1.75, fontWeight: 300, margin: 0, flexGrow: 1 }}>
                    {listing.kurzbeschreibung}
                  </p>
                  <a href={listing.url} target="_blank" rel="noopener noreferrer" className="cta-btn" style={{ alignSelf: "flex-start" }}>
                    {listing.buttonLabel ?? "Exposé ansehen"}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .cta-btn { display:inline-flex;align-items:center;gap:8px;padding:14px 30px;background:linear-gradient(135deg,#B8860B,#D4A017);color:#fff;border-radius:60px;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;box-shadow:0 4px 25px rgba(184,134,11,0.25);transition:all 400ms cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { background:linear-gradient(135deg,#D4A017,#E8B820);transform:scale(1.03); }
      `}</style>
    </>
  );
}
