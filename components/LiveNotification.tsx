"use client";
import { useState, useEffect } from "react";

const NOTIFICATIONS = [
  "Familie M. aus Heidelberg hat gerade eine Immobilienbewertung angefragt.",
  "Herr K. aus Mosbach hat seine Wohnung erfolgreich über Plan A verkauft.",
  "Frau S. aus Stuttgart hat eine Finanzierungsberatung gebucht.",
  "Familie B. aus Heilbronn hat einen Suchauftrag für ein Einfamilienhaus angelegt.",
  "Herr T. aus Mannheim hat sich als Plan A Partner angemeldet.",
  "Frau W. aus Baden-Baden hat ihre Immobilie bewertet lassen.",
];

export default function LiveNotification() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [shownCount, setShownCount] = useState(0);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (shownCount >= 3) return;

    const timer = setTimeout(() => {
      const notif = NOTIFICATIONS[idx % NOTIFICATIONS.length];
      setText(notif);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
        setShownCount(c => c + 1);
        setIdx(i => i + 1);
      }, 4000);
    }, 3000 + shownCount * 45000);

    return () => clearTimeout(timer);
  }, [shownCount, idx]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: "96px", left: "24px", zIndex: 750,
      backgroundColor: "#fff", borderRadius: "12px", padding: "12px 16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)", border: "1px solid #E8D9C5",
      maxWidth: "280px", display: "flex", alignItems: "flex-start", gap: "10px",
      animation: "slideInLeft 0.4s ease-out",
    }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg width="14" height="14" fill="none" stroke="#D4A017" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/></svg>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 500, color: "#D4A017", margin: "0 0 3px", letterSpacing: "0.05em" }}>PLAN A IMMOBILIEN</p>
        <p style={{ fontSize: "12px", color: "#2C1A0E", margin: 0, lineHeight: 1.5, fontWeight: 300 }}>{text}</p>
      </div>
      <style>{`@keyframes slideInLeft{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
}
