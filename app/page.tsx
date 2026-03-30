import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="min-h-screen flex items-center pt-16" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left */}
              <div className="reveal">
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "20px" }}>
                  IMMOBILIEN & FINANZIERUNG
                </p>
                <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.15, color: "#1A1A1A", marginBottom: "24px" }}>
                  Strategie bestimmt<br />
                  <span style={{ color: "#C8A96E" }}>den Preis.</span>
                </h1>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, maxWidth: "480px", marginBottom: "36px", fontWeight: 300 }}>
                  Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen. Hauptsitz Mosbach – deutschlandweit tätig.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/finanzierung" className="btn-primary">Finanzierung anfragen</Link>
                  <Link href="/immobilienverkauf" className="btn-secondary">Immobilie verkaufen</Link>
                </div>
              </div>
              {/* Right: YouTube Embed */}
              <div className="reveal reveal-delay-2">
                <div style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", position: "relative", paddingBottom: "56.25%", height: 0 }}>
                  <iframe
                    src="https://www.youtube.com/embed/TY9aF0GQq-U"
                    title="Plan A Immobilien"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS LEISTE ──────────────────────────────────────────── */}
        <div style={{ backgroundColor: "#1B3A4B" }} className="py-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
              {[
                "Deutschlandweit",
                "Freier Makler",
                "Digitale Beratung",
              ].map((fact, i) => (
                <div key={i} className="flex items-center gap-3">
                  {i > 0 && <div className="hidden sm:block w-px h-4" style={{ backgroundColor: "rgba(200,169,110,0.4)" }} />}
                  <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)" }}>
                    {fact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SERVICE CARDS ─────────────────────────────────────────── */}
        <section style={{ backgroundColor: "#F7F5F2" }} className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14 reveal">
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>UNSERE LEISTUNGEN</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1A1A1A" }}>Was wir für Sie tun</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Finanzierung */}
              <div className="card-hover reveal" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <path d="M2 10h20M6 15h3M14 15h4"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1A1A1A" }}>Finanzierung</h3>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>
                  KFW-Kredite, BAFA, staatliche Förderungen, Privatkredite – wir finden den günstigsten Zinssatz für Sie.
                </p>
                <Link href="/finanzierung" className="btn-ghost" style={{ marginTop: "8px" }}>
                  Mehr erfahren <span className="btn-arrow">→</span>
                </Link>
              </div>
              {/* Card 2: Immobilienverkauf */}
              <div className="card-hover reveal reveal-delay-2" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "40px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="32" height="32" fill="none" stroke="#C8A96E" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
                    <path d="M9 21V12h6v9"/>
                  </svg>
                </div>
                <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.6rem", color: "#1A1A1A" }}>Immobilienverkauf</h3>
                <p style={{ fontSize: "15px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>
                  Strategischer Verkauf Ihrer Immobilie. Bewertung, Aufbereitung, Vermarktung – alles aus einer Hand.
                </p>
                <Link href="/immobilienverkauf" className="btn-ghost" style={{ marginTop: "8px" }}>
                  Mehr erfahren <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4 SCHRITTE TIMELINE ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF" }} className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>DER PROZESS</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1A1A1A" }}>In 4 Schritten zur Lösung</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {[
                { num: "01", title: "Kennenlernen", text: "Wir lernen Sie und Ihre Situation persönlich kennen." },
                { num: "02", title: "Strategie", text: "Gemeinsam entwickeln wir den optimalen Plan für Sie." },
                { num: "03", title: "Umsetzung", text: "Wir setzen die Strategie um – transparent und effizient." },
                { num: "04", title: "Ergebnis", text: "Sie profitieren von der besten Lösung am Markt." },
              ].map((step, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col gap-4`} style={{ position: "relative" }}>
                  <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "3.5rem", color: "#C8A96E", lineHeight: 1, opacity: 0.9 }}>{step.num}</div>
                  <div style={{ width: "40px", height: "1.5px", backgroundColor: "#C8A96E" }} />
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.25rem", color: "#1A1A1A" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MASKOTTCHEN SECTION ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#F7F5F2" }} className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="reveal flex justify-center lg:justify-start">
                <Image
                  src="/maskottchen.png"
                  alt="Plan A Maskottchen"
                  width={320}
                  height={320}
                  className="w-64 lg:w-80 h-auto drop-shadow-xl"
                />
              </div>
              <div className="reveal reveal-delay-2">
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>PLAN A IMMOBILIEN</p>
                <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1A1A1A", marginBottom: "20px" }}>
                  Ihre Immobilienmarke.
                </h2>
                <p style={{ fontSize: "16px", color: "#6B7280", lineHeight: 1.75, fontWeight: 300, marginBottom: "32px" }}>
                  Wir stehen für strategische Beratung, Unabhängigkeit und Ergebnisse. Kein Mainstream. Plan A.
                </p>
                <Link href="/kontakt" className="btn-primary">Jetzt beraten lassen</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAS UNS UNTERSCHEIDET ─────────────────────────────────── */}
        <section style={{ backgroundColor: "#FFFFFF" }} className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14 reveal">
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "12px" }}>UNSER VORTEIL</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#1A1A1A" }}>Was uns unterscheidet</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Geprüfte Käufer", text: "Nur Interessenten mit bestätigter Finanzierungszusage werden vermittelt. Sicherheit für Verkäufer." },
                { title: "Freier Makler", text: "Wir sind unabhängig und vergleichen den gesamten Markt – ohne Bindung an eine Bank oder einen Anbieter." },
                { title: "Digitale Beratung", text: "Überwiegend digital und flexibel. Beratung nach Ihrem Zeitplan, deutschlandweit." },
              ].map((item, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{ padding: "32px", borderLeft: "3px solid #C8A96E" }}>
                  <h3 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "12px" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WERTERMITTLUNG CTA ─────────────────────────────────────── */}
        <section style={{ backgroundColor: "#1B3A4B" }} className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="reveal">
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>KOSTENLOS</p>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#FFFFFF", marginBottom: "12px" }}>
                Was ist Ihre Immobilie wert?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", marginBottom: "32px", fontWeight: 300 }}>
                Kostenlose Bewertung in 24 Stunden.
              </p>
              <Link
                href="/kontakt?betreff=Immobilienbewertung"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "50px", padding: "14px 32px", backgroundColor: "#C8A96E", color: "#FFFFFF", fontFamily: "var(--font-inter, sans-serif)", fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", border: "none", borderRadius: "50px", textDecoration: "none", transition: "background 0.3s ease" }}
              >
                Jetzt bewerten lassen →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
