"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Startseite", href: "/" },
  { label: "Immobilienverkauf", href: "/immobilienverkauf" },
  { label: "Finanzierung", href: "/finanzierung" },
  { label: "Partner werden", href: "/partner" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      {/* Top Bar */}
      <div style={{ backgroundColor: "#1B3A4B", padding: "8px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "center" }}>
          <a href="tel:01736259429" style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)", textDecoration: "none", letterSpacing: "0.04em" }}>
            Kostenlose Beratung:{" "}
            <strong style={{ color: "#C8A96E" }}>0173-6259429</strong> · Mo–So: 8–20 Uhr
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid #F0EDE8" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <Image src="/logo.png" alt="Plan A" width={36} height={36} style={{ height: "36px", width: "auto" }} />
            <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "18px", color: "#1B3A4B" }}>Plan A</span>
          </Link>

          {/* Desktop Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="nav-desktop">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link"
                style={{ fontWeight: pathname === l.href ? 500 : 400, color: pathname === l.href ? "#1B3A4B" : "#374151" }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="nav-desktop">
            <Link href="/kontakt"
              style={{ display: "inline-flex", alignItems: "center", padding: "10px 24px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em", transition: "background 0.25s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#C8A96E")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B3A4B")}
            >
              Kontakt
            </Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menü"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1B3A4B", padding: "8px" }}
            className="nav-mobile"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ backgroundColor: "#fff", borderTop: "1px solid #F0EDE8", padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href}
                style={{ padding: "12px 0", fontSize: "16px", color: "#1A1A1A", textDecoration: "none", borderBottom: "1px solid #F7F5F2", display: "block" }}>
                {l.label}
              </Link>
            ))}
            <Link href="/kontakt"
              style={{ marginTop: "16px", display: "flex", alignItems: "center", justifyContent: "center", padding: "14px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
              Kontakt aufnehmen
            </Link>
          </div>
        )}
      </header>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile  { display: none  !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none  !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
