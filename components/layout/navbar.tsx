"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Startseite", href: "/" },
  { label: "Finanzierung", href: "/finanzierung" },
  { label: "Immobilienverkauf", href: "/immobilienverkauf" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass nav-scrolled" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="Plan A Immobilien" width={40} height={40} className="h-10 w-auto" />
          <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "17px", color: "#1B3A4B", letterSpacing: "0.01em" }}>Plan A</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/partner" className="nav-btn-outline">Partner werden</Link>
          <Link href="/kontakt" className="nav-btn-filled">Kontakt</Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden p-2 text-[#1B3A4B]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-nav-panel lg:hidden bg-white border-t border-[#E5E7EB] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[#1A1A1A] text-lg font-medium" onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <Link href="/partner" className="mobile-btn-outline" onClick={() => setMenuOpen(false)}>Partner werden</Link>
            <Link href="/kontakt" className="mobile-btn-filled" onClick={() => setMenuOpen(false)}>Kontakt</Link>
          </div>
        </div>
      )}
    </header>
  );
}
