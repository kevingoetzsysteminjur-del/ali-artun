"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { Save, Eye, EyeOff } from "lucide-react";

export default function ProfilPage() {
  const { user } = useAuth();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    // Load profile
    supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setName(data.full_name || "");
          setPhone(data.phone || "");
        } else {
          setName(user.user_metadata?.name || "");
          setPhone(user.user_metadata?.phone || "");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileError(null);
    setSaved(false);

    const { error } = await supabase.from("profiles").upsert({
      id: user!.id,
      full_name: name,
      phone,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      setProfileError("Fehler beim Speichern. Bitte versuchen Sie es erneut.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    setPwSaved(false);

    if (newPassword.length < 6) {
      setPwError("Das neue Passwort muss mindestens 6 Zeichen haben.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError("Passwörter stimmen nicht überein.");
      return;
    }

    setPwLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPwError("Fehler beim Ändern des Passworts.");
    } else {
      setPwSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSaved(false), 3000);
    }
    setPwLoading(false);
  };

  const inputClass =
    "w-full border border-stone-200 dark:border-stone-700 rounded-lg p-3 text-stone-900 dark:text-white bg-white dark:bg-stone-800 focus:outline-none focus:border-[#C5A028] focus:ring-1 focus:ring-[#C5A028]/30 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm";

  const labelClass =
    "block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5";

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1
          className="text-2xl text-stone-900 dark:text-white mb-1"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Profil bearbeiten
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          Aktualisieren Sie Ihre persönlichen Daten
        </p>
      </div>

      {/* Profile form */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-6">
        <h2 className="text-base font-semibold text-stone-900 dark:text-white mb-5">
          Persönliche Daten
        </h2>

        {profileError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {profileError}
            </p>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              Vollständiger Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Max Mustermann"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              E-Mail{" "}
              <span className="text-stone-400 font-normal">(nicht änderbar)</span>
            </label>
            <input
              id="email"
              type="email"
              value={user?.email || ""}
              disabled
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Telefon
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0176 123 456 78"
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)",
              }}
            >
              <Save size={15} />
              {loading ? "Wird gespeichert..." : "Speichern"}
            </button>

            {saved && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Gespeichert ✓
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Password change */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-6">
        <h2 className="text-base font-semibold text-stone-900 dark:text-white mb-5">
          Passwort ändern
        </h2>

        {pwError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{pwError}</p>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className={labelClass}>
              Neues Passwort{" "}
              <span className="text-stone-400 font-normal">(mind. 6 Zeichen)</span>
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPw ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowNewPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors bg-transparent border-none cursor-pointer"
              >
                {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Passwort bestätigen
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={pwLoading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)",
              }}
            >
              <Save size={15} />
              {pwLoading ? "Wird geändert..." : "Passwort ändern"}
            </button>

            {pwSaved && (
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                Passwort geändert ✓
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
