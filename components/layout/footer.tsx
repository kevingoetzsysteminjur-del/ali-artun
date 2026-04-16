"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#2C1A0E", color: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "48px" }} className="footer-grid">

          {/* Col 1 – Brand */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <Image src="/images/plan-a-logo.png" alt="Plan A Immobilien" width={220} height={95}
                style={{ height: "63px", width: "auto", objectFit: "contain", mixBlendMode: "screen", display: "block" }} />
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "16px", fontStyle: "italic", fontFamily: "var(--font-dm-serif, serif)" }}>
              „Strategie bestimmt den Preis."
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
              Hauptsitz Mosbach · Deutschlandweit tätig
            </p>
            {/* Maskottchen */}
            <Image src="/maskottchen.png" alt="" width={120} height={120}
              style={{ height: "84px", width: "auto", marginTop: "20px", opacity: 0.6, imageRendering: "auto" }} />
          </div>

          {/* Col 2 – Leistungen */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A017", marginBottom: "20px" }}>Leistungen</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Immobilienverkauf", href: "/immobilienverkauf" },
                { label: "Finanzierung", href: "/finanzierung" },
                { label: "Objekt-Aufbereitung", href: "/immobilienverkauf#aufbereitung" },
                { label: "Wertermittlung", href: "/kontakt?betreff=Immobilienbewertung" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 – Unternehmen */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A017", marginBottom: "20px" }}>Unternehmen</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Partner werden", href: "/partner" },
                { label: "Kontakt", href: "/kontakt" },
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "AGB", href: "/agb" },
              ].map((l) => (
                <Link key={l.href} href={l.href}
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 – Kontakt */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D4A017", marginBottom: "20px" }}>Kontakt</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: 0, lineHeight: 1.6 }}>
                Mosbacher Str. 75<br />74821 Mosbach
              </p>
              <a href="tel:01736259429" style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >0173-6259429</a>
              <a href="mailto:Info@plana-immobilien-finanzierung.com"
                style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", textDecoration: "none", wordBreak: "break-all" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >Info@plana-immobilien-finanzierung.com</a>
              <a href="https://wa.me/491736259429"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#D4A017", textDecoration: "none" }}>
                <svg width="14" height="14" fill="#D4A017" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
            {/* Newsletter */}
            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.5)", marginBottom: "10px", letterSpacing: "0.05em" }}>Newsletter</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="email" placeholder="Ihre E-Mail"
                  style={{ flex: 1, padding: "10px 14px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#fff", fontSize: "13px", outline: "none" }} />
                <button style={{ padding: "10px 16px", backgroundColor: "#D4A017", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontWeight: 500, whiteSpace: "nowrap" }}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "48px", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            © 2026 Plan A Immobilien & Finanzierung · Alle Rechte vorbehalten
          </p>
          <p style={{ fontSize: "9px", color: "#D4A017", opacity: 0.35, margin: 0 }}>
            Designed by Contexflow AI
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
