"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { MAKLER } from "@/lib/config";
import { Building2, BadgeCheck, Zap, HandshakeIcon } from "lucide-react";

// ── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ── WhatsApp Icon ────────────────────────────────────────────────────────────
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Tab data ─────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "altbau",
    label: "Altbaufinanzierung",
    title: "Altbaufinanzierung",
    description:
      "Finanzierung für Bestandsimmobilien, Altbauten und sanierungsbedürftige Objekte. Wir finden den passenden Kredit auch für ältere Gebäude mit besonderem Charme. Individuelle Lösungen für Denkmalschutz, energetische Sanierung und Modernisierung.",
    gradient: "linear-gradient(135deg, #7C6347 0%, #5C4A38 40%, #3D2E1E 100%)",
    accentGradient: "linear-gradient(45deg, rgba(197,160,40,0.25) 0%, transparent 60%)",
    imageAlt: "Altbau-Fassade",
    icon: "🏛️",
  },
  {
    id: "neubau",
    label: "Neubaufinanzierung",
    title: "Neubaufinanzierung",
    description:
      "Vom Grundstückskauf bis zur Schlüsselübergabe – wir begleiten Ihre Neubaufinanzierung mit den besten Konditionen. Stufenweise Auszahlung nach Baufortschritt, KfW-Fördermittel und Sondertilgungsoptionen inklusive.",
    gradient: "linear-gradient(135deg, #2C4A6E 0%, #1E3A5A 40%, #122540 100%)",
    accentGradient: "linear-gradient(45deg, rgba(100,180,255,0.2) 0%, transparent 60%)",
    imageAlt: "Neubau",
    icon: "🏗️",
  },
  {
    id: "bautraeger",
    label: "Bauträgerfinanzierung",
    title: "Bauträgerfinanzierung",
    description:
      "Spezielle Finanzierungslösungen für Bauträger und Projektentwickler. Wir strukturieren Ihre Finanzierung so, dass Ihr Projekt von der Planung bis zum Verkauf optimal abgesichert ist.",
    gradient: "linear-gradient(135deg, #2D3A4A 0%, #1E2B3A 40%, #121E2C 100%)",
    accentGradient: "linear-gradient(45deg, rgba(197,160,40,0.2) 0%, transparent 60%)",
    imageAlt: "Bauprojekt",
    icon: "🏢",
  },
  {
    id: "bausparen",
    label: "Bausparfinanzierung",
    title: "Bausparfinanzierung",
    description:
      "Bausparverträge als solide Grundlage für Ihre Immobilienfinanzierung. Niedrige Darlehenszinsen, staatliche Förderungen und planbare Raten – perfekt für langfristige Vorsorge und zukünftige Immobilienprojekte.",
    gradient: "linear-gradient(135deg, #2A4A2A 0%, #1E361E 40%, #122212 100%)",
    accentGradient: "linear-gradient(45deg, rgba(100,200,100,0.2) 0%, transparent 60%)",
    imageAlt: "Familie vor Haus",
    icon: "🏡",
  },
  {
    id: "privatkredit",
    label: "Privatkredite",
    title: "Privatkredite",
    description:
      "Flexible Privatkredite für Renovierung, Modernisierung oder Eigenkapital-Aufstockung. Schnelle Bearbeitung, faire Konditionen und unabhängiger Vergleich aus über 300 Bankpartnern.",
    gradient: "linear-gradient(135deg, #3A2A4A 0%, #2A1E3A 40%, #1A1228 100%)",
    accentGradient: "linear-gradient(45deg, rgba(180,100,255,0.2) 0%, transparent 60%)",
    imageAlt: "Beratungsgespräch",
    icon: "🤝",
  },
];

const features = [
  {
    icon: <Building2 size={28} />,
    title: "300+ Partnerbanken",
    desc: "Wir vergleichen für Sie – nicht an eine Bank gebunden. Das bedeutet echte Unabhängigkeit und die besten Konditionen.",
  },
  {
    icon: <BadgeCheck size={28} />,
    title: "Beste Konditionen",
    desc: "Durch unser Netzwerk erhalten Sie Angebote, die Sie als Privatperson so nicht bekommen würden.",
  },
  {
    icon: <Zap size={28} />,
    title: "Schnelle Bearbeitung",
    desc: "Typische Finanzierungszusage innerhalb von 24–48 Stunden. Wir sorgen dafür, dass kein Kauf platzt.",
  },
  {
    icon: <HandshakeIcon size={28} />,
    title: "Persönliche Beratung",
    desc: `${MAKLER.name} begleitet Sie persönlich durch den gesamten Finanzierungsprozess – von der Anfrage bis zum Abschluss.`,
  },
];

const processSteps = [
  {
    num: "01",
    title: "Gespräch",
    desc: "Wir lernen Ihre Situation und Wünsche kennen. Was möchten Sie kaufen? Was ist Ihre finanzielle Ausgangslage?",
  },
  {
    num: "02",
    title: "Vergleich",
    desc: "Wir holen Angebote aus unserem Netzwerk von 300+ Banken und Finanzierungspartnern ein.",
  },
  {
    num: "03",
    title: "Abschluss",
    desc: "Sie erhalten die beste Finanzierung – verständlich erklärt, transparent dokumentiert, sicher abgewickelt.",
  },
];

export default function FinanzierungClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(false);

  const handleTabChange = (idx: number) => {
    if (idx === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(idx);
      setVisible(true);
    }, 180);
  };

  useEffect(() => {
    // trigger initial fade-in
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const tab = TABS[activeTab];

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 lg:py-32"
          style={{ background: "linear-gradient(135deg, #1a1614 0%, #2d2520 50%, #1a1614 100%)" }}
        >
          {/* Gold glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(197,160,40,0.15) 0%, transparent 60%)" }}
          />
          <div className="max-w-5xl mx-auto px-4 sm:px-8 relative text-center">
            <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-5">
              Baufinanzierung & Privatkredite
            </p>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Ihre Finanzierung{" "}
              <span className="italic" style={{ color: "#C5A028" }}>aus einer Hand</span>
            </h1>
            <p className="text-stone-300 text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-10">
              Verbunden mit über 300 Banken deutschlandweit – unabhängig, transparent und auf Ihrer Seite
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={MAKLER.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm tracking-wide transition-all hover:scale-105"
                style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.35)", textDecoration: "none" }}
              >
                <WhatsAppIcon />
                Finanzierung anfragen
              </a>
              <a
                href={MAKLER.telefonHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ border: "1.5px solid rgba(197,160,40,0.4)", color: "#C5A028", textDecoration: "none" }}
              >
                {MAKLER.telefon}
              </a>
            </div>
          </div>
        </section>

        {/* ── TABS ──────────────────────────────────────────────────────── */}
        <section className="bg-white py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">

            {/* Tab bar */}
            <div
              className="flex overflow-x-auto mb-10 border-b border-stone-200"
              style={{ scrollbarWidth: "none" }}
            >
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(i)}
                  className="flex-shrink-0 px-5 py-4 text-sm font-semibold transition-all duration-200 whitespace-nowrap relative"
                  style={{
                    color: activeTab === i ? "#C5A028" : "#6B7280",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  {t.label}
                  {activeTab === i && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: "#C5A028" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Left: text */}
                <div className="space-y-6">
                  <div>
                    <p
                      className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                      style={{ color: "#C5A028" }}
                    >
                      Finanzierungsart
                    </p>
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900 leading-[1.15] mb-5">
                      {tab.title}
                    </h2>
                    <p className="text-stone-600 text-lg leading-[1.8]">
                      {tab.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href={MAKLER.whatsappMsg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
                      style={{
                        background: "#25D366",
                        boxShadow: "0 4px 14px rgba(37,211,102,0.3)",
                        textDecoration: "none",
                      }}
                    >
                      <WhatsAppIcon />
                      Jetzt Finanzierung anfragen
                    </a>
                    <a
                      href="#kontakt"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                      style={{
                        border: "1.5px solid rgba(197,160,40,0.4)",
                        color: "#C5A028",
                        textDecoration: "none",
                      }}
                    >
                      Kontakt aufnehmen
                    </a>
                  </div>
                </div>

                {/* Right: image placeholder */}
                <div
                  className="relative rounded-2xl overflow-hidden h-[220px] sm:h-[280px] lg:h-[340px]"
                >
                  {/* Base gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: tab.gradient }}
                  />
                  {/* Accent overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: tab.accentGradient }}
                  />
                  {/* Decorative circles */}
                  <div
                    className="absolute"
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                      border: "1px solid rgba(197,160,40,0.2)",
                      top: "10%",
                      right: "10%",
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      border: "1px solid rgba(197,160,40,0.15)",
                      bottom: "15%",
                      left: "15%",
                    }}
                  />
                  {/* Icon + label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <span style={{ fontSize: 72, lineHeight: 1 }}>{tab.icon}</span>
                    <span
                      className="text-sm font-semibold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full"
                      style={{
                        background: "rgba(197,160,40,0.18)",
                        border: "1px solid rgba(197,160,40,0.35)",
                        color: "rgba(255,220,120,0.9)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {tab.imageAlt}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── HIGHLIGHT BOX (300+ Bankpartner) ──────────────────────────── */}
        <section className="bg-[#FAF8F4] py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div
              className="rounded-2xl p-10 lg:p-14 text-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a1614 0%, #2d2520 100%)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              {/* Gold glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(197,160,40,0.2) 0%, transparent 65%)" }}
              />
              <div className="relative space-y-4">
                <div
                  className="font-heading font-bold text-5xl sm:text-6xl lg:text-8xl mb-2"
                  style={{ color: "#C5A028" }}
                >
                  <AnimatedCounter target={300} suffix="+" />
                </div>
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-white">
                  Bankpartner deutschlandweit
                </h3>
                <p className="text-stone-400 text-lg max-w-xl mx-auto">
                  Wir finden den besten Kredit für Sie – aus einem Netzwerk von über 300 Partnerbanken.
                </p>
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mt-4"
                  style={{
                    background: "rgba(197,160,40,0.12)",
                    border: "1px solid rgba(197,160,40,0.3)",
                  }}
                >
                  <span style={{ color: "#C5A028", fontSize: 18 }}>✓</span>
                  <span className="text-stone-300 text-sm font-medium tracking-wide">
                    Freier Kreditvergleich – unabhängig und transparent
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ANIMATED COUNTERS ─────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { target: 300, suffix: "+", label: "Partnerbanken", sub: "für beste Konditionen" },
                { target: 100, suffix: "%", label: "Unabhängig", sub: "keine Bankbindung" },
                { target: 24, suffix: "h", label: "Entscheidung", sub: "typische Zusage" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center py-8 px-6 bg-[#FAF8F4] rounded-2xl border border-stone-100 hover:border-[#C5A028]/30 transition-colors"
                >
                  <div className="font-heading font-bold text-5xl lg:text-6xl mb-2" style={{ color: "#C5A028" }}>
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <p className="font-semibold text-stone-900 text-lg">{stat.label}</p>
                  <p className="text-stone-400 text-sm mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURE CARDS ─────────────────────────────────────────────── */}
        <section className="bg-[#FAF8F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Warum Plan A</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">Ihre Vorteile auf einen Blick</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-5 bg-white rounded-2xl p-7 border border-stone-100 hover:border-[#C5A028]/30 hover:-translate-y-1 transition-all duration-200"
                >
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(197,160,40,0.1)", color: "#C5A028" }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-stone-900 text-xl mb-2">{f.title}</h3>
                    <p className="text-stone-500 text-base leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROZESS ───────────────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Ablauf</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">In 3 Schritten zur Finanzierung</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {processSteps.map((step, i) => (
                <div key={step.num} className="relative">
                  {i < processSteps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-8 left-full w-8 h-0.5 -translate-x-4 z-10"
                      style={{ background: "linear-gradient(90deg, #C5A028, rgba(197,160,40,0.3))" }}
                    />
                  )}
                  <div className="bg-[#FAF8F4] rounded-2xl p-8 border border-stone-100 text-center hover:-translate-y-1 transition-transform duration-200">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 font-heading font-bold text-xl"
                      style={{ background: "linear-gradient(135deg, #C5A028 0%, #A08020 100%)", color: "white" }}
                    >
                      {step.num}
                    </div>
                    <h3 className="font-heading font-bold text-stone-900 text-xl mb-3">{step.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section className="bg-stone-900 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center space-y-7">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">
              Bereit für Ihre{" "}
              <span className="italic" style={{ color: "#C5A028" }}>ideale Finanzierung?</span>
            </h2>
            <p className="text-stone-400 text-xl leading-relaxed">
              Unverbindliches Erstgespräch – wir prüfen Ihre Möglichkeiten und finden das beste Angebot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={MAKLER.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-sm tracking-wide transition-all hover:scale-105"
                style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.35)", textDecoration: "none" }}
              >
                <WhatsAppIcon />
                Jetzt anfragen
              </a>
              <a
                href={MAKLER.telefonHref}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                style={{ border: "1.5px solid rgba(197,160,40,0.4)", color: "#C5A028", textDecoration: "none" }}
              >
                {MAKLER.telefon}
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
