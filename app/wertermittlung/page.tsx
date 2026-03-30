"use client";
import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

/* ─── Price estimation ────────────────────────────────────────── */
function estimate(plz: string, typ: string, flaeche: number, zustand: string, lage: string, extras: string[]) {
  const pre = plz.substring(0, 2);
  const baseMap: Record<string, number> = { "74": 2200, "69": 3500, "70": 4000, "68": 3000, "75": 2400, "71": 2600, "73": 2300 };
  let base = baseMap[pre] ?? 2500;
  const typMap: Record<string, number> = { "Eigentumswohnung": 1.0, "Einfamilienhaus": 1.2, "Mehrfamilienhaus": 1.5, "Grundstück": 0.4, "Gewerbe": 0.8 };
  base *= typMap[typ] ?? 1;
  const zustandMap: Record<string, number> = { "Neubau": 1.25, "Saniert": 1.1, "Gepflegt": 1.0, "Renovierungsbedürftig": 0.8 };
  base *= zustandMap[zustand] ?? 1;
  const lageMap: Record<string, number> = { "Stadtzentrum": 1.15, "Stadtrand": 1.0, "Ländlich": 0.9 };
  base *= lageMap[lage] ?? 1;
  if (extras.includes("Garten")) base *= 1.05;
  if (extras.includes("Garage")) base *= 1.03;
  const mid = Math.round((base * flaeche) / 1000) * 1000;
  return { low: Math.round(mid * 0.85 / 1000) * 1000, high: Math.round(mid * 1.15 / 1000) * 1000, sqm: Math.round(base) };
}

const TYPEN = ["Eigentumswohnung", "Einfamilienhaus", "Mehrfamilienhaus", "Grundstück", "Gewerbe"];
const ZUSTAND = ["Neubau", "Saniert", "Gepflegt", "Renovierungsbedürftig"];
const LAGE = ["Stadtzentrum", "Stadtrand", "Ländlich"];
const EXTRAS = ["Garten", "Garage", "Balkon", "Keller", "Aufzug"];

export default function WertermittlungPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [typ, setTyp] = useState("");
  const [flaeche, setFlaeche] = useState(100);
  const [grundstueck, setGrundstueck] = useState(500);
  const [zimmer, setZimmer] = useState(3);
  const [baujahr, setBaujahr] = useState(1990);
  const [zustand, setZustand] = useState("Gepflegt");
  const [plz, setPlz] = useState("");
  const [ort, setOrt] = useState("");
  const [lage, setLage] = useState("Stadtrand");
  const [extras, setExtras] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [wann, setWann] = useState("Jederzeit");
  const [datenschutz, setDatenschutz] = useState(false);

  const result = typ && plz ? estimate(plz, typ, flaeche, zustand, lage, extras) : null;

  const toggleExtra = (e: string) => setExtras(ex => ex.includes(e) ? ex.filter(x => x !== e) : [...ex, e]);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 3000);
  };

  const inp = { padding: "11px 14px", border: "1px solid #E8D9C5", borderRadius: "8px", fontSize: "14px", color: "#2C1A0E", outline: "none", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300, width: "100%", boxSizing: "border-box" as const };
  const lbl = { fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#7A6548", display: "block", marginBottom: "6px" };

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: "linear-gradient(135deg,#2C1A0E 0%,#1A0E05 100%)", padding: "120px 0 80px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4A017", marginBottom: "16px" }}>KOSTENFREI & UNVERBINDLICH</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.1, marginBottom: "16px" }}>
              Was ist Ihre Immobilie <span style={{ color: "#D4A017" }}>wert?</span>
            </h1>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>Kostenlose Schätzung in 3 Minuten. Ein Plan A Berater meldet sich innerhalb von 24 Stunden.</p>
          </div>
        </section>

        {/* Context */}
        <section style={{ backgroundColor: "#FFFCF7", padding: "48px 0 0" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, maxWidth: "700px", margin: "0 auto" }}>
              Wie viel ist Ihre Immobilie wirklich wert? Unsere kostenlose Wertermittlung gibt Ihnen eine fundierte Einschätzung innerhalb von 24 Stunden. Unverbindlich und persönlich.
            </p>
          </div>
        </section>

        {/* Form */}
        <section style={{ backgroundColor: "#F5EDE0", padding: "64px 0 96px" }}>
          <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>

            {/* Progress bar */}
            {!done && !loading && (
              <div style={{ marginBottom: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#A89070" }}>Schritt {step} von 4</span>
                  <span style={{ fontSize: "12px", color: "#D4A017", fontWeight: 500 }}>{Math.round((step / 4) * 100)}%</span>
                </div>
                <div style={{ height: "4px", backgroundColor: "#E8D9C5", borderRadius: "4px" }}>
                  <div style={{ height: "100%", backgroundColor: "#D4A017", borderRadius: "4px", width: `${(step / 4) * 100}%`, transition: "width 0.4s ease" }} />
                </div>
              </div>
            )}

            <div style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #E8D9C5" }}>

              {/* Loading */}
              {loading && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: "4px solid #F5EDE0", borderTopColor: "#D4A017", animation: "spin 1s linear infinite", margin: "0 auto 24px" }} />
                  <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.4rem", color: "#2C1A0E", marginBottom: "8px" }}>Analysiere Marktdaten...</p>
                  <p style={{ fontSize: "14px", color: "#A89070", fontWeight: 300 }}>Vergleiche aktuelle Angebote in Ihrer Region.</p>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              )}

              {/* Result */}
              {done && result && (
                <div>
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#D4A017", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <svg width="24" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
                    </div>
                    <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A017", marginBottom: "8px" }}>GESCHÄTZTE PREISSPANNE</p>
                    <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#2C1A0E", marginBottom: "4px" }}>
                      {result.low.toLocaleString("de-DE")} € – {result.high.toLocaleString("de-DE")} €
                    </p>
                    <p style={{ fontSize: "14px", color: "#7A6548", fontWeight: 300 }}>Ø m²-Preis in Ihrer Region: ca. {result.sqm.toLocaleString("de-DE")} €</p>
                  </div>
                  <div style={{ backgroundColor: "#F5EDE0", borderRadius: "14px", padding: "24px", marginBottom: "24px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div><p style={{ fontSize: "11px", color: "#A89070", margin: "0 0 4px" }}>Objektart</p><p style={{ fontSize: "14px", fontWeight: 500, color: "#2C1A0E", margin: 0 }}>{typ}</p></div>
                      <div><p style={{ fontSize: "11px", color: "#A89070", margin: "0 0 4px" }}>Wohnfläche</p><p style={{ fontSize: "14px", fontWeight: 500, color: "#2C1A0E", margin: 0 }}>{flaeche} m²</p></div>
                      <div><p style={{ fontSize: "11px", color: "#A89070", margin: "0 0 4px" }}>Zustand</p><p style={{ fontSize: "14px", fontWeight: 500, color: "#2C1A0E", margin: 0 }}>{zustand}</p></div>
                      <div><p style={{ fontSize: "11px", color: "#A89070", margin: "0 0 4px" }}>PLZ / Lage</p><p style={{ fontSize: "14px", fontWeight: 500, color: "#2C1A0E", margin: 0 }}>{plz} · {lage}</p></div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: "12px", padding: "16px 20px", marginBottom: "28px" }}>
                    <p style={{ fontSize: "13px", color: "#2C1A0E", fontWeight: 400, margin: 0, lineHeight: 1.6 }}>
                      ✓ Für eine <strong>exakte Bewertung</strong> kontaktiert Sie ein Plan A Berater innerhalb von 24 Stunden.<br />
                      <span style={{ fontSize: "12px", color: "#A89070", fontWeight: 300 }}>Diese Schätzung ersetzt kein professionelles Gutachten.</span>
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button onClick={() => { setStep(1); setDone(false); setTyp(""); }}
                      style={{ padding: "14px 24px", backgroundColor: "transparent", border: "1.5px solid #E8D9C5", borderRadius: "50px", fontSize: "14px", color: "#7A6548", cursor: "pointer" }}>
                      Neue Bewertung
                    </button>
                  </div>
                </div>
              )}

              {/* Step 1 */}
              {!loading && !done && step === 1 && (
                <div>
                  <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#2C1A0E", marginBottom: "8px" }}>Was möchten Sie bewerten?</h2>
                  <p style={{ fontSize: "14px", color: "#A89070", marginBottom: "28px", fontWeight: 300 }}>Wählen Sie die Objektart aus.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {TYPEN.map(t => (
                      <button key={t} onClick={() => { setTyp(t); if (step === 1) setStep(2); }}
                        style={{ padding: "20px", border: `2px solid ${typ === t ? "#2C1A0E" : "#E8D9C5"}`, borderRadius: "14px", backgroundColor: typ === t ? "#F0F4F7" : "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                        <div style={{ fontSize: "24px", marginBottom: "8px" }}>
                          {t === "Eigentumswohnung" ? "🏢" : t === "Einfamilienhaus" ? "🏠" : t === "Mehrfamilienhaus" ? "🏘️" : t === "Grundstück" ? "🌿" : "🏪"}
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: typ === t ? 500 : 400, color: "#2C1A0E", margin: 0 }}>{t}</p>
                      </button>
                    ))}
                  </div>
                  {typ && (
                    <button onClick={next} style={{ marginTop: "24px", padding: "14px 32px", backgroundColor: "#D4A017", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                      Weiter →
                    </button>
                  )}
                </div>
              )}

              {/* Step 2 */}
              {!loading && !done && step === 2 && (
                <div>
                  <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#2C1A0E", marginBottom: "8px" }}>Details zur Immobilie</h2>
                  <p style={{ fontSize: "14px", color: "#A89070", marginBottom: "28px", fontWeight: 300 }}>{typ} · Grunddaten</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Wohnfläche */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <label style={{ ...lbl, marginBottom: 0 }}>Wohnfläche</label>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#D4A017" }}>{flaeche} m²</span>
                      </div>
                      <input type="range" min={30} max={500} step={5} value={flaeche} onChange={e => setFlaeche(Number(e.target.value))}
                        style={{ width: "100%", height: "4px", background: `linear-gradient(to right,#D4A017 ${((flaeche-30)/470)*100}%,#E8D9C5 ${((flaeche-30)/470)*100}%)`, outline: "none", borderRadius: "4px" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#A89070", marginTop: "4px" }}>
                        <span>30 m²</span><span>500 m²</span>
                      </div>
                    </div>
                    {/* Zimmer */}
                    <div>
                      <label style={lbl}>Zimmer</label>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {[1,2,3,4,5,6,7,8,9,10].map(z => (
                          <button key={z} onClick={() => setZimmer(z)}
                            style={{ width: "44px", height: "44px", borderRadius: "10px", border: `2px solid ${zimmer === z ? "#2C1A0E" : "#E8D9C5"}`, backgroundColor: zimmer === z ? "#2C1A0E" : "#fff", color: zimmer === z ? "#fff" : "#2C1A0E", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                            {z}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Baujahr */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <label style={{ ...lbl, marginBottom: 0 }}>Baujahr</label>
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#D4A017" }}>{baujahr}</span>
                      </div>
                      <input type="range" min={1900} max={2026} step={1} value={baujahr} onChange={e => setBaujahr(Number(e.target.value))}
                        style={{ width: "100%", height: "4px", background: `linear-gradient(to right,#D4A017 ${((baujahr-1900)/126)*100}%,#E8D9C5 ${((baujahr-1900)/126)*100}%)`, outline: "none", borderRadius: "4px" }} />
                    </div>
                    {/* Zustand */}
                    <div>
                      <label style={lbl}>Zustand</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        {ZUSTAND.map(z => (
                          <button key={z} onClick={() => setZustand(z)}
                            style={{ padding: "12px", border: `2px solid ${zustand === z ? "#2C1A0E" : "#E8D9C5"}`, borderRadius: "10px", backgroundColor: zustand === z ? "#F0F4F7" : "#fff", cursor: "pointer", fontSize: "13px", fontWeight: zustand === z ? 500 : 300, color: "#2C1A0E" }}>
                            {z}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                    <button onClick={back} style={{ padding: "13px 24px", backgroundColor: "transparent", border: "1.5px solid #E8D9C5", borderRadius: "50px", fontSize: "14px", color: "#7A6548", cursor: "pointer" }}>← Zurück</button>
                    <button onClick={next} style={{ padding: "13px 28px", backgroundColor: "#D4A017", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>Weiter →</button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {!loading && !done && step === 3 && (
                <div>
                  <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#2C1A0E", marginBottom: "8px" }}>Lage & Ausstattung</h2>
                  <p style={{ fontSize: "14px", color: "#A89070", marginBottom: "28px", fontWeight: 300 }}>Wo befindet sich Ihre Immobilie?</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div><label style={lbl}>PLZ</label><input style={inp} value={plz} onChange={e => setPlz(e.target.value)} placeholder="z. B. 74821" maxLength={5} /></div>
                      <div><label style={lbl}>Ort</label><input style={inp} value={ort} onChange={e => setOrt(e.target.value)} placeholder="z. B. Mosbach" /></div>
                    </div>
                    <div>
                      <label style={lbl}>Lage</label>
                      <div style={{ display: "flex", gap: "10px" }}>
                        {LAGE.map(l => (
                          <button key={l} onClick={() => setLage(l)}
                            style={{ flex: 1, padding: "12px 8px", border: `2px solid ${lage === l ? "#2C1A0E" : "#E8D9C5"}`, borderRadius: "10px", backgroundColor: lage === l ? "#F0F4F7" : "#fff", cursor: "pointer", fontSize: "13px", fontWeight: lage === l ? 500 : 300, color: "#2C1A0E" }}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>Extras</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {EXTRAS.map(ex => (
                          <button key={ex} onClick={() => toggleExtra(ex)}
                            style={{ padding: "8px 16px", border: `1.5px solid ${extras.includes(ex) ? "#D4A017" : "#E8D9C5"}`, borderRadius: "50px", backgroundColor: extras.includes(ex) ? "rgba(212,160,23,0.1)" : "#fff", cursor: "pointer", fontSize: "13px", color: extras.includes(ex) ? "#D4A017" : "#7A6548", fontWeight: extras.includes(ex) ? 500 : 300 }}>
                            {ex}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                    <button onClick={back} style={{ padding: "13px 24px", backgroundColor: "transparent", border: "1.5px solid #E8D9C5", borderRadius: "50px", fontSize: "14px", color: "#7A6548", cursor: "pointer" }}>← Zurück</button>
                    <button onClick={next} disabled={!plz}
                      style={{ padding: "13px 28px", backgroundColor: plz ? "#D4A017" : "#E8D9C5", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: plz ? "pointer" : "not-allowed" }}>Weiter →</button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {!loading && !done && step === 4 && (
                <form onSubmit={submit}>
                  <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#2C1A0E", marginBottom: "8px" }}>Ihre Kontaktdaten</h2>
                  <p style={{ fontSize: "14px", color: "#A89070", marginBottom: "28px", fontWeight: 300 }}>Fast fertig – dann erhalten Sie Ihre Schätzung.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div><label style={lbl}>Name</label><input required style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Max Mustermann" /></div>
                    <div><label style={lbl}>E-Mail</label><input type="email" required style={inp} value={email} onChange={e => setEmail(e.target.value)} placeholder="ihre@email.de" /></div>
                    <div><label style={lbl}>Telefon</label><input style={inp} value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="0173 12345678" /></div>
                    <div>
                      <label style={lbl}>Wann erreichen wir Sie?</label>
                      <select style={inp} value={wann} onChange={e => setWann(e.target.value)}>
                        {["Jederzeit", "Vormittags", "Mittags", "Nachmittags", "Abends"].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "12px", color: "#7A6548", fontWeight: 300, lineHeight: 1.6 }}>
                      <input type="checkbox" required checked={datenschutz} onChange={e => setDatenschutz(e.target.checked)} style={{ marginTop: "3px", accentColor: "#2C1A0E" }} />
                      Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu.
                    </label>
                  </div>
                  <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                    <button type="button" onClick={back} style={{ padding: "13px 24px", backgroundColor: "transparent", border: "1.5px solid #E8D9C5", borderRadius: "50px", fontSize: "14px", color: "#7A6548", cursor: "pointer" }}>← Zurück</button>
                    <button type="submit"
                      style={{ padding: "13px 32px", backgroundColor: "#2C1A0E", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                      Bewertung anfordern →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
