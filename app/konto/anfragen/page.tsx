"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/utils/supabase/client";
import { MessageSquare, Clock, CheckCircle, Loader } from "lucide-react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  type: string;
  status: string;
  created_at: string;
};

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; icon: React.ComponentType<{ size: number }> }
> = {
  neu: {
    label: "Neu",
    color: "#92400e",
    bg: "#fef3c7",
    icon: Clock,
  },
  in_bearbeitung: {
    label: "In Bearbeitung",
    color: "#1e40af",
    bg: "#dbeafe",
    icon: Loader,
  },
  erledigt: {
    label: "Erledigt",
    color: "#166534",
    bg: "#dcfce7",
    icon: CheckCircle,
  },
};

const TYPE_LABELS: Record<string, string> = {
  contact: "Allgemeine Anfrage",
  bewertung: "Immobilienbewertung",
  finanzierung: "Finanzierungsberatung",
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AnfragenPage() {
  const { user } = useAuth();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();
    supabase
      .from("inquiries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setInquiries(data || []);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1
          className="text-2xl text-stone-900 dark:text-white mb-1"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
        >
          Meine Anfragen
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm">
          Alle Ihre Kontaktanfragen und deren aktueller Bearbeitungsstand
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "#C5A028", borderTopColor: "transparent" }}
          />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-12 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(197,160,40,0.1)" }}
          >
            <MessageSquare size={24} style={{ color: "#C5A028" }} />
          </div>
          <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2">
            Noch keine Anfragen
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
            Nehmen Sie Kontakt auf – wir antworten schnell und persönlich.
          </p>
          <a
            href="/#kontakt"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)",
              textDecoration: "none",
            }}
          >
            Jetzt Kontakt aufnehmen
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inquiry) => {
            const statusCfg =
              STATUS_CONFIG[inquiry.status] || STATUS_CONFIG.neu;
            const StatusIcon = statusCfg.icon;
            const isExpanded = expanded === inquiry.id;

            return (
              <div
                key={inquiry.id}
                className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : inquiry.id)
                  }
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-transparent border-none cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-900 dark:text-white truncate">
                        {TYPE_LABELS[inquiry.type] || inquiry.type}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {formatDate(inquiry.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        color: statusCfg.color,
                        background: statusCfg.bg,
                      }}
                    >
                      <StatusIcon size={11} />
                      {statusCfg.label}
                    </span>
                    <span
                      className="text-stone-400 text-base transition-transform"
                      style={{
                        transform: isExpanded
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        display: "inline-block",
                      }}
                    >
                      ›
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-stone-100 dark:border-stone-800">
                    <div className="pt-4">
                      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                        Ihre Nachricht
                      </p>
                      <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                        {inquiry.message}
                      </p>
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
