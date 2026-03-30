"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Msg = { from: "bot" | "user"; text: string };
type Step = "start" | "bewerten" | "finanzierung" | "partner" | "kontakt" | "kosten" | "region" | "wertermittlung" | "done";

const QUICK: Record<Step, { label: string; next: Step }[]> = {
  start: [
    { label: "🏠 Immobilie bewerten", next: "bewerten" },
    { label: "💰 Finanzierung anfragen", next: "finanzierung" },
    { label: "🤝 Partner werden", next: "partner" },
    { label: "📞 Kontakt", next: "kontakt" },
  ],
  bewerten: [{ label: "Wie funktioniert das?", next: "wertermittlung" }, { label: "← Zurück", next: "start" }],
  wertermittlung: [{ label: "← Zurück", next: "start" }],
  finanzierung: [{ label: "← Zurück", next: "start" }],
  partner: [{ label: "← Zurück", next: "start" }],
  kontakt: [{ label: "← Zurück", next: "start" }],
  kosten: [{ label: "← Zurück", next: "start" }],
  region: [{ label: "← Zurück", next: "start" }],
  done: [{ label: "← Zurück zum Menü", next: "start" }],
};

const RESPONSES: Record<Step, string> = {
  start: "Hallo! 👋 Ich bin der Plan A Assistent. Wie kann ich Ihnen helfen?",
  bewerten: "Eine kostenlose Immobilienbewertung ist der erste Schritt. Teilen Sie uns die Objektart und PLZ mit – wir antworten innerhalb von 24 Stunden persönlich.",
  wertermittlung: "Füllen Sie unser kurzes Formular auf /wertermittlung aus. Wir analysieren Lage, Zustand und Marktdaten und melden uns innerhalb von 24 Stunden mit einer Einschätzung.",
  finanzierung: "Wir vergleichen für Sie KFW-Kredite, BAFA-Förderungen und Privatkredite – kostenlos und unabhängig. Was interessiert Sie genauer?",
  partner: "Als Plan A Partner starten Sie selbstständig in der Immobilienbranche. Wir begleiten Sie mit IHK-Qualifikation und verifizierten Leads. Interessiert?",
  kontakt: "Sie erreichen uns unter:\n📞 0173-6259429\n✉️ Info@plana-immobilien-finanzierung.com\nMo–So 8–20 Uhr. Oder direkt per WhatsApp!",
  kosten: "Unsere Erstberatung ist immer kostenlos und unverbindlich. Kosten entstehen nur bei einem erfolgreichen Vertragsabschluss.",
  region: "Unser Hauptsitz ist in Mosbach, Baden-Württemberg. Wir sind deutschlandweit für Sie tätig – überwiegend digital.",
  done: "Danke für Ihre Nachricht! Für eine persönliche Antwort sind wir Mo–So 8–20 Uhr erreichbar.",
};

const COMMON_QS = [
  { triggers: ["kostet", "kosten", "provision", "gebühr"], step: "kosten" as Step },
  { triggers: ["wo ", "region", "tätig", "standort", "hauptsitz"], step: "region" as Step },
  { triggers: ["bewert", "wert"], step: "bewerten" as Step },
  { triggers: ["finanzier", "kredit", "kfw", "darlehen"], step: "finanzierung" as Step },
  { triggers: ["partner", "selbstständig"], step: "partner" as Step },
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "bot", text: RESPONSES.start }]);
  const [step, setStep] = useState<Step>("start");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  const botReply = (text: string, nextStep: Step) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); setMsgs(m => [...m, { from: "bot", text }]); setStep(nextStep); }, 900);
  };

  const handleQuick = (q: { label: string; next: Step }) => {
    setMsgs(m => [...m, { from: "user", text: q.label }]);
    botReply(RESPONSES[q.next], q.next);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const q = input.toLowerCase();
    setMsgs(m => [...m, { from: "user", text: input }]);
    setInput("");
    const match = COMMON_QS.find(cq => cq.triggers.some(t => q.includes(t)));
    botReply(match ? RESPONSES[match.step] : RESPONSES.done, match ? match.step : "done");
  };

  return (
    <>
      {/* Floating button */}
      <button onClick={() => setOpen(v => !v)} aria-label="Chat"
        style={{ position: "fixed", bottom: "24px", left: "24px", zIndex: 800, width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#1B3A4B", border: "2.5px solid #C8A96E", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(27,58,75,0.4)", transition: "transform 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        {open
          ? <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          : <svg width="20" height="20" fill="none" stroke="#C8A96E" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{ position: "fixed", bottom: "92px", left: "24px", zIndex: 800, width: "340px", maxHeight: "520px", backgroundColor: "#fff", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ backgroundColor: "#1B3A4B", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", border: "2px solid #C8A96E", flexShrink: 0, backgroundColor: "#0e2230" }}>
              <Image src="/maskottchen.png" alt="Plan A" width={36} height={36} style={{ width: "36px", height: "auto" }} />
            </div>
            <div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", margin: 0 }}>Plan A Assistent</p>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>Online · antwortet sofort</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", scrollbarWidth: "none" as const }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", gap: "8px", alignItems: "flex-end" }}>
                {m.from === "bot" && (
                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, backgroundColor: "#1B3A4B" }}>
                    <Image src="/maskottchen.png" alt="" width={26} height={26} style={{ width: "26px", height: "auto" }} />
                  </div>
                )}
                <div style={{ maxWidth: "220px", padding: "10px 14px", borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", backgroundColor: m.from === "user" ? "#1B3A4B" : "#F7F5F2", color: m.from === "user" ? "#fff" : "#1A1A1A", fontSize: "13px", lineHeight: 1.6, fontWeight: 300, whiteSpace: "pre-line" as const }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#1B3A4B" }}><Image src="/maskottchen.png" alt="" width={26} height={26} style={{ width: "26px", height: "auto" }} /></div>
                <div style={{ padding: "12px 16px", backgroundColor: "#F7F5F2", borderRadius: "18px 18px 18px 4px", display: "flex", gap: "4px", alignItems: "center" }}>
                  {[0, 0.2, 0.4].map((d, i) => <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C8A96E", display: "inline-block", animation: `cbounce 1s ${d}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {!typing && QUICK[step]?.length > 0 && (
            <div style={{ padding: "8px 12px", display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "1px solid #F3F4F6", flexShrink: 0 }}>
              {QUICK[step].map(q => (
                <button key={q.next} onClick={() => handleQuick(q)}
                  style={{ padding: "6px 12px", backgroundColor: "transparent", border: "1px solid #C8A96E", borderRadius: "50px", fontSize: "12px", color: "#1B3A4B", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#C8A96E"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1B3A4B"; }}>
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #F3F4F6", display: "flex", gap: "8px", flexShrink: 0 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Ihre Frage..."
              style={{ flex: 1, padding: "9px 14px", border: "1px solid #E5E7EB", borderRadius: "50px", fontSize: "13px", color: "#1A1A1A", outline: "none", fontFamily: "var(--font-inter, sans-serif)" }} />
            <button onClick={handleSend} style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#C8A96E", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: "10px 16px 14px", backgroundColor: "#F7F5F2", display: "flex", gap: "8px", justifyContent: "center", flexShrink: 0 }}>
            <a href="tel:01736259429" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 14px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "12px", fontWeight: 500 }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Anrufen
            </a>
            <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "5px", padding: "7px 14px", backgroundColor: "#25D366", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "12px", fontWeight: 500 }}>
              <svg width="12" height="12" fill="#fff" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cbounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        @media(max-width:420px){[data-chat-window]{width:calc(100vw - 32px)!important;left:16px!important;}}
      `}</style>
    </>
  );
}
