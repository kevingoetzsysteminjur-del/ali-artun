"use client";

import Image from "next/image";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { MAKLER } from "@/lib/config";
import {
  Check,
  TrendingUp,
  Shield,
  Users,
  Zap,
  BookOpen,
  Euro,
  Clock,
  ArrowRight,
  Star,
  Building2,
} from "lucide-react";

// ── WhatsApp Icon ─────────────────────────────────────────────────────────────
function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const HAUPTVORTEILE = [
  {
    icon: Euro,
    title: "Attraktive Provisionen",
    desc: "Bei einem Objektwert von 300.000 € fallen gut 10.000 € Provision an – davon erhalten Sie einen signifikanten Anteil. Und das pro Abschluss.",
    highlight: true,
  },
  {
    icon: BookOpen,
    title: "Kostenlose Ausbildung",
    desc: "Ali schult Sie in Bewertung, Vermarktung, Finanzierung und Verkaufsgesprächen. Kein teurer Kurs, keine versteckten Kosten.",
  },
  {
    icon: Clock,
    title: "Nebenberuflich starten",
    desc: "Behalten Sie Ihren Job. Starten Sie nebenberuflich und bauen Sie schrittweise auf, bis Sie bereit für mehr sind.",
  },
  {
    icon: Shield,
    title: "Kein Kapital, kein Risiko",
    desc: "Keine Investitionen nötig. Sie zahlen nichts. Sie bringen Objekte oder Kontakte – wir erledigen den Rest.",
  },
  {
    icon: Building2,
    title: "300+ Partnerbanken",
    desc: "Käufer fallen kaum durch – denn Finanzierungszusagen werden frühzeitig eingeholt. Weniger Rückabwicklungen, mehr sichere Abschlüsse.",
  },
  {
    icon: Users,
    title: "Persönliche Begleitung",
    desc: "Ali steht Ihnen persönlich zur Seite. Kein anonymes Unternehmen, kein Call-Center – ein direkter Ansprechpartner.",
  },
];

const WAS_ALI_UEBERNIMMT = [
  "Professionelles Exposé mit hochwertigen Fotos",
  "Vermarktung auf allen relevanten Portalen",
  "Prüfung und Begleitung der Käuferfinanzierung",
  "Verhandlungsführung mit Interessenten",
  "Vollständige Abwicklung bis zum Notartermin",
  "Rechtliche und kaufmännische Dokumentation",
];

const WAS_SIE_EINBRINGEN = [
  "Objekte aus Ihrem persönlichen Netzwerk",
  "Kontakte zu Eigentümern, die verkaufen möchten",
  "Ihre Zeit für Kundengespräche (mit Training)",
  "Motivation, etwas aufzubauen",
];

const FRAGEN = [
  {
    frage: "Muss ich Erfahrung in der Immobilienbranche haben?",
    antwort:
      "Nein. Ali bildet Sie von Grund auf aus. Vorkenntnisse sind hilfreich, aber keine Voraussetzung. Wichtiger ist Ihre Motivation und Ihr Netzwerk.",
  },
  {
    frage: "Wie hoch sind die Provisionen?",
    antwort:
      "Die genauen Konditionen klären wir im persönlichen Gespräch, da sie von Ihrem Engagement und Volumen abhängen. Als Richtwert: bei einem 300.000-€-Objekt sind Provisionen im vierstelligen Bereich realistisch.",
  },
  {
    frage: "Kann ich das neben meinem Job machen?",
    antwort:
      "Ja. Viele Partner starten nebenberuflich. Es gibt keine Mindestanzahl an Abschlüssen. Sie bestimmen das Tempo.",
  },
  {
    frage: "Was passiert, wenn ein Abschluss nicht zustande kommt?",
    antwort:
      "Sie gehen kein finanzielles Risiko ein. Provision gibt es nur bei erfolgreichem Abschluss – aber durch die Finanzierungsprüfung ist das Ausfallrisiko deutlich geringer als bei klassischen Maklern.",
  },
  {
    frage: "Wie groß muss mein Netzwerk sein?",
    antwort:
      "Schon ein einziges Objekt reicht für den Einstieg. Viele Partner bringen mit der Zeit mehr Kontakte, weil die Ergebnisse für sich sprechen.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PartnerWarumClient() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24 lg:py-32"
          style={{ background: "linear-gradient(135deg, #1a1614 0%, #2d2520 60%, #1a1614 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(197,160,40,0.18) 0%, transparent 65%)" }}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #C5A028 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #C5A028 0px, transparent 1px, transparent 60px)",
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Left: text */}
              <div className="space-y-7 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(197,160,40,0.12)", border: "1px solid rgba(197,160,40,0.3)" }}>
                  <Star size={13} style={{ color: "#C5A028" }} />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#C5A028" }}>
                    Partnerschaft mit Ali Artun
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1]">
                  Verdienen Sie mit{" "}
                  <span className="italic" style={{ color: "#C5A028" }}>
                    Immobilien –
                  </span>
                  <br />
                  ohne Erfahrung zu brauchen.
                </h1>

                <p className="text-stone-300 text-xl leading-relaxed">
                  Als Partner bei Plan A Immobilien bringen Sie Objekte oder Kontakte ein.
                  Den Rest – Bewertung, Vermarktung, Finanzierung, Abwicklung – erledigt{" "}
                  <strong className="text-white">Ali Artun</strong> für Sie.
                </p>

                <div className="flex flex-wrap gap-5 pt-2">
                  {[
                    { val: "0 €", label: "Startkosten" },
                    { val: "300+", label: "Partnerbanken" },
                    { val: "4-stellig", label: "Provision/Abschluss" },
                  ].map((s) => (
                    <div key={s.val} className="text-center">
                      <p className="font-heading text-2xl font-bold" style={{ color: "#C5A028" }}>{s.val}</p>
                      <p className="text-stone-400 text-xs tracking-wide mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="/partner#bewerbung"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all hover:scale-105"
                    style={{ background: "linear-gradient(135deg, #C5A028 0%, #A08020 100%)", color: "white", textDecoration: "none", boxShadow: "0 6px 24px rgba(197,160,40,0.35)" }}
                  >
                    Jetzt bewerben
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href={MAKLER.whatsappMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all hover:scale-105 text-white"
                    style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.3)", textDecoration: "none" }}
                  >
                    <WAIcon />
                    Frage stellen
                  </a>
                </div>
              </div>

              {/* Right: Ali + Highlights */}
              <div className="flex flex-col items-center gap-8 order-1 lg:order-2">
                {/* Ali photo */}
                <div className="relative">
                  <div
                    className="relative rounded-full overflow-hidden w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] lg:w-[220px] lg:h-[220px]"
                    style={{
                      border: "3px solid #C5A028",
                      boxShadow: "0 0 0 8px rgba(197,160,40,0.1), 0 20px 60px rgba(0,0,0,0.4)",
                    }}
                  >
                    <Image
                      src="/ali.png"
                      alt="Ali Artun – Plan A Immobilien"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "28% 41.5%", transform: "scale(1.2)", transformOrigin: "center 50%" }}
                    />
                  </div>
                  {/* Name badge */}
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-center whitespace-nowrap"
                    style={{ background: "#C5A028", boxShadow: "0 4px 16px rgba(197,160,40,0.4)" }}
                  >
                    <p className="text-white font-semibold text-sm leading-tight">Ali Artun</p>
                    <p className="text-white/80 text-[10px] tracking-wide">Plan A Immobilien</p>
                  </div>
                </div>

                {/* Quick facts */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-6">
                  {[
                    { icon: <Zap size={16} />, text: "Schneller Einstieg" },
                    { icon: <TrendingUp size={16} />, text: "Wachsendes Netzwerk" },
                    { icon: <Shield size={16} />, text: "Kein Risiko" },
                    { icon: <Euro size={16} />, text: "Faire Provision" },
                  ].map((fact) => (
                    <div
                      key={fact.text}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl"
                      style={{ background: "rgba(197,160,40,0.08)", border: "1px solid rgba(197,160,40,0.2)" }}
                    >
                      <span style={{ color: "#C5A028" }}>{fact.icon}</span>
                      <span className="text-stone-300 text-sm font-medium">{fact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PERSÖNLICHE BOTSCHAFT VON ALI ─────────────────────────────── */}
        <section className="bg-[#FAF8F4] py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="relative rounded-3xl overflow-hidden p-8 lg:p-12"
              style={{ background: "white", border: "1px solid rgba(197,160,40,0.2)", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>

              {/* Quote mark */}
              <div
                className="absolute top-6 right-8 font-heading font-bold text-[120px] leading-none pointer-events-none select-none"
                style={{ color: "rgba(197,160,40,0.07)" }}
              >
                "
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-start relative">
                {/* Small photo */}
                <div className="flex-shrink-0">
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      width: 100,
                      height: 100,
                      border: "2px solid rgba(197,160,40,0.5)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Image
                      src="/ali.png"
                      alt="Ali Artun"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "28% 41.5%", transform: "scale(1.2)", transformOrigin: "center 50%" }}
                    />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="h-0.5 w-10 mb-4" style={{ background: "#C5A028" }} />
                    <p
                      className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
                      style={{ color: "#C5A028" }}
                    >
                      Direkt von Ali Artun
                    </p>
                    <h2 className="font-heading text-2xl lg:text-3xl font-bold text-stone-900 mb-5 leading-snug">
                      „Ich suche keine Mitarbeiter. Ich suche Partner."
                    </h2>
                  </div>

                  <p className="text-stone-600 text-lg leading-[1.8]">
                    Als ich Plan A Immobilien gegründet habe, war mein Ziel klar: ein System aufzubauen, das für beide Seiten funktioniert. Für Verkäufer, die einen sicheren Abschluss wollen – und für Menschen, die von Immobilien profitieren möchten, ohne alles selbst von Null lernen zu müssen.
                  </p>

                  <p className="text-stone-600 text-lg leading-[1.8]">
                    Mein Vorteil als Partner: Ich kombiniere Makler und Finanzierung in einem. Das bedeutet, Käufer kommen mit bestätigter Finanzierung – der Abschluss ist planbar. Davon profitieren Sie als Partner genauso wie ich.
                  </p>

                  <p className="text-stone-700 text-lg leading-[1.8] font-medium">
                    Wenn Sie jemanden kennen, der verkaufen will – reicht das. Den Rest mache ich.
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                    <div>
                      <p className="font-heading font-semibold text-stone-900">Ali Artun</p>
                      <p className="text-stone-400 text-sm">Gründer, Plan A Immobilien & Finanzierung</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DAS MODELL ERKLÄRT ────────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Das Modell</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900 mb-4">
                Sie bringen – wir erledigen.
              </h2>
              <p className="text-stone-500 text-xl max-w-2xl mx-auto">
                Eine klare Aufgabenteilung, die für alle funktioniert.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Was Sie einbringen */}
              <div
                className="rounded-2xl p-8"
                style={{ background: "linear-gradient(135deg, #FAF8F4 0%, #EDE8DF 100%)", border: "1px solid rgba(197,160,40,0.2)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(197,160,40,0.12)" }}
                  >
                    <Users size={20} style={{ color: "#C5A028" }} />
                  </div>
                  <h3 className="font-heading font-bold text-stone-900 text-xl">Was Sie einbringen</h3>
                </div>
                <ul className="space-y-3">
                  {WAS_SIE_EINBRINGEN.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "rgba(197,160,40,0.15)", border: "1px solid rgba(197,160,40,0.4)" }}
                      >
                        <Check size={12} style={{ color: "#C5A028" }} />
                      </span>
                      <span className="text-stone-700 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Was Ali übernimmt */}
              <div
                className="rounded-2xl p-8"
                style={{ background: "linear-gradient(135deg, #1a1614 0%, #2d2520 100%)", border: "1px solid rgba(197,160,40,0.25)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(197,160,40,0.15)" }}
                  >
                    <Shield size={20} style={{ color: "#C5A028" }} />
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl">Was Ali übernimmt</h3>
                </div>
                <ul className="space-y-3">
                  {WAS_ALI_UEBERNIMMT.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "rgba(197,160,40,0.15)", border: "1px solid rgba(197,160,40,0.4)" }}
                      >
                        <Check size={12} style={{ color: "#C5A028" }} />
                      </span>
                      <span className="text-stone-300 text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Arrow separator */}
            <div className="flex items-center justify-center py-8">
              <div
                className="flex items-center gap-3 px-6 py-3 rounded-full"
                style={{ background: "rgba(197,160,40,0.1)", border: "1px solid rgba(197,160,40,0.25)" }}
              >
                <span className="text-stone-700 font-medium text-sm">Ergebnis für Sie:</span>
                <span className="font-heading font-bold text-lg" style={{ color: "#C5A028" }}>
                  Provision nach Abschluss
                </span>
                <ArrowRight size={18} style={{ color: "#C5A028" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── HAUPTVORTEILE ─────────────────────────────────────────────── */}
        <section className="bg-[#FAF8F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Warum Plan A</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">
                6 Gründe, die für uns sprechen
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {HAUPTVORTEILE.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl p-7 border transition-all duration-200 hover:-translate-y-1"
                    style={
                      v.highlight
                        ? {
                            background: "linear-gradient(135deg, #1a1614 0%, #2d2520 100%)",
                            border: "1px solid rgba(197,160,40,0.35)",
                          }
                        : {
                            background: "white",
                            border: "1px solid rgba(197,160,40,0.15)",
                          }
                    }
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: "rgba(197,160,40,0.12)" }}
                    >
                      <Icon size={22} style={{ color: "#C5A028" }} />
                    </div>
                    <h3
                      className="font-heading font-bold text-xl mb-3"
                      style={{ color: v.highlight ? "white" : "#1a1a1a" }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: v.highlight ? "rgb(214,211,209)" : "rgb(120,113,108)" }}
                    >
                      {v.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── DER PLAN-A-UNTERSCHIED ────────────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Der Unterschied</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">
                Warum unser System funktioniert
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Finanzierung zuerst",
                  desc: "Bevor ein Interessent eine Immobilie besichtigt, wird seine Finanzierbarkeit geprüft. Das verhindert geplatzte Abschlüsse – und spart allen Seiten Zeit.",
                },
                {
                  step: "02",
                  title: "Strategie statt Hoffnung",
                  desc: "Jede Immobilie wird strategisch positioniert – mit Marktanalyse, professionellem Exposé und gezielter Vermarktung. Kein blindes Online-Stellen und Abwarten.",
                },
                {
                  step: "03",
                  title: "Planbare Abschlüsse",
                  desc: "Durch geprüfte Käufer und strukturierten Prozess ist der Weg zum Notartermin verlässlich. Das bedeutet für Sie: verlässliche Provisionen.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="text-center p-8 rounded-2xl border border-stone-100 bg-[#FAF8F4] hover:-translate-y-1 transition-transform duration-200"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 font-heading font-bold text-lg"
                    style={{ background: "linear-gradient(135deg, #C5A028 0%, #A08020 100%)", color: "white" }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-heading font-bold text-stone-900 text-lg mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="bg-[#FAF8F4] py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Häufige Fragen</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">
                Ihre Fragen – unsere Antworten
              </h2>
            </div>
            <div className="space-y-4">
              {FRAGEN.map((faq) => (
                <div
                  key={faq.frage}
                  className="rounded-2xl p-7 bg-white border border-stone-100"
                >
                  <h3 className="font-heading font-bold text-stone-900 text-lg mb-3">
                    {faq.frage}
                  </h3>
                  <p className="text-stone-500 text-base leading-relaxed">
                    {faq.antwort}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINALER CTA ───────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden py-24"
          style={{ background: "linear-gradient(135deg, #1a1614 0%, #2d2520 60%, #1a1614 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(197,160,40,0.2) 0%, transparent 65%)" }}
          />
          <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center relative space-y-7">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-2"
              style={{ background: "rgba(197,160,40,0.12)", border: "1px solid rgba(197,160,40,0.3)" }}
            >
              <Star size={13} style={{ color: "#C5A028" }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#C5A028" }}>
                Jetzt einsteigen
              </span>
            </div>
            <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white leading-[1.1]">
              Bereit,{" "}
              <span className="italic" style={{ color: "#C5A028" }}>Partner</span>{" "}
              zu werden?
            </h2>
            <p className="text-stone-400 text-xl leading-relaxed max-w-xl mx-auto">
              Füllen Sie das kurze Bewerbungsformular aus – Ali Artun meldet sich persönlich und wir klären alle Details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <a
                href="/partner#bewerbung"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #C5A028 0%, #A08020 100%)",
                  color: "white",
                  textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(197,160,40,0.4)",
                }}
              >
                Zur Bewerbung
                <ArrowRight size={16} />
              </a>
              <a
                href={MAKLER.whatsappMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all hover:scale-105 text-white"
                style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.3)", textDecoration: "none" }}
              >
                <WAIcon />
                Erst fragen per WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
