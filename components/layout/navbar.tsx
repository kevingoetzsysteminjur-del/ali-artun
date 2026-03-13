"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown, Sun, Moon, User, LayoutDashboard, LogOut } from "lucide-react";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { MAKLER } from "@/lib/config";

const LANGS: { code: Lang; label: string }[] = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
];

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, toggle } = useTheme();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const pathname = usePathname();

  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(pathname !== "/");
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const authDropdownRef = useRef<HTMLDivElement>(null);

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
    if (!authOpen) return;
    const handler = (e: MouseEvent) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(e.target as Node)) {
        setAuthOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [authOpen]);

  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Konto";
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!visible) return null;

  return (
    <>
      {/* ── DESKTOP HEADER ──────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(184,134,11,0.12),0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-white/80 backdrop-blur-sm border-b border-[#B8860B]/08"
        }`}
      >
        <div className="w-full pl-4 xl:pl-8 pr-4 xl:pr-6">
          <div className={`flex items-center gap-8 xl:gap-10 transition-all duration-300 ${scrolled ? "h-[58px]" : "h-[70px]"}`}>

            {/* Logo — ganz links */}
            <a href="/" className="flex-shrink-0 flex items-center" style={{ textDecoration: "none" }}>
              <Image
                src="/logo.png"
                alt="Plan A Immobilien"
                width={140}
                height={40}
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? "h-[32px]" : "h-[38px] xl:h-[42px]"}`}
                priority
              />
            </a>

            {/* ── Desktop Nav ─────────────────────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative group whitespace-nowrap px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#B8860B]/06"
                  style={{ fontSize: 13.5, fontWeight: 400, color: "#4A3728", textDecoration: "none", letterSpacing: "0.01em" }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-1 left-3 right-3 h-px bg-[#C5A028] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left"
                    aria-hidden="true"
                  />
                </a>
              ))}

              {/* Mehr dropdown */}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button
                  className="relative group flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 hover:bg-[#B8860B]/06 bg-transparent border-none cursor-pointer"
                  style={{ fontSize: 13.5, fontWeight: 400, color: "#4A3728", letterSpacing: "0.01em" }}
                  onClick={() => setMoreOpen(v => !v)}
                  aria-expanded={moreOpen}
                >
                  {t("nav.moreMenu")}
                  <ChevronDown
                    size={13}
                    style={{
                      color: "#B8860B",
                      transition: "transform 0.25s ease",
                      transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-xl border border-[#B8860B]/12 overflow-hidden z-50"
                  style={{
                    boxShadow: "0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(184,134,11,0.08)",
                    pointerEvents: moreOpen ? "auto" : "none",
                    opacity: moreOpen ? 1 : 0,
                    transform: moreOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  {MORE_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-[#FBF7EE] transition-colors"
                      style={{ fontSize: 13, color: "#4A3728", textDecoration: "none", fontWeight: 400 }}
                      onClick={() => setMoreOpen(false)}
                    >
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C5A028", flexShrink: 0, display: "inline-block" }} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* ── Desktop Right ────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">

              {/* Phone */}
              <a
                href={MAKLER.telefonHref}
                className="flex items-center gap-1.5 hover:text-[#B8860B] transition-colors whitespace-nowrap"
                style={{ fontSize: 13, color: "#7A6A56", textDecoration: "none" }}
              >
                <Phone size={13} style={{ color: "#C5A028", flexShrink: 0 }} />
                {MAKLER.telefon}
              </a>

              {/* Divider */}
              <span style={{ width: 1, height: 20, background: "rgba(184,134,11,0.2)", flexShrink: 0 }} />

              {/* Language switcher */}
              <div className="flex items-center gap-0.5">
                {LANGS.map((l, i) => (
                  <span key={l.code} className="flex items-center">
                    <button
                      onClick={() => setLang(l.code)}
                      className="cursor-pointer bg-transparent border-none transition-all duration-200 rounded hover:text-[#4A3728]"
                      style={{
                        fontSize: 11,
                        color: lang === l.code ? "#4A3728" : "#b0a090",
                        fontWeight: lang === l.code ? 700 : 400,
                        padding: "4px 4px",
                        letterSpacing: "0.06em",
                        minHeight: 36,
                      }}
                      aria-label={`Sprache: ${l.label}`}
                    >
                      {l.label}
                    </button>
                    {i < LANGS.length - 1 && (
                      <span style={{ fontSize: 10, color: "#ddd", margin: "0 1px", userSelect: "none" }}>·</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                aria-label={theme === "dark" ? t("nav.lightMode") : t("nav.darkMode")}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[#B8860B]/10 transition-colors bg-transparent cursor-pointer"
                style={{ flexShrink: 0 }}
              >
                {theme === "dark"
                  ? <Sun size={16} style={{ color: "#B8860B" }} />
                  : <Moon size={16} style={{ color: "#9A8B7A" }} />}
              </button>

              {/* Auth */}
              {!authLoading && (
                <>
                  {!user ? (
                    <a
                      href="/anmelden"
                      className="flex items-center gap-1.5 hover:text-[#B8860B] transition-colors whitespace-nowrap"
                      style={{ fontSize: 13, color: "#7A6A56", textDecoration: "none" }}
                    >
                      <User size={13} style={{ color: "#C5A028", flexShrink: 0 }} />
                      Anmelden
                    </a>
                  ) : (
                    <div className="relative" ref={authDropdownRef} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setAuthOpen((v) => !v)}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-semibold cursor-pointer border-none transition-all hover:ring-2 hover:ring-[#C5A028]/40"
                        style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)", flexShrink: 0 }}
                        aria-label="Konto-Menü"
                      >
                        {userInitial}
                      </button>

                      {/* Auth dropdown */}
                      <div
                        className="absolute top-full right-0 mt-1.5 w-52 bg-white rounded-xl border border-[#B8860B]/12 overflow-hidden z-50"
                        style={{
                          boxShadow: "0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(184,134,11,0.08)",
                          pointerEvents: authOpen ? "auto" : "none",
                          opacity: authOpen ? 1 : 0,
                          transform: authOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.97)",
                          transition: "opacity 0.2s ease, transform 0.2s ease",
                        }}
                      >
                        <div className="px-4 py-3 border-b border-[#B8860B]/08">
                          <p className="text-xs font-medium text-stone-700 truncate">{userName}</p>
                          <p className="text-xs text-stone-400 truncate">{user.email}</p>
                        </div>
                        <a
                          href="/konto"
                          className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#FBF7EE] transition-colors"
                          style={{ fontSize: 13, color: "#4A3728", textDecoration: "none" }}
                          onClick={() => setAuthOpen(false)}
                        >
                          <User size={13} style={{ color: "#C5A028" }} />
                          Mein Konto
                        </a>
                        {isAdmin && (
                          <a
                            href="/admin"
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#FBF7EE] transition-colors"
                            style={{ fontSize: 13, color: "#4A3728", textDecoration: "none" }}
                            onClick={() => setAuthOpen(false)}
                          >
                            <LayoutDashboard size={13} style={{ color: "#C5A028" }} />
                            Admin-Panel
                          </a>
                        )}
                        <button
                          onClick={() => { setAuthOpen(false); signOut(); }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 hover:bg-red-50 transition-colors border-t border-[#B8860B]/08"
                          style={{ fontSize: 13, color: "#9a3535", textDecoration: "none", background: "transparent", border: "none", borderTop: "1px solid rgba(184,134,11,0.08)", cursor: "pointer", textAlign: "left" }}
                        >
                          <LogOut size={13} />
                          Abmelden
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

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
            <div className="lg:hidden flex items-center ml-auto">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors hover:bg-[#B8860B]/10"
                aria-label="Menu öffnen"
              >
                <Menu size={21} style={{ color: "#4A3728" }} />
              </button>
            </div>

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
            {!authLoading && (
              <>
                {!user ? (
                  <a
                    href="/anmelden"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{
                      background: "rgba(197,160,40,0.12)",
                      color: "#C5A028",
                      border: "1px solid rgba(197,160,40,0.25)",
                      textDecoration: "none",
                    }}
                  >
                    <User size={15} />
                    Anmelden
                  </a>
                ) : (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(197,160,40,0.08)", border: "1px solid rgba(197,160,40,0.15)" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)" }}>
                        {userInitial}
                      </div>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <a href="/konto" onClick={() => setOpen(false)} style={{ fontSize: 12, color: "#C5A028", textDecoration: "none", padding: "4px 8px" }}>Konto</a>
                      {isAdmin && <a href="/admin" onClick={() => setOpen(false)} style={{ fontSize: 12, color: "#C5A028", textDecoration: "none", padding: "4px 8px" }}>Admin</a>}
                      <button onClick={() => { setOpen(false); signOut(); }} style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", background: "transparent", border: "none", cursor: "pointer", padding: "4px 8px" }}>Abmelden</button>
                    </div>
                  </div>
                )}
              </>
            )}
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
