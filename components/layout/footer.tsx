import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1B3A4B" }} className="text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Plan A" width={36} height={36} className="h-9 w-auto brightness-0 invert" />
              <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "16px", color: "#C8A96E" }}>Plan A Immobilien & Finanzierung</span>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
              Unabhängige Beratung für Immobilienverkauf, Finanzierung und staatliche Förderungen.
            </p>
            <p style={{ fontSize: "12px", color: "#C8A96E", marginTop: "12px" }}>Hauptsitz Mosbach · Deutschlandweit tätig</p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>Navigation</p>
            <div className="flex flex-col gap-3">
              {[
                { label: "Finanzierung", href: "/finanzierung" },
                { label: "Immobilienverkauf", href: "/immobilienverkauf" },
                { label: "Partner werden", href: "/partner" },
                { label: "Kontakt", href: "/kontakt" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }} className="hover:text-white transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8A96E", marginBottom: "16px" }}>Kontakt</p>
            <div className="flex flex-col gap-2" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
              <p>Mosbacher Str. 75, 74821 Mosbach</p>
              <a href="tel:01736259429" className="hover:text-white transition-colors">0173-6259429</a>
              <a href="mailto:Info@plana-immobilien-finanzierung.com" className="hover:text-white transition-colors">Info@plana-immobilien-finanzierung.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "40px", paddingTop: "20px" }} className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex gap-5" style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</Link>
          </div>
          <p style={{ fontSize: "9px", color: "#C8A96E", opacity: 0.4 }}>Designed by Contexflow AI</p>
        </div>
      </div>
    </footer>
  );
}
