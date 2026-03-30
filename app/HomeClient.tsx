"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function HomeClient() {
  useReveal();

  return (
    <>
      <style>{`
        .rv { opacity:0; transform:translateY(25px); transition:opacity 0.65s ease-out, transform 0.65s ease-out; }
        .rv.rv-in { opacity:1; transform:translateY(0); }
        .rv-d1{transition-delay:0.1s;} .rv-d2{transition-delay:0.2s;}
        .rv-d3{transition-delay:0.3s;} .rv-d4{transition-delay:0.4s;}
        .hero-btn-primary { display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:linear-gradient(135deg,#B8860B,#D4A017);color:#fff;border-radius:60px;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;box-shadow:0 4px 25px rgba(184,134,11,0.3);transition:all 400ms cubic-bezier(0.4,0,0.2,1); }
        .hero-btn-primary:hover { background:linear-gradient(135deg,#D4A017,#E8B820);transform:scale(1.03); }
        .hero-btn-secondary { display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:transparent;color:#D4A017;border-radius:60px;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;border:1.5px solid #D4A017;transition:all 400ms cubic-bezier(0.4,0,0.2,1); }
        .hero-btn-secondary:hover { background:#D4A017;color:#fff; }
        .svc-card { background:#FFFCF7;border:1px solid #E8D9C5;border-radius:20px;padding:40px;display:flex;flex-direction:column;gap:20px;height:100%;box-sizing:border-box;transition:all 0.3s ease;cursor:pointer;text-decoration:none;color:inherit; }
        .svc-card:hover { box-shadow:0 16px 48px rgba(44,26,14,0.1);transform:translateY(-4px);border-color:#B8860B; }
        .cta-btn { display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:linear-gradient(135deg,#B8860B,#D4A017);color:#fff;border-radius:60px;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;box-shadow:0 4px 25px rgba(184,134,11,0.25);transition:all 400ms cubic-bezier(0.4,0,0.2,1); }
        .cta-btn:hover { background:linear-gradient(135deg,#D4A017,#E8B820);transform:scale(1.03); }
        .cta-btn-outline { display:inline-flex;align-items:center;gap:8px;padding:16px 36px;background:transparent;color:#B8860B;border-radius:60px;text-decoration:none;font-size:13px;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;border:1.5px solid #B8860B;transition:all 400ms cubic-bezier(0.4,0,0.2,1); }
        .cta-btn-outline:hover { background:#B8860B;color:#fff; }
        @media(max-width:768px) {
          .svc-grid{grid-template-columns:1fr!important;}
          .timeline-row{flex-direction:column!important;gap:24px!important;}
          .timeline-arrow{display:none!important;}
          .brand-grid{grid-template-columns:1fr!important;}
          .brand-img-col{display:none!important;}
        }
        @media(max-width:600px) {
          .trust-band{flex-direction:column!important;gap:0!important;}
          .trust-item{border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.12)!important;}
        }
      `}</style>

      {/* ══ 1. VIDEO HERO ═════════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100svh", minHeight: "620px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video
          autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
          src="/images/video.mp4"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.65) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px", maxWidth: "860px" }} className="rv">
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.25em", textTransform: "uppercase", color: "#B8860B", marginBottom: "20px" }}>PLAN A IMMOBILIEN & FINANZIERUNG · MOSBACH</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.4rem, 6vw, 4.8rem)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "24px", fontWeight: 400 }}>
            Immobilienverkauf mit<br />
            <em style={{ color: "#B8860B", fontStyle: "italic" }}>geprüfter Käuferfinanzierung.</em>
          </h1>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.85, fontWeight: 300, maxWidth: "540px", margin: "0 auto 40px" }}>
            Entscheidungen auf einem anderen Niveau. Plan A begleitet Sie vom ersten Gespräch bis zum Notartermin.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
            <Link href="/immobilienverkauf" className="hero-btn-primary">Immobilie verkaufen</Link>
            <Link href="/finanzierung" className="hero-btn-secondary">Finanzierung anfragen</Link>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45))" }} />
          <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.25em", textTransform: "uppercase", margin: 0 }}>Scroll</p>
        </div>
      </section>

      {/* ══ 2. VERTRAUEN-LEISTE ═══════════════════════════════════ */}
      <section style={{ backgroundColor: "#2C1A0E" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} className="trust-band">
            {[
              { icon: "🌐", label: "Deutschlandweit tätig" },
              { icon: "🏛️", label: "Freier & unabhängiger Makler" },
              { icon: "🕐", label: "Mo–So 8–20 Uhr" },
              { icon: "✓", label: "Kostenlose Erstberatung" },
            ].map((item, i, arr) => (
              <div key={i} className="trust-item"
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "20px 36px", borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.72)", fontWeight: 400, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. SERVICE CARDS ══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFCF7", padding: "96px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>UNSERE LEISTUNGEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#2C1A0E", lineHeight: 1.2, margin: 0 }}>Was Plan A für Sie tut.</h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", margin: "20px auto 0" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }} className="svc-grid">
            {[
              {
                href: "/immobilienverkauf",
                label: "IMMOBILIENVERKAUF",
                title: "Strategisch verkaufen.",
                text: "Plan A vermarktet Ihre Immobilie professionell – mit Bonitätsprüfung der Käufer, Finanzierungssicherheit und persönlicher Begleitung bis zum Notartermin.",
                icon: <svg width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
              },
              {
                href: "/finanzierung",
                label: "FINANZIERUNG & FÖRDERUNG",
                title: "Günstig finanzieren.",
                text: "Als freier Makler vergleichen wir den gesamten Markt – KFW-Kredite, BAFA-Förderungen, Privatkredite. Kostenlos, unabhängig, transparent.",
                icon: <svg width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>,
              },
            ].map((card, i) => (
              <Link key={card.href} href={card.href} className={`rv rv-d${i + 1} svc-card`}>
                <div style={{ width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "#F5EDE0", display: "flex", alignItems: "center", justifyContent: "center", color: "#2C1A0E" }}>
                  {card.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", color: "#B8860B", textTransform: "uppercase", marginBottom: "8px" }}>{card.label}</p>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.4rem,2vw,1.9rem)", color: "#2C1A0E", marginBottom: "12px", lineHeight: 1.2 }}>{card.title}</h3>
                  <p style={{ fontSize: "15px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, margin: 0 }}>{card.text}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#B8860B", fontSize: "13px", fontWeight: 500 }}>
                  Mehr erfahren
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. IN 4 SCHRITTEN ════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5EDE0", padding: "96px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div className="rv" style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>SO FUNKTIONIERT ES</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", color: "#2C1A0E", lineHeight: 1.2, margin: 0 }}>In 4 Schritten zum Ziel.</h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", margin: "20px auto 0" }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0", position: "relative" }} className="rv timeline-row">
            {[
              { num: "01", title: "Analyse", text: "Kostenlose Erstberatung – wir verstehen Ihre Situation und Ziele." },
              { num: "02", title: "Strategie", text: "Individuelle Vermarktstrategie, Preispositionierung und Timing." },
              { num: "03", title: "Vermarktung", text: "Professionelles Exposé, Käuferqualifikation, Besichtigungen." },
              { num: "04", title: "Notar", text: "Begleitung bis zur Unterschrift – Plan A ist bis zum Schluss für Sie da." },
            ].map((step, i, arr) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", padding: "0 12px" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", position: "relative", zIndex: 1, flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#B8860B" }}>{step.num}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="timeline-arrow" style={{ position: "absolute", top: "36px", left: "calc(50% + 40px)", right: "calc(-50% + 40px)", height: "1px", backgroundColor: "#B8860B", opacity: 0.25, zIndex: 0 }} />
                )}
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.15rem", color: "#2C1A0E", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ fontSize: "13px", color: "#7A6548", lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. BRAND SECTION ════════════════════════════════════ */}
      <section style={{ backgroundColor: "#2C1A0E", padding: "96px 0", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: "-120px", right: "-120px", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid rgba(184,134,11,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "360px", height: "360px", borderRadius: "50%", border: "1px solid rgba(184,134,11,0.07)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="brand-grid">
          <div className="rv">
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>PLAN A IMMOBILIEN</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#FFFFFF", lineHeight: 1.3, marginBottom: "20px" }}>
              „Entscheidungen auf einem anderen Niveau."
            </h2>
            <div style={{ width: "48px", height: "2px", backgroundColor: "#B8860B", marginBottom: "24px" }} />
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.62)", lineHeight: 1.9, fontWeight: 300, marginBottom: "36px" }}>
              Gegründet mit dem Anspruch, Immobilienverkauf und Käuferfinanzierung unter einem Dach zu vereinen. So entstehen planbare Abschlüsse und zufriedene Kunden auf beiden Seiten.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Image src="/ali.png" alt="Ali Artun" width={52} height={52}
                style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2px solid #B8860B" }} />
              <div>
                <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#FFFFFF", margin: 0 }}>Ali Artun</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", margin: 0, fontWeight: 300 }}>Gründer & Geschäftsführer · Mosbach</p>
              </div>
            </div>
          </div>
          <div className="rv rv-d2 brand-img-col" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
            <div style={{ position: "absolute", width: "340px", height: "340px", borderRadius: "50%", border: "1px solid rgba(184,134,11,0.2)" }} />
            <div style={{ position: "absolute", width: "270px", height: "270px", borderRadius: "50%", backgroundColor: "rgba(184,134,11,0.05)" }} />
            <Image src="/maskottchen.png" alt="Plan A" width={290} height={290}
              style={{ width: "clamp(200px,22vw,290px)", height: "auto", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }} />
          </div>
        </div>
      </section>

      {/* ══ 6. CTA ════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FFFCF7", padding: "96px 0" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="rv">
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "16px" }}>KOSTENFREI & UNVERBINDLICH</p>
            <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#2C1A0E", lineHeight: 1.2, marginBottom: "16px" }}>
              Bereit für den nächsten Schritt?
            </h2>
            <p style={{ fontSize: "16px", color: "#7A6548", lineHeight: 1.85, fontWeight: 300, marginBottom: "40px" }}>
              Kostenlose Erstberatung – unverbindlich und persönlich. Wir melden uns innerhalb von 24 Stunden.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}>
              <a href="tel:01736259429" className="cta-btn">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                0173-6259429
              </a>
              <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer" className="cta-btn-outline">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
