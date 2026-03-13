"use client";

import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { Pencil } from "lucide-react";

export default function AdminBadge() {
  const { isAdmin, loading } = useAuth();
  const pathname = usePathname();

  // Don't show on admin pages themselves
  if (loading || !isAdmin) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href="/admin"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-xl shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      style={{
        background: "linear-gradient(135deg, #C5A028 0%, #d4b040 100%)",
        color: "#fff",
        textDecoration: "none",
        boxShadow: "0 4px 20px rgba(197,160,40,0.4)",
        fontSize: 13,
        fontWeight: 500,
      }}
      title="Admin-Panel öffnen"
    >
      <Pencil size={14} />
      <span>Admin-Modus</span>
    </a>
  );
}
