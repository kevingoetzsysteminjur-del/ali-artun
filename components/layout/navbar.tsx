"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { MAKLER } from "@/lib/config";

const LANGS: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const pathname = usePathname();

  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(pathname !== "/");
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  // On subpages navbar is always visible; on / it appears after VideoIntro
  const anchor = (hash: string) => pathname === "/" ? hash : `/${hash}`;

  const NAV_LINKS = [
    { label: t("nav.services"),   href: anchor("#leistungen") },
    { label: t("nav.financing"),  href: "/finanzierung" },
    { label: t("nav.process"),    href: anchor("#prozess") },
    { label: t("nav.about"),      href: anchor("#ueber-uns") },
    { label: t("nav.ratgeber"),   href: "/ratgeber" },
    { label: t("nav.contact"),    href: anchor("#kontakt") },
  ];

  const MORE_LINKS = [
    { label: t("nav.preparation"),    href: "/aufbereitung" },
    { label: t("nav.partnerBecome"),  href: "/partner/warum" },
  ];

  useEffect(() => {
    if (pathname !== "/") {
      setVisible(true);
      const onScroll = () => setScrolled(window.scrollY > 60);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const onScroll = () => {
      setVisible(window.scrollY >= window.innerHeight - 10);
      setScrolled(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const handler = () => setMoreOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [moreOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* ── DESKTOP HEADER ──────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "nav-glass border-[#B8860B]/15"
            : "bg-[#FAF8F4] border-[#B8860B]/10"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-5 xl:px-10">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-[72px]"}`}>

            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center" style={{ textDecoration: "none" }}>
              <Image
                src="/logo.png"
                alt="Plan A Immobilien"
                width={140}
                height={40}
                className="h-[36px] xl:h-[40px] w-auto object-contain"
                priority
              />
            </a>

            {/* ── Desktop Nav ─────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link whitespace-nowrap"
                  style={{ fontSize: 13, fontWeight: 400 }}
                >
                  {link.label}
                </a>
              ))}

              {/* Mehr dropdown */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  className="nav-link flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  style={{ fontSize: 13, fontWeight: 400 }}
                  onClick={() => setMoreOpen(v => !v)}
                  aria-expanded={moreOpen}
                >
                  {t("nav.moreMenu")}
                  <ChevronDown
                    size={13}
                    style={{
                      transition: "transform 0.22s ease",
                      transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg border border-[#B8860B]/15 overflow-hidden z-50"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    pointerEvents: moreOpen ? "auto" : "none",
                    opacity: moreOpen ? 1 : 0,
                    transform: moreOpen ? "translateY(0)" : "translateY(-6px)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {MORE_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center px-4 py-3 text-[#4A3728] hover:bg-[#B8860B]/8 hover:text-[#B8860B] transition-colors"
                      style={{ fontSize: 13, textDecoration: "none", fontWeight: 400 }}
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* ── Desktop Right ────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5">

              {/* Phone */}
              <a
                href={MAKLER.telefonHref}
                className="flex items-center gap-1.5 hover:text-[#B8860B] transition-colors whitespace-nowrap"
                style={{ fontSize: 13, color: "#6B5E4E", textDecoration: "none" }}
              >
                <Phone size={13} style={{ color: "#B8860B", flexShrink: 0 }} />
                {MAKLER.telefon}
              </a>

              {/* Language switcher */}
              <div className="flex items-center gap-0 border-l border-stone-200 pl-4">
                {LANGS.map((l, i) => (
                  <span key={l.code} className="flex items-center">
                    <button
                      onClick={() => setLang(l.code)}
                      className="cursor-pointer bg-transparent border-none transition-colors hover:text-[#4A3728]"
                      style={{
                        fontSize: 11,
                        color: lang === l.code ? "#4A3728" : "#9ca3af",
                        fontWeight: lang === l.code ? 700 : 400,
                        padding: "4px 3px",
                        letterSpacing: "0.05em",
                        minHeight: 44,
                      }}
                      aria-label={`Sprache: ${l.label}`}
                    >
                      {l.label}
                    </button>
                    {i < LANGS.length - 1 && (
                      <span style={{ fontSize: 10, color: "#d1d5db", margin: "0 1px", userSelect: "none" }}>|</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                aria-label={theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 hover:border-[#B8860B]/40 transition-colors bg-transparent cursor-pointer"
                style={{ flexShrink: 0 }}
              >
                {theme === "dark"
                  ? <Sun size={18} style={{ color: "#B8860B" }} />
                  : <Moon size={18} style={{ color: "#6B5E4E" }} />}
              </button>

              {/* PARTNER WERDEN – outline */}
              <a href="/partner/warum" className="nav-btn-outline">
                {t("nav.partnerBecome")}
              </a>

              {/* KOSTENLOSE BEWERTUNG – filled */}
              <a href="/immobilienbewertung" className="nav-btn-filled">
                {t("nav.freeValuation")}
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded cursor-pointer transition-colors hover:bg-[#B8860B]/10"
              aria-label="Menu öffnen"
            >
              <Menu size={22} style={{ color: "#4A3728" }} />
            </button>

          </div>
        </div>
      </header>

      {/* ── MOBILE FULLSCREEN MENU ──────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-[200] lg:hidden flex flex-col mobile-nav-panel" style={{ background: "linear-gradient(160deg, #1c1a17 0%, #2e2620 100%)" }}>

          {/* Mobile header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Plan A Immobilien"
              width={120}
              height={36}
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-11 h-11 rounded cursor-pointer transition-colors hover:bg-white/10"
              aria-label="Menu schließen"
            >
              <X size={22} style={{ color: "rgba(255,255,255,0.85)" }} />
            </button>
          </div>

          {/* Mobile links */}
          <nav className="flex flex-col px-5 pt-4 flex-1 overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-4 border-b transition-colors hover:text-[#C5A028]"
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.88)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  borderBottomColor: "rgba(255,255,255,0.07)",
                }}
              >
                {link.label}
                <span style={{ color: "rgba(197,160,40,0.5)", fontSize: 16 }}>›</span>
              </a>
            ))}

            {/* Mehr-Links auch im Mobile */}
            <div className="mt-4 mb-2">
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>
                {t("nav.moreMenu")}
              </p>
            </div>
            {MORE_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 border-b transition-colors hover:text-[#C5A028]"
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  borderBottomColor: "rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Phone */}
            <a
              href={MAKLER.telefonHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-4 mt-2 border-b transition-colors hover:text-[#C5A028]"
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                borderBottomColor: "rgba(255,255,255,0.07)",
              }}
            >
              <Phone size={16} style={{ color: "#C5A028" }} />
              {MAKLER.telefon}
            </a>

            {/* Language switcher */}
            <div className="flex items-center gap-1 py-4">
              {LANGS.map((l, i) => (
                <span key={l.code} className="flex items-center gap-1">
                  <button
                    onClick={() => setLang(l.code)}
                    className="cursor-pointer bg-transparent border-none transition-colors"
                    style={{
                      fontSize: 13,
                      color: lang === l.code ? "#C5A028" : "rgba(255,255,255,0.35)",
                      fontWeight: lang === l.code ? 700 : 400,
                      padding: "4px 4px",
                      minHeight: 44,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {l.label}
                  </button>
                  {i < LANGS.length - 1 && (
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", userSelect: "none" }}>|</span>
                  )}
                </span>
              ))}

              {/* Dark mode toggle mobile */}
              <button
                onClick={toggle}
                aria-label={theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}
                className="ml-4 flex items-center justify-center w-9 h-9 rounded-lg border border-white/20 hover:border-[#C5A028]/50 transition-colors bg-transparent cursor-pointer"
              >
                {theme === "dark"
                  ? <Sun size={18} style={{ color: "#B8860B" }} />
                  : <Moon size={18} style={{ color: "rgba(255,255,255,0.6)" }} />}
              </button>
            </div>
          </nav>

          {/* Mobile bottom CTAs */}
          <div className="px-5 pb-8 pt-4 space-y-3 border-t border-white/10 flex-shrink-0">
            <a
              href="/partner/warum"
              onClick={() => setOpen(false)}
              className="mobile-btn-outline"
            >
              {t("nav.partnerBecome")}
            </a>
            <a
              href="/immobilienbewertung"
              onClick={() => setOpen(false)}
              className="mobile-btn-filled"
            >
              {t("nav.freeValuation")}
            </a>
          </div>

        </div>
      )}
    </>
  );
}
