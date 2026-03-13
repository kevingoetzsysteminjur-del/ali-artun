import { createClient } from "@/utils/supabase/server";
import { Users, MessageSquare, UserCheck, BarChart3, ArrowRight } from "lucide-react";

async function getStats() {
  const supabase = await createClient();

  const [usersRes, inquiriesRes, newInquiriesRes, partnerRes, newPartnerRes] =
    await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("inquiries").select("id", { count: "exact", head: true }),
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "neu"),
      supabase
        .from("partner_applications")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("partner_applications")
        .select("id", { count: "exact", head: true })
        .eq("status", "neu"),
    ]);

  return {
    users: usersRes.count ?? 0,
    inquiries: inquiriesRes.count ?? 0,
    newInquiries: newInquiriesRes.count ?? 0,
    partners: partnerRes.count ?? 0,
    newPartners: newPartnerRes.count ?? 0,
  };
}

async function getRecentInquiries() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("inquiries")
    .select("id, name, email, type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data || [];
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

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

export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([
    getStats(),
    getRecentInquiries(),
  ]);

  const statCards = [
    {
      label: "Registrierte Nutzer",
      value: stats.users,
      icon: Users,
      sub: "Gesamt",
      color: "#6366f1",
    },
    {
      label: "Neue Anfragen",
      value: stats.newInquiries,
      icon: MessageSquare,
      sub: `${stats.inquiries} gesamt`,
      color: "#C5A028",
      href: "/admin/anfragen",
    },
    {
      label: "Partner-Bewerbungen",
      value: stats.newPartners,
      icon: UserCheck,
      sub: `${stats.partners} gesamt`,
      color: "#10b981",
      href: "/admin/partner",
    },
    {
      label: "Gesamt-Anfragen",
      value: stats.inquiries,
      icon: BarChart3,
      sub: "Alle Zeit",
      color: "#f59e0b",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "var(--font-playfair)", color: "rgba(255,255,255,0.9)" }}
        >
          Dashboard
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
          Übersicht aller Aktivitäten auf Ihrer Website
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${card.color}20` }}
                >
                  <Icon size={17} style={{ color: card.color }} />
                </div>
                {card.href && (
                  <a
                    href={card.href}
                    style={{ color: "rgba(255,255,255,0.2)", textDecoration: "none" }}
                    className="hover:text-[#C5A028] transition-colors"
                  >
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
              <p
                className="text-3xl font-bold mb-0.5"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {card.value}
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent inquiries */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2
            className="text-sm font-semibold"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Letzte Anfragen
          </h2>
          <a
            href="/admin/anfragen"
            className="text-xs hover:text-[#C5A028] transition-colors"
            style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
          >
            Alle anzeigen →
          </a>
        </div>

        {recent.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
              Noch keine Anfragen vorhanden
            </p>
          </div>
        ) : (
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            {recent.map((inq) => {
              const status = STATUS_COLORS[inq.status] || STATUS_COLORS.neu;
              return (
                <div
                  key={inq.id}
                  className="flex items-center justify-between px-6 py-3.5"
                >
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {inq.name}
                    </p>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                      {inq.email} · {formatDate(inq.created_at)}
                    </p>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      color: status.color,
                      background: status.bg,
                      border: `1px solid ${status.color}40`,
                    }}
                  >
                    {STATUS_LABELS[inq.status] || inq.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Anfragen verwalten", href: "/admin/anfragen" },
          { label: "Partner-Bewerbungen", href: "/admin/partner" },
          { label: "Bilder hochladen", href: "/admin/bilder" },
          { label: "Einstellungen", href: "/admin/einstellungen" },
        ].map((action) => (
          <a
            key={action.href}
            href={action.href}
            className="flex items-center justify-between px-4 py-3 rounded-lg transition-all hover:border-[#C5A028]/40"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.6)",
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            {action.label}
            <ArrowRight size={13} style={{ flexShrink: 0, opacity: 0.5 }} />
          </a>
        ))}
      </div>
    </div>
  );
}
