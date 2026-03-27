"use client";

import { useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { MAKLER } from "@/lib/config";
import { Check, BookOpen, Home, Building2, BarChart2, FileText, Users, ChevronRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Anmelden",
    desc: "Kostenlos Partner werden – kein Risiko, kein Kapitaleinsatz. Einfach Formular ausfüllen und loslegen.",
  },
  {
    num: "02",
    title: "Ausbildung",
    desc: "Wir schulen Sie in allem, was Sie brauchen: Bewertung, Vermarktung, Finanzierung und Verkaufsgespräche.",
  },
  {
    num: "03",
    title: "Vermitteln",
    desc: "Bringen Sie Immobilien aus Ihrem Netzwerk ein. Wir kümmern uns um Exposé, Finanzierung und Abwicklung.",
  },
  {
    num: "04",
    title: "Verdienen",
    desc: "Pro erfolgreichem Abschluss erhalten Sie eine attraktive Provision – transparente Konditionen nach Gespräch.",
  },
];

const lernInhalte = [
  { icon: <Home size={24} />, title: "Objektentwicklung & Bewertung", desc: "Erkennen Sie den wahren Wert einer Immobilie" },
  { icon: <Building2 size={24} />, title: "Immobilien-Grundsubstanz", desc: "Was macht eine gute Immobilie aus?" },
  { icon: <BookOpen size={24} />, title: "Allgemeine Immobilienkenntnisse", desc: "Markt, Recht, Prozesse – das Basiswissen" },
  { icon: <BarChart2 size={24} />, title: "Marktanalyse & Preisfindung", desc: "Richtig positionieren für maximalen Erlös" },
  { icon: <FileText size={24} />, title: "Exposé-Erstellung", desc: "Professionelle Präsentation Ihrer Objekte" },
  { icon: <Users size={24} />, title: "Kundenakquise & Verkaufsgespräche", desc: "Vom Erstkontakt bis zum Notartermin" },
];

const vorteile = [
  "Möglichkeit den §34i und §34c Schein bei der IHK zu erwerben",
  "Unterstützung bei der Selbstständigkeit",
  "Schulungsmaterial (Videos und Dokumente) – digital",
  "Persönliche Betreuung in der Anfangszeit",
  "Leads für den Immobilienverkauf",
  "Unterstützung bei Finanzierungen",
  "Alles auf selbstständiger Basis – kein Anstellungsverhältnis",
  "Deutschlandweit tätig – keine Regionalbeschränkung",
];

interface FormData {
  name: string;
  email: string;
  telefon: string;
  wohnort: string;
  alter: string;
  erfahrung: string;
  finanzerfahrung: string;
  warum: string;
}

export default function PartnerClient() {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", telefon: "", wohnort: "", alter: "", erfahrung: "nein", finanzerfahrung: "nein", warum: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Partner-Bewerbung:", form);
    // Open WhatsApp with pre-filled data
    const msg = encodeURIComponent(
      `Hallo Ali,\n\nIch möchte Partner bei Plan A Immobilien werden.\n\nName: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.telefon}\nWohnort: ${form.wohnort}\nAlter: ${form.alter}\nImmobilienerfahrung: ${form.erfahrung}\nFinanzerfahrung: ${form.finanzerfahrung}\n\nWarum Partner:\n${form.warum}`
    );
    window.open(`https://wa.me/${MAKLER.whatsapp.replace("https://wa.me/", "")}?text=${msg}`, "_blank");
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="bg-stone-900 text-white relative overflow-hidden">
          {/* Gold background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(197,160,40,0.12) 0%, transparent 65%)" }}
          />
          <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16 py-20 lg:py-28 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase">
                  Partnerschaft
                </p>
                <h1 className="font-heading text-4xl lg:text-5xl font-bold text-white leading-[1.1]">
                  Werde Partner bei{" "}
                  <span style={{ color: "#C5A028" }}>Plan A Immobilien</span>
                </h1>
                <p className="text-stone-300 text-xl leading-relaxed">
                  Verdiene nebenberuflich als selbstständiger Immobilienmakler – mit voller Unterstützung von{" "}
                  <strong className="text-white">Ali Artun</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href={MAKLER.whatsappMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 text-white"
                    style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.35)", textDecoration: "none" }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Jetzt bewerben
                  </a>
                  <a
                    href="/partner/warum"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105"
                    style={{ border: "1.5px solid rgba(197,160,40,0.5)", color: "#C5A028", textDecoration: "none" }}
                  >
                    Mehr erfahren
                    <ChevronRight size={16} />
                  </a>
                </div>

                {/* Stats bar */}
                <div className="flex flex-wrap gap-6 pt-4 border-t border-stone-700 mt-4">
                  {[
                    { val: "300+", label: "Partnerbanken" },
                    { val: "Attraktiv", label: "Provisionen" },
                    { val: "Kostenlos", label: "Ausbildung" },
                  ].map(s => (
                    <div key={s.val} className="text-center">
                      <p className="font-heading text-2xl font-bold" style={{ color: "#C5A028" }}>{s.val}</p>
                      <p className="text-stone-400 text-xs tracking-wide mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maskottchen right side */}
              <div className="flex justify-center lg:justify-end items-center">
                <Image src="/images/maskottchen.png" alt="Plan A Maskottchen" width={180} height={252} style={{ width: 180, height: "auto", objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── SO FUNKTIONIERT ES ──────────────────────────── */}
        <section className="bg-[#FAF8F4] py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Ihr Weg zum Abschluss</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">So funktioniert es</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-stone-100 relative group hover:-translate-y-1 transition-transform duration-200"
                >
                  <div
                    className="text-4xl font-heading font-bold mb-4"
                    style={{ color: "rgba(197,160,40,0.2)" }}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-stone-900 mb-2">{step.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{step.desc}</p>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all duration-300 group-hover:opacity-100 opacity-0"
                    style={{ background: "linear-gradient(90deg, #C5A028, #A08020)" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WAS DU LERNST ──────────────────────────────── */}
        <section className="bg-white py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-14">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Ausbildungsinhalte</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900">Was Sie lernen</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {lernInhalte.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 bg-[#FAF8F4] rounded-xl p-6 border border-stone-100 hover:border-[#C5A028]/30 transition-colors duration-200"
                >
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(197,160,40,0.1)", color: "#C5A028" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-base mb-1">{item.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DEINE VORTEILE + PROVISIONSMODELL ──────────── */}
        <section className="bg-stone-900 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              {/* Vorteile */}
              <div>
                <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Ihre Vorteile</p>
                <h2 className="font-heading text-3xl font-bold text-white mb-8">Warum Partner werden?</h2>
                <ul className="space-y-4">
                  {vorteile.map((v) => (
                    <li key={v} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                        style={{ background: "rgba(197,160,40,0.15)", border: "1px solid rgba(197,160,40,0.4)" }}
                      >
                        <Check size={14} style={{ color: "#C5A028" }} />
                      </span>
                      <span className="text-stone-300 text-base leading-relaxed">{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Provisionsmodell */}
              <div>
                <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Verdienstpotenzial</p>
                <h2 className="font-heading text-3xl font-bold text-white mb-8">Attraktives Provisionsmodell</h2>
                <div
                  className="rounded-2xl p-8 space-y-5"
                  style={{ background: "rgba(197,160,40,0.07)", border: "1px solid rgba(197,160,40,0.25)" }}
                >
                  <p className="text-stone-300 text-base leading-relaxed">
                    Wir bieten ein <strong className="text-white">attraktives Provisionsmodell</strong> – die genauen Konditionen besprechen wir in einem persönlichen Gespräch.
                  </p>
                  <p className="text-stone-400 text-sm italic">
                    * Die Konditionen richten sich nach Erfahrung, Qualifikation und Abschlussvolumen. Details im Gespräch mit Ali Artun.
                  </p>
                  <a
                    href={MAKLER.whatsappMsg}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                    style={{ background: "#25D366", textDecoration: "none", boxShadow: "0 4px 18px rgba(37,211,102,0.3)" }}
                  >
                    Jetzt Gespräch vereinbaren
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEWERBUNGSFORMULAR ───────────────────────────── */}
        <section id="bewerbung" className="bg-[#FAF8F4] py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-8">
            <div className="text-center mb-12">
              <p className="text-[#C5A028] text-sm font-semibold tracking-[0.2em] uppercase mb-3">Bewerbung</p>
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-stone-900 mb-4">Jetzt Partner werden</h2>
              <p className="text-stone-600 text-lg">
                Füllen Sie das Formular aus – Ali Artun meldet sich persönlich bei Ihnen.
              </p>
            </div>

            {submitted ? (
              <div
                className="text-center rounded-2xl p-12 space-y-4"
                style={{ background: "rgba(37,211,102,0.07)", border: "1px solid rgba(37,211,102,0.3)" }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-heading text-2xl font-bold text-stone-900">Bewerbung gesendet!</h3>
                <p className="text-stone-600">
                  Ihre Nachricht wurde an WhatsApp weitergeleitet. Ali Artun meldet sich in Kürze.
                </p>
                <a href="/" className="btn-primary mt-4 inline-flex">Zurück zur Startseite</a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-sm border border-stone-100 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ihr vollständiger Name"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:border-[#C5A028] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">E-Mail *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="ihre@email.de"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:border-[#C5A028] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Telefon *</label>
                    <input
                      type="tel"
                      name="telefon"
                      required
                      value={form.telefon}
                      onChange={handleChange}
                      placeholder="0173 / 123 456"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:border-[#C5A028] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Wohnort *</label>
                    <input
                      type="text"
                      name="wohnort"
                      required
                      value={form.wohnort}
                      onChange={handleChange}
                      placeholder="Ihre Stadt"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:border-[#C5A028] transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">Alter *</label>
                    <input
                      type="number"
                      name="alter"
                      required
                      min={18}
                      max={99}
                      value={form.alter}
                      onChange={handleChange}
                      placeholder="Ihr Alter"
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:border-[#C5A028] transition-colors"
                    />
                  </div>
                </div>

                {/* Erfahrung Radios */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Immobilienerfahrung vorhanden?</label>
                  <div className="flex gap-6">
                    {["Ja", "Nein"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="erfahrung"
                          value={opt.toLowerCase()}
                          checked={form.erfahrung === opt.toLowerCase()}
                          onChange={handleChange}
                          className="w-4 h-4 accent-[#C5A028]"
                        />
                        <span className="text-stone-700 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Finanzerfahrung vorhanden?</label>
                  <div className="flex gap-6">
                    {["Ja", "Nein"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="finanzerfahrung"
                          value={opt.toLowerCase()}
                          checked={form.finanzerfahrung === opt.toLowerCase()}
                          onChange={handleChange}
                          className="w-4 h-4 accent-[#C5A028]"
                        />
                        <span className="text-stone-700 text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Lebenslauf */}
                <div
                  className="rounded-xl p-5 text-sm"
                  style={{ background: "rgba(197,160,40,0.06)", border: "1px solid rgba(197,160,40,0.25)" }}
                >
                  <p className="font-semibold text-stone-700 mb-1">Lebenslauf</p>
                  <p className="text-stone-500 leading-relaxed">
                    Bitte senden Sie Ihren Lebenslauf nach dem Absenden per E-Mail an{" "}
                    <a
                      href="mailto:Info@plana-immobilien-finanzierung.com"
                      className="text-[#C5A028] underline"
                    >
                      Info@plana-immobilien-finanzierung.com
                    </a>
                    {" "}mit dem Betreff „Bewerbung Partner".
                  </p>
                </div>

                {/* Warum Textarea */}
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Warum möchten Sie Partner werden?</label>
                  <textarea
                    name="warum"
                    value={form.warum}
                    onChange={handleChange}
                    placeholder="Erzählen Sie uns kurz von sich und Ihrer Motivation..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 text-stone-900 text-sm outline-none focus:border-[#C5A028] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  Bewerbung absenden
                  <span className="btn-arrow">→</span>
                </button>
                <p className="text-stone-400 text-xs text-center">
                  Ihre Anfrage wird über WhatsApp an Ali Artun weitergeleitet.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
