"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";
import {
  MessageSquare, Clock, CheckCircle, Loader,
  ChevronDown, ChevronUp, Mail, MessageCircle,
} from "lucide-react";

const ADMIN_EMAIL = "info@plana-immobilien-finanzierung.com";

// ── Shared types ─────────────────────────────────────────────────────────────

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

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(dateStr));
}

const TYPE_LABELS: Record<string, string> = {
  contact: "Kontakt",
  bewertung: "Bewertung",
  finanzierung: "Finanzierung",
};

// ── Admin view ───────────────────────────────────────────────────────────────

const ADMIN_STATUS_OPTIONS = [
  { value: "neu", label: "Neu", color: "#92400e", bg: "#fef3c7" },
  { value: "in_bearbeitung", label: "In Bearbeitung", color: "#1d4ed8", bg: "#dbeafe" },
  { value: "erledigt", label: "Erledigt", color: "#166534", bg: "#dcfce7" },
];

const DEMO_DATA: Inquiry[] = [
  { id: "demo-1", name: "Klaus Hoffmann", email: "k.hoffmann@web.de", phone: "0176 234 567", message: "Ich möchte meine Immobilie in Mosbach bewerten lassen.", type: "bewertung", status: "neu", admin_notes: null, created_at: "2026-03-12T10:30:00Z" },
  { id: "demo-2", name: "Renate Schmid", email: "r.schmid@gmx.de", phone: "0151 789 012", message: "Ich interessiere mich für eine Finanzierungsberatung.", type: "finanzierung", status: "in_bearbeitung", admin_notes: null, created_at: "2026-03-11T14:15:00Z" },
  { id: "demo-3", name: "Dieter Müller", email: "d.mueller@t-online.de", phone: "07261 345 678", message: "Wann ist ein guter Zeitpunkt, mein Haus zu verkaufen?", type: "contact", status: "erledigt", admin_notes: null, created_at: "2026-03-10T09:00:00Z" },
];

function AdminAnfragenView() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savingNotes, setSavingNotes] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const [filterStatus, setFilterStatus] = useState("alle");
  const [filterType, setFilterType] = useState("alle");

  useEffect(() => {
    createClient()
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) { setInquiries(DEMO_DATA); setIsDemo(true); }
        else {
          setInquiries(data);
          const map: Record<string, string> = {};
          data.forEach((i: Inquiry) => { map[i.id] = i.admin_notes || ""; });
          setNotes(map);
        }
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (isDemo) { setInquiries((p) => p.map((i) => i.id === id ? { ...i, status } : i)); return; }
    await createClient().from("inquiries").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    setInquiries((p) => p.map((i) => i.id === id ? { ...i, status } : i));
  };

  const saveNotes = async (id: string) => {
    if (isDemo) return;
    setSavingNotes(id);
    await createClient().from("inquiries").update({ admin_notes: notes[id] || "", updated_at: new Date().toISOString() }).eq("id", id);
    setSavingNotes(null);
  };

  const filtered = inquiries.filter((i) => {
    if (filterStatus !== "alle" && i.status !== filterStatus) return false;
    if (filterType !== "alle" && i.type !== filterType) return false;
    return true;
  });

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#C5A028", borderTopColor: "transparent" }} /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.9)" }}>Anfragen</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            {inquiries.length} Anfrage{inquiries.length !== 1 ? "n" : ""} gesamt
            {isDemo && <span className="ml-2 px-2 py-0.5 rounded text-xs" style={{ background: "rgba(197,160,40,0.1)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.2)" }}>Demo-Daten</span>}
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex items-center gap-1.5">
          {[
            { value: "alle", label: "Alle" },
            { value: "neu", label: "Neu", dot: "#92400e" },
            { value: "in_bearbeitung", label: "In Bearbeitung", dot: "#1d4ed8" },
            { value: "erledigt", label: "Erledigt", dot: "#166534" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterStatus(opt.value)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: filterStatus === opt.value ? "rgba(197,160,40,0.15)" : "rgba(255,255,255,0.05)", color: filterStatus === opt.value ? "#C5A028" : "rgba(255,255,255,0.45)", border: `1px solid ${filterStatus === opt.value ? "rgba(197,160,40,0.3)" : "rgba(255,255,255,0.08)"}`, cursor: "pointer" }}
            >
              {"dot" in opt && opt.dot && <span className="inline-block w-2 h-2 rounded-full" style={{ background: opt.dot }} />}
              {opt.label}
              {opt.value !== "alle" && <span style={{ opacity: 0.6 }}>({inquiries.filter((i) => i.status === opt.value).length})</span>}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 border" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)", outline: "none", cursor: "pointer" }}>
            <option value="alle" style={{ background: "#1a1a2e" }}>Alle Typen</option>
            <option value="contact" style={{ background: "#1a1a2e" }}>Kontakt</option>
            <option value="bewertung" style={{ background: "#1a1a2e" }}>Bewertung</option>
            <option value="finanzierung" style={{ background: "#1a1a2e" }}>Finanzierung</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && <div className="text-center py-10" style={{ color: "rgba(255,255,255,0.25)", fontSize: 13 }}>Keine Anfragen für diesen Filter.</div>}
        {filtered.map((inq) => {
          const statusCfg = ADMIN_STATUS_OPTIONS.find((s) => s.value === inq.status) || ADMIN_STATUS_OPTIONS[0];
          const isExpanded = expanded === inq.id;
          return (
            <div key={inq.id} className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <button onClick={() => setExpanded(isExpanded ? null : inq.id)} className="flex items-center gap-3 flex-1 min-w-0 text-left bg-transparent border-none cursor-pointer">
                  <span style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{inq.name}</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{inq.email}</span>
                      {inq.phone && <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{inq.phone}</span>}
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{TYPE_LABELS[inq.type] || inq.type} · {formatDate(inq.created_at)}</p>
                  </div>
                </button>
                <select value={inq.status} onChange={(e) => updateStatus(inq.id, e.target.value)} className="text-xs rounded-lg px-2.5 py-1.5 border cursor-pointer" style={{ background: statusCfg.bg + "20", color: statusCfg.color, borderColor: statusCfg.color + "40", outline: "none" }}>
                  {ADMIN_STATUS_OPTIONS.map((opt) => <option key={opt.value} value={opt.value} style={{ background: "#1a1a2e", color: "#e5e7eb" }}>{opt.label}</option>)}
                </select>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <a href={`mailto:${inq.email}?subject=Re: Ihre Anfrage bei Plan A Immobilien`} title="E-Mail" className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}><Mail size={14} /></a>
                  {inq.phone && <a href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hallo%20${encodeURIComponent(inq.name)}%2C%20hier%20ist%20Ali%20Artun%20von%20Plan%20A%20Immobilien.`} target="_blank" rel="noopener noreferrer" title="WhatsApp" className="flex items-center justify-center w-8 h-8 rounded-lg transition-all hover:bg-white/10" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}><MessageCircle size={14} /></a>}
                </div>
              </div>
              {isExpanded && (
                <div className="px-5 pb-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="pt-4 space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide mb-2 font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>Nachricht</p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{inq.message}</p>
                    </div>
                    {!isDemo && (
                      <div>
                        <p className="text-xs uppercase tracking-wide mb-2 font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>Interne Notizen</p>
                        <textarea value={notes[inq.id] || ""} onChange={(e) => setNotes((p) => ({ ...p, [inq.id]: e.target.value }))} rows={3} placeholder="Notizen hinzufügen..." className="w-full rounded-lg px-3 py-2 text-sm resize-none focus:outline-none" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }} />
                        <button onClick={() => saveNotes(inq.id)} disabled={savingNotes === inq.id} className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50" style={{ background: "rgba(197,160,40,0.15)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.3)", cursor: "pointer" }}>
                          {savingNotes === inq.id ? "Wird gespeichert..." : "Notizen speichern"}
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

// ── User view ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ComponentType<{ size: number }> }> = {
  neu: { label: "Neu", color: "#92400e", bg: "#fef3c7", icon: Clock },
  in_bearbeitung: { label: "In Bearbeitung", color: "#1e40af", bg: "#dbeafe", icon: Loader },
  erledigt: { label: "Erledigt", color: "#166534", bg: "#dcfce7", icon: CheckCircle },
};

function UserAnfragenView() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    createClient()
      .from("inquiries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setInquiries(data || []); setLoading(false); });
  }, [user]);

  const formatDateShort = (d: string) => new Intl.DateTimeFormat("de-DE").format(new Date(d));

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl text-stone-900 dark:text-white mb-1" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>Meine Anfragen</h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm">Alle Ihre Kontaktanfragen und deren aktueller Bearbeitungsstand</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16"><div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#C5A028", borderTopColor: "transparent" }} /></div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-12 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(197,160,40,0.1)" }}>
            <MessageSquare size={24} style={{ color: "#C5A028" }} />
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2">Noch keine Anfragen</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">Nehmen Sie Kontakt auf – wir antworten schnell und persönlich.</p>
          <a href="/#kontakt" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white" style={{ background: "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)", textDecoration: "none" }}>
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => {
            const statusCfg = STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.neu;
            const StatusIcon = statusCfg.icon;
            const isExpanded = expanded === inquiry.id;
            return (
              <div key={inquiry.id} className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 overflow-hidden">
                <button onClick={() => setExpanded(isExpanded ? null : inquiry.id)} className="w-full flex items-center justify-between px-5 py-4 text-left bg-transparent border-none cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-900 dark:text-white truncate">{TYPE_LABELS[inquiry.type] || inquiry.type}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{formatDateShort(inquiry.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium" style={{ color: statusCfg.color, background: statusCfg.bg }}>
                      <StatusIcon size={11} />
                      {statusCfg.label}
                    </span>
                    <span className="text-stone-400 text-base transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>›</span>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-stone-100 dark:border-stone-800">
                    <div className="pt-4">
                      <p className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">Ihre Nachricht</p>
                      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{inquiry.message}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function AnfragenPage() {
  const { user } = useAuth();
  const isAdmin = (user?.email?.toLowerCase() ?? "") === ADMIN_EMAIL;
  return isAdmin ? <AdminAnfragenView /> : <UserAnfragenView />;
}
