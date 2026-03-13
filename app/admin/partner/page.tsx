"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ChevronDown, ChevronUp, Mail, MapPin } from "lucide-react";

type PartnerApp = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  location: string | null;
  experience: boolean;
  motivation: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

const DEMO_DATA: PartnerApp[] = [
  {
    id: "demo-1",
    name: "Stefan Weber",
    email: "s.weber@gmail.com",
    phone: "0172 456 789",
    location: "Heilbronn",
    experience: true,
    motivation:
      "Ich bin seit 5 Jahren als Finanzberater tätig und möchte mein Portfolio erweitern. Plan A Immobilien überzeugt mich durch den professionellen Ansatz.",
    status: "neu",
    admin_notes: null,
    created_at: "2026-03-13T08:00:00Z",
  },
  {
    id: "demo-2",
    name: "Ayse Yilmaz",
    email: "a.yilmaz@hotmail.com",
    phone: "0162 567 890",
    location: "Mannheim",
    experience: false,
    motivation:
      "Ich möchte im Immobilienbereich Fuß fassen und sehe Plan A als idealen Partner für meinen Einstieg.",
    status: "angenommen",
    admin_notes: null,
    created_at: "2026-03-08T11:30:00Z",
  },
];

const STATUS_OPTIONS = [
  { value: "neu", label: "Neu", color: "#92400e", bg: "#fef3c7" },
  { value: "angenommen", label: "Angenommen", color: "#166534", bg: "#dcfce7" },
  { value: "abgelehnt", label: "Abgelehnt", color: "#991b1b", bg: "#fee2e2" },
];

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AdminPartnerPage() {
  const [apps, setApps] = useState<PartnerApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("partner_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          setApps(DEMO_DATA);
          setIsDemo(true);
        } else {
          setApps(data);
          const notesMap: Record<string, string> = {};
          data.forEach((app: PartnerApp) => {
            notesMap[app.id] = app.admin_notes || "";
          });
          setNotes(notesMap);
        }
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (isDemo) {
      setApps((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
      return;
    }
    const supabase = createClient();
    await supabase
      .from("partner_applications")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const saveNotes = async (id: string) => {
    if (isDemo) return;
    setSavingNotes(id);
    const supabase = createClient();
    await supabase
      .from("partner_applications")
      .update({
        admin_notes: notes[id] || "",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
    setSavingNotes(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div
          className="w-8 h-8 rounded-full border-2 animate-spin"
          style={{ borderColor: "#C5A028", borderTopColor: "transparent" }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Partner-Bewerbungen
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          {apps.length} Bewerbung{apps.length !== 1 ? "en" : ""} gesamt
          {isDemo && (
            <span
              className="ml-2 px-2 py-0.5 rounded text-xs"
              style={{
                background: "rgba(197,160,40,0.1)",
                color: "#C5A028",
                border: "1px solid rgba(197,160,40,0.2)",
              }}
            >
              Demo-Daten
            </span>
          )}
        </p>
      </div>

      <div className="space-y-2">
        {apps.map((app) => {
          const statusCfg =
            STATUS_OPTIONS.find((s) => s.value === app.status) ||
            STATUS_OPTIONS[0];
          const isExpanded = expanded === app.id;

          return (
            <div
              key={app.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 px-5 py-3.5">
                <button
                  onClick={() => setExpanded(isExpanded ? null : app.id)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left bg-transparent border-none cursor-pointer"
                >
                  <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {app.name}
                      </span>
                      <span
                        style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}
                      >
                        {app.email}
                      </span>
                      {app.location && (
                        <span
                          className="flex items-center gap-1"
                          style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}
                        >
                          <MapPin size={10} />
                          {app.location}
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.3)",
                        marginTop: 2,
                      }}
                    >
                      {app.experience ? "Mit Erfahrung" : "Ohne Erfahrung"} ·{" "}
                      {formatDate(app.created_at)}
                    </p>
                  </div>
                </button>

                {/* Status dropdown */}
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                  className="text-xs rounded-lg px-2.5 py-1.5 border cursor-pointer"
                  style={{
                    background: statusCfg.bg + "20",
                    color: statusCfg.color,
                    borderColor: statusCfg.color + "40",
                    outline: "none",
                  }}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      style={{ background: "#1a1a2e", color: "#e5e7eb" }}
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>

                <a
                  href={`mailto:${app.email}?subject=Ihre Partner-Bewerbung bei Plan A Immobilien`}
                  title="E-Mail senden"
                  className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                  style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                >
                  <Mail size={14} />
                </a>
              </div>

              {/* Expanded */}
              {isExpanded && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="pt-4 space-y-4">
                    {app.motivation && (
                      <div>
                        <p
                          className="text-xs uppercase tracking-wide mb-2 font-medium"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          Motivation
                        </p>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.65)" }}
                        >
                          {app.motivation}
                        </p>
                      </div>
                    )}

                    {app.phone && (
                      <div>
                        <p
                          className="text-xs uppercase tracking-wide mb-1 font-medium"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          Telefon
                        </p>
                        <a
                          href={`tel:${app.phone}`}
                          style={{ color: "#C5A028", fontSize: 13 }}
                        >
                          {app.phone}
                        </a>
                      </div>
                    )}

                    {!isDemo && (
                      <div>
                        <p
                          className="text-xs uppercase tracking-wide mb-2 font-medium"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          Interne Notizen
                        </p>
                        <textarea
                          value={notes[app.id] || ""}
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [app.id]: e.target.value,
                            }))
                          }
                          rows={3}
                          placeholder="Notizen hinzufügen..."
                          className="w-full rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.7)",
                          }}
                        />
                        <button
                          onClick={() => saveNotes(app.id)}
                          disabled={savingNotes === app.id}
                          className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                          style={{
                            background: "rgba(197,160,40,0.15)",
                            color: "#C5A028",
                            border: "1px solid rgba(197,160,40,0.3)",
                          }}
                        >
                          {savingNotes === app.id
                            ? "Wird gespeichert..."
                            : "Notizen speichern"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
