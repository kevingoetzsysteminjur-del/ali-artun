"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";
import {
  Users,
  MessageSquare,
  UserCheck,
  BarChart3,
  ArrowRight,
  Star,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

const ADMIN_EMAIL = "info@plana-immobilien-finanzierung.com";

// ── Admin Dashboard ─────────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  neu: { color: "#92400e", bg: "rgba(254,243,199,0.15)" },
  in_bearbeitung: { color: "#1d4ed8", bg: "rgba(219,234,254,0.15)" },
  erledigt: { color: "#166534", bg: "rgba(220,252,231,0.15)" },
};
const STATUS_LABELS: Record<string, string> = {
  neu: "Neu",
  in_bearbeitung: "In Bearbeitung",
  erledigt: "Erledigt",
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, inquiries: 0, newInquiries: 0, partners: 0, newPartners: 0 });
  const [recent, setRecent] = useState<{ id: string; name: string; email: string; status: string; created_at: string }[]>([]);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "neu"),
      supabase.from("partner_applications").select("id", { count: "exact", head: true }),
      supabase.from("partner_applications").select("id", { count: "exact", head: true }).eq("status", "neu"),
    ]).then(([u, inq, newInq, part, newPart]) => {
      setStats({
        users: u.count ?? 0,
        inquiries: inq.count ?? 0,
        newInquiries: newInq.count ?? 0,
        partners: part.count ?? 0,
        newPartners: newPart.count ?? 0,
      });
    });
    supabase
      .from("inquiries")
      .select("id, name, email, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(({ data }) => setRecent(data || []));
  }, []);

  const statCards = [
    { label: "Registrierte Nutzer", value: stats.users, icon: Users, sub: "Gesamt", color: "#6366f1" },
    { label: "Neue Anfragen", value: stats.newInquiries, icon: MessageSquare, sub: `${stats.inquiries} gesamt`, color: "#C5A028", href: "/konto/anfragen" },
    { label: "Partner-Bewerbungen", value: stats.newPartners, icon: UserCheck, sub: `${stats.partners} gesamt`, color: "#10b981", href: "/konto/partner" },
    { label: "Gesamt-Anfragen", value: stats.inquiries, icon: BarChart3, sub: "Alle Zeit", color: "#f59e0b" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.9)" }}>
          Dashboard
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Übersicht aller Aktivitäten auf Ihrer Website</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${card.color}20` }}>
                  <Icon size={17} style={{ color: card.color }} />
                </div>
                {card.href && (
                  <Link href={card.href} style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none" }} className="hover:text-[#C5A028] transition-colors">
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
              <p className="text-3xl font-bold mb-0.5" style={{ color: "rgba(255,255,255,0.9)" }}>{card.value}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Letzte Anfragen</h2>
          <Link href="/konto/anfragen" className="text-xs hover:text-[#C5A028] transition-colors" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
            Alle anzeigen →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Noch keine Anfragen vorhanden</p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {recent.map((inq) => {
              const status = STATUS_COLORS[inq.status] || STATUS_COLORS.neu;
              return (
                <div key={inq.id} className="flex items-center justify-between px-6 py-3.5">
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>{inq.name}</p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{inq.email} · {formatDate(inq.created_at)}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ color: status.color, background: status.bg, border: `1px solid ${status.color}40` }}>
                    {STATUS_LABELS[inq.status] || inq.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Anfragen verwalten", href: "/konto/anfragen" },
          { label: "Partner-Bewerbungen", href: "/konto/partner" },
          { label: "Bilder hochladen", href: "/konto/bilder" },
          { label: "Einstellungen", href: "/konto/einstellungen" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center justify-between px-4 py-3 rounded-lg transition-all hover:border-[#C5A028]/40"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}
          >
            {action.label}
            <ArrowRight size={13} style={{ flexShrink: 0, opacity: 0.5 }} />
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── User Overview ────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    question: "Wie lange dauert der Immobilienverkauf?",
    answer: "Der Zeitraum hängt von Lage, Zustand und Preis der Immobilie ab. In der Regel dauert ein professioneller Verkaufsprozess 2–4 Monate.",
  },
  {
    question: "Was kostet eine kostenlose Immobilienbewertung?",
    answer: "Unsere erste Bewertung und Beratung ist absolut kostenlos und unverbindlich.",
  },
  {
    question: "Wie funktioniert die Käuferfinanzierungsprüfung?",
    answer: "Wir prüfen potenzielle Käufer bereits vor der Besichtigung auf ihre Finanzierungsfähigkeit.",
  },
];

function UserOverview() {
  const { user } = useAuth();
  const [inquiryCount, setInquiryCount] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Benutzer";

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("inquiries")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .then(({ count }) => setInquiryCount(count ?? 0));
  }, [user]);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl text-stone-900 dark:text-white mb-1" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
          Willkommen zurück, {userName}
        </h1>
        <p className="text-stone-500 dark:text-stone-400">Verwalten Sie Ihre Anfragen und Kontaktdaten.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(197,160,40,0.1)" }}>
              <MessageSquare size={18} style={{ color: "#C5A028" }} />
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">Anfragen</span>
          </div>
          <p className="text-2xl font-semibold text-stone-900 dark:text-white">{inquiryCount === null ? "–" : inquiryCount}</p>
        </div>
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(197,160,40,0.1)" }}>
              <Star size={18} style={{ color: "#C5A028" }} />
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">Status</span>
          </div>
          <p className="text-2xl font-semibold text-stone-900 dark:text-white">Aktiv</p>
        </div>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-6 mb-6">
        <h2 className="text-lg text-stone-900 dark:text-white mb-4" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
          Häufige Fragen
        </h2>
        <div className="space-y-1">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-stone-100 dark:border-stone-800 last:border-0">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex items-center justify-between w-full py-3.5 text-left bg-transparent border-none cursor-pointer"
              >
                <span className="text-sm font-medium text-stone-800 dark:text-stone-200 pr-4">{item.question}</span>
                {openFaq === i ? <ChevronUp size={16} className="flex-shrink-0 text-stone-400" /> : <ChevronDown size={16} className="flex-shrink-0 text-stone-400" />}
              </button>
              {openFaq === i && <p className="text-sm text-stone-600 dark:text-stone-400 pb-4 leading-relaxed">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: "linear-gradient(135deg, rgba(197,160,40,0.08) 0%, rgba(197,160,40,0.04) 100%)", border: "1px solid rgba(197,160,40,0.2)" }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#25D366" }}>
            <Phone size={18} style={{ color: "#fff" }} />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-900 dark:text-white">Direkter Kontakt zu Ali Artun</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Für schnelle Antworten – WhatsApp oder Telefon</p>
          </div>
        </div>
        <a href="https://wa.me/496261123456?text=Hallo%20Ali%2C%20ich%20habe%20eine%20Frage%20zu%20meiner%20Immobilie." target="_blank" rel="noopener noreferrer" className="flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all" style={{ background: "#25D366", textDecoration: "none" }}>
          WhatsApp schreiben
        </a>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function KontoPage() {
  const { user } = useAuth();
  const isAdmin = (user?.email?.toLowerCase() ?? "") === ADMIN_EMAIL;
  return isAdmin ? <AdminDashboard /> : <UserOverview />;
}
