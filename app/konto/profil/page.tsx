"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";

const inp = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #E2D9CE",
  borderRadius: "9px", fontSize: "14px", color: "#1A1A1A", outline: "none",
  boxSizing: "border-box" as const, background: "#FDFAF7", fontFamily: "inherit",
  transition: "border-color 0.2s",
};
const lbl = { display: "block" as const, fontSize: "11px", fontWeight: 600 as const, letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "#7A6548", marginBottom: "6px" };

export default function ProfilPage() {
  const { user, profile, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [telefon, setTelefon] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? "");
      setTelefon(profile.telefon ?? "");
    }
  }, [profile]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setProfileError("");
    const supabase = createClient();
    const { error } = await supabase.from("profiles").update({ name, telefon }).eq("id", user.id);
    setSaving(false);
    if (error) {
      setProfileError("Fehler beim Speichern. Bitte erneut versuchen.");
    } else {
      await refreshProfile();
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    if (pwNew !== pwConfirm) { setPwError("Die Passwörter stimmen nicht überein."); return; }
    if (pwNew.length < 6) { setPwError("Das Passwort muss mindestens 6 Zeichen lang sein."); return; }
    setPwSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: pwNew });
    setPwSaving(false);
    if (error) {
      setPwError("Fehler beim Ändern des Passworts.");
    } else {
      setPwSuccess(true);
      setPwCurrent(""); setPwNew(""); setPwConfirm("");
      setTimeout(() => setPwSuccess(false), 3000);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A45A", marginBottom: "8px" }}>MEIN KONTO</p>
        <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#1A1A1A", margin: 0 }}>Mein Profil</h1>
        <p style={{ fontSize: "14px", color: "#7A6548", marginTop: "8px", fontWeight: 300 }}>Persönliche Daten und Zugangsdaten verwalten.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }} className="profil-grid">

        {/* Profildaten */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "32px", border: "1px solid #EAE0D5" }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1A1A1A", marginBottom: "24px" }}>Persönliche Daten</h2>
          <form onSubmit={saveProfile} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={lbl}>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Max Mustermann" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>
            <div>
              <label style={lbl}>E-Mail</label>
              <input value={user?.email ?? ""} disabled style={{ ...inp, background: "#F5F0EB", color: "#A89070", cursor: "not-allowed" }} />
              <p style={{ fontSize: "11px", color: "#B0A090", marginTop: "4px", fontWeight: 300 }}>E-Mail kann nicht geändert werden.</p>
            </div>
            <div>
              <label style={lbl}>Telefon</label>
              <input value={telefon} onChange={e => setTelefon(e.target.value)} placeholder="0173 1234567" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>

            {profileError && (
              <div style={{ padding: "10px 14px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "9px", fontSize: "13px", color: "#B91C1C" }}>{profileError}</div>
            )}
            {profileSuccess && (
              <div style={{ padding: "10px 14px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "9px", fontSize: "13px", color: "#15803D" }}>✓ Profil gespeichert.</div>
            )}

            <button type="submit" disabled={saving} style={{
              padding: "12px", background: saving ? "#D5C5A8" : "linear-gradient(135deg,#B8860B,#C8A45A)",
              color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px",
              fontWeight: 600, cursor: saving ? "not-allowed" : "pointer",
            }}>
              {saving ? "Wird gespeichert…" : "Änderungen speichern"}
            </button>
          </form>
        </div>

        {/* Passwort */}
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "32px", border: "1px solid #EAE0D5" }}>
          <h2 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.2rem", color: "#1A1A1A", marginBottom: "24px" }}>Passwort ändern</h2>
          <form onSubmit={changePassword} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={lbl}>Aktuelles Passwort</label>
              <input type="password" value={pwCurrent} onChange={e => setPwCurrent(e.target.value)} placeholder="••••••••" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>
            <div>
              <label style={lbl}>Neues Passwort</label>
              <input type="password" value={pwNew} onChange={e => setPwNew(e.target.value)} placeholder="Mindestens 6 Zeichen" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>
            <div>
              <label style={lbl}>Passwort bestätigen</label>
              <input type="password" value={pwConfirm} onChange={e => setPwConfirm(e.target.value)} placeholder="••••••••" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>

            {pwError && (
              <div style={{ padding: "10px 14px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "9px", fontSize: "13px", color: "#B91C1C" }}>{pwError}</div>
            )}
            {pwSuccess && (
              <div style={{ padding: "10px 14px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "9px", fontSize: "13px", color: "#15803D" }}>✓ Passwort erfolgreich geändert.</div>
            )}

            <button type="submit" disabled={pwSaving} style={{
              padding: "12px", background: pwSaving ? "#D5C5A8" : "#1A1A1A",
              color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px",
              fontWeight: 600, cursor: pwSaving ? "not-allowed" : "pointer",
            }}>
              {pwSaving ? "Wird geändert…" : "Passwort ändern"}
            </button>
          </form>
        </div>
      </div>

      <style>{`@media(max-width:768px){.profil-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
