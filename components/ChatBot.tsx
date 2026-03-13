"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import Image from "next/image";

const FAQS = [
  { frage: "Wie läuft der Verkauf ab?", antwort: "Unser Prozess: 1. Kostenlose Bewertung → 2. Strategie & Unterlagen → 3. Vermarktung → 4. Käuferprüfung → 5. Notartermin. Wir begleiten Sie durch jeden Schritt." },
  { frage: "Was kostet ein Makler?", antwort: "Die Provision wird gesetzlich zwischen Käufer und Verkäufer geteilt. Gerne besprechen wir die Konditionen persönlich. Tel: 06261 / 123 456." },
  { frage: "Was ist geprüfte Finanzierung?", antwort: "Vor der Vermittlung prüfen wir die Finanzierungsfähigkeit jedes Käufers. So platzen keine Deals kurz vor dem Notartermin." },
  { frage: "Wie lange dauert ein Verkauf?", antwort: "Mit unserer Methode dauert ein Verkauf in der Regel 2–4 Monate. Wir arbeiten effizient und transparent." },
  { frage: "Gilt das nur für Mosbach?", antwort: "Nein! Unser Schwerpunkt ist Mosbach und der gesamte Neckar-Odenwald-Kreis." },
  { frage: "Kostenlose Immobilienbewertung?", antwort: "Ja, kostenlos! Nutzen Sie unser Bewertungstool unter /immobilienbewertung oder rufen Sie uns an: 06261 / 123 456." },
  { frage: "Wie kontaktiere ich Ali?", antwort: "📞 06261 / 123 456\n📧 Info@plana-immobilien-finanzierung.com\nOder nutzen Sie das Kontaktformular auf dieser Seite." },
  { frage: "Welche Immobilien verkaufen Sie?", antwort: "Häuser, Wohnungen, Grundstücke und Gewerbeimmobilien – im gesamten Neckar-Odenwald-Kreis." },
];

interface Message { text: string; from: "user" | "bot"; time: string; }

function getNow() {
  return new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    text: "Guten Tag! Ich bin der Assistent von Ali Artun. Wie kann ich Ihnen helfen?",
    from: "bot",
    time: getNow(),
  }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const addBotResponse = (text: string) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { text, from: "bot", time: getNow() }]);
    }, 800);
  };

  const handleFaq = (faq: typeof FAQS[0]) => {
    setMessages((prev) => [...prev, { text: faq.frage, from: "user", time: getNow() }]);
    addBotResponse(faq.antwort);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text, from: "user", time: getNow() }]);
    addBotResponse("Danke für Ihre Nachricht! Wir melden uns schnellstmöglich. Sie können uns auch direkt anrufen: 06261 / 123 456");
  };

  const showFaqs = messages.length <= 1;

  return (
    <>
      {/* Float Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-4 sm:bottom-6 sm:right-24 z-[201] w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 duration-200 shadow-xl"
        style={{ backgroundColor: "#1a1a1a", border: "2px solid #C5A028", color: "#C5A028" }}
        aria-label="Chat öffnen"
      >
        <div className="transition-all duration-200">
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </div>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
        )}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed z-[200] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            bottom: "112px",
            right: "16px",
            width: "min(360px, calc(100vw - 32px))",
            maxHeight: "min(580px, calc(100vh - 140px))",
            backgroundColor: "#fff",
            border: "1px solid rgba(197,160,40,0.25)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
            style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid rgba(197,160,40,0.2)" }}
          >
            <div className="relative flex-shrink-0">
              <Image
                src="/ali.png"
                alt="Ali Artun"
                width={40}
                height={40}
                className="rounded-full object-cover object-top"
                style={{ width: 40, height: 40 }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#1a1a1a]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-none">Ali Artun</p>
              <p className="text-[#C5A028] text-[11px] mt-0.5">Plan A Immobilien · Online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ backgroundColor: "#FAFAF8" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div style={{ maxWidth: "82%" }}>
                  <div
                    className="px-3.5 py-2.5 text-[13px] leading-relaxed"
                    style={{
                      backgroundColor: m.from === "user" ? "#C5A028" : "#FFFFFF",
                      color: m.from === "user" ? "#fff" : "#1a1a1a",
                      borderRadius: m.from === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {m.text}
                  </div>
                  <p className="text-[10px] text-stone-400 mt-1 px-1" style={{ textAlign: m.from === "user" ? "right" : "left" }}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* FAQ Quick Replies */}
          {showFaqs && (
            <div className="border-t border-stone-100 p-3 bg-white flex-shrink-0">
              <p className="text-stone-400 text-[10px] uppercase tracking-widest font-medium mb-2">
                Häufige Fragen
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {FAQS.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleFaq(faq)}
                    className="text-left px-2.5 py-2 rounded-lg border border-stone-200 text-[11px] text-stone-600 hover:border-[#C5A028]/50 hover:bg-[#C5A028]/5 hover:text-stone-800 transition-all leading-tight"
                  >
                    {faq.frage}
                  </button>
                ))}
              </div>
              {/* Termin CTA */}
              <a
                href="/termin"
                className="flex items-center justify-between mt-2 px-3 py-2 rounded-lg text-[11px] font-semibold text-[#C5A028] border border-[#C5A028]/30 hover:bg-[#C5A028]/8 transition-all"
              >
                <span>📅 Termin vereinbaren</span>
                <ChevronRight size={12} />
              </a>
            </div>
          )}

          {/* Input */}
          <div className="px-3 py-3 border-t border-stone-100 bg-white flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ihre Frage..."
              className="flex-1 px-3.5 py-2.5 text-[13px] rounded-xl border border-stone-200 focus:outline-none focus:border-[#C5A028]/50 focus:ring-2 focus:ring-[#C5A028]/15 text-stone-800 bg-white transition-all"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 hover:brightness-110 transition-all"
              style={{ backgroundColor: "#C5A028" }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
