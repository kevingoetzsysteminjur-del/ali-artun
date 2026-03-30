"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Scroll Reveal Hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("rv-in"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── Count-up ───────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return v;
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

/* ─── GoldLine divider ───────────────────────────────────────── */
function GoldLine() {
  return <div style={{ width: "48px", height: "2px", backgroundColor: "#C8A96E", margin: "16px 0 24px" }} />;
}

/* ─── VideoPlayer ────────────────────────────────────────────── */
function VideoPlayer({ local }: { local?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const vRef = useRef<HTMLVideoElement>(null);
  const handlePlay = () => { setPlaying(true); setTimeout(() => vRef.current?.play(), 50); };
  return (
    <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.1)", aspectRatio: "16/9", background: "#0e2230", cursor: playing ? "default" : "pointer" }}
      onClick={() => !playing && handlePlay()}>
      {local ? (
        <video ref={vRef} src="/plana-video.mp4"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: playing ? "block" : "none" }}
          controls playsInline />
      ) : (
        playing && (
          <iframe src="https://www.youtube.com/embed/TY9aF0GQq-U?autoplay=1" title="Plan A"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} />
        )
      )}
      {!playing && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", background: "linear-gradient(135deg,#1B3A4B,#0e2230)" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.06, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "10%", left: "5%", width: "200px", height: "200px", borderRadius: "50%", border: "1px solid #C8A96E" }} />
            <div style={{ position: "absolute", bottom: "15%", right: "8%", width: "130px", height: "130px", borderRadius: "50%", border: "1px solid #C8A96E" }} />
          </div>
          <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", position: "relative" }}>PLAN A IMMOBILIEN</p>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 14px rgba(200,169,110,0.12)", position: "relative", transition: "transform 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "4px" }}><polygon points="5,3 19,12 5,21" /></svg>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", position: "relative" }}>Zum Abspielen klicken</p>
        </div>
      )}
    </div>
  );
}

/* ─── Service Card ───────────────────────────────────────────── */
function SCard({ icon, title, text, href, delay = 0 }: { icon: React.ReactNode; title: string; text: string; href: string; delay?: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`rv rv-d${delay}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderLeft: hov ? "4px solid #C8A96E" : "1px solid #E5E7EB", borderRadius: "16px", padding: "36px", display: "flex", flexDirection: "column", gap: "14px", transform: hov ? "translateY(-4px)" : "translateY(0)", boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.08)" : "none", transition: "all 0.3s ease", cursor: "pointer" }}>
      <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: hov ? "rgba(200,169,110,0.1)" : "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>{icon}</div>
      <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", margin: 0 }}>{title}</h3>
      <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, margin: 0, flex: 1 }}>{text}</p>
      <Link href={href} style={{ fontSize: "13px", color: "#C8A96E", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
        Mehr erfahren <span style={{ transition: "transform 0.2s" }}>→</span>
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
export default function HomeClient() {
  useReveal();

  /* Stats visibility */
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVis, setStatsVis] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Wertermittlung form */
  const [wertTyp, setWertTyp] = useState("Haus");
  const [wertPlz, setWertPlz] = useState("");

  return (
    <>
      <style>{`
        .rv { opacity:0; transform:translateY(25px); transition:opacity 0.6s ease-out, transform 0.6s ease-out; }
        .rv.rv-in { opacity:1; transform:translateY(0); }
        .rv-d1 { transition-delay:0.1s; }
        .rv-d2 { transition-delay:0.2s; }
        .rv-d3 { transition-delay:0.3s; }
        .rv-d4 { transition-delay:0.4s; }
        @media(max-width:768px) {
          .hero-grid,.video-grid,.wert-grid,.partner-grid,.cta-grid,.step-connect { grid-template-columns:1fr!important; }
          .steps-row { flex-direction:column!important; }
          .steps-connector { display:none!important; }
          .footer-grid { grid-template-columns:1fr 1fr!important; }
          .immotype-grid { grid-template-columns:1fr 1fr!important; }
        }
        @media(max-width:500px) {
          .footer-grid,.immotype-grid { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* ══ 1. FULLSCREEN VIDEO HERO ══════════════════════════════════ */}
      <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "600px", overflow: "hidden" }}>
        <video autoPlay muted loop playsInline preload="auto"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
          <source src="/plana-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,20,30,0.5) 0%,rgba(10,20,30,0.65) 60%,rgba(10,20,30,0.82) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", paddingTop: "64px" }}>
          {/* Label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "50px", border: "1px solid rgba(200,169,110,0.45)", backgroundColor: "rgba(200,169,110,0.08)", marginBottom: "28px", backdropFilter: "blur(8px)" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C8A96E" }} />
            <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E" }}>Immobilien & Finanzierung · Mosbach</span>
          </div>
          {/* Headline */}
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.1, color: "#fff", marginBottom: "24px", letterSpacing: "-0.01em", textShadow: "0 2px 20px rgba(0,0,0,0.3)", maxWidth: "900px" }}>
            Strategie bestimmt{" "}<span style={{ color: "#C8A96E" }}>den Preis.</span>
          </h1>
          {/* Sub */}
          <p style={{ fontSize: "clamp(14px, 2vw, 18px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "560px", marginBottom: "44px", fontWeight: 300 }}>
            Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen. Hauptsitz Mosbach – deutschlandweit tätig.
          </p>
          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center", marginBottom: "48px" }}>
            <Link href="/kontakt?betreff=Beratung"
              style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, letterSpacing: "0.04em", transition: "background 0.25s,transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#b8934a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#C8A96E"; e.currentTarget.style.transform = "translateY(0)"; }}>
              Kostenlose Beratung
            </Link>
            <Link href="/kontakt?betreff=Immobilienbewertung"
              style={{ display: "inline-flex", alignItems: "center", padding: "15px 36px", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1.5px solid rgba(255,255,255,0.4)", backdropFilter: "blur(8px)", transition: "background 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}>
              Immobilie bewerten
            </Link>
          </div>
          {/* Trust */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
            {["Kostenlos", "Unverbindlich", "Deutschlandweit"].map((t) => (
              <span key={t} style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="12" height="10" fill="none" stroke="#C8A96E" strokeWidth="2.5" viewBox="0 0 14 11"><polyline points="1 5 5 9 13 1" /></svg>{t}
              </span>
            ))}
          </div>
        </div>
        {/* Scroll line */}
        <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 1 }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Scroll</span>
          <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom,rgba(200,169,110,0.7),transparent)", animation: "sline 2s ease-in-out infinite" }} />
          <style>{`@keyframes sline{0%,100%{opacity:.4}50%{opacity:1}}`}</style>
        </div>
      </section>

      {/* ══ 2. VERTRAUEN-LEISTE ═══════════════════════════════════════ */}
      <div ref={statsRef} style={{ backgroundColor: "#1B3A4B" }}>
        <div style={{ ...S.wrap }}>
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

      {/* ══ 3. IMAGE VIDEO ════════════════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
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

      {/* ══ 4. LEISTUNGEN ════════════════════════════════════════════ */}
      <section style={S.sec()}>
        <div style={S.wrap}>
          <div className="rv" style={{ marginBottom: "48px" }}>
            <p style={S.label}>UNSERE SERVICES</p>
            <h2 style={S.h2}>Was wir für Sie tun.</h2>
            <GoldLine />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }} className="services-grid">
            <SCard delay={0} href="/immobilienverkauf"
              icon={<svg width="26" height="26" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>}
              title="Immobilienverkauf" text="Professionelle Vermarktung Ihrer Immobilie. Von der Bewertung bis zum Notartermin – strategisch, sicher, erfolgreich." />
            <SCard delay={1} href="/finanzierung"
              icon={<svg width="26" height="26" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h3M14 15h4"/></svg>}
              title="Finanzierung" text="KFW-Kredite, BAFA, staatliche Förderungen, Privatkredite – wir finden den günstigsten Zinssatz für Sie." />
            <SCard delay={2} href="/immobilienverkauf#aufbereitung"
              icon={<svg width="26" height="26" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>}
              title="Objekt-Aufbereitung" text="Professionelle Aufbereitung Ihrer Immobilie für den Verkauf. Fotos, Exposé, Home Staging. Aktuell kostenlos." />
            <SCard delay={3} href="/partner"
              icon={<svg width="26" height="26" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
              title="Partner werden" text="Starten Sie als selbstständiger Plan A Vertreter. IHK-Qualifikation mit unserer Unterstützung. Deutschlandweit." />
          </div>
        </div>
        <style>{`@media(max-width:768px){.services-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ══ 5. WERTERMITTLUNG ════════════════════════════════════════ */}
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
                  <select value={wertTyp} onChange={(e) => setWertTyp(e.target.value)}
                    style={{ flex: 1, minWidth: "140px", padding: "12px 16px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none" }}>
                    {["Haus", "Wohnung", "Mehrfamilienhaus", "Grundstück", "Gewerbe"].map((o) => <option key={o} value={o} style={{ color: "#1A1A1A" }}>{o}</option>)}
                  </select>
                  <input type="text" placeholder="PLZ" value={wertPlz} onChange={(e) => setWertPlz(e.target.value)} maxLength={5}
                    style={{ width: "100px", padding: "12px 16px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none" }} />
                </div>
                <Link href={`/kontakt?betreff=Immobilienbewertung&typ=${wertTyp}&plz=${wertPlz}`}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "14px", backgroundColor: "#C8A96E", color: "#fff", borderRadius: "10px", textDecoration: "none", fontSize: "14px", fontWeight: 500, letterSpacing: "0.04em", transition: "background 0.25s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#b8934a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#C8A96E")}>
                  Jetzt Bewertung anfragen →
                </Link>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: "10px" }}>Kostenlos · Unverbindlich · 24h Antwort</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. IMMOBILIENARTEN ═══════════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div className="rv" style={{ marginBottom: "48px" }}>
            <p style={S.label}>OBJEKTARTEN</p>
            <h2 style={S.h2}>Wir vermitteln.</h2>
            <GoldLine />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }} className="immotype-grid">
            {[
              { title: "Eigentums-wohnungen", icon: "🏢" },
              { title: "Einfamilien-häuser", icon: "🏠" },
              { title: "Mehrfamilien-häuser", icon: "🏘️" },
              { title: "Gewerbe-objekte", icon: "🏪" },
              { title: "Grundstücke", icon: "🌿" },
            ].map((t, i) => (
              <ImmoTypeCard key={i} title={t.title} icon={t.icon} delay={i} />
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.immotype-grid{grid-template-columns:repeat(3,1fr)!important;}}`}</style>
      </section>

      {/* ══ 7. SO FUNKTIONIERT ES ════════════════════════════════════ */}
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
                {/* Number circle */}
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#1B3A4B", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", position: "relative", zIndex: 1 }}>
                  <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#C8A96E" }}>{s.num}</span>
                </div>
                {/* Connector line */}
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

      {/* ══ 8. WARUM PLAN A ══════════════════════════════════════════ */}
      <section style={S.sec("#F7F5F2")}>
        <div style={S.wrap}>
          <div className="rv" style={{ marginBottom: "48px" }}>
            <p style={S.label}>UNSER VORTEIL</p>
            <h2 style={S.h2}>Warum Plan A?</h2>
            <GoldLine />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="why-grid">
            {[
              { title: "Unabhängig", text: "Als freier Makler sind wir an keine Bank gebunden. Wir vergleichen den gesamten Markt für Sie.", icon: <svg width="28" height="28" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: "Strategisch", text: "Wir verkaufen nicht einfach – wir beraten strategisch. Jede Entscheidung hat einen Plan hinter sich.", icon: <svg width="28" height="28" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M8 7h8M8 12h5M8 17h3"/></svg> },
              { title: "Deutschlandweit", text: "Hauptsitz Mosbach. Aber für Sie überall in Deutschland im Einsatz – überwiegend digital.", icon: <svg width="28" height="28" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20"/></svg> },
            ].map((item, i) => (
              <div key={i} className={`rv rv-d${i + 1}`} style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "36px", border: "1px solid #E5E7EB" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", backgroundColor: "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "12px" }}>{item.title}</h3>
                <p style={{ ...S.body, fontSize: "14px" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.why-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ══ 9. TESTIMONIALS ══════════════════════════════════════════ */}
      <section style={S.sec()}>
        <div style={S.wrap}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={S.label}>REFERENZEN</p>
            <h2 style={S.h2}>Was unsere Kunden sagen.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }} className="testi-grid">
            {[
              { text: "Plan A hat unsere Immobilie nicht einfach inseriert – sie haben eine richtige Strategie entwickelt. Innerhalb von 3 Wochen hatten wir einen geprüften Käufer.", name: "Familie M.", role: "Verkäufer, Mosbach" },
              { text: "Die Finanzierungsberatung war unglaublich hilfreich. Wir haben Förderprogramme genutzt, von denen wir vorher nie gehört hatten. Kostenlos und unverbindlich.", name: "Thomas K.", role: "Käufer, Heidelberg" },
              { text: "Sehr professionell, schnell und persönlich. Alles digital abgewickelt – ich hätte nicht gedacht, dass das so einfach funktioniert.", name: "Sabine R.", role: "Verkäuferin, Stuttgart" },
            ].map((t, i) => (
              <div key={i} className={`rv rv-d${i + 1}`} style={{ backgroundColor: "#F7F5F2", borderRadius: "16px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "3rem", color: "#C8A96E", lineHeight: 1, opacity: 0.6 }}>"</div>
                <p style={{ ...S.body, fontSize: "14px", flex: 1 }}>{t.text}</p>
                <div style={{ display: "flex", gap: "3px", marginTop: "4px" }}>{[1,2,3,4,5].map((s) => <span key={s} style={{ color: "#C8A96E", fontSize: "14px" }}>★</span>)}</div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", margin: 0 }}>{t.name}</p>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "2px 0 0" }}>{t.role}</p>
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 10px", backgroundColor: "#fff", borderRadius: "6px", fontSize: "11px", color: "#6B7280", width: "fit-content" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#4285F4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Bewertung auf Google
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: "12px", color: "#9CA3AF", marginTop: "24px" }}>/* Echte Google Bewertungen werden nach Einrichtung von Google My Business eingebunden */</p>
        </div>
        <style>{`@media(max-width:768px){.testi-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ══ 10. FINANZIERUNG PREVIEW ══════════════════════════════════ */}
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
              onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#1B3A4B")}>
              Alle Finanzierungsoptionen →
            </Link>
          </div>
        </div>
        <style>{`@media(max-width:768px){.fin-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ══ 11. PARTNER PREVIEW ══════════════════════════════════════ */}
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
              <p style={{ ...S.body, marginBottom: "32px" }}>
                Starten Sie Ihre Karriere in der Immobilienbranche. Mit IHK-Qualifikation, verifizierten Leads und unserer Unterstützung im Hintergrund.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {["Kein teurer Kurs, keine versteckten Kosten", "IHK-Qualifikation (§34c & §34i)", "Überwiegend digitale Schulungen", "Verifizierte Leads vom ersten Tag"].map((b) => (
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
                onMouseEnter={(e) => (e.currentTarget.style.background = "#C8A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1B3A4B")}>
                Mehr erfahren →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 12. KONTAKT CTA ══════════════════════════════════════════ */}
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
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b8934a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#C8A96E")}>
                Jetzt anrufen: 0173-6259429
              </a>
              <Link href="/kontakt"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "15px 36px", backgroundColor: "transparent", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, border: "1.5px solid rgba(255,255,255,0.35)", transition: "border-color 0.25s" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)")}>
                Kontaktformular
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Immobilien-Typ Card ────────────────────────────────────── */
function ImmoTypeCard({ title, icon, delay }: { title: string; icon: string; delay: number }) {
  const [hov, setHov] = useState(false);
  return (
    <div className={`rv rv-d${delay}`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "14px", padding: "28px 20px", textAlign: "center", transform: hov ? "translateY(-4px)" : "translateY(0)", boxShadow: hov ? "0 12px 36px rgba(0,0,0,0.08)" : "none", transition: "all 0.3s ease", cursor: "pointer" }}>
      <div style={{ fontSize: "2.2rem", marginBottom: "12px" }}>{icon}</div>
      <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", lineHeight: 1.4, margin: 0 }}>{title}</p>
    </div>
  );
}
