"use client";
import { useState } from "react";

export default function PartnerForm() {
  const [form, setForm] = useState({ name: "", wohnort: "", alter: "", erfahrung: "Keine", nachricht: "" });
  const [sent, setSent] = useState(false);
  const up = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (sent) return (
    <div style={{ padding: "48px", backgroundColor: "#F5EDE0", borderRadius: "16px", textAlign: "center" }}>
      <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#D4A017", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <svg width="22" height="18" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 20"><polyline points="2 10 8 16 22 2"/></svg>
      </div>
      <p style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.3rem", color: "#2C1A0E", marginBottom: "8px" }}>Anfrage eingegangen!</p>
      <p style={{ fontSize: "14px", color: "#7A6548", fontWeight: 300 }}>Wir melden uns persönlich bei Ihnen.</p>
    </div>
  );

  const inp = { padding: "12px 16px", border: "1px solid #E8D9C5", borderRadius: "10px", fontSize: "14px", color: "#2C1A0E", outline: "none", width: "100%", fontFamily: "var(--font-inter, sans-serif)", fontWeight: 300, backgroundColor: "#fff" };
  const lbl = { fontSize: "11px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#7A6548", display: "block", marginBottom: "6px" };

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }} className="form-row">
        <div><label style={lbl}>Name</label><input style={inp} placeholder="Ihr Name" required value={form.name} onChange={(e) => up("name", e.target.value)} /></div>
        <div><label style={lbl}>Wohnort</label><input style={inp} placeholder="Stadt" value={form.wohnort} onChange={(e) => up("wohnort", e.target.value)} /></div>
        <div><label style={lbl}>Alter</label><input style={inp} placeholder="z. B. 35" value={form.alter} onChange={(e) => up("alter", e.target.value)} /></div>
      </div>
      <div>
        <label style={lbl}>Erfahrung in der Immobilienbranche</label>
        <select style={{ ...inp }} value={form.erfahrung} onChange={(e) => up("erfahrung", e.target.value)}>
          {["Keine", "Etwas", "Viel"].map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label style={lbl}>Kurze Nachricht (optional)</label>
        <textarea style={{ ...inp, resize: "vertical" }} rows={4} placeholder="Was motiviert Sie?" value={form.nachricht} onChange={(e) => up("nachricht", e.target.value)} />
      </div>
      <button type="submit"
        style={{ padding: "15px", backgroundColor: "#2C1A0E", color: "#fff", border: "none", borderRadius: "50px", fontSize: "14px", fontWeight: 500, cursor: "pointer", transition: "background 0.25s" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4A017")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2C1A0E")}>
        Anfrage absenden →
      </button>
      <style>{`@media(max-width:560px){.form-row{grid-template-columns:1fr!important;}}`}</style>
    </form>
  );
}
