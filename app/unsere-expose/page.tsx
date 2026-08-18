import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ExposeCard from "@/components/expose-card";
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
                <ExposeCard key={listing.titel} listing={listing} />
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .expose-card {
          display: flex;
          flex-direction: column;
          background-color: #FFFCF7;
          border: 1.5px solid #B8860B;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          transition: transform 400ms cubic-bezier(0.4,0,0.2,1), box-shadow 400ms cubic-bezier(0.4,0,0.2,1);
        }
        .expose-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(44,26,14,0.12); }

        .expose-card-header {
          display: flex;
          align-items: center;
          height: 72px;
          padding: 0 28px;
          background-color: #2C1A0E;
        }

        .expose-card-cover { position: relative; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; }
        .expose-card-cover img { transition: transform 600ms cubic-bezier(0.4,0,0.2,1); }
        .expose-card:hover .expose-card-cover img { transform: scale(1.06); }

        .expose-card-body { display: flex; flex-direction: column; gap: 16px; flex-grow: 1; padding: 28px 32px 32px; }
        .expose-card-title { font-family: var(--font-dm-serif, serif); font-size: 1.3rem; color: #2C1A0E; margin: 0; }
        .expose-card-desc { font-size: 15px; color: #7A6548; line-height: 1.75; font-weight: 300; margin: 0; flex-grow: 1; }

        .expose-card-action { display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding-top:20px;border-top:1px solid #E8D9C5;font-size:12.5px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#B8860B;transition:color 400ms cubic-bezier(0.4,0,0.2,1); }
        .expose-card-arrow { display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#F5EDE0;color:#B8860B;flex-shrink:0;transition:all 400ms cubic-bezier(0.4,0,0.2,1); }
        .expose-card:hover .expose-card-action { color:#8A6206; }
        .expose-card:hover .expose-card-arrow { background:linear-gradient(135deg,#B8860B,#D4A017);color:#fff;transform:translateX(4px);box-shadow:0 6px 18px rgba(184,134,11,0.35); }
      `}</style>
    </>
  );
}
