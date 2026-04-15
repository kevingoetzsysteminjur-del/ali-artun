"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inp = {
    width: "100%", padding: "13px 16px", border: "1.5px solid #E2D9CE",
    borderRadius: "10px", fontSize: "15px", color: "#1A1A1A", outline: "none",
    boxSizing: "border-box" as const, background: "#FDFAF7", fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("E-Mail oder Passwort ist falsch.");
      setLoading(false);
      return;
    }
    // Rolle prüfen → Admin oder Kunde
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("email", email)
      .single();
    if (profile?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/konto");
    }
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#F5F0EB", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Link href="/">
            <Image src="/images/plan-a-logo.png" alt="Plan A" width={160} height={70}
              style={{ height: "48px", width: "auto", objectFit: "contain" }} />
          </Link>
          <p style={{ fontSize: "13px", color: "#7A6548", marginTop: "12px", fontWeight: 300 }}>
            Ihr persönlicher Bereich
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "#FFFFFF", borderRadius: "20px", padding: "40px", boxShadow: "0 8px 40px rgba(0,0,0,0.07)", border: "1px solid #EAE0D5" }}>
          <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "1.8rem", color: "#1A1A1A", marginBottom: "8px", textAlign: "center" }}>
            Anmelden
          </h1>
          <p style={{ fontSize: "13px", color: "#A89070", textAlign: "center", marginBottom: "28px", fontWeight: 300 }}>
            Willkommen zurück bei Plan A Immobilien
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A6548", marginBottom: "7px" }}>
                E-Mail
              </label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ihre@email.de" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7A6548", marginBottom: "7px" }}>
                Passwort
              </label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" style={inp}
                onFocus={e => e.currentTarget.style.borderColor = "#C8A45A"}
                onBlur={e => e.currentTarget.style.borderColor = "#E2D9CE"} />
            </div>

            {error && (
              <div style={{ padding: "11px 14px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "9px", fontSize: "13px", color: "#B91C1C" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: "14px", background: loading ? "#D5C5A8" : "linear-gradient(135deg,#B8860B,#C8A45A)",
              color: "#fff", border: "none", borderRadius: "50px", fontSize: "13px", fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 20px rgba(184,134,11,0.25)", transition: "all 0.3s",
            }}>
              {loading ? "Wird angemeldet…" : "Anmelden →"}
            </button>
          </form>

          <div style={{ borderTop: "1px solid #EAE0D5", marginTop: "24px", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/registrieren" style={{ fontSize: "13px", color: "#C8A45A", textDecoration: "none", fontWeight: 500 }}>
              Konto erstellen
            </Link>
            <Link href="/passwort-vergessen" style={{ fontSize: "13px", color: "#A89070", textDecoration: "none" }}>
              Passwort vergessen?
            </Link>
          </div>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "12px", color: "#B0A090" }}>
          <Link href="/" style={{ color: "#C8A45A", textDecoration: "none" }}>← Zurück zur Startseite</Link>
        </p>
      </div>
    </main>
  );
}
