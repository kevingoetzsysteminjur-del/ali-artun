"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { createClient } from "@/utils/supabase/client";

export default function AnmeldenPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError("E-Mail oder Passwort ist falsch.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: "#F5EDE0", minHeight: "100vh", paddingTop: "80px", paddingBottom: "80px", display: "flex", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "460px", margin: "0 auto", padding: "0 24px" }}>

          {/* Logo / Titel */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8860B", marginBottom: "12px" }}>ADMIN-BEREICH</p>
            <h1 style={{ fontFamily: "var(--font-dm-serif, serif)", fontSize: "2.2rem", color: "#2C1A0E", margin: 0 }}>Anmelden</h1>
          </div>

          {/* Card */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "40px", boxShadow: "0 10px 40px rgba(44,26,14,0.08)", border: "1px solid #E8D9C5" }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A6548", marginBottom: "8px" }}>
                  E-Mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="ihre@email.de"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "14px 18px", border: "1.5px solid #E8D9C5", borderRadius: "12px", fontSize: "14px", color: "#2C1A0E", outline: "none", boxSizing: "border-box", fontFamily: "var(--font-inter, sans-serif)", background: "#FFFCF7", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#B8860B"}
                  onBlur={e => e.target.style.borderColor = "#E8D9C5"}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7A6548", marginBottom: "8px" }}>
                  Passwort
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "14px 18px", border: "1.5px solid #E8D9C5", borderRadius: "12px", fontSize: "14px", color: "#2C1A0E", outline: "none", boxSizing: "border-box", fontFamily: "var(--font-inter, sans-serif)", background: "#FFFCF7", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#B8860B"}
                  onBlur={e => e.target.style.borderColor = "#E8D9C5"}
                />
              </div>

              {error && (
                <div style={{ padding: "12px 16px", backgroundColor: "rgba(160,82,45,0.08)", border: "1px solid rgba(160,82,45,0.2)", borderRadius: "10px", fontSize: "13px", color: "#A0522D" }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ padding: "15px 36px", background: loading ? "#ccc" : "linear-gradient(135deg, #B8860B, #D4A017)", color: "#fff", border: "none", borderRadius: "60px", fontSize: "13px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "all 400ms cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 4px 25px rgba(184,134,11,0.2)", fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {loading ? "Wird angemeldet..." : "Anmelden →"}
              </button>

            </form>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <a href="mailto:Info@plana-immobilien-finanzierung.com?subject=Passwort zurücksetzen" style={{ fontSize: "13px", color: "#B8860B", textDecoration: "none" }}>
                Passwort vergessen?
              </a>
            </div>
          </div>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "#A89070" }}>
            Nur für autorisierte Administratoren zugänglich.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
