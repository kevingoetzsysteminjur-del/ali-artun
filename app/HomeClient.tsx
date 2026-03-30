"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Count-up hook ──────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ─── Video Player (lokales MP4) ─────────────────────────────── */
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(27,58,75,0.18)",
        aspectRatio: "16/9",
        background: "#1B3A4B",
      }}
    >
      {/* Video element – always mounted so it can preload */}
      <video
        ref={videoRef}
        src="/plana-video.mp4"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: playing ? "block" : "none",
        }}
        controls
        playsInline
      />

      {/* Thumbnail overlay – hidden once playing */}
      {!playing && (
        <div
          onClick={handlePlay}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #1B3A4B 0%, #0e2230 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            cursor: "pointer",
          }}
        >
          {/* Decorative rings */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.07 }}>
            <div style={{ position: "absolute", top: "10%", left: "5%", width: "200px", height: "200px", borderRadius: "50%", border: "1px solid #C8A96E" }} />
            <div style={{ position: "absolute", bottom: "15%", right: "8%", width: "140px", height: "140px", borderRadius: "50%", border: "1px solid #C8A96E" }} />
          </div>

          {/* Brand label */}
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "8px" }}>
              PLAN A IMMOBILIEN
            </p>
            <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "rgba(255,255,255,0.9)" }}>
              Unser Erklärvideo
            </p>
          </div>

          {/* Play Button */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#C8A96E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 14px rgba(200,169,110,0.12)",
              position: "relative",
              zIndex: 1,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 20px rgba(200,169,110,0.18)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 14px rgba(200,169,110,0.12)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: "4px" }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>

          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", position: "relative", zIndex: 1 }}>
            Zum Abspielen klicken
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Stats Bar with count-up ────────────────────────────────── */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const v1 = useCountUp(50, 1400, visible);
  const v2 = useCountUp(300, 1600, visible);
  const v3 = useCountUp(24, 1200, visible);

  const stats = [
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
        </svg>
      ),
      value: v1 + "+",
      label: "Deutschlandweit",
      sub: "Regionen",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      value: v2 + "+",
      label: "Partnerbanken",
      sub: "Freier Makler",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
      value: v3 + "h",
      label: "Antwortzeit",
      sub: "Digitale Beratung",
    },
  ];

  return (
    <div ref={ref} style={{ backgroundColor: "#1B3A4B", padding: "0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: "36px 24px",
                borderRight: i < 2 ? "1px solid rgba(200,169,110,0.1)" : "none",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "rgba(200,169,110,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: "#ffffff", lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "12px", color: "#C8A96E", fontWeight: 500, letterSpacing: "0.05em" }}>{s.label}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Scroll Indicator ───────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
      <span style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B7280" }}>Scroll</span>
      <div
        style={{
          width: "1px",
          height: "48px",
          background: "linear-gradient(to bottom, #C8A96E, transparent)",
          animation: "scrollPulse 2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.7); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main HomeClient ─────────────────────────────────────────── */
export default function HomeClient() {
  return (
    <>
      {/* ════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "80px",
          paddingBottom: "0",
          background: "linear-gradient(150deg, #ffffff 0%, #F7F5F2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative background circles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(27,58,75,0.04) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "20%", right: "30%", width: "2px", height: "120px", background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.2), transparent)", transform: "rotate(15deg)" }} />
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="hero-grid">
            {/* Left */}
            <div className="reveal">
              {/* Label */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "50px", border: "1px solid rgba(200,169,110,0.3)", marginBottom: "28px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C8A96E" }} />
                <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C8A96E" }}>
                  Immobilien & Finanzierung
                </span>
              </div>

              {/* Headline */}
              <h1
                style={{
                  fontFamily: "var(--font-dm-serif, serif)",
                  fontSize: "clamp(3rem, 5.5vw, 5rem)",
                  lineHeight: 1.1,
                  color: "#1A1A1A",
                  marginBottom: "24px",
                  letterSpacing: "-0.01em",
                }}
              >
                Strategie<br />
                bestimmt<br />
                <span style={{ color: "#C8A96E" }}>den Preis.</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#6B7280",
                  lineHeight: 1.8,
                  maxWidth: "420px",
                  marginBottom: "40px",
                  fontWeight: 300,
                }}
              >
                Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen.{" "}
                <span style={{ color: "#1B3A4B", fontWeight: 400 }}>Hauptsitz Mosbach – deutschlandweit tätig.</span>
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
                <Link href="/finanzierung" className="btn-primary">
                  Finanzierung anfragen
                </Link>
                <Link href="/immobilienverkauf" className="btn-secondary">
                  Immobilie verkaufen
                </Link>
              </div>

              {/* Trust Indicators */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                {["Unabhängig", "Deutschlandweit", "Kostenlose Erstberatung"].map((t, i) => (
                  <span key={i} style={{ fontSize: "12px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "6px" }}>
                    <svg width="12" height="10" fill="none" stroke="#C8A96E" strokeWidth="2.5" viewBox="0 0 14 11">
                      <polyline points="1 5 5 9 13 1" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Maskottchen */}
            <div className="reveal reveal-delay-2" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
              {/* Decorative ring behind mascot */}
              <div style={{ position: "absolute", width: "420px", height: "420px", borderRadius: "50%", border: "1px solid rgba(200,169,110,0.12)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
              <div style={{ position: "absolute", width: "340px", height: "340px", borderRadius: "50%", backgroundColor: "rgba(200,169,110,0.04)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

              <Image
                src="/maskottchen.png"
                alt="Plan A"
                width={380}
                height={380}
                style={{ width: "clamp(240px, 30vw, 380px)", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 40px rgba(27,58,75,0.15))" }}
                priority
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "48px", paddingBottom: "24px" }}>
            <ScrollIndicator />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════════
          STATS BAR
      ════════════════════════════════════════════════════ */}
      <StatsBar />

      {/* ════════════════════════════════════════════════════
          SERVICE CARDS
      ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F7F5F2", padding: "100px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          {/* Header */}
          <div className="reveal" style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>
              UNSERE LEISTUNGEN
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1A1A1A", margin: 0, lineHeight: 1.2 }}>
                Was wir für Sie tun
              </h2>
              <p style={{ fontSize: "14px", color: "#9CA3AF", maxWidth: "320px", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
                Zwei Kernbereiche – ein Partner. Alles aus einer Hand.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
            {[
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20M6 15h3M14 15h4" />
                  </svg>
                ),
                tag: "FINANZIERUNG",
                title: "Finanzierung",
                text: "KFW-Kredite, BAFA, staatliche Förderungen, Privatkredite – wir finden den günstigsten Zinssatz für Sie.",
                href: "/finanzierung",
                items: ["KFW & BAFA Beratung", "Privatkredit-Vergleich", "Modernisierungsdarlehen"],
              },
              {
                icon: (
                  <svg width="28" height="28" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                    <path d="M9 21V12h6v9" />
                  </svg>
                ),
                tag: "IMMOBILIEN",
                title: "Immobilienverkauf",
                text: "Strategischer Verkauf Ihrer Immobilie. Bewertung, Aufbereitung, Vermarktung – alles aus einer Hand.",
                href: "/immobilienverkauf",
                items: ["Marktgerechte Bewertung", "Geprüfte Käufer", "Sichere Abwicklung"],
              },
            ].map((card, i) => (
              <ServiceCard key={i} card={card} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          4 SCHRITTE
      ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFFFF", padding: "100px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div className="reveal" style={{ marginBottom: "64px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>DER PROZESS</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1A1A1A", lineHeight: 1.2 }}>
              In 4 Schritten zur{" "}
              <span style={{ color: "#C8A96E" }}>Lösung</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="steps-grid">
            {[
              { num: "01", title: "Kennenlernen", text: "Wir lernen Sie und Ihre Situation persönlich kennen." },
              { num: "02", title: "Strategie", text: "Gemeinsam entwickeln wir den optimalen Plan." },
              { num: "03", title: "Umsetzung", text: "Wir setzen die Strategie transparent um." },
              { num: "04", title: "Ergebnis", text: "Sie profitieren von der besten Lösung." },
            ].map((step, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  padding: "40px 32px",
                  borderRight: i < 3 ? "1px solid #F0EDE8" : "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  position: "relative",
                }}
              >
                {/* Number */}
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "4rem", color: "#C8A96E", lineHeight: 1, opacity: 0.25, position: "absolute", top: "28px", right: "24px" }}>
                  {step.num}
                </div>
                {/* Step indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#1B3A4B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#C8A96E" }}>{step.num}</span>
                  </div>
                  <div style={{ flex: 1, height: "1px", backgroundColor: i === 3 ? "transparent" : "#E5E7EB" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .steps-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 560px) { .steps-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════════
          VIDEO SECTION
      ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F7F5F2", padding: "100px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="video-grid">
            <div className="reveal">
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>ERFAHREN SIE MEHR</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#1A1A1A", marginBottom: "20px", lineHeight: 1.2 }}>
                Wie Plan A{" "}
                <span style={{ color: "#C8A96E" }}>funktioniert</span>
              </h2>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.8, fontWeight: 300, marginBottom: "32px" }}>
                In unserem Erklärvideo erfahren Sie, wie wir Immobilienverkauf und Finanzierung strategisch verbinden – für planbare Ergebnisse.
              </p>
              <Link href="/kontakt" className="btn-primary">Jetzt beraten lassen</Link>
            </div>
            <div className="reveal reveal-delay-2">
              <VideoPlayer />
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .video-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ════════════════════════════════════════════════════
          WAS UNS UNTERSCHEIDET
      ════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#1B3A4B", padding: "100px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}>
          <div className="reveal" style={{ marginBottom: "60px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>UNSER VORTEIL</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#FFFFFF", lineHeight: 1.2 }}>
              Was uns unterscheidet
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", borderTop: "1px solid rgba(200,169,110,0.15)" }} className="usp-grid">
            {[
              {
                num: "01",
                title: "Geprüfte Käufer",
                text: "Nur Interessenten mit bestätigter Finanzierungszusage werden vermittelt. Sicherheit für Verkäufer.",
              },
              {
                num: "02",
                title: "Freier Makler",
                text: "Wir sind unabhängig und vergleichen den gesamten Markt – ohne Bindung an eine Bank.",
              },
              {
                num: "03",
                title: "Digitale Beratung",
                text: "Überwiegend digital und flexibel. Beratung nach Ihrem Zeitplan, deutschlandweit.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  padding: "48px 32px",
                  borderRight: i < 2 ? "1px solid rgba(200,169,110,0.15)" : "none",
                  borderBottom: "1px solid rgba(200,169,110,0.15)",
                }}
              >
                <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#C8A96E", marginBottom: "20px", opacity: 0.6 }}>{item.num}</div>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.4rem", color: "#FFFFFF", marginBottom: "14px" }}>{item.title}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, fontWeight: 300 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) { .usp-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════════
          CTA – WERTERMITTLUNG
      ════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "120px 0",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F7F5F2 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Deco */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", bottom: "-20%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)" }} />
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="cta-grid">
            <div className="reveal">
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>KOSTENLOSE BEWERTUNG</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#1A1A1A", marginBottom: "16px", lineHeight: 1.2 }}>
                Was ist Ihre<br />
                <span style={{ color: "#C8A96E" }}>Immobilie wert?</span>
              </h2>
              <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.8, fontWeight: 300 }}>
                Kostenlose Bewertung in 24 Stunden. Unverbindlich, professionell, deutschlandweit.
              </p>
            </div>
            <div className="reveal reveal-delay-2" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "20px", border: "1px solid #E5E7EB", boxShadow: "0 8px 40px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "14px", color: "#374151", lineHeight: 1.7, fontWeight: 300, marginBottom: "24px" }}>
                  Senden Sie uns eine kurze Anfrage – wir melden uns innerhalb von 24 Stunden mit einer ersten Einschätzung.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Link
                    href="/kontakt?betreff=Immobilienbewertung"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "16px 28px",
                      backgroundColor: "#1B3A4B",
                      color: "#FFFFFF",
                      borderRadius: "50px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      transition: "background 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C8A96E")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B3A4B")}
                  >
                    Jetzt bewerten lassen →
                  </Link>
                  <Link
                    href="/kontakt"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "16px 28px",
                      backgroundColor: "transparent",
                      color: "#1B3A4B",
                      borderRadius: "50px",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      border: "1.5px solid #E5E7EB",
                    }}
                  >
                    Oder direkt schreiben
                  </Link>
                </div>
              </div>
              <div style={{ display: "flex", gap: "20px", paddingLeft: "8px" }}>
                {["Kostenlos", "Unverbindlich", "24h Antwort"].map((t, i) => (
                  <span key={i} style={{ fontSize: "12px", color: "#9CA3AF", display: "flex", alignItems: "center", gap: "5px" }}>
                    <svg width="10" height="8" fill="none" stroke="#C8A96E" strokeWidth="2.5" viewBox="0 0 12 10">
                      <polyline points="1 5 4 8 11 1" />
                    </svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .cta-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}

/* ─── Service Card (hover state) ─────────────────────────────── */
function ServiceCard({
  card,
  delay,
}: {
  card: { icon: React.ReactNode; tag: string; title: string; text: string; href: string; items: string[] };
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`reveal${delay > 0 ? ` reveal-delay-${delay}` : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#FBF8F1" : "#FFFFFF",
        border: hovered ? "1px solid #C8A96E" : "1px solid #E5E7EB",
        borderLeft: hovered ? "4px solid #C8A96E" : "1px solid #E5E7EB",
        borderRadius: "20px",
        padding: "44px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        minHeight: "300px",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      {/* Tag + Icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF" }}>{card.tag}</span>
        <div style={{ width: "52px", height: "52px", borderRadius: "14px", backgroundColor: hovered ? "rgba(200,169,110,0.12)" : "#F7F5F2", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s ease" }}>
          {card.icon}
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.8rem", color: "#1A1A1A", lineHeight: 1.2 }}>{card.title}</h3>
      <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, flex: 1 }}>{card.text}</p>

      {/* Mini list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #F0EDE8", paddingTop: "16px" }}>
        {card.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#374151", fontWeight: 300 }}>
            <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#C8A96E", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>

      <Link href={card.href} className="btn-ghost">
        Mehr erfahren <span className="btn-arrow">→</span>
      </Link>
    </div>
  );
}
