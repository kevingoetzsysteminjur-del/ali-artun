"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Dashboard", href: "/admin", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { label: "Kontaktanfragen", href: "/admin/anfragen", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
  { label: "Immobilien", href: "/admin/immobilien", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { label: "Suchaufträge", href: "/admin/suchauftraege", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/anmelden");
    }
  }, [user, loading, isAdmin, router]);

  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5EDE0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid #E8D9C5", borderTopColor: "#B8860B", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ fontSize: "13px", color: "#7A6548" }}>Wird geladen…</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!user || !isAdmin) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5EDE0" }}>
      {/* Sidebar */}
      <aside style={{ width: "240px", backgroundColor: "#2C1A0E", flexShrink: 0, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(212,160,23,0.15)" }}>
          <p style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "4px" }}>ADMIN</p>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#FFFCF7", margin: 0 }}>Plan A</p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 12px", borderRadius: "10px",
                  marginBottom: "4px", textDecoration: "none",
                  color: active ? "#D4A017" : "rgba(255,252,247,0.6)",
                  backgroundColor: active ? "rgba(212,160,23,0.1)" : "transparent",
                  borderLeft: active ? "3px solid #B8860B" : "3px solid transparent",
                  fontSize: "13px", fontWeight: active ? 500 : 300,
                  transition: "all 0.15s",
                }}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(212,160,23,0.15)" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,252,247,0.4)", marginBottom: "2px", wordBreak: "break-all" }}>{user.email}</p>
          <button
            onClick={signOut}
            style={{ marginTop: "10px", width: "100%", padding: "10px", background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: "8px", color: "#D4A017", fontSize: "12px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}
          >
            Abmelden
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "32px", overflowY: "auto" }}>
        {children}
      </main>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:768px){aside{display:none}main{margin-left:0!important}}`}</style>
    </div>
  );
}
