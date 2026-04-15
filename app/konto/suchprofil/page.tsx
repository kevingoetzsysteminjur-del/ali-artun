"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

type SearchProfile = {
  id: string;
  property_type: string | null;
  listing_type: string | null;
  region: string | null;
  budget_min: number | null;
  budget_max: number | null;
  min_rooms: number | null;
  min_area: number | null;
  email: string | null;
  status: string;
  created_at: string;
};

const TYPEN = ["Eigentumswohnung", "Einfamilienhaus", "Mehrfamilienhaus", "Grundstück", "Gewerbe"];

const inp = {
  width: "100%", padding: "11px 14px", border: "1.5px solid #E2D9CE",
  borderRadius: "9px", fontSize: "14px", color: "#1A1A1A", outline: "none",
  boxSizing: "border-box" as const, background: "#FDFAF7", fontFamily: "inherit",
};
const lbl = { display: "block" as const, fontSize: "11px", fontWeight: 600 as const, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#7A6548", marginBottom: "6px" };

export default function SuchprofilPage() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<SearchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [typ, setTyp] = useState("");
  const [region, setRegion] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [zimmer, setZimmer] = useState("");
  const [flaeche, setFlaeche] = useState("");

  const load = async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from("search_requests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setProfiles(data ?? []);
    setLoading(false);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from("search_requests").insert({
      user_id: user.id,
      property_type: typ || null,
      region: region || null,
      budget_min: budgetMin ? Number(budgetMin) : null,
      budget_max: budgetMax ? Number(budgetMax) : null,
      min_rooms: zimmer ? Number(zimmer) : null,
      min_area: flaeche ? Number(flaeche) : null,
      email: user.email,
      status: "neu",
    });
    setSaving(false);
    setSuccess(true);
    setShowForm(false);
    setTyp(""); setRegion(""); setBudgetMin(""); setBudgetMax(""); setZimmer(""); setFlaeche("");
    setTimeout(() => setSuccess(false), 3000);
    await load();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    await supabase.from("search_requests").delete().eq("id", id);
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => { load(); }, [user]);

  return (
    <div>
      <div style={{ marginBottom: "32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A45A", marginBottom: "8px" }}>MEIN KONTO</p>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#1A1A1A", margin: 0 }}>Suchprofil</h1>
          <p style={{ fontSize: "14px", color: "#7A6548", marginTop: "8px", fontWeight: 300 }}>Hinterlegen Sie Ihre Wünsche — wir informieren Sie bei passenden Objekten.</p>
        </div>
        <button onClick={() => setShowForm(v => !v)} style={{
          padding: "11px 22px", background: "linear-gradient(135deg,#B8860B,#C8A45A)",
          color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px",
          fontWeight: 600, cursor: "pointer", letterSpacing: "0.04em", flexShrink: 0,
        }}>
          {showForm ? "Abbrechen" : "+ Neues Suchprofil"}
        </button>
      </div>

      {success && (
        <div style={{ padding: "12px 16px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "10px", fontSize: "13px", color: "#15803D", marginBottom: "20px" }}>
          ✓ Suchprofil gespeichert. Ein Plan A Berater meldet sich bei passenden Objekten.
        </div>
      )}

      {/* Formular */}
      {showForm && (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "32px", border: "1px solid #EAE0D5", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#1A1A1A", marginBottom: "24px" }}>Neues Suchprofil anlegen</h2>
          <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="sp-grid">
              <div>
                <label style={lbl}>Immobilientyp</label>
                <select value={typ} onChange={e => setTyp(e.target.value)} style={inp}>
                  <option value="">Alle Typen</option>
                  {TYPEN.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Region / Ort</label>
                <input value={region} onChange={e => setRegion(e.target.value)} placeholder="z. B. Mosbach, Heidelberg" style={inp} />
              </div>
              <div>
                <label style={lbl}>Budget von (€)</label>
                <input type="number" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} placeholder="z. B. 150000" style={inp} />
              </div>
              <div>
                <label style={lbl}>Budget bis (€)</label>
                <input type="number" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} placeholder="z. B. 400000" style={inp} />
              </div>
              <div>
                <label style={lbl}>Mindest-Zimmer</label>
                <input type="number" min={1} max={10} value={zimmer} onChange={e => setZimmer(e.target.value)} placeholder="z. B. 3" style={inp} />
              </div>
              <div>
                <label style={lbl}>Mindest-Fläche (m²)</label>
                <input type="number" value={flaeche} onChange={e => setFlaeche(e.target.value)} placeholder="z. B. 80" style={inp} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={saving} style={{
                padding: "12px 28px", background: saving ? "#D5C5A8" : "linear-gradient(135deg,#B8860B,#C8A45A)",
                color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px",
                fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
              }}>
                {saving ? "Wird gespeichert…" : "Suchprofil speichern"}
              </button>
            </div>
          </form>
          <style>{`@media(max-width:560px){.sp-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "3px solid #EAE0D5", borderTopColor: "#C8A45A", animation: "spin 0.8s linear infinite" }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : profiles.length === 0 ? (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "60px 32px", textAlign: "center", border: "1px solid #EAE0D5" }}>
          <svg width="40" height="40" fill="none" stroke="#D5C5A8" strokeWidth="1.5" viewBox="0 0 24 24" style={{ margin: "0 auto 16px", display: "block" }}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1A1A1A", marginBottom: "8px" }}>Noch kein Suchprofil</p>
          <p style={{ fontSize: "14px", color: "#A89070", fontWeight: 300 }}>Legen Sie ein Suchprofil an und wir melden uns bei passenden Objekten.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {profiles.map((p) => (
            <div key={p.id} style={{ background: "#FFFFFF", borderRadius: "14px", padding: "20px 24px", border: "1px solid #EAE0D5" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A1A", marginBottom: "10px" }}>
                    {p.property_type || "Alle Typen"} {p.region ? `· ${p.region}` : ""}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {p.budget_min && <span style={{ fontSize: "12px", padding: "4px 10px", background: "#FBF5EC", borderRadius: "50px", color: "#7A6548" }}>ab {p.budget_min.toLocaleString("de-DE")} €</span>}
                    {p.budget_max && <span style={{ fontSize: "12px", padding: "4px 10px", background: "#FBF5EC", borderRadius: "50px", color: "#7A6548" }}>bis {p.budget_max.toLocaleString("de-DE")} €</span>}
                    {p.min_rooms && <span style={{ fontSize: "12px", padding: "4px 10px", background: "#FBF5EC", borderRadius: "50px", color: "#7A6548" }}>min. {p.min_rooms} Zi.</span>}
                    {p.min_area && <span style={{ fontSize: "12px", padding: "4px 10px", background: "#FBF5EC", borderRadius: "50px", color: "#7A6548" }}>min. {p.min_area} m²</span>}
                  </div>
                  <p style={{ fontSize: "11px", color: "#B0A090", marginTop: "10px", fontWeight: 300 }}>
                    Erstellt am {new Date(p.created_at).toLocaleDateString("de-DE")} · Status: {p.status}
                  </p>
                </div>
                <button onClick={() => remove(p.id)} style={{
                  padding: "8px 14px", background: "transparent", border: "1px solid #EAE0D5",
                  borderRadius: "8px", fontSize: "12px", color: "#A89070", cursor: "pointer", flexShrink: 0,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#FECACA"; e.currentTarget.style.color = "#B91C1C"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#EAE0D5"; e.currentTarget.style.color = "#A89070"; }}>
                  Löschen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
