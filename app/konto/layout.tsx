"use client";
export const dynamic = "force-dynamic";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  {
    label: "Übersicht", href: "/konto",
    icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    label: "Merkzettel", href: "/konto/merkzettel",
    icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  },
  {
    label: "Suchprofil", href: "/konto/suchprofil",
    icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,
  },
  {
    label: "Mein Profil", href: "/konto/profil",
    icon: <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
];

export default function KontoLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F0EB", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "3px solid #EAE0D5", borderTopColor: "#C8A45A", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (!user) return null;

  const displayName = profile?.name || user.email?.split("@")[0] || "Kunde";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F0EB" }}>

      {/* Sidebar */}
      <aside style={{ width: "240px", backgroundColor: "#1A1A1A", flexShrink: 0, display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100 }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(200,164,90,0.15)" }}>
          <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A45A", marginBottom: "4px" }}>MEIN KONTO</p>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1rem", color: "#FDFAF7", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayName}</p>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "11px 12px", borderRadius: "10px", marginBottom: "4px",
                textDecoration: "none",
                color: active ? "#C8A45A" : "rgba(253,250,247,0.55)",
                backgroundColor: active ? "rgba(200,164,90,0.1)" : "transparent",
                borderLeft: active ? "3px solid #C8A45A" : "3px solid transparent",
                fontSize: "13px", fontWeight: active ? 500 : 300,
                transition: "all 0.15s",
              }}>
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(200,164,90,0.15)" }}>
          <p style={{ fontSize: "11px", color: "rgba(253,250,247,0.35)", marginBottom: "2px", wordBreak: "break-all" }}>{user.email}</p>
          <button onClick={signOut} style={{
            marginTop: "10px", width: "100%", padding: "10px",
            background: "rgba(200,164,90,0.08)", border: "1px solid rgba(200,164,90,0.2)",
            borderRadius: "8px", color: "#C8A45A", fontSize: "12px", fontWeight: 500,
            cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase",
          }}>
            Abmelden
          </button>
        </div>
      </aside>

      {/* Content */}
      <main style={{ marginLeft: "240px", flex: 1, padding: "36px", overflowY: "auto" }}>
        {children}
      </main>

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:768px){aside{display:none}main{margin-left:0!important}}
      `}</style>
    </div>
  );
}
