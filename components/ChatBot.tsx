"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const faqs = [
  {
    frage: "Wie läuft der Verkaufsprozess ab?",
    antwort:
      "Unser Prozess: 1. Kostenlose Bewertung 2. Strategie & Unterlagen 3. Vermarktung 4. Käuferprüfung 5. Notartermin. Wir begleiten Sie durch jeden Schritt.",
  },
  {
    frage: "Was kostet ein Makler?",
    antwort:
      "Die Provision wird gesetzlich zwischen Käufer und Verkäufer geteilt. Gerne besprechen wir die Konditionen persönlich. Kontakt: 06261 / 123 456.",
  },
  {
    frage: "Was ist geprüfte Käuferfinanzierung?",
    antwort:
      "Bevor wir Käufer vermitteln, prüfen wir deren Finanzierungsfähigkeit. So platzen keine Deals kurz vor dem Notartermin.",
  },
  {
    frage: "Wie lange dauert ein Verkauf?",
    antwort:
      "Mit unserer Methode dauert ein Verkauf in der Regel 2–4 Monate. Wir arbeiten effizient und transparent.",
  },
  {
    frage: "Arbeiten Sie auch außerhalb Mosbachs?",
    antwort:
      "Ja! Unser Schwerpunkt ist Mosbach und der gesamte Neckar-Odenwald-Kreis.",
  },
  {
    frage: "Kann ich meine Immobilie bewerten lassen?",
    antwort:
      "Ja, kostenlos! Nutzen Sie unser Bewertungstool oder rufen Sie uns an: 06261 / 123 456.",
  },
  {
    frage: "Wie kontaktiere ich Ali Artun?",
    antwort:
      "📞 06261 / 123 456\n📧 info@plana-immobilien.de\nOder nutzen Sie das Kontaktformular auf dieser Seite.",
  },
  {
    frage: "Welche Immobilien verkaufen Sie?",
    antwort:
      "Häuser, Wohnungen, Grundstücke und Gewerbeimmobilien – im gesamten Neckar-Odenwald-Kreis.",
  },
];

interface Message {
  text: string;
  from: "user" | "bot";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Guten Tag! Wie kann ich Ihnen helfen? Wählen Sie eine Frage oder schreiben Sie mir direkt.",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFaq = (faq: (typeof faqs)[0]) => {
    setMessages((prev) => [
      ...prev,
      { text: faq.frage, from: "user" },
      { text: faq.antwort, from: "bot" },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { text: input, from: "user" },
      {
        text: "Danke für Ihre Nachricht! Wir melden uns schnellstmöglich. Oder rufen Sie uns an: 06261 / 123 456",
        from: "bot",
      },
    ]);
    setInput("");
  };

  return (
    <>
      {/* Float Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-24 z-[201] w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 duration-200"
        style={{
          backgroundColor: "#1a1a1a",
          border: "2px solid #C9A96E",
          color: "#C9A96E",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        }}
        aria-label="Chat öffnen"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed z-[200] flex flex-col rounded-xl overflow-hidden"
          style={{
            bottom: "96px",
            right: "96px",
            width: "340px",
            maxHeight: "520px",
            backgroundColor: "#fff",
            border: "1px solid rgba(201,169,110,0.3)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              backgroundColor: "#1a1a1a",
              borderBottom: "1px solid rgba(201,169,110,0.3)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1rem",
                color: "#fff",
                margin: 0,
              }}
            >
              Plan A Immobilien
            </p>
            <p
              style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "11px",
                color: "#C9A96E",
                margin: 0,
                letterSpacing: "0.1em",
              }}
            >
              Ali Artun · Online
            </p>
          </div>

          {/* Messages */}
          <div
            className="flex flex-col gap-2.5 overflow-y-auto"
            style={{ flex: 1, padding: "16px" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.from === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    backgroundColor:
                      m.from === "user" ? "#C9A96E" : "#F5F0E8",
                    color: m.from === "user" ? "#fff" : "#1a1a1a",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    fontSize: "13px",
                    lineHeight: 1.5,
                    borderRadius:
                      m.from === "user"
                        ? "12px 12px 2px 12px"
                        : "12px 12px 12px 2px",
                    whiteSpace: "pre-line",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* FAQ Chips – show only at start */}
          {messages.length <= 2 && (
            <div
              style={{
                padding: "8px 16px",
                borderTop: "1px solid rgba(201,169,110,0.15)",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
              }}
            >
              {faqs.slice(0, 4).map((faq, i) => (
                <button
                  key={i}
                  onClick={() => handleFaq(faq)}
                  style={{
                    padding: "5px 10px",
                    border: "1px solid rgba(201,169,110,0.4)",
                    backgroundColor: "transparent",
                    color: "#6B5E4E",
                    fontFamily: "var(--font-geist-sans), sans-serif",
                    fontSize: "11px",
                    cursor: "pointer",
                    borderRadius: "20px",
                  }}
                >
                  {faq.frage}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: "1px solid rgba(201,169,110,0.2)",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ihre Frage..."
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid rgba(201,169,110,0.3)",
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: "13px",
                outline: "none",
                backgroundColor: "#FAFAF8",
                borderRadius: "6px",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: "#C9A96E",
                border: "none",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "6px",
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
