"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { MessageSquare, Star, Phone, ChevronDown, ChevronUp } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Wie lange dauert der Immobilienverkauf?",
    answer:
      "Der Zeitraum hängt von Lage, Zustand und Preis der Immobilie ab. In der Regel dauert ein professioneller Verkaufsprozess 2–4 Monate. Durch unsere geprüfte Käuferfinanzierung vermeiden wir Verzögerungen durch ungesicherte Finanzierungen.",
  },
  {
    question: "Was kostet eine kostenlose Immobilienbewertung?",
    answer:
      "Unsere erste Bewertung und Beratung ist absolut kostenlos und unverbindlich. Wir schauen uns Ihre Immobilie an und geben Ihnen eine ehrliche Einschätzung des Marktwertes – ohne versteckte Kosten.",
  },
  {
    question: "Wie funktioniert die Käuferfinanzierungsprüfung?",
    answer:
      "Wir prüfen potenzielle Käufer bereits vor der Besichtigung auf ihre Finanzierungsfähigkeit. So kommen nur geprüfte Interessenten zu Ihnen – das spart Zeit und verhindert Rückabwicklungen.",
  },
];

export default function KontoPage() {
  const { user } = useAuth();
  const [inquiryCount, setInquiryCount] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const userName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Benutzer";

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .then(({ count }) => {
        setInquiryCount(count ?? 0);
      });
  }, [user]);

  return (
    <div className="max-w-3xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1
          className="text-2xl lg:text-3xl text-stone-900 dark:text-white mb-1"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Willkommen zurück, {userName}
        </h1>
        <p className="text-stone-500 dark:text-stone-400">
          Verwalten Sie Ihre Anfragen und Kontaktdaten.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(197,160,40,0.1)" }}
            >
              <MessageSquare size={18} style={{ color: "#C5A028" }} />
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              Anfragen
            </span>
          </div>
          <p className="text-2xl font-semibold text-stone-900 dark:text-white">
            {inquiryCount === null ? "–" : inquiryCount}
          </p>
        </div>

        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(197,160,40,0.1)" }}
            >
              <Star size={18} style={{ color: "#C5A028" }} />
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">
              Status
            </span>
          </div>
          <p className="text-2xl font-semibold text-stone-900 dark:text-white">
            Aktiv
          </p>
        </div>
      </div>

      {/* Support FAQ */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-6 mb-6">
        <h2
          className="text-lg text-stone-900 dark:text-white mb-4"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Häufige Fragen
        </h2>
        <div className="space-y-1">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border-b border-stone-100 dark:border-stone-800 last:border-0"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full py-3.5 text-left bg-transparent border-none cursor-pointer"
              >
                <span className="text-sm font-medium text-stone-800 dark:text-stone-200 pr-4">
                  {item.question}
                </span>
                {openFaq === i ? (
                  <ChevronUp
                    size={16}
                    className="flex-shrink-0 text-stone-400"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="flex-shrink-0 text-stone-400"
                  />
                )}
              </button>
              {openFaq === i && (
                <p className="text-sm text-stone-600 dark:text-stone-400 pb-4 leading-relaxed">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div
        className="rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(197,160,40,0.08) 0%, rgba(197,160,40,0.04) 100%)",
          border: "1px solid rgba(197,160,40,0.2)",
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "#25D366" }}
          >
            <Phone size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-white">
              Direkter Kontakt zu Ali Artun
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Für schnelle Antworten – WhatsApp oder Telefon
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/496261123456?text=Hallo%20Ali%2C%20ich%20habe%20eine%20Frage%20zu%20meiner%20Immobilie."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
          style={{
            background: "#25D366",
            textDecoration: "none",
          }}
        >
          WhatsApp schreiben
        </a>
      </div>
    </div>
  );
}
