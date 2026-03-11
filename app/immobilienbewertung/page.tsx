import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BewertungForm from "./BewertungForm";

export const metadata: Metadata = {
  title: "Kostenlose Immobilienbewertung Mosbach | Plan A Immobilien",
  description:
    "Erhalten Sie eine kostenlose und unverbindliche Bewertung Ihrer Immobilie in Mosbach und dem Neckar-Odenwald-Kreis. Jetzt in 3 Minuten anfragen.",
};

export default function ImmobilienbewertungPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F9F8F5] pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C9A96E]">
              Kostenlos & unverbindlich
            </span>
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-stone-900 mt-3 mb-4 leading-[1.1]">
              Wie viel ist Ihre Immobilie wert?
            </h1>
            <p className="text-stone-500 text-xl leading-relaxed">
              Beantworten Sie drei kurze Fragen und wir melden uns persönlich
              bei Ihnen — kostenlos und ohne Verpflichtung.
            </p>
          </div>
          <BewertungForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
