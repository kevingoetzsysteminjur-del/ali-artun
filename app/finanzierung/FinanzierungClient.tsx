"use client";
import { useState } from "react";
import Link from "next/link";

const tabs = [
  {
    id: "kfw-beratung",
    label: "KFW-Beratung",
    title: "KFW-Beratung",
    content: "Wir beraten Sie zu allen KFW-Förderprogrammen für Neubau und Sanierung – unabhängig und unverbindlich. Als freier Makler vergleichen wir den gesamten Markt für Sie.",
    bullets: [
      "Beratung zu KFW-Programmen für Neubau",
      "Fördermöglichkeiten für energetische Sanierung",
      "Unabhängig und kostenlos",
    ],
  },
  {
    id: "kfw-kredite",
    label: "KFW-Kredite",
    title: "KFW-Kreditprogramme",
    content: "KFW-Kredite bieten besonders günstige Zinssätze für Neubauten und Sanierungen. Wir helfen Ihnen, das richtige Programm zu finden und den Antrag zu stellen.",
    bullets: [
      "Neubauprogramme (KFW 261, KFW 300)",
      "Sanierungsprogramme (KFW 261, KFW 151/152)",
      "Zinsgünstige Laufzeiten bis 30 Jahre",
    ],
  },
  {
    id: "bafa",
    label: "BAFA Einzelmaßnahmen",
    title: "BAFA Einzelmaßnahmen",
    content: "Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) fördert energetische Einzelmaßnahmen an Bestandsgebäuden. Wir beraten Sie, welche Maßnahmen förderfähig sind.",
    bullets: [
      "Heizungsoptimierung und -tausch",
      "Dämmung von Fassade, Dach und Keller",
      "Fenster- und Türenaustausch",
    ],
  },
  {
    id: "staatlich",
    label: "Staatliche Förderung",
    title: "Staatliche Förderungen",
    content: "Neben KFW und BAFA gibt es weitere staatliche Förderprogramme auf Bundes- und Landesebene. Wir beraten Sie zu allen verfügbaren Förderprogrammen.",
    bullets: [
      "Bundesförderung für effiziente Gebäude (BEG)",
      "Landesförderprogramme Baden-Württemberg",
      "Kombinationsmöglichkeiten verschiedener Programme",
    ],
  },
  {
    id: "privatkredite",
    label: "Privatkredite",
    title: "Privatkreditvergleich",
    content: "Wir vergleichen für Sie die am Markt verfügbaren Kredite und finden den günstigsten Zinssatz. Schnell, transparent und ohne versteckte Kosten.",
    bullets: [
      "Vergleich aller verfügbaren Anbieter",
      "Günstigster Zinssatz für Ihre Situation",
      "Schnelle Bearbeitung und Auszahlung",
    ],
  },
  {
    id: "modernisierung",
    label: "Modernisierungsdarlehen",
    title: "Modernisierungsdarlehen",
    content: "Kredite für Modernisierungen am Bestandsobjekt. Lange Laufzeiten und niedrige Raten machen Modernisierungen planbar und erschwinglich.",
    bullets: [
      "Lange Laufzeiten für niedrige Monatsraten",
      "Für alle Modernisierungsmaßnahmen geeignet",
      "Schnelle Genehmigung ohne Grundbucheintrag",
    ],
  },
];

export default function FinanzierungClient() {
  const [active, setActive] = useState("kfw-beratung");
  const tab = tabs.find((t) => t.id === active)!;

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#F7F5F2", paddingTop: "60px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>FINANZIERUNG</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.2 }}>
            Finanzierungsberatung
          </h1>
          <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, maxWidth: "520px", fontWeight: 300 }}>
            Plan A berät Sie unabhängig und unverbindlich. Als freier Makler vergleichen wir den gesamten Markt für Sie.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ backgroundColor: "#FFFFFF", paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          {/* Tab Navigation */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "48px", borderBottom: "1px solid #E5E7EB", paddingBottom: "0" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                style={{
                  padding: "12px 20px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: active === t.id ? "#1B3A4B" : "#6B7280",
                  border: "none",
                  borderBottom: active === t.id ? "2px solid #C8A96E" : "2px solid transparent",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                  marginBottom: "-1px",
                  letterSpacing: "0.02em",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ maxWidth: "720px" }}>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#1A1A1A", marginBottom: "16px" }}>{tab.title}</h2>
            <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, fontWeight: 300, marginBottom: "28px" }}>{tab.content}</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
              {tab.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: "#374151", fontWeight: 300 }}>
                  <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 12 10">
                      <polyline points="1 5 4 8 11 1"/>
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href="/kontakt?betreff=Finanzierung" className="btn-primary">Jetzt anfragen</Link>
          </div>
        </div>
      </section>
    </>
  );
}
