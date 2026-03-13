"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ChevronDown, ChevronUp, Mail, MessageCircle } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  type: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

const DEMO_DATA: Inquiry[] = [
  {
    id: "demo-1",
    name: "Klaus Hoffmann",
    email: "k.hoffmann@web.de",
    phone: "0176 234 567",
    message:
      "Ich möchte meine Immobilie in Mosbach bewerten lassen und mehr über den Verkaufsprozess erfahren.",
    type: "bewertung",
    status: "neu",
    admin_notes: null,
    created_at: "2026-03-12T10:30:00Z",
  },
  {
    id: "demo-2",
    name: "Renate Schmid",
    email: "r.schmid@gmx.de",
    phone: "0151 789 012",
    message:
      "Ich interessiere mich für eine Finanzierungsberatung für den Kauf einer Wohnung in der Region.",
    type: "finanzierung",
    status: "in_bearbeitung",
    admin_notes: null,
    created_at: "2026-03-11T14:15:00Z",
  },
  {
    id: "demo-3",
    name: "Dieter Müller",
    email: "d.mueller@t-online.de",
    phone: "07261 345 678",
    message: "Wann ist ein guter Zeitpunkt, mein Haus zu verkaufen?",
    type: "contact",
    status: "erledigt",
    admin_notes: null,
    created_at: "2026-03-10T09:00:00Z",
  },
];

const STATUS_OPTIONS = [
  { value: "neu", label: "Neu", color: "#92400e", bg: "#fef3c7" },
  {
    value: "in_bearbeitung",
    label: "In Bearbeitung",
    color: "#1d4ed8",
    bg: "#dbeafe",
  },
  { value: "erledigt", label: "Erledigt", color: "#166534", bg: "#dcfce7" },
];

const TYPE_LABELS: Record<string, string> = {
  contact: "Kontakt",
  bewertung: "Bewertung",
  finanzierung: "Finanzierung",
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export default function AdminAnfragenPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          setInquiries(DEMO_DATA);
          setIsDemo(true);
        } else {
          setInquiries(data);
          const notesMap: Record<string, string> = {};
          data.forEach((inq: Inquiry) => {
            notesMap[inq.id] = inq.admin_notes || "";
          });
          setNotes(notesMap);
        }
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (isDemo) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
      );
      return;
    }
    const supabase = createClient();
    await supabase
      .from("inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
  };

  const saveNotes = async (id: string) => {
    if (isDemo) return;
    setSavingNotes(id);
    const supabase = createClient();
    await supabase
      .from("inquiries")
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold mb-1"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Anfragen
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            {inquiries.length} Anfrage{inquiries.length !== 1 ? "n" : ""} gesamt
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
      </div>

      <div className="space-y-2">
        {inquiries.map((inq) => {
          const statusCfg =
            STATUS_OPTIONS.find((s) => s.value === inq.status) ||
            STATUS_OPTIONS[0];
          const isExpanded = expanded === inq.id;

          return (
            <div
              key={inq.id}
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 px-5 py-3.5">
                <button
                  onClick={() => setExpanded(isExpanded ? null : inq.id)}
                  className="flex items-center gap-3 flex-1 min-w-0 text-left bg-transparent border-none cursor-pointer"
                >
                  <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                    {isExpanded ? (
                      <ChevronUp size={15} />
                    ) : (
                      <ChevronDown size={15} />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className="text-sm font-medium truncate"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {inq.name}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {inq.email}
                      </span>
                      {inq.phone && (
                        <span
                          style={{
                            fontSize: 12,
                            color: "rgba(255,255,255,0.25)",
                          }}
                        >
                          {inq.phone}
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
                      {TYPE_LABELS[inq.type] || inq.type} ·{" "}
                      {formatDate(inq.created_at)}
                    </p>
                  </div>
                </button>

                {/* Status dropdown */}
                <select
                  value={inq.status}
                  onChange={(e) => updateStatus(inq.id, e.target.value)}
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

                {/* Action buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <a
                    href={`mailto:${inq.email}?subject=Re: Ihre Anfrage bei Plan A Immobilien`}
                    title="E-Mail antworten"
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                    style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                  >
                    <Mail size={14} />
                  </a>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hallo%20${encodeURIComponent(inq.name)}%2C%20hier%20ist%20Ali%20Artun%20von%20Plan%20A%20Immobilien.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp"
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10"
                      style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
                    >
                      <MessageCircle size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div
                  className="px-5 pb-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="pt-4 space-y-4">
                    <div>
                      <p
                        className="text-xs uppercase tracking-wide mb-2 font-medium"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Nachricht
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        {inq.message}
                      </p>
                    </div>

                    {!isDemo && (
                      <div>
                        <p
                          className="text-xs uppercase tracking-wide mb-2 font-medium"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          Interne Notizen
                        </p>
                        <textarea
                          value={notes[inq.id] || ""}
                          onChange={(e) =>
                            setNotes((prev) => ({
                              ...prev,
                              [inq.id]: e.target.value,
                            }))
                          }
                          rows={3}
                          placeholder="Notizen hinzufügen..."
                          className="w-full rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.7)",
                            lineHeight: 1.6,
                          }}
                        />
                        <button
                          onClick={() => saveNotes(inq.id)}
                          disabled={savingNotes === inq.id}
                          className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                          style={{
                            background: "rgba(197,160,40,0.15)",
                            color: "#C5A028",
                            border: "1px solid rgba(197,160,40,0.3)",
                          }}
                        >
                          {savingNotes === inq.id
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
