"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function PasswortVergessenPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/konto/profil`,
    });

    if (error) {
      setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-stone-200 dark:border-stone-700 rounded-lg p-3 text-stone-900 dark:text-white bg-white dark:bg-stone-800 focus:outline-none focus:border-[#C5A028] focus:ring-1 focus:ring-[#C5A028]/30 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500 text-base";

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="/">
            <Image
              src="/logo.png"
              alt="Plan A Immobilien"
              width={160}
              height={48}
              className="h-12 w-auto object-contain"
            />
          </a>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800 p-8">
          {success ? (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(197,160,40,0.1)" }}
              >
                <span style={{ fontSize: 28 }}>✉</span>
              </div>
              <h2
                className="text-xl text-stone-900 dark:text-white mb-3"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
              >
                E-Mail gesendet
              </h2>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6">
                Reset-Email wurde gesendet. Bitte prüfen Sie Ihren Posteingang
                und klicken Sie auf den Link zum Zurücksetzen Ihres Passworts.
              </p>
              <a
                href="/anmelden"
                className="text-[#C5A028] hover:text-[#b8940a] font-medium text-sm transition-colors"
              >
                Zur Anmeldung →
              </a>
            </div>
          ) : (
            <>
              <h1
                className="text-2xl text-stone-900 dark:text-white mb-1"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
              >
                Passwort vergessen?
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm mb-7">
                Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link
                zum Zurücksetzen Ihres Passworts.
              </p>

              {error && (
                <div className="mb-5 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5"
                  >
                    E-Mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ihre@email.de"
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: loading
                      ? "#b8a050"
                      : "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)",
                    boxShadow: loading
                      ? "none"
                      : "0 2px 12px rgba(197,160,40,0.25)",
                  }}
                >
                  {loading ? "Wird gesendet..." : "Link senden"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Passwort erinnerlich?{" "}
                  <a
                    href="/anmelden"
                    className="text-[#C5A028] hover:text-[#b8940a] font-medium transition-colors"
                  >
                    Anmelden
                  </a>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
          >
            ← Zurück zur Website
          </a>
        </div>
      </div>
    </div>
  );
}
