"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Startseite", href: "/" },
  {
    label: "Immobilienverkauf",
    href: "/immobilienverkauf",
    children: [
      { label: "Verkaufen", href: "/immobilienverkauf" },
      { label: "Vermieten", href: "/kontakt?betreff=Vermieten" },
      { label: "Wertermittlung", href: "/kontakt?betreff=Immobilienbewertung" },
      { label: "Objekt-Aufbereitung", href: "/immobilienverkauf#aufbereitung" },
      { label: "Käuferfinder", href: "/immobilienverkauf#kaeufer" },
    ],
  },
  {
    label: "Finanzierung",
    href: "/finanzierung",
    children: [
      { label: "KFW-Beratung", href: "/finanzierung" },
      { label: "KFW-Kredite", href: "/finanzierung" },
      { label: "BAFA-Förderung", href: "/finanzierung" },
      { label: "Staatliche Förderung", href: "/finanzierung" },
      { label: "Privatkredite", href: "/finanzierung" },
      { label: "Modernisierung", href: "/finanzierung" },
    ],
  },
  { label: "Partner werden", href: "/partner" },
  {
    label: "Service",
    href: "/ratgeber",
    children: [
      { label: "Ratgeber", href: "/ratgeber" },
      { label: "Wertermittlung", href: "/wertermittlung" },
      { label: "Energieausweis", href: "/immobilienverkauf#energieausweis" },
      { label: "Suchauftrag", href: "/#suchauftrag" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [merkCount, setMerkCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => {
      try {
        const saved = localStorage.getItem("merkzettel");
        setMerkCount(saved ? JSON.parse(saved).length : 0);
      } catch { setMerkCount(0); }
    };
    update();
    window.addEventListener("storage", update);
    window.addEventListener("merkzettel-update", update);
    return () => { window.removeEventListener("storage", update); window.removeEventListener("merkzettel-update", update); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [pathname]);

  const openDrop = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };
  const closeDrop = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  return (
    <>
      {/* Top bar */}
      <div style={{ backgroundColor: "#1B3A4B", padding: "8px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="tel:01736259429" style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              0173-6259429
            </a>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>|</span>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Mo–So 8–20 Uhr</span>
          </div>
          <a href="https://wa.me/491736259429" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "11px", color: "#C8A96E", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
            <svg width="12" height="12" fill="#C8A96E" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "#fff", borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent", boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.3s, border-color 0.3s" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "70px" }}>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <Image src="/logo.png" alt="Plan A" width={28} height={28} style={{ height: "28px", width: "auto" }} />
            <span style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "16px", color: "#1B3A4B" }}>Plan A</span>
          </Link>

          <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {navItems.map((item) => (
              <div key={item.label} style={{ position: "relative" }}
                onMouseEnter={() => item.children && openDrop(item.label)}
                onMouseLeave={() => item.children && closeDrop()}>
                <Link href={item.href}
                  style={{
                    display: "flex", alignItems: "center", gap: "4px", padding: "8px 12px 6px",
                    fontSize: "13.5px",
                    color: (pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/")) ? "#1B3A4B" : "#374151",
                    textDecoration: "none", fontWeight: (pathname === item.href) ? 500 : 400,
                    borderBottom: (pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/")) ? "2px solid #C8A96E" : "2px solid transparent",
                    transition: "color 0.2s, border-color 0.2s",
                  }}>
                  {item.label}
                  {item.children && (
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      style={{ opacity: 0.5, transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  )}
                </Link>
                {item.children && openDropdown === item.label && (
                  <div onMouseEnter={() => openDrop(item.label)} onMouseLeave={() => closeDrop()}
                    style={{ position: "absolute", top: "calc(100% + 4px)", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", boxShadow: "0 16px 48px rgba(0,0,0,0.12)", padding: "8px", minWidth: "210px", zIndex: 100 }}>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href}
                        style={{ display: "block", padding: "10px 14px", fontSize: "13px", color: "#374151", textDecoration: "none", borderRadius: "8px", fontWeight: 300, transition: "background 0.15s, color 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#F7F5F2"; e.currentTarget.style.color = "#1B3A4B"; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#374151"; }}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/merkzettel"
              style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", textDecoration: "none", color: "#374151", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#F7F5F2")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              {merkCount > 0 && (
                <span style={{ position: "absolute", top: "2px", right: "2px", width: "15px", height: "15px", borderRadius: "50%", backgroundColor: "#C8A96E", color: "#fff", fontSize: "9px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>{merkCount}</span>
              )}
            </Link>
            <Link href="/kontakt" className="desktop-nav"
              style={{ padding: "10px 22px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "13px", fontWeight: 500, transition: "background 0.25s" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#C8A96E")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1B3A4B")}>
              Kontakt
            </Link>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(v => !v)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: "#1B3A4B" }}>
              {mobileOpen
                ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ backgroundColor: "#fff", borderTop: "1px solid #F3F4F6", padding: "16px 24px 24px", maxHeight: "75vh", overflowY: "auto" }}>
            {navItems.map(item => (
              <div key={item.label}>
                <Link href={item.href}
                  style={{ display: "block", padding: "12px 0", fontSize: "15px", color: "#1A1A1A", textDecoration: "none", borderBottom: "1px solid #F3F4F6", fontWeight: pathname === item.href ? 500 : 300 }}>
                  {item.label}
                </Link>
                {item.children && (
                  <div style={{ paddingLeft: "16px" }}>
                    {item.children.map(child => (
                      <Link key={child.label} href={child.href}
                        style={{ display: "block", padding: "9px 0", fontSize: "13px", color: "#6B7280", textDecoration: "none", borderBottom: "1px solid #F9F9F9", fontWeight: 300 }}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/kontakt"
              style={{ display: "block", marginTop: "20px", padding: "14px", backgroundColor: "#1B3A4B", color: "#fff", borderRadius: "50px", textDecoration: "none", fontSize: "14px", fontWeight: 500, textAlign: "center" }}>
              Kontakt aufnehmen
            </Link>
          </div>
        )}
      </header>

      <style>{`
        @media(max-width:1100px){.desktop-nav{display:none!important;}}
        .mobile-menu-btn{display:none!important;}
        @media(max-width:1100px){.mobile-menu-btn{display:flex!important;}}
      `}</style>
    </>
  );
}
