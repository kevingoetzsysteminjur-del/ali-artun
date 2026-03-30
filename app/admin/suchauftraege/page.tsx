"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type SearchRequest = {
  id: string;
  property_type: string;
  listing_type: string;
  region: string;
  budget_min: number;
  budget_max: number;
  min_rooms: number;
  min_area: number;
  email: string;
  status: string;
  created_at: string;
};

export default function SuchauftraegePage() {
  const [requests, setRequests] = useState<SearchRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const sb = createClient();
      const { data } = await sb.from("search_requests").select("*").order("created_at", { ascending: false });
      setRequests(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const sb = createClient();
    await sb.from("search_requests").update({ status }).eq("id", id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "6px" }}>ADMIN</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: "#2C1A0E", margin: 0 }}>Suchaufträge</h1>
      </div>

      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E8D9C5", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#7A6548" }}>Lädt…</div>
        ) : requests.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#A89070" }}>Noch keine Suchaufträge eingegangen.</div>
        ) : requests.map((r, i) => (
          <div key={r.id} style={{ padding: "20px", borderBottom: i < requests.length - 1 ? "1px solid #F5EDE0" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {r.property_type && <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "12px", background: "#F5EDE0", color: "#7A6548", border: "1px solid #E8D9C5" }}>{r.property_type}</span>}
                  {r.listing_type && <span style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "12px", background: "#F5EDE0", color: "#7A6548", border: "1px solid #E8D9C5" }}>{r.listing_type === "buy" ? "Kaufen" : "Mieten"}</span>}
                  <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: r.status === "neu" ? "rgba(184,134,11,0.1)" : "#F5EDE0", color: r.status === "neu" ? "#B8860B" : "#7A6548" }}>{r.status}</span>
                </div>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#7A6548" }}>
                  {r.region && <span>📍 {r.region}</span>}
                  {r.budget_max && <span>💰 bis {r.budget_max.toLocaleString("de-DE")} €</span>}
                  {r.min_rooms && <span>🛏 ab {r.min_rooms} Zimmer</span>}
                  {r.min_area && <span>📐 ab {r.min_area} m²</span>}
                </div>
                {r.email && <p style={{ fontSize: "12px", color: "#B8860B", marginTop: "8px" }}><a href={`mailto:${r.email}`} style={{ color: "#B8860B", textDecoration: "none" }}>{r.email}</a></p>}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "11px", color: "#A89070", marginBottom: "8px" }}>{new Date(r.created_at).toLocaleDateString("de-DE")}</p>
                <select
                  value={r.status}
                  onChange={e => updateStatus(r.id, e.target.value)}
                  style={{ padding: "6px 10px", border: "1px solid #E8D9C5", borderRadius: "8px", fontSize: "12px", color: "#7A6548", background: "#FFFCF7", cursor: "pointer" }}
                >
                  <option value="neu">Neu</option>
                  <option value="in bearbeitung">In Bearbeitung</option>
                  <option value="erledigt">Erledigt</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
