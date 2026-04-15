"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

type MerkzettelItem = {
  id: string;
  property_id: string;
  created_at: string;
};

export default function MerkzettelPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<MerkzettelItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("merkzettel")
      .select("id, property_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("merkzettel").delete().eq("id", id);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  useEffect(() => { load(); }, [user]);

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A45A", marginBottom: "8px" }}>MEIN KONTO</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#1A1A1A", margin: 0 }}>Merkzettel</h1>
        <p style={{ fontSize: "14px", color: "#7A6548", marginTop: "8px", fontWeight: 300 }}>Ihre gespeicherten Immobilien.</p>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "3px solid #EAE0D5", borderTopColor: "#C8A45A", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : items.length === 0 ? (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "60px 32px", textAlign: "center", border: "1px solid #EAE0D5" }}>
          <svg width="40" height="40" fill="none" stroke="#D5C5A8" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block" }}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1A1A1A", marginBottom: "8px" }}>Noch keine Einträge</p>
          <p style={{ fontSize: "14px", color: "#A89070", fontWeight: 300 }}>Speichern Sie Immobilien mit dem Herz-Icon auf den Objektseiten.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map((item) => (
            <div key={item.id} style={{ background: "#FFFFFF", borderRadius: "14px", padding: "20px 24px", border: "1px solid #EAE0D5", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", backgroundColor: "#FBF5EC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" fill="none" stroke="#C8A45A" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", margin: "0 0 2px" }}>Objekt-ID: {item.property_id.slice(0, 8)}…</p>
                  <p style={{ fontSize: "12px", color: "#A89070", margin: 0, fontWeight: 300 }}>
                    Gespeichert am {new Date(item.created_at).toLocaleDateString("de-DE")}
                  </p>
                </div>
              </div>
              <button onClick={() => remove(item.id)} style={{
                padding: "8px 14px", background: "transparent", border: "1px solid #EAE0D5",
                borderRadius: "8px", fontSize: "12px", color: "#A89070", cursor: "pointer",
                transition: "all 0.2s", flexShrink: 0,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#FECACA"; e.currentTarget.style.color = "#B91C1C"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#EAE0D5"; e.currentTarget.style.color = "#A89070"; }}>
                Entfernen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
