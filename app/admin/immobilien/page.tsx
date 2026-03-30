"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  property_type: string;
  listing_type: string;
  bedrooms: number;
  area_sqm: number;
  year_built: number;
  address: string;
  status: string;
  featured: boolean;
  created_at: string;
};

const emptyForm = { title: "", description: "", price: "", property_type: "EFH", listing_type: "sale", bedrooms: "", area_sqm: "", year_built: "", address: "", status: "active", featured: false };

export default function ImmobilienPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const sb = createClient();
    const { data } = await sb.from("properties").select("*").order("created_at", { ascending: false });
    setProperties(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(emptyForm); setShowForm(true); };
  const openEdit = (p: Property) => {
    setEditing(p);
    setForm({ title: p.title ?? "", description: p.description ?? "", price: String(p.price ?? ""), property_type: p.property_type ?? "EFH", listing_type: p.listing_type ?? "sale", bedrooms: String(p.bedrooms ?? ""), area_sqm: String(p.area_sqm ?? ""), year_built: String(p.year_built ?? ""), address: p.address ?? "", status: p.status ?? "active", featured: p.featured ?? false });
    setShowForm(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const sb = createClient();
    const payload = { title: form.title, description: form.description, price: Number(form.price) || null, property_type: form.property_type, listing_type: form.listing_type, bedrooms: Number(form.bedrooms) || null, area_sqm: Number(form.area_sqm) || null, year_built: Number(form.year_built) || null, address: form.address, status: form.status, featured: form.featured };
    if (editing) {
      await sb.from("properties").update(payload).eq("id", editing.id);
    } else {
      await sb.from("properties").insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Objekt wirklich löschen?")) return;
    const sb = createClient();
    await sb.from("properties").delete().eq("id", id);
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const statusLabel: Record<string, string> = { active: "Aktiv", sold: "Verkauft", rented: "Vermietet" };
  const inp = { width: "100%", padding: "12px 16px", border: "1.5px solid #E8D9C5", borderRadius: "10px", fontSize: "14px", color: "#2C1A0E", outline: "none", boxSizing: "border-box" as const, fontFamily: "var(--font-inter, sans-serif)", background: "#FFFCF7" };
  const lbl = { fontSize: "11px", fontWeight: 500 as const, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "#7A6548", display: "block" as const, marginBottom: "6px" };

  return (
    <div>
      <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "6px" }}>ADMIN</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2rem", color: "#2C1A0E", margin: 0 }}>Immobilien</h1>
        </div>
        <button onClick={openNew} style={{ padding: "12px 24px", background: "linear-gradient(135deg,#B8860B,#D4A017)", color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px", fontWeight: 500, cursor: "pointer", letterSpacing: "0.05em" }}>
          + Neues Objekt
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(44,26,14,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ background: "#fff", borderRadius: "20px", padding: "32px", maxWidth: "640px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#2C1A0E", margin: 0 }}>{editing ? "Objekt bearbeiten" : "Neues Objekt"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#A89070" }}>×</button>
            </div>
            <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div><label style={lbl}>Titel *</label><input style={inp} required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><label style={lbl}>Beschreibung</label><textarea style={{ ...inp, resize: "vertical" }} rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div><label style={lbl}>Preis (€)</label><input style={inp} type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                <div><label style={lbl}>Typ</label>
                  <select style={inp} value={form.property_type} onChange={e => setForm(f => ({ ...f, property_type: e.target.value }))}>
                    {["EFH", "ETW", "MFH", "Gewerbe", "Grundstück"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Angebot</label>
                  <select style={inp} value={form.listing_type} onChange={e => setForm(f => ({ ...f, listing_type: e.target.value }))}>
                    <option value="sale">Kaufen</option>
                    <option value="rent">Mieten</option>
                  </select>
                </div>
                <div><label style={lbl}>Status</label>
                  <select style={inp} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="active">Aktiv</option>
                    <option value="sold">Verkauft</option>
                    <option value="rented">Vermietet</option>
                  </select>
                </div>
                <div><label style={lbl}>Zimmer</label><input style={inp} type="number" value={form.bedrooms} onChange={e => setForm(f => ({ ...f, bedrooms: e.target.value }))} /></div>
                <div><label style={lbl}>Fläche (m²)</label><input style={inp} type="number" value={form.area_sqm} onChange={e => setForm(f => ({ ...f, area_sqm: e.target.value }))} /></div>
                <div><label style={lbl}>Baujahr</label><input style={inp} type="number" value={form.year_built} onChange={e => setForm(f => ({ ...f, year_built: e.target.value }))} /></div>
              </div>
              <div><label style={lbl}>Adresse</label><input style={inp} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} /></div>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#7A6548", cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} />
                Auf Startseite hervorheben (featured)
              </label>
              <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "8px" }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: "12px 24px", background: "transparent", border: "1.5px solid #E8D9C5", borderRadius: "50px", fontSize: "13px", color: "#7A6548", cursor: "pointer" }}>Abbrechen</button>
                <button type="submit" disabled={saving} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#B8860B,#D4A017)", color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}>
                  {saving ? "Speichert…" : "Speichern"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E8D9C5", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#7A6548" }}>Lädt…</div>
        ) : properties.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#A89070" }}>
            <p style={{ marginBottom: "16px" }}>Noch keine Immobilien vorhanden.</p>
            <button onClick={openNew} style={{ padding: "10px 20px", background: "#B8860B", color: "#fff", border: "none", borderRadius: "30px", fontSize: "13px", cursor: "pointer" }}>Erstes Objekt anlegen</button>
          </div>
        ) : properties.map((p, i) => (
          <div key={p.id} style={{ padding: "16px 20px", borderBottom: i < properties.length - 1 ? "1px solid #F5EDE0" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <p style={{ fontSize: "14px", color: "#2C1A0E", fontWeight: 500, margin: 0 }}>{p.title}</p>
                <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: p.status === "active" ? "rgba(122,139,60,0.1)" : "#F5EDE0", color: p.status === "active" ? "#7A8B3C" : "#7A6548" }}>
                  {statusLabel[p.status] ?? p.status}
                </span>
                {p.featured && <span style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "10px", background: "rgba(184,134,11,0.1)", color: "#B8860B" }}>Featured</span>}
              </div>
              <p style={{ fontSize: "12px", color: "#7A6548", margin: 0 }}>
                {p.property_type} · {p.listing_type === "sale" ? "Kauf" : "Miete"}{p.price ? ` · ${p.price.toLocaleString("de-DE")} €` : ""}{p.area_sqm ? ` · ${p.area_sqm} m²` : ""}
              </p>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => openEdit(p)} style={{ padding: "7px 14px", background: "#F5EDE0", border: "1px solid #E8D9C5", borderRadius: "8px", fontSize: "12px", color: "#7A6548", cursor: "pointer" }}>Bearbeiten</button>
              <button onClick={() => del(p.id)} style={{ padding: "7px 14px", background: "rgba(160,82,45,0.08)", border: "1px solid rgba(160,82,45,0.2)", borderRadius: "8px", fontSize: "12px", color: "#A0522D", cursor: "pointer" }}>Löschen</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
