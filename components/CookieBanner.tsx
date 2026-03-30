"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) setShow(true);
  }, []);

  if (!show) return null;

  const save = (value: string) => {
    localStorage.setItem("cookie-consent", value);
    setShow(false);
  };

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9500, padding: "0 0 0 0" }}>
      <div style={{ backgroundColor: "#fff", borderTop: "1px solid #E5E7EB", boxShadow: "0 -8px 40px rgba(0,0,0,0.12)", padding: "24px", maxWidth: "100%" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "20px" }}>
          <div style={{ flex: "1 1 400px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <svg width="20" height="20" fill="none" stroke="#1B3A4B" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.05rem", color: "#1A1A1A", margin: 0 }}>Diese Website verwendet Cookies</p>
            </div>
            <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, fontWeight: 300, margin: 0 }}>
              Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. Essenzielle Cookies sind immer aktiv.
              Weitere Informationen finden Sie in unserer{" "}
              <Link href="/datenschutz" style={{ color: "#C8A96E", textDecoration: "none" }}>Datenschutzerklärung</Link>.
            </p>

            {expanded && (
              <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", backgroundColor: "#F7F5F2", borderRadius: "10px", cursor: "default" }}>
                  <input type="checkbox" checked disabled style={{ accentColor: "#1B3A4B" }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Essenzielle Cookies</p>
                    <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "2px 0 0", fontWeight: 300 }}>Notwendig für den Betrieb der Website. Immer aktiv.</p>
                  </div>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", backgroundColor: "#F7F5F2", borderRadius: "10px", cursor: "pointer" }}>
                  <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} style={{ accentColor: "#1B3A4B" }} />
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", margin: 0 }}>Analyse-Cookies</p>
                    <p style={{ fontSize: "12px", color: "#9CA3AF", margin: "2px 0 0", fontWeight: 300 }}>Helfen uns, die Website-Nutzung zu verstehen. Optional.</p>
                  </div>
                </label>
              </div>
            )}

            <button onClick={() => setExpanded(v => !v)}
              style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: "12px", cursor: "pointer", padding: "8px 0 0", textDecoration: "underline" }}>
              {expanded ? "Weniger anzeigen" : "Individuelle Einstellungen"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", flexShrink: 0, minWidth: "200px", justifyContent: "center", paddingTop: "4px" }}>
            <button onClick={() => save("all")}
              style={{ padding: "12px 28px", backgroundColor: "#1B3A4B", color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C8A96E")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1B3A4B")}>
              Alle akzeptieren
            </button>
            <button onClick={() => save(analytics ? "all" : "necessary")}
              style={{ padding: "12px 28px", backgroundColor: "transparent", color: "#1B3A4B", border: "1.5px solid #1B3A4B", borderRadius: "50px", fontSize: "13px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
              Auswahl speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
