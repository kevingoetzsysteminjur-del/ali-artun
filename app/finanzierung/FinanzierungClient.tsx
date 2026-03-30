"use client";
import { useState } from "react";
import Link from "next/link";

const tabs = [
  { id: "kfw-beratung", label: "KFW-Beratung", icon: "🏛️", title: "KFW-Beratung", content: "Als freier Makler beraten wir Sie zu allen KFW-Förderprogrammen – unabhängig und ohne Provision. Wir analysieren Ihre Situation und finden das passende Programm.", bullets: ["Beratung zu allen aktuellen KFW-Programmen", "Für Neubau und energetische Sanierung", "Kostenfrei und unverbindlich", "Antragstellung auf Wunsch"] },
  { id: "kfw-kredite", label: "KFW-Kredite", icon: "💰", title: "KFW-Kreditprogramme", content: "KFW-Kredite bieten besonders günstige Zinssätze und lange Laufzeiten. Wir helfen Ihnen, das richtige Programm zu identifizieren und den Antrag erfolgreich zu stellen.", bullets: ["KFW 261 – Bundesförderung Energieeffizienz", "KFW 300 – Klimafreundlicher Neubau", "KFW 151/152 – Energetische Sanierung", "Laufzeiten bis zu 30 Jahre"] },
  { id: "bafa", label: "BAFA Förderung", icon: "🌱", title: "BAFA Einzelmaßnahmen", content: "Das Bundesamt für Wirtschaft und Ausfuhrkontrolle fördert energetische Einzelmaßnahmen an Bestandsgebäuden mit attraktiven Zuschüssen.", bullets: ["Heizungsoptimierung & Wärmepumpe", "Dämmung von Fassade, Dach und Keller", "Fenster- und Türenaustausch", "Lüftungsanlagen & Klimatisierung"] },
  { id: "staatlich", label: "Staatliche Förderung", icon: "🏛️", title: "Staatliche Förderprogramme", content: "Neben KFW und BAFA gibt es zahlreiche weitere Förderprogramme auf Bundes- und Landesebene. Wir beraten Sie zu allen verfügbaren Möglichkeiten.", bullets: ["Bundesförderung für effiziente Gebäude (BEG)", "Landesförderprogramme Baden-Württemberg", "Kombinationsmöglichkeiten optimal nutzen", "Aktuelle Fördersätze bis zu 45%"] },
  { id: "privatkredite", label: "Privatkredite", icon: "📊", title: "Privatkreditvergleich", content: "Wir vergleichen für Sie alle am Markt verfügbaren Privatkredit-Anbieter und finden den günstigsten Zinssatz für Ihre individuelle Situation.", bullets: ["Vergleich aller verfügbaren Anbieter", "Günstigster Zinssatz für Ihre Situation", "Schnelle Bearbeitung und Auszahlung", "Ohne Schufa-Beeinträchtigung beim Vergleich"] },
  { id: "modernisierung", label: "Modernisierung", icon: "🔧", title: "Modernisierungsdarlehen", content: "Günstige Kredite speziell für Modernisierungsmaßnahmen am Bestandsobjekt. Lange Laufzeiten ermöglichen niedrige monatliche Raten.", bullets: ["Für alle Modernisierungsmaßnahmen geeignet", "Laufzeiten bis zu 20 Jahre", "Keine Grundbucheintragung erforderlich", "Schnelle Genehmigung in 48 Stunden"] },
];

export default function FinanzierungClient() {
  const [active, setActive] = useState("kfw-beratung");
  const [kaufpreis, setKaufpreis] = useState(300000);
  const [eigenkapital, setEigenkapital] = useState(60000);
  const [zinssatz, setZinssatz] = useState(3.5);
  const [laufzeit, setLaufzeit] = useState(25);

  const tab = tabs.find((t) => t.id === active)!;
  const darlehen = kaufpreis - eigenkapital;
  const monatlicheRate = Math.round((darlehen * (zinssatz / 100)) / 12 + darlehen / (laufzeit * 12));

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#1B3A4B 0%,#0e2230 100%)", padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid #C8A96E", opacity: 0.05 }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", position: "relative" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>FINANZIERUNG & FÖRDERUNG</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", maxWidth: "700px" }}>
            Den günstigsten{" "}<span style={{ color: "#C8A96E" }}>Kredit für Sie.</span>
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: "520px", marginBottom: "12px", fontWeight: 300 }}>
            Als freier Makler vergleichen wir den gesamten Markt für Sie. Unabhängig, unverbindlich, kostenlos.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(200,169,110,0.7)", marginBottom: "36px" }}>Beratung überwiegend digital möglich.</p>
          <Link href="/kontakt?betreff=Finanzierung"
            style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            Jetzt kostenlos beraten lassen
          </Link>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>UNSERE LEISTUNGEN</p>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1A1A1A", marginBottom: "40px" }}>Alle Finanzierungsoptionen.</h2>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", borderBottom: "2px solid #F0EDE8", marginBottom: "48px" }}>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "12px 20px", fontSize: "13px", fontWeight: active === t.id ? 500 : 400, color: active === t.id ? "#1B3A4B" : "#6B7280", border: "none", borderBottom: active === t.id ? "2px solid #C8A96E" : "2px solid transparent", background: "transparent", cursor: "pointer", marginBottom: "-2px", transition: "color 0.2s" }}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }} className="tab-content-grid">
            <div>
              <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", color: "#1A1A1A", marginBottom: "16px" }}>{tab.title}</h3>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.8, fontWeight: 300, marginBottom: "28px" }}>{tab.content}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
                {tab.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "14px", color: "#374151", fontWeight: 300 }}>
                    <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>
                    </span>
                    {b}
                  </div>
                ))}
              </div>
              <Link href="/kontakt?betreff=Finanzierung"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
                Jetzt beraten lassen →
              </Link>
            </div>
            <div style={{ backgroundColor: "#F7F5F2", borderRadius: "16px", padding: "32px" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "8px" }}>PLAN A VORTEIL</p>
              <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.4 }}>
                „Wir vergleichen den gesamten Markt – kostenlos und unabhängig."
              </p>
              <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, marginBottom: "24px" }}>
                Als freier Makler sind wir an keine Bank gebunden. Das bedeutet: Wir arbeiten ausschließlich in Ihrem Interesse.
              </p>
              <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "20px" }}>
                <p style={{ fontSize: "14px", color: "#16A34A", fontWeight: 500 }}>✓ Kostenlos & unverbindlich</p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.tab-content-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Rechner */}
      <section style={{ backgroundColor: "#F7F5F2", padding: "80px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>FINANZIERUNGSRECHNER</p>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#1A1A1A", marginBottom: "8px" }}>Wie viel kostet Ihre Finanzierung?</h2>
          <p style={{ fontSize: "14px", color: "#9CA3AF", marginBottom: "48px" }}>Orientierungswert – für ein persönliches Angebot kontaktieren Sie uns.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }} className="rechner-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              {([
                { label: "Kaufpreis", value: kaufpreis, min: 50000, max: 2000000, step: 10000, set: setKaufpreis, format: (v: number) => `${v.toLocaleString("de-DE")} €` },
                { label: "Eigenkapital", value: eigenkapital, min: 0, max: kaufpreis, step: 5000, set: setEigenkapital, format: (v: number) => `${v.toLocaleString("de-DE")} €` },
                { label: "Zinssatz (% p.a.)", value: zinssatz, min: 1, max: 8, step: 0.1, set: setZinssatz, format: (v: number) => `${v.toFixed(1)} %` },
                { label: "Laufzeit (Jahre)", value: laufzeit, min: 5, max: 35, step: 1, set: setLaufzeit, format: (v: number) => `${v} Jahre` },
              ] as Array<{ label: string; value: number; min: number; max: number; step: number; set: (v: number) => void; format: (v: number) => string }>).map((s) => (
                <div key={s.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>{s.label}</label>
                    <span style={{ fontSize: "13px", color: "#C8A96E", fontWeight: 500 }}>{s.format(s.value)}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                    onChange={(e) => s.set(Number(e.target.value))} className="gold-slider"
                    style={{ width: "100%", height: "4px", background: `linear-gradient(to right, #C8A96E ${((s.value - s.min) / (s.max - s.min)) * 100}%, #E5E7EB ${((s.value - s.min) / (s.max - s.min)) * 100}%)`, borderRadius: "4px", outline: "none" }} />
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#1B3A4B", borderRadius: "20px", padding: "40px", textAlign: "center" }}>
              <p style={{ fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "8px" }}>MONATLICHE RATE</p>
              <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "3.5rem", color: "#FFFFFF", lineHeight: 1, marginBottom: "4px" }}>{monatlicheRate.toLocaleString("de-DE")}</div>
              <p style={{ fontSize: "16px", color: "#C8A96E", marginBottom: "32px" }}>€ / Monat</p>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { label: "Darlehensbetrag", value: `${darlehen.toLocaleString("de-DE")} €` },
                  { label: "Zinssatz", value: `${zinssatz.toFixed(1)} % p.a.` },
                  { label: "Laufzeit", value: `${laufzeit} Jahre` },
                ].map((r) => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{r.label}</span>
                    <span style={{ fontSize: "13px", color: "#fff", fontWeight: 500 }}>{r.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/kontakt?betreff=Finanzierung"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "28px", padding: "14px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
                Persönliches Angebot anfragen →
              </Link>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", marginTop: "12px" }}>Orientierungswert ohne Gewähr</p>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.rechner-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </>
  );
}
