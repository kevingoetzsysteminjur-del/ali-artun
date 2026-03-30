"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

const ADMIN_EMAIL = "Info@plana-immobilien-finanzierung.com";

type Stats = { anfragen: number; immobilien: number; suchauftraege: number; neue_anfragen: number };

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ anfragen: 0, immobilien: 0, suchauftraege: 0, neue_anfragen: 0 });
  const [recent, setRecent] = useState<{ name: string; subject: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const sb = createClient();
      const [{ count: anfragen }, { count: neue }, { count: immo }, { count: such }, { data: lastAnfragen }] = await Promise.all([
        sb.from("contact_inquiries").select("*", { count: "exact", head: true }),
        sb.from("contact_inquiries").select("*", { count: "exact", head: true }).eq("status", "neu"),
        sb.from("properties").select("*", { count: "exact", head: true }),
        sb.from("search_requests").select("*", { count: "exact", head: true }),
        sb.from("contact_inquiries").select("name,subject,created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({ anfragen: anfragen ?? 0, neue_anfragen: neue ?? 0, immobilien: immo ?? 0, suchauftraege: such ?? 0 });
      setRecent(lastAnfragen ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const cards = [
    { label: "Neue Anfragen", value: stats.neue_anfragen, icon: "🔔", href: "/admin/anfragen", accent: true },
    { label: "Alle Anfragen", value: stats.anfragen, icon: "✉️", href: "/admin/anfragen" },
    { label: "Immobilien", value: stats.immobilien, icon: "🏠", href: "/admin/immobilien" },
    { label: "Suchaufträge", value: stats.suchauftraege, icon: "🔍", href: "/admin/suchauftraege" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "6px" }}>ADMIN</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: "#2C1A0E", margin: 0 }}>Dashboard</h1>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "32px" }}>
        {cards.map((c) => (
          <Link key={c.label} href={c.href} style={{ textDecoration: "none" }}>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: `1px solid ${c.accent ? "#B8860B" : "#E8D9C5"}`, boxShadow: c.accent ? "0 4px 20px rgba(184,134,11,0.12)" : "0 2px 8px rgba(44,26,14,0.04)", transition: "all 0.2s", cursor: "pointer" }}>
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>{c.icon}</div>
              <div style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: c.accent ? "#B8860B" : "#2C1A0E", lineHeight: 1 }}>
                {loading ? "–" : c.value}
              </div>
              <div style={{ fontSize: "12px", color: "#7A6548", marginTop: "6px" }}>{c.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E8D9C5", overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #E8D9C5", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#2C1A0E", margin: 0 }}>Letzte Kontaktanfragen</h2>
          <Link href="/admin/anfragen" style={{ fontSize: "12px", color: "#B8860B", textDecoration: "none" }}>Alle ansehen →</Link>
        </div>
        {loading ? (
          <div style={{ padding: "32px", textAlign: "center", color: "#7A6548", fontSize: "14px" }}>Lädt…</div>
        ) : recent.length === 0 ? (
          <div style={{ padding: "32px", textAlign: "center", color: "#A89070", fontSize: "14px" }}>Noch keine Anfragen vorhanden.</div>
        ) : (
          <div>
            {recent.map((r, i) => (
              <div key={i} style={{ padding: "16px 24px", borderBottom: i < recent.length - 1 ? "1px solid #F5EDE0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "14px", color: "#2C1A0E", fontWeight: 400, margin: "0 0 2px" }}>{r.name}</p>
                  <p style={{ fontSize: "12px", color: "#7A6548", margin: 0 }}>{r.subject}</p>
                </div>
                <p style={{ fontSize: "11px", color: "#A89070", margin: 0 }}>
                  {new Date(r.created_at).toLocaleDateString("de-DE")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`@media(max-width:900px){div[style*="grid-template-columns: repeat(4"]{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}
