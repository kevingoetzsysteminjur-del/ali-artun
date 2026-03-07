"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";

const links = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "So funktioniert es", href: "#prozess" },
  { label: "Über Ali Artun", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.scrollY >= window.innerHeight - 10);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  if (!visible) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F4] border-b border-[#C9A96E]/25">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/logo_transparent.png"
              alt="Plan A Immobilien"
              width={160}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:+4962619123456"
              className="flex items-center gap-2 text-stone-700 hover:text-[#C9A96E] transition-colors font-medium"
            >
              <Phone size={16} className="text-[#C9A96E]" />
              <span className="text-base">06261 / 123 456</span>
            </a>
            <a
              href="#kontakt"
              className="bg-[#C9A96E] hover:bg-[#B8952A] text-white text-base font-semibold px-6 py-2.5 rounded-full transition-all hover:shadow-lg hover:shadow-[#C9A96E]/20"
            >
              Kostenlose Bewertung
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-stone-900 hover:bg-stone-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-stone-100 bg-white">
            <nav className="py-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center px-4 py-4 text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors text-lg"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 pt-4 pb-4 border-t border-stone-100 mt-2 space-y-3">
                <a
                  href="tel:+4962619123456"
                  className="flex items-center gap-3 text-stone-700 text-lg font-medium"
                >
                  <Phone size={18} className="text-[#C9A96E]" />
                  06261 / 123 456
                </a>
                <a
                  href="#kontakt"
                  className="flex justify-center w-full bg-[#C9A96E] hover:bg-[#B8952A] text-white text-lg font-semibold px-5 py-3.5 rounded-full transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Kostenlose Bewertung
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
