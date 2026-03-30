"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Scroll Reveal ──────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("rv-in"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Shared styles ──────────────────────────────────────────── */
const S = {
  label: { fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "#C8A96E", marginBottom: "12px" } as React.CSSProperties,
  h2: { fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#1A1A1A", lineHeight: 1.2, margin: 0 } as React.CSSProperties,
  h2w: { fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: "#FFFFFF", lineHeight: 1.2, margin: 0 } as React.CSSProperties,
  body: { fontSize: "15px", color: "#6B7280", lineHeight: 1.8, fontWeight: 300 } as React.CSSProperties,
  wrap: { maxWidth: "1280px", margin: "0 auto", padding: "0 24px" } as React.CSSProperties,
  sec: (bg = "#fff") => ({ backgroundColor: bg, padding: "96px 0" }) as React.CSSProperties,
};

function GoldLine() {
  return <div style={{ width: "48px", height: "2px", backgroundColor: "#C8A96E", margin: "16px 0 24px" }} />;
}

/* ─── VideoPlayer ────────────────────────────────────────────── */
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const vRef = useRef<HTMLVideoElement>(null);
  const handlePlay = () => { setPlaying(true); setTimeout(() => vRef.current?.play(), 50); };
  return (
    <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", aspectRatio: "16/9", background: "#0e2230", cursor: playing ? "default" : "pointer" }}
      onClick={() => !playing && handlePlay()}>
      <video ref={vRef} src="/plana-video.mp4"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: playing ? "block" : "none" }}
        controls playsInline />
      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", background: "linear-gradient(135deg,#1B3A4B,#0e2230)" }}>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E" }}>PLAN A IMMOBILIEN</p>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 14px rgba(200,169,110,0.12)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "4px" }}><polygon points="5,3 19,12 5,21" /></svg>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>Zum Abspielen klicken</p>
        </div>
      )}
    </div>
  );
}

/* ─── Property Card ──────────────────────────────────────────── */
function PropCard({ id, titel, ort, typ, preis, badge }: { id: string; titel: string; ort: string; typ: string; preis: string; badge?: string }) {
  const [faved, setFaved] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("merkzettel") || "[]");
      setFaved(saved.includes(id));
    } catch {}
  }, [id]);
  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const saved: string[] = JSON.parse(localStorage.getItem("merkzettel") || "[]");
      const next = faved ? saved.filter(i => i !== id) : [...saved, id];
      localStorage.setItem("merkzettel", JSON.stringify(next));
      setFaved(!faved);
      window.dispatchEvent(new Event("merkzettel-update"));
    } catch {}
  };
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #E5E7EB", flexShrink: 0, width: "300px", transition: "box-shadow 0.3s, transform 0.3s", cursor: "pointer" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
      <div style={{ height: "190px", background: "linear-gradient(135deg,#1B3A4B 0%,#0e2230 100%)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>
        {badge && (
          <span style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 10px", backgroundColor: "#C8A96E", color: "#fff", fontSize: "10px", fontWeight: 500, borderRadius: "50px", letterSpacing: "0.08em" }}>{badge}</span>
        )}
        <button onClick={toggle}
          style={{ position: "absolute", top: "10px", right: "10px", width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")}>
          <svg width="16" height="16" fill={faved ? "#C8A96E" : "none"} stroke={faved ? "#C8A96E" : "#fff"} strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <div style={{ padding: "18px 20px" }}>
        <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C8A96E" }}>{typ}</span>
        <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.05rem", color: "#1A1A1A", margin: "6px 0 4px", lineHeight: 1.3 }}>{titel}</h3>
        <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "0 0 12px", fontWeight: 300 }}>{ort}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.15rem", color: "#1B3A4B", margin: 0 }}>{preis}</p>
          <Link href="/kontakt?betreff=Immobilienverkauf"
            style={{ fontSize: "12px", color: "#C8A96E", textDecoration: "none", fontWeight: 500 }}>
            Anfragen →
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Leistungs-Card (groß) ──────────────────────────────────── */
function LeistCard({ icon, titel, text, href, delay = 0 }: { icon: React.ReactNode; titel: string; text: string; href: string; delay?: number }) {
  const [hov, setHov] = useState(false);
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div className={`rv rv-d${delay}`}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "16px", overflow: "hidden", transition: "all 0.3s ease", boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.1)" : "none", transform: hov ? "translateY(-4px)" : "translateY(0)", cursor: "pointer" }}>
        <div style={{ height: "160px", backgroundColor: hov ? "#1B3A4B" : "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
          <div style={{ color: hov ? "#C8A96E" : "#1B3A4B", transition: "color 0.3s" }}>{icon}</div>
        </div>
        <div style={{ padding: "24px" }}>
          <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.15rem", color: "#1A1A1A", marginBottom: "10px" }}>{titel}</h3>
          <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, margin: "0 0 14px" }}>{text}</p>
          <span style={{ fontSize: "13px", color: "#C8A96E", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px" }}>Mehr erfahren →</span>
        </div>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function HomeClient() {
  useReveal();

  /* Hero Search Tabs */
  const [activeTab, setActiveTab] = useState(0);
  const [searchObjektart, setSearchObjektart] = useState("Eigentumswohnung");
  const [searchKaufMiete, setSearchKaufMiete] = useState("Kaufen");
  const [searchStadt, setSearchStadt] = useState("");
  const [bewerTyp, setBewerTyp] = useState("Haus");
  const [bewerPlz, setBewerPlz] = useState("");
  const [bewerFlaeche, setBewerFlaeche] = useState("");

  /* Suchauftrag */
  const [suchForm, setSuchForm] = useState({ was: "Haus", kaufMiete: "Kaufen", region: "", budgetVon: "", budgetBis: "", zimmer: "", flaeche: "", email: "" });
  const [suchSent, setSuchSent] = useState(false);

  /* Online Beratung */
  const [berForm, setBerForm] = useState({ anrede: "Herr", vorname: "", nachname: "", telefon: "", email: "", nachricht: "", datenschutz: false });
  const [berSent, setBerSent] = useState(false);

  /* Wertermittlung */
  const [wertTyp, setWertTyp] = useState("Haus");
  const [wertPlz, setWertPlz] = useState("");

  /* FAQ */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Countdown */
  const countdownEnd = new Date();
  countdownEnd.setDate(countdownEnd.getDate() + (7 - countdownEnd.getDay()));
  countdownEnd.setHours(23, 59, 59, 0);
  const [cdTime, setCdTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, countdownEnd.getTime() - Date.now());
      setCdTime({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const inp = { padding: "11px 14px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px", color: "#1A1A1A", outline: "none", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300, backgroundColor: "#fff" };
  const inpW = { ...inp, backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff" };

  const properties = [
    { id: "prop-1", titel: "Stilvolle Eigentumswohnung", ort: "Mosbach, Baden-Württemberg", typ: "Eigentumswohnung", preis: "295.000 €", badge: "Neu" },
    { id: "prop-2", titel: "Einfamilienhaus mit Garten", ort: "Neckar-Odenwald-Kreis", typ: "Einfamilienhaus", preis: "485.000 €", badge: "360° Rundgang" },
    { id: "prop-3", titel: "Mehrfamilienhaus als Kapitalanlage", ort: "Mosbach Innenstadt", typ: "Mehrfamilienhaus", preis: "720.000 €" },
    { id: "prop-4", titel: "Attraktives Grundstück in Bestlage", ort: "Buchen, Odenwald", typ: "Grundstück", preis: "145.000 €", badge: "Neu" },
  ];

  return (
    <>
      <style>{`
        .rv { opacity:0; transform:translateY(25px); transition:opacity 0.6s ease-out, transform 0.6s ease-out; }
        .rv.rv-in { opacity:1; transform:translateY(0); }
        .rv-d1 { transition-delay:0.1s; } .rv-d2 { transition-delay:0.2s; }
        .rv-d3 { transition-delay:0.3s; } .rv-d4 { transition-delay:0.4s; }
        @media(max-width:768px) {
          .hero-grid,.video-grid,.wert-grid,.partner-grid,.cta-grid { grid-template-columns:1fr!important; }
          .steps-row { flex-direction:column!important; }
          .steps-connector { display:none!important; }
          .immotype-grid { grid-template-columns:1fr 1fr!important; }
          .leist-cards { grid-template-columns:1fr 1fr!important; }
        }
        @media(max-width:500px) { .immotype-grid,.leist-cards { grid-template-columns:1fr!important; } }
        @media(max-width:900px) {
          .stats-g { grid-template-columns:1fr 1fr!important; }
          .services-grid,.why-grid,.testi-grid,.fin-grid { grid-template-columns:1fr!important; }
          .leist-cards { grid-template-columns:1fr 1fr!important; }
        }
        .prop-scroll { scrollbar-width:none; }
        .prop-scroll::-webkit-scrollbar { display:none; }
        .hero-tab { border-bottom:2px solid transparent; padding:14px 20px; cursor:pointer; font-size:14px; font-weight:500; color:#6B7280; background:none; border-top:none; border-left:none; border-right:none; transition:color 0.2s,border-color 0.2s; white-space:nowrap; }
        .hero-tab.active { color:#1B3A4B; border-bottom-color:#C8A96E; }
        .trust-badge { display:flex;align-items:center;gap:10px;padding:14px 20px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;font-size:13px;font-weight:500;color:#1B3A4B; }
        @keyframes sline{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes scrollX{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .ber-form-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
        @media(max-width:768px) { .ber-form-grid { grid-template-columns:1fr!important; } .such-grid { grid-template-columns:1fr 1fr!important; } }
        @media(max-width:500px) { .such-grid { grid-template-columns:1fr!important; } }
      `}</style>

      {/* ══ 1. FULLSCREEN VIDEO HERO ══════════════════════════════════ */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
          <source src="/plana-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,20,30,0.5) 0%,rgba(10,20,30,0.65) 60%,rgba(10,20,30,0.82) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", paddingTop: "64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "50px", border: "1px solid rgba(200,169,110,0.45)", backgroundColor: "rgba(200,169,110,0.08)", marginBottom: "28px", backdropFilter: "blur(8px)" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C8A96E" }} />
            <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E" }}>Immobilien & Finanzierung · Mosbach</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.1, color: "#fff", marginBottom: "24px", letterSpacing: "-0.01em", textShadow: "0 2px 20px rgba(0,0,0,0.3)", maxWidth: "900px" }}>
            Strategie bestimmt{" "}<span style={{ color: "#C8A96E" }}>den Preis.</span>
          </h1>
          <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "560px", marginBottom: "44px", fontWeight: 300 }}>
            Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen. Hauptsitz Mosbach – deutschlandweit tätig.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginBottom: "48px" }}>
            <Link href="/kontakt?betreff=Beratung"
              style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "background 0.25s,transform 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#b8934a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#C8A96E"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Kostenlose Beratung
            </Link>
            <Link href="/kontakt?betreff=Immobilienbewertung"
              style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1.5px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)", transition: "background 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}>
              Immobilie bewerten
            </Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
            {["Kostenlos", "Unverbindlich", "Deutschlandweit"].map((t) => (
              <span key={t} style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="12" height="10" fill="none" stroke="#C8A96E" strokeWidth="2.5" viewBox="0 0 14 11"><polyline points="1 5 5 9 13 1" /></svg>{t}
              </span>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 1 }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Scroll</span>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,rgba(200,169,110,0.7),transparent)", animation: "sline 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══ 2. HERO SEARCH TABS ═══════════════════════════════════════ */}
      <section id="suche" style={{ backgroundColor: "#F7F5F2", padding: "0 0 64px" }}>
        <div style={S.wrap}>
          <div style={{ backgroundColor: "#fff", borderRadius: "0 0 20px 20px", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", overflow: "hidden" }}>
            {/* Tab headers */}
            <div style={{ display: "flex", borderBottom: "1px solid #F3F4F6", padding: "0 8px", overflowX: "auto" }}>
              {["Immobilien suchen", "Makler vor Ort", "Immobilie bewerten"].map((tab, i) => (
                <button key={tab} className={`hero-tab${activeTab === i ? " active" : ""}`}
                  onClick={() => setActiveTab(i)}>
                  {tab}
                </button>
              ))}
            </div>
            {/* Tab bodies */}
            <div style={{ padding: "28px 24px" }}>
              {activeTab === 0 && (
                <div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "12px" }}>
                    <select value={searchObjektart} onChange={e => setSearchObjektart(e.target.value)}
                      style={{ ...inp, flex: "1 1 180px" }}>
                      {["Eigentumswohnung", "Einfamilienhaus", "Mehrfamilienhaus", "Gewerbe", "Grundstück"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <select value={searchKaufMiete} onChange={e => setSearchKaufMiete(e.target.value)}
                      style={{ ...inp, flex: "0 0 130px" }}>
                      <option>Kaufen</option><option>Mieten</option>
                    </select>
                    <input value={searchStadt} onChange={e => setSearchStadt(e.target.value)}
                      placeholder="Stadt oder PLZ" style={{ ...inp, flex: "1 1 180px" }} />
                    <Link href="/kontakt?betreff=Immobilienbewertung"
                      style={{ padding: "11px 28px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                      Suchen →
                    </Link>
                  </div>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", fontStyle: "italic", margin: 0 }}>
                    Aktuell keine Immobilien im Bestand. Kontaktieren Sie uns für eine persönliche Beratung.
                  </p>
                </div>
              )}
              {activeTab === 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: "240px" }}>
                    <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "8px" }}>Plan A Immobilien ist deutschlandweit für Sie da.</h3>
                    <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: 300, lineHeight: 1.7, marginBottom: "16px" }}>
                      Hauptsitz: Mosbach, Baden-Württemberg<br />Beratung: Mo–So 8–20 Uhr · Digital & vor Ort
                    </p>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {["§34c GewO", "§34i GewO", "IHK geprüft"].map(b => (
                        <span key={b} style={{ padding: "4px 12px", backgroundColor: "#F7F5F2", border: "1px solid #E5E7EB", borderRadius: "50px", fontSize: "11px", fontWeight: 500, color: "#1B3A4B" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <Link href="/kontakt"
                    style={{ padding: "13px 28px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap", transition: "background 0.25s" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C8A96E")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1B3A4B")}>
                    Kontakt aufnehmen →
                  </Link>
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <select value={bewerTyp} onChange={e => setBewerTyp(e.target.value)} style={{ ...inp, flex: "1 1 140px" }}>
                      {["Haus", "Wohnung", "Grundstück", "Gewerbe"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <input value={bewerPlz} onChange={e => setBewerPlz(e.target.value)} placeholder="PLZ" maxLength={5} style={{ ...inp, flex: "0 0 100px" }} />
                    <input value={bewerFlaeche} onChange={e => setBewerFlaeche(e.target.value)} placeholder="Wohnfläche ca. m²" style={{ ...inp, flex: "1 1 160px" }} />
                    <Link href={`/kontakt?betreff=Immobilienbewertung&typ=${bewerTyp}&plz=${bewerPlz}`}
                      style={{ padding: "11px 24px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: 500, display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                      Kostenlos bewerten →
                    </Link>
                  </div>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "12px", margin: "12px 0 0" }}>Kostenlos · Unverbindlich · Antwort innerhalb 24h</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. VERTRAUEN-LEISTE ═══════════════════════════════════════ */}
      <div style={{ backgroundColor: "#1B3A4B" }}>
        <div style={S.wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid rgba(200,169,110,0.1)" }} className="stats-g">
            {[
              { icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20"/></svg>, val: "Deutschlandweit", sub: "Überall für Sie" },
              { icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, val: "Freier Makler", sub: "100% unabhängig" },
              { icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, val: "Digital", sub: "Beratung online" },
              { icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, val: "Kostenlos", sub: "Erstberatung" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 24px", borderRight: i < 3 ? "1px solid rgba(200,169,110,0.1)" : "none", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "rgba(200,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#fff", lineHeight: 1.2 }}>{s.val}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "3px" }}>{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.stats-g{grid-template-columns:1fr 1fr!important;}}@media(max-width:480px){.stats-g{grid-template-columns:1fr!important;}}`}</style>
      </div>

      {/* ══ 4. IMMOBILIEN ANGEBOTE ════════════════════════════════════ */}
      <section id="angebote" style={S.sec()}>
        <div style={S.wrap}>
          <div className="rv" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={S.label}>IMMOBILIENANGEBOTE</p>
              <h2 style={S.h2}>Aktuelle Immobilienangebote.</h2>
            </div>
            <Link href="/merkzettel"
              style={{ fontSize: "13px", color: "#1B3A4B", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", borderBottom: "1px solid #1B3A4B", paddingBottom: "2px" }}>
              Alle Angebote anzeigen →
            </Link>
          </div>
          <div className="prop-scroll" style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "12px" }}>
            {properties.map(p => <PropCard key={p.id} {...p} />)}
          </div>
          <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: "20px", fontStyle: "italic" }}>
            Platzhalter-Objekte · Echte Angebote von Ali Artun werden hier eingetragen
          </p>
        </div>
      </section>

      {/* ══ 5. LEISTUNGEN (5 CARDS) ══════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={S.label}>UNSERE LEISTUNGEN</p>
            <h2 style={S.h2}>An welchen Leistungen sind Sie interessiert?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }} className="leist-cards">
            <LeistCard delay={0} href="/kontakt?betreff=Immobilienbewertung"
              titel="Immobilienwert ermitteln"
              text="Kostenlose und unverbindliche Wertermittlung. Marktwert in 24 Stunden."
              icon={<svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 10h2M11 10h6M7 13h5"/></svg>} />
            <LeistCard delay={1} href="/immobilienverkauf"
              titel="Verkaufen & Vermieten"
              text="Professionelle Vermarktung Ihrer Immobilie – schnell, sicher und zum besten Preis."
              icon={<svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>} />
            <LeistCard delay={2} href="/finanzierung"
              titel="Finanzierung & Förderung"
              text="KFW-Kredite, BAFA, staatliche Förderungen – wir finden die beste Lösung."
              icon={<svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h3M14 15h4"/></svg>} />
            <LeistCard delay={3} href="/immobilienverkauf#aufbereitung"
              titel="Objekt-Aufbereitung"
              text="Home Staging, Fotos, Exposé – professionelle Aufbereitung aktuell kostenlos."
              icon={<svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>} />
            <LeistCard delay={4} href="/partner"
              titel="Partner werden"
              text="Starten Sie als selbstständiger Plan A Vertreter mit IHK-Qualifikation."
              icon={<svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>} />
          </div>
        </div>
      </section>

      {/* ══ 6. TRUST / AUSZEICHNUNGEN LEISTE ════════════════════════ */}
      <div style={{ backgroundColor: "#fff", borderTop: "1px solid #F3F4F6", borderBottom: "1px solid #F3F4F6", padding: "32px 0", overflow: "hidden" }}>
        <div style={S.wrap}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            {[
              { label: "IHK Rhein-Neckar", icon: <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
              { label: "§34c GewO zertifiziert", icon: <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { label: "§34i GewO zertifiziert", icon: <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg> },
              { label: "Freier Makler", icon: <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20"/></svg> },
              { label: "Deutschlandweit tätig", icon: <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
              { label: "Reg.-Nr.: D-W-153-TH95-12", icon: <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
            ].map(b => (
              <div key={b.label} className="trust-badge">
                {b.icon}
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 7. QUALITÄTS-SECTION ═════════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="wert-grid">
            <div className="rv">
              <p style={{ ...S.label, fontStyle: "italic", textTransform: "none", letterSpacing: "0", fontSize: "14px", color: "#C8A96E", marginBottom: "20px" }}>
                „Strategie bestimmt den Preis – weil jede Immobilie einen Plan verdient."
              </p>
              <h2 style={{ ...S.h2, marginBottom: "16px" }}>Qualität die überzeugt.</h2>
              <GoldLine />
              <p style={{ ...S.body, marginBottom: "36px" }}>
                Plan A steht für unabhängige, strategische Beratung. Als freier Makler mit IHK-Zulassung beraten wir Sie deutschlandweit – ehrlich, transparent und ergebnisorientiert.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { title: "IHK geprüft", sub: "Zertifiziert durch IHK Rhein-Neckar", icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
                  { title: "§34c & §34i lizenziert", sub: "Immobilien- und Darlehensvermittler", icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                  { title: "Freier & unabhängiger Makler", sub: "Keine Bank-Bindung, maximale Neutralität", icon: <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20"/></svg> },
                ].map(q => (
                  <div key={q.title} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "rgba(200,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{q.icon}</div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{q.title}</p>
                      <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "2px 0 0", fontWeight: 300 }}>{q.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rv rv-d2">
              <div style={{ backgroundColor: "#1B3A4B", borderRadius: "20px", padding: "48px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "5rem", color: "#C8A96E", lineHeight: 1, marginBottom: "8px" }}>5.0</div>
                <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "12px" }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#C8A96E", fontSize: "22px" }}>★</span>)}
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: 300, marginBottom: "24px" }}>Kundenbewertung · Google Reviews</p>
                <div style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "14px", padding: "24px", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2.5rem", color: "rgba(200,169,110,0.4)", lineHeight: 1, marginBottom: "10px" }}>"</div>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, fontWeight: 300, fontStyle: "italic" }}>Plan A hat unsere Immobilie strategisch vermarktet. Innerhalb von 3 Wochen hatten wir einen geprüften Käufer.</p>
                  <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "12px", margin: "12px 0 0" }}>Familie M. · Mosbach</p>
                </div>
                <Link href="/kontakt"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "24px", fontSize: "13px", color: "#C8A96E", textDecoration: "none", fontWeight: 500 }}>
                  Bewertungen ansehen →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. ERKLÄR-VIDEO ══════════════════════════════════════════ */}
      <section style={S.sec()}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={S.label}>ERKLÄRVIDEO</p>
            <h2 style={{ ...S.h2, marginBottom: "0" }}>Lernen Sie Plan A kennen.</h2>
          </div>
          <div className="rv" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <VideoPlayer />
            <p style={{ ...S.body, textAlign: "center", marginTop: "20px", fontSize: "13px" }}>Authentisch, unabhängig, strategisch.</p>
          </div>
        </div>
      </section>

      {/* ══ 9. WERTERMITTLUNG ════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1B3A4B", padding: "96px 0" }}>
        <div style={S.wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="wert-grid">
            <div className="rv">
              <p style={{ ...S.label, color: "#C8A96E" }}>KOSTENLOSE BEWERTUNG</p>
              <h2 style={{ ...S.h2w, fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "16px" }}>Was ist Ihre Immobilie wert?</h2>
              <GoldLine />
              <p style={{ ...S.body, color: "rgba(255,255,255,0.7)", marginBottom: "0" }}>Kostenlose und unverbindliche Wertermittlung in 24 Stunden. Unser Team analysiert Ihre Immobilie und meldet sich persönlich bei Ihnen.</p>
            </div>
            <div className="rv rv-d2">
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px" }}>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "20px", fontWeight: 300 }}>Schnellcheck – Immobilienart & PLZ:</p>
                <div style={{ display: "flex", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <select value={wertTyp} onChange={e => setWertTyp(e.target.value)}
                    style={{ flex: 1, minWidth: "140px", ...inpW }}>
                    {["Haus", "Wohnung", "Mehrfamilienhaus", "Grundstück", "Gewerbe"].map(o => <option key={o} value={o} style={{ color: "#1A1A1A" }}>{o}</option>)}
                  </select>
                  <input type="text" placeholder="PLZ" value={wertPlz} onChange={e => setWertPlz(e.target.value)} maxLength={5}
                    style={{ width: "100px", ...inpW }} />
                </div>
                <Link href={`/kontakt?betreff=Immobilienbewertung&typ=${wertTyp}&plz=${wertPlz}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#b8934a")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#C8A96E")}>
                  Jetzt Bewertung anfragen →
                </Link>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "10px" }}>Kostenlos · Unverbindlich · 24h Antwort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 10. SO FUNKTIONIERT ES ═══════════════════════════════════ */}
      <section style={S.sec()}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={S.label}>DER PROZESS</p>
            <h2 style={S.h2}>In 4 Schritten zum Erfolg.</h2>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0", position: "relative" }} className="steps-row">
            {[
              { num: "01", title: "Kennenlernen", text: "Persönliches Gespräch. Wir verstehen Ihre Situation." },
              { num: "02", title: "Strategie", text: "Individueller Plan. Maßgeschneidert auf Ihre Ziele." },
              { num: "03", title: "Umsetzung", text: "Professionelle Durchführung. Transparent und effizient." },
              { num: "04", title: "Ergebnis", text: "Erfolgreicher Abschluss. Zu den besten Konditionen." },
            ].map((s, i) => (
              <div key={i} className={`rv rv-d${i + 1}`} style={{ flex: 1, position: "relative", padding: "0 20px", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#1B3A4B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#C8A96E" }}>{s.num}</span>
                </div>
                {i < 3 && (
                  <div className="steps-connector" style={{ position: "absolute", top: "28px", left: "calc(50% + 28px)", right: "calc(-50% + 28px)", height: "1px", backgroundColor: "#E5E7EB", zIndex: 0 }} />
                )}
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1A1A1A", marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 11. GOOGLE BEWERTUNGEN ════════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={S.label}>KUNDENSTIMMEN</p>
            <h2 style={S.h2}>Was unsere Kunden sagen.</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
              <div style={{ display: "flex", gap: "3px" }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: "#C8A96E", fontSize: "18px" }}>★</span>)}</div>
              <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.4rem", color: "#1A1A1A" }}>5.0</span>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "4px 12px", backgroundColor: "#fff", borderRadius: "50px", border: "1px solid #E5E7EB" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span style={{ fontSize: "12px", color: "#6B7280" }}>Google Bewertungen</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="testi-grid">
            {[
              { text: "Plan A hat unsere Immobilie nicht einfach inseriert – sie haben eine richtige Strategie entwickelt. Innerhalb von 3 Wochen hatten wir einen geprüften Käufer.", name: "Familie M.", role: "Verkäufer, Mosbach" },
              { text: "Die Finanzierungsberatung war unglaublich hilfreich. Wir haben Förderprogramme genutzt, von denen wir vorher nie gehört hatten. Kostenlos und unverbindlich.", name: "Thomas K.", role: "Käufer, Heidelberg" },
              { text: "Sehr professionell, schnell und persönlich. Alles digital abgewickelt – ich hätte nicht gedacht, dass das so einfach funktioniert.", name: "Sabine R.", role: "Verkäuferin, Stuttgart" },
            ].map((t, i) => (
              <div key={i} className={`rv rv-d${i + 1}`} style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px", border: "1px solid #E5E7EB" }}>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "3rem", color: "#C8A96E", lineHeight: 1, opacity: 0.6 }}>"</div>
                <p style={{ ...S.body, fontSize: "14px", flex: 1 }}>{t.text}</p>
                <div style={{ display: "flex", gap: "3px" }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: "#C8A96E", fontSize: "14px" }}>★</span>)}</div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "2px 0 0" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", marginTop: "24px", fontStyle: "italic" }}>Platzhalter · Echte Google Bewertungen nach Einrichtung von Google My Business</p>
        </div>
      </section>

      {/* ══ 12. SUCHAUFTRAG ══════════════════════════════════════════ */}
      <section id="suchauftrag" style={{ backgroundColor: "#1B3A4B", padding: "96px 0" }}>
        <div style={S.wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "60px", alignItems: "start" }} className="wert-grid">
            <div className="rv">
              <p style={{ ...S.label, color: "#C8A96E" }}>SUCHAUFTRAG</p>
              <h2 style={{ ...S.h2w, marginBottom: "16px" }}>Sie suchen eine bestimmte Immobilie?</h2>
              <GoldLine />
              <p style={{ ...S.body, color: "rgba(255,255,255,0.7)" }}>
                Erstellen Sie einen kostenlosen Suchauftrag und wir kontaktieren Sie, sobald wir etwas Passendes finden.
              </p>
            </div>
            <div className="rv rv-d2">
              {suchSent ? (
                <div style={{ backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "16px", padding: "40px", textAlign: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="24" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
                  </div>
                  <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#fff", marginBottom: "8px" }}>Suchauftrag angelegt!</p>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>Wir melden uns, sobald wir etwas Passendes finden.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSuchSent(true); }}
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="such-grid">
                    <div>
                      <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Was suchen Sie?</label>
                      <select value={suchForm.was} onChange={e => setSuchForm(f => ({ ...f, was: e.target.value }))} style={{ width: "100%", ...inpW }}>
                        {["Haus", "Wohnung", "Grundstück", "Gewerbe"].map(o => <option key={o} style={{ color: "#1A1A1A" }}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Kaufen / Mieten?</label>
                      <select value={suchForm.kaufMiete} onChange={e => setSuchForm(f => ({ ...f, kaufMiete: e.target.value }))} style={{ width: "100%", ...inpW }}>
                        <option style={{ color: "#1A1A1A" }}>Kaufen</option><option style={{ color: "#1A1A1A" }}>Mieten</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Region / PLZ</label>
                      <input value={suchForm.region} onChange={e => setSuchForm(f => ({ ...f, region: e.target.value }))} placeholder="z. B. Mosbach" style={{ width: "100%", ...inpW, boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Budget (€)</label>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input value={suchForm.budgetVon} onChange={e => setSuchForm(f => ({ ...f, budgetVon: e.target.value }))} placeholder="von" style={{ flex: 1, ...inpW }} />
                        <input value={suchForm.budgetBis} onChange={e => setSuchForm(f => ({ ...f, budgetBis: e.target.value }))} placeholder="bis" style={{ flex: 1, ...inpW }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Zimmer (min)</label>
                      <input value={suchForm.zimmer} onChange={e => setSuchForm(f => ({ ...f, zimmer: e.target.value }))} placeholder="z. B. 3" style={{ width: "100%", ...inpW, boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Fläche (min m²)</label>
                      <input value={suchForm.flaeche} onChange={e => setSuchForm(f => ({ ...f, flaeche: e.target.value }))} placeholder="z. B. 80" style={{ width: "100%", ...inpW, boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Ihre E-Mail</label>
                    <input type="email" required value={suchForm.email} onChange={e => setSuchForm(f => ({ ...f, email: e.target.value }))} placeholder="ihre@email.de" style={{ width: "100%", ...inpW, boxSizing: "border-box" }} />
                  </div>
                  <button type="submit"
                    style={{ padding: "14px", backgroundColor: "#C8A96E", color: "#fff", border: "none", borderRadius: "10px", fontSize: "14px", fontWeight: 500, cursor: "pointer", marginTop: "4px", transition: "background 0.25s" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8934a")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C8A96E")}>
                    Suchauftrag anlegen →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 13. FINANZIERUNG PREVIEW ══════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div className="rv" style={{ marginBottom: "48px" }}>
            <p style={S.label}>FINANZIERUNG & FÖRDERUNG</p>
            <h2 style={S.h2}>Wir finden den günstigsten Kredit.</h2>
            <GoldLine />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "40px" }} className="fin-grid">
            {[
              { title: "KFW-Kredite", text: "Günstige Konditionen für Neubau und energetische Sanierung.", icon: "🏗️" },
              { title: "Staatliche Förderung", text: "BAFA-Förderungen und weitere staatliche Programme optimal nutzen.", icon: "🏛️" },
              { title: "Privatkredite", text: "Wir vergleichen alle Anbieter und finden den besten Zinssatz.", icon: "📊" },
            ].map((c, i) => (
              <div key={i} className={`rv rv-d${i + 1}`} style={{ backgroundColor: "#fff", borderRadius: "14px", padding: "28px", border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{c.icon}</div>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#1A1A1A", marginBottom: "8px" }}>{c.title}</h3>
                <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.6, fontWeight: 300 }}>{c.text}</p>
              </div>
            ))}
          </div>
          <div className="rv" style={{ textAlign: "center" }}>
            <Link href="/finanzierung"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "background 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#C8A96E")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1B3A4B")}>
              Alle Finanzierungsoptionen →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 14. PARTNER PREVIEW ══════════════════════════════════════ */}
      <section style={S.sec()}>
        <div style={S.wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="partner-grid">
            <div className="rv" style={{ display: "flex", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", width: "360px", height: "360px", borderRadius: "50%", border: "1px solid rgba(200,169,110,0.12)" }} />
              <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", backgroundColor: "rgba(200,169,110,0.04)" }} />
              <Image src="/maskottchen.png" alt="Plan A Partner" width={300} height={300}
                style={{ width: "clamp(200px,22vw,300px)", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 16px 32px rgba(27,58,75,0.12))" }} />
            </div>
            <div className="rv rv-d2">
              <p style={S.label}>PARTNER WERDEN</p>
              <h2 style={{ ...S.h2, marginBottom: "16px" }}>Werden Sie Plan A Vertreter.</h2>
              <GoldLine />
              <p style={{ ...S.body, marginBottom: "32px" }}>Starten Sie Ihre Karriere in der Immobilienbranche. Mit IHK-Qualifikation, verifizierten Leads und unserer Unterstützung im Hintergrund.</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Kein teurer Kurs, keine versteckten Kosten", "IHK-Qualifikation (§34c & §34i)", "Überwiegend digitale Schulungen", "Verifizierte Leads vom ersten Tag"].map(b => (
                  <li key={b} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "#374151", fontWeight: 300 }}>
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="8" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/partner"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "background 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#C8A96E")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1B3A4B")}>
                Mehr erfahren →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 15. ONLINE-BERATUNG FORMULAR ═════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={S.label}>DIREKTKONTAKT</p>
            <h2 style={S.h2}>Jetzt Online-Beratung vereinbaren!</h2>
            <GoldLine />
            <p style={{ ...S.body, maxWidth: "520px", margin: "0 auto" }}>Kostenlos und unverbindlich. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
          </div>
          {berSent ? (
            <div className="rv" style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "60px", textAlign: "center", maxWidth: "480px", margin: "0 auto", border: "1px solid #E5E7EB" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="24" height="20" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
              </div>
              <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.4rem", color: "#1A1A1A", marginBottom: "10px" }}>Anfrage eingegangen!</p>
              <p style={{ fontSize: "14px", color: "#6B7280", fontWeight: 300 }}>Wir melden uns schnellstmöglich bei Ihnen.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setBerSent(true); }}
              style={{ backgroundColor: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #E5E7EB", maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}
              className="rv">
              <div style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
                {["Herr", "Frau"].map(a => (
                  <button key={a} type="button" onClick={() => setBerForm(f => ({ ...f, anrede: a }))}
                    style={{ flex: 1, padding: "10px", border: `1.5px solid ${berForm.anrede === a ? "#1B3A4B" : "#E5E7EB"}`, borderRadius: "8px", backgroundColor: berForm.anrede === a ? "#1B3A4B" : "#fff", color: berForm.anrede === a ? "#fff" : "#6B7280", fontSize: "14px", cursor: "pointer" }}>
                    {a}
                  </button>
                ))}
              </div>
              <div className="ber-form-grid">
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", display: "block", marginBottom: "5px" }}>Vorname</label>
                  <input required value={berForm.vorname} onChange={e => setBerForm(f => ({ ...f, vorname: e.target.value }))} placeholder="Max" style={{ ...inp, width: "100%", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", display: "block", marginBottom: "5px" }}>Nachname</label>
                  <input required value={berForm.nachname} onChange={e => setBerForm(f => ({ ...f, nachname: e.target.value }))} placeholder="Mustermann" style={{ ...inp, width: "100%", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", display: "block", marginBottom: "5px" }}>Telefon</label>
                  <input value={berForm.telefon} onChange={e => setBerForm(f => ({ ...f, telefon: e.target.value }))} placeholder="0173 12345678" style={{ ...inp, width: "100%", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", display: "block", marginBottom: "5px" }}>E-Mail</label>
                <input type="email" required value={berForm.email} onChange={e => setBerForm(f => ({ ...f, email: e.target.value }))} placeholder="ihre@email.de" style={{ ...inp, width: "100%", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7280", display: "block", marginBottom: "5px" }}>Nachricht (optional)</label>
                <textarea value={berForm.nachricht} onChange={e => setBerForm(f => ({ ...f, nachricht: e.target.value }))} rows={4} placeholder="Wie können wir Ihnen helfen?" style={{ ...inp, width: "100%", boxSizing: "border-box", resize: "vertical" }} />
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "12px", color: "#6B7280", fontWeight: 300, lineHeight: 1.6 }}>
                <input type="checkbox" required checked={berForm.datenschutz} onChange={e => setBerForm(f => ({ ...f, datenschutz: e.target.checked }))} style={{ marginTop: "3px", accentColor: "#1B3A4B" }} />
                Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
                <Link href="/datenschutz" style={{ color: "#C8A96E" }}>Datenschutzerklärung</Link> zu.
              </label>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <button type="submit"
                  style={{ padding: "14px 36px", backgroundColor: "#1B3A4B", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "background 0.25s" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C8A96E")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1B3A4B")}>
                  Anfrage absenden →
                </button>
                <a href="tel:01736259429"
                  style={{ padding: "14px 28px", backgroundColor: "transparent", color: "#1B3A4B", border: "1.5px solid #1B3A4B", borderRadius: "50px", fontSize: "14px", fontWeight: 500, textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#1B3A4B"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1B3A4B"; }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Direkt anrufen
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ══ VERGLEICHSTABELLE ════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F7F5F2", padding: "96px 0" }}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={S.label}>WARUM PLAN A?</p>
            <h2 style={S.h2}>Plan A im Vergleich</h2>
            <GoldLine />
            <p style={{ ...S.body, maxWidth: "500px", margin: "0 auto" }}>Sehen Sie selbst, warum Eigentümer uns einem Privatverkauf oder klassischen Makler vorziehen.</p>
          </div>
          <div className="rv" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px", backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <thead>
                <tr>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontSize: "13px", color: "#6B7280", fontWeight: 400, borderBottom: "1px solid #F3F4F6", width: "40%" }}>Leistung</th>
                  <th style={{ padding: "20px 16px", textAlign: "center", fontSize: "13px", color: "#9CA3AF", fontWeight: 400, borderBottom: "1px solid #F3F4F6" }}>Privatverkauf</th>
                  <th style={{ padding: "20px 16px", textAlign: "center", fontSize: "13px", color: "#9CA3AF", fontWeight: 400, borderBottom: "1px solid #F3F4F6" }}>Klass. Makler</th>
                  <th style={{ padding: "20px 16px", textAlign: "center", fontSize: "13px", fontWeight: 600, borderBottom: "1px solid #F3F4F6", background: "linear-gradient(180deg,rgba(200,169,110,0.08) 0%,rgba(200,169,110,0.03) 100%)" }}>
                    <span style={{ color: "#C8A96E" }}>Plan A</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kostenlose Wertermittlung", false, true, true],
                  ["Finanzierungsprüfung der Käufer", false, false, true],
                  ["Geprüfte Käufer-Datenbank", false, false, true],
                  ["Professionelles Exposé & Fotos", false, true, true],
                  ["Kombination Verkauf + Finanzierung", false, false, true],
                  ["Persönliche Begleitung bis Notar", false, true, true],
                  ["Weniger Rückabwicklungen", false, false, true],
                  ["Kostenloser Erstcheck", false, false, true],
                ].map(([label, priv, klass, plana], i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#FAFAF9" }}>
                    <td style={{ padding: "16px 24px", fontSize: "14px", color: "#374151", fontWeight: 300, borderBottom: "1px solid #F3F4F6" }}>{label as string}</td>
                    {[priv, klass].map((v, j) => (
                      <td key={j} style={{ padding: "16px", textAlign: "center", borderBottom: "1px solid #F3F4F6" }}>
                        {v
                          ? <svg width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                          : <svg width="18" height="18" fill="none" stroke="#E5E7EB" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                      </td>
                    ))}
                    <td style={{ padding: "16px", textAlign: "center", borderBottom: "1px solid #F3F4F6", background: "linear-gradient(180deg,rgba(200,169,110,0.05) 0%,rgba(200,169,110,0.02) 100%)" }}>
                      {plana
                        ? <svg width="18" height="18" fill="none" stroke="#C8A96E" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        : <svg width="18" height="18" fill="none" stroke="#E5E7EB" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rv" style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/kontakt?betreff=Immobilienbewertung"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 36px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
              Kostenlose Bewertung anfragen →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ COUNTDOWN / URGENCY ══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1B3A4B", padding: "48px 0" }}>
        <div style={{ ...S.wrap, textAlign: "center" }}>
          <div className="rv">
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>BEGRENZTE KAPAZITÄTEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#fff", marginBottom: "8px" }}>
              Nächste kostenlose Bewertungsslots – diese Woche:
            </h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginBottom: "28px", fontWeight: 300 }}>Sichern Sie sich jetzt Ihren Platz</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
              {[["Tage", cdTime.d], ["Stunden", cdTime.h], ["Minuten", cdTime.m], ["Sekunden", cdTime.s]].map(([label, val]) => (
                <div key={label as string} style={{ width: "90px", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(200,169,110,0.25)", borderRadius: "12px", padding: "16px 8px" }}>
                  <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: "#C8A96E", lineHeight: 1 }}>{String(val as number).padStart(2, "0")}</div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{label as string}</div>
                </div>
              ))}
            </div>
            <Link href="/wertermittlung"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
              Slot sichern – Kostenlos →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "96px 0" }}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={S.label}>FAQ</p>
            <h2 style={S.h2}>Häufig gestellte Fragen</h2>
            <GoldLine />
          </div>
          <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }} className="rv">
            {[
              { q: "Was kostet eine Immobilienbewertung bei Plan A?", a: "Die Immobilienbewertung ist für Sie vollständig kostenlos und unverbindlich. Wir ermitteln den Wert Ihrer Immobilie auf Basis aktueller Marktdaten und melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung." },
              { q: "Wie lange dauert es, eine Immobilie über Plan A zu verkaufen?", a: "Die Vermarktungsdauer hängt von Lage, Preis und Objektart ab. In der Regel erzielen wir durch unsere vorqualifizierten Käufer und Finanzierungsprüfung deutlich kürzere Vermarktungszeiten als der Marktdurchschnitt." },
              { q: "Was ist der Unterschied zu einem klassischen Makler?", a: "Plan A kombiniert Immobilienverkauf mit direkter Käuferfinanzierung. Das bedeutet: Wir prüfen die Bonität und Finanzierungsfähigkeit jedes Interessenten bevor dieser Ihre Immobilie besichtigt. Das vermeidet Rückabwicklungen und spart allen Beteiligten Zeit." },
              { q: "In welchen Regionen ist Plan A tätig?", a: "Unser Hauptsitz ist in Mosbach, Baden-Württemberg. Wir sind überwiegend im Neckar-Odenwald-Kreis und der Region Rhein-Neckar tätig, begleiten aber Kunden deutschlandweit – größtenteils digital." },
              { q: "Wie funktioniert die kostenlose Wertermittlung?", a: "Füllen Sie unser Online-Formular aus oder rufen Sie uns an. Wir analysieren Lage, Zustand, Baujahr und aktuelle Vergleichswerte aus der Region. Innerhalb von 24 Stunden erhalten Sie unsere fundierte Einschätzung – persönlich und kostenlos." },
              { q: "Welche Unterlagen brauche ich für den Verkauf?", a: "In der Regel benötigen wir Grundbuchauszug, Energieausweis, Wohnflächenberechnung und ggf. Baupläne. Wir helfen Ihnen dabei, alle nötigen Unterlagen zusammenzustellen – verständlich und unkompliziert." },
            ].map(({ q, a }, i) => (
              <div key={i}
                style={{ borderRadius: "12px", border: `1px solid ${openFaq === i ? "#C8A96E" : "#E5E7EB"}`, overflow: "hidden", transition: "border-color 0.2s" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", backgroundColor: openFaq === i ? "rgba(200,169,110,0.04)" : "#fff", border: "none", cursor: "pointer", textAlign: "left", gap: "16px", transition: "background 0.2s" }}>
                  <span style={{ fontSize: "15px", fontWeight: 400, color: "#1A1A1A", lineHeight: 1.5 }}>{q}</span>
                  <svg width="16" height="16" fill="none" stroke="#C8A96E" strokeWidth="2.5" viewBox="0 0 24 24"
                    style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: "14px", color: "#6B7280", lineHeight: 1.8, fontWeight: 300 }}>{a}</div>
                )}
              </div>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Was kostet eine Immobilienbewertung bei Plan A?", "acceptedAnswer": { "@type": "Answer", "text": "Die Immobilienbewertung ist vollständig kostenlos und unverbindlich." } },
              { "@type": "Question", "name": "Wie lange dauert es, eine Immobilie über Plan A zu verkaufen?", "acceptedAnswer": { "@type": "Answer", "text": "Durch vorqualifizierte Käufer und Finanzierungsprüfung erzielen wir deutlich kürzere Vermarktungszeiten." } },
              { "@type": "Question", "name": "Was ist der Unterschied zu einem klassischen Makler?", "acceptedAnswer": { "@type": "Answer", "text": "Plan A kombiniert Immobilienverkauf mit direkter Käuferfinanzierungsprüfung zur Vermeidung von Rückabwicklungen." } },
              { "@type": "Question", "name": "In welchen Regionen ist Plan A tätig?", "acceptedAnswer": { "@type": "Answer", "text": "Hauptsitz Mosbach, schwerpunktmäßig Neckar-Odenwald-Kreis und Rhein-Neckar, deutschlandweit tätig." } },
            ]
          }) }} />
        </div>
      </section>

      {/* ══ 16. KONTAKT CTA ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1B3A4B", padding: "96px 0" }}>
        <div style={{ ...S.wrap, textAlign: "center" }}>
          <div className="rv">
            <p style={{ ...S.label, color: "#C8A96E", marginBottom: "16px" }}>NÄCHSTER SCHRITT</p>
            <h2 style={{ ...S.h2w, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "16px" }}>Bereit für den nächsten Schritt?</h2>
            <p style={{ ...S.body, color: "rgba(255,255,255,0.65)", maxWidth: "480px", margin: "0 auto 40px" }}>
              Rufen Sie uns an oder schreiben Sie uns. Kostenlos und unverbindlich.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              <a href="tel:01736259429"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, transition: "background 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#b8934a")}
                onMouseLeave={e => (e.currentTarget.style.background = "#C8A96E")}>
                Jetzt anrufen: 0173-6259429
              </a>
              <Link href="/kontakt"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 36px", backgroundColor: "transparent", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1.5px solid rgba(255,255,255,0.35)", transition: "border-color 0.25s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#C8A96E")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}>
                Kontaktformular
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
