"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen]       = useState(false);
  // On subpages the navbar is always visible; on / it appears after the VideoIntro
  const [visible, setVisible] = useState(pathname !== "/");
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // On subpages, anchor links must include the path so the browser navigates
  // back to the homepage first and then scrolls to the right section.
  const anchor = (hash: string) => pathname === "/" ? hash : `/${hash}`;

  const NAV_LINKS = [
    { label: t("nav.services"),  href: anchor("#leistungen") },
    { label: "Finanzierung",     href: "/finanzierung" },
    { label: t("nav.process"),   href: anchor("#prozess") },
    { label: t("nav.about"),     href: anchor("#ueber-uns") },
    { label: t("nav.ratgeber"),  href: "/ratgeber" },
    { label: t("nav.contact"),   href: anchor("#kontakt") },
  ];

  const MORE_LINKS = [
    { label: "Objektaufbereitung", href: "/aufbereitung" },
  ];

  useEffect(() => {
    // On the homepage the VideoIntro is 100vh tall, so the navbar only appears
    // after the user scrolls past it. On all other pages show it immediately.
    if (pathname !== "/") {
      setVisible(true);
      const checkScroll = () => setScrolled(window.scrollY > 80);
      checkScroll();
      window.addEventListener("scroll", checkScroll, { passive: true });
      return () => window.removeEventListener("scroll", checkScroll);
    }
    const check = () => {
      setVisible(window.scrollY >= window.innerHeight - 10);
      setScrolled(window.scrollY > 80);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  // close "mehr" dropdown when clicking outside
  useEffect(() => {
    if (!moreOpen) return;
    const handler = () => setMoreOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [moreOpen]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "nav-glass border-[#C5A028]/20"
            : "bg-[#FAF8F4] border-[#C5A028]/15"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>

            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Plan A Immobilien"
                width={150}
                height={52}
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-9" : "h-11"}`}
                priority
              />
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}

              {/* "Mehr" Dropdown */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  className="nav-link flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  onClick={() => setMoreOpen(v => !v)}
                  aria-expanded={moreOpen}
                >
                  Mehr
                  <ChevronDown
                    size={14}
                    style={{
                      transition: "transform 0.2s",
                      transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                {moreOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-52 bg-[#FAF8F4] rounded-xl shadow-xl border border-[#C5A028]/15 overflow-hidden z-50"
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}
                  >
                    {MORE_LINKS.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-[#C5A028]/10 hover:text-[#C5A028]"
                        style={{ color: "#4A3728", textDecoration: "none", fontFamily: "var(--font-body)" }}
                        onClick={() => setMoreOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Right: Phone + ThemeToggle + LanguageSwitcher + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+4962611234560"
                className="flex items-center gap-2 transition-colors hover:text-[#C5A028]"
                style={{ color: "#6B5E4E", fontSize: "14px", fontFamily: "var(--font-body)", textDecoration: "none" }}
              >
                <Phone size={14} style={{ color: "#C5A028" }} />
                <span style={{ letterSpacing: "0.04em" }}>{t("nav.phone")}</span>
              </a>
              <ThemeToggle />
              <LanguageSwitcher />
              {/* Partner werden highlighted CTA */}
              <a
                href="/partner/warum"
                className="hidden xl:inline-flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all hover:scale-105"
                style={{
                  background: "rgba(197,160,40,0.1)",
                  border: "1px solid rgba(197,160,40,0.35)",
                  color: "#8A6A18",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Partner werden
              </a>
              <a href="/immobilienbewertung" className="btn-primary">
                {t("nav.freeValuation")}
                <span className="btn-arrow">→</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-[#C5A028]/10"
              aria-label="Menu öffnen"
            >
              <Menu size={22} style={{ color: "#4A3728" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div
            className="mobile-nav-panel absolute top-0 right-0 bottom-0 w-80 bg-[#FAF8F4] flex flex-col shadow-2xl"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#C5A028]/20">
              <Image src="/logo.png" alt="Plan A Immobilien" width={120} height={40} className="h-9 w-auto object-contain" />
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#C5A028]/10 transition-colors"
              >
                <X size={20} style={{ color: "#4A3728" }} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 px-4 py-6 flex-1 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all hover:bg-[#C5A028]/10 hover:text-[#C5A028]"
                  style={{ color: "#4A3728", fontFamily: "var(--font-body)", letterSpacing: "0.03em", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ))}

              {/* Divider */}
              <div className="h-px bg-[#C5A028]/15 my-2" />
              <p className="px-4 py-1 text-xs font-semibold tracking-wider uppercase text-stone-400">Weitere Seiten</p>

              {MORE_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3.5 rounded-xl text-[15px] font-medium transition-all hover:bg-[#C5A028]/10 hover:text-[#C5A028]"
                  style={{ color: "#4A3728", fontFamily: "var(--font-body)", letterSpacing: "0.03em", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ))}

              {/* Partner werden - highlighted in mobile */}
              <a
                href="/partner/warum"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center px-4 py-3.5 rounded-xl text-[15px] font-semibold mt-2 transition-all"
                style={{
                  background: "rgba(197,160,40,0.1)",
                  border: "1px solid rgba(197,160,40,0.3)",
                  color: "#8A6A18",
                  textDecoration: "none",
                }}
              >
                Partner werden ✦
              </a>
            </nav>

            {/* Bottom CTAs */}
            <div className="px-6 pb-8 space-y-3 border-t border-[#C5A028]/15 pt-5">
              <div className="flex items-center justify-between mb-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <a
                href="tel:+4962611234560"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm transition-colors hover:bg-[#C5A028]/10"
                style={{ color: "#6B5E4E", fontFamily: "var(--font-body)", textDecoration: "none", border: "1px solid rgba(197,160,40,0.3)" }}
              >
                <Phone size={15} style={{ color: "#C5A028" }} />
                {t("nav.phone")}
              </a>
              <a href="/immobilienbewertung" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                {t("nav.freeValuation")}
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
