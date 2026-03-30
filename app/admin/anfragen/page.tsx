"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
};

const statusColor: Record<string, string> = {
  neu: "#B8860B",
  "in bearbeitung": "#7A8B3C",
  erledigt: "#A89070",
};

const statusBg: Record<string, string> = {
  neu: "rgba(184,134,11,0.1)",
  "in bearbeitung": "rgba(122,139,60,0.1)",
  erledigt: "rgba(168,144,112,0.1)",
};

export default function AnfragenPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState("alle");

  const load = async () => {
    const sb = createClient();
    const q = sb.from("contact_inquiries").select("*").order("created_at", { ascending: false });
    const { data } = await q;
    setInquiries(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const sb = createClient();
    await sb.from("contact_inquiries").update({ status }).eq("id", id);
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
  };

  const filtered = filter === "alle" ? inquiries : inquiries.filter(i => i.status === filter);

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "6px" }}>ADMIN</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: "#2C1A0E", margin: 0 }}>Kontaktanfragen</h1>
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["alle", "neu", "in bearbeitung", "erledigt"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", borderRadius: "20px", border: `1px solid ${filter === f ? "#B8860B" : "#E8D9C5"}`, background: filter === f ? "#B8860B" : "#fff", color: filter === f ? "#fff" : "#7A6548", fontSize: "12px", fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}>
            {f === "alle" ? "Alle" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 420px" : "1fr", gap: "16px" }}>
        {/* List */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E8D9C5", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#7A6548" }}>Lädt…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#A89070" }}>Keine Anfragen gefunden.</div>
          ) : filtered.map((inq, i) => (
            <div
              key={inq.id}
              onClick={() => setSelected(inq)}
              style={{ padding: "16px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #F5EDE0" : "none", cursor: "pointer", backgroundColor: selected?.id === inq.id ? "#FFFCF7" : "transparent", transition: "background 0.15s" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <p style={{ fontSize: "14px", color: "#2C1A0E", fontWeight: 500, margin: 0 }}>{inq.name}</p>
                    <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", backgroundColor: statusBg[inq.status] ?? "#F5EDE0", color: statusColor[inq.status] ?? "#7A6548", fontWeight: 500 }}>
                      {inq.status}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#7A6548", margin: "0 0 2px" }}>{inq.subject}</p>
                  <p style={{ fontSize: "11px", color: "#A89070", margin: 0 }}>{inq.email}</p>
                </div>
                <p style={{ fontSize: "11px", color: "#A89070", whiteSpace: "nowrap", margin: 0 }}>{new Date(inq.created_at).toLocaleDateString("de-DE")}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selected && (
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E8D9C5", padding: "24px", alignSelf: "start" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.1rem", color: "#2C1A0E", margin: 0 }}>{selected.name}</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#A89070", fontSize: "18px" }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {[["E-Mail", selected.email, `mailto:${selected.email}`], ["Telefon", selected.phone, `tel:${selected.phone?.replace(/\s/g, "")}`], ["Betreff", selected.subject, null], ["Datum", new Date(selected.created_at).toLocaleDateString("de-DE"), null]].map(([label, val, href]) => val && (
                <div key={label as string}>
                  <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#A89070", margin: "0 0 2px" }}>{label}</p>
                  {href ? <a href={href as string} style={{ fontSize: "13px", color: "#B8860B", textDecoration: "none" }}>{val}</a> : <p style={{ fontSize: "13px", color: "#2C1A0E", margin: 0 }}>{val}</p>}
                </div>
              ))}
            </div>
            {selected.message && (
              <div style={{ marginBottom: "20px", padding: "16px", background: "#FFFCF7", borderRadius: "10px", border: "1px solid #E8D9C5" }}>
                <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#A89070", margin: "0 0 8px" }}>Nachricht</p>
                <p style={{ fontSize: "13px", color: "#2C1A0E", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{selected.message}</p>
              </div>
            )}
            <div>
              <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#A89070", margin: "0 0 8px" }}>Status ändern</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["neu", "in bearbeitung", "erledigt"].map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} style={{ padding: "7px 14px", borderRadius: "20px", border: `1px solid ${selected.status === s ? "#B8860B" : "#E8D9C5"}`, background: selected.status === s ? "#B8860B" : "#fff", color: selected.status === s ? "#fff" : "#7A6548", fontSize: "12px", cursor: "pointer", textTransform: "capitalize" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
