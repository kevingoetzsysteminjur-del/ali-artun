"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "all");
    setShow(false);
  };

  const necessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[#E5E7EB] shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p style={{ fontSize: "14px", color: "#6B7280", lineHeight: 1.6, maxWidth: "640px" }}>
          Wir verwenden Cookies, um Ihre Erfahrung zu verbessern.{" "}
          <a href="/datenschutz" style={{ color: "#C8A96E", textDecoration: "underline" }}>
            Datenschutzerklärung
          </a>
        </p>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={necessary}
            style={{ fontSize: "14px", color: "#6B7280", padding: "8px 16px", border: "1px solid #E5E7EB", borderRadius: "50px", background: "transparent", cursor: "pointer" }}
          >
            Nur Notwendige
          </button>
          <button
            onClick={accept}
            style={{ fontSize: "14px", fontWeight: 500, color: "#FFFFFF", backgroundColor: "#1B3A4B", padding: "8px 20px", borderRadius: "50px", border: "none", cursor: "pointer" }}
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
