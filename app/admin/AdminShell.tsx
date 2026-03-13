"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Image as ImageIcon,
  FileText,
  Settings,
  Menu,
  X,
  ExternalLink,
  LogOut,
  ChevronRight,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties }>;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Übersicht",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    title: "Verwaltung",
    items: [
      { label: "Anfragen", href: "/admin/anfragen", icon: MessageSquare },
      { label: "Partner", href: "/admin/partner", icon: Users },
    ],
  },
  {
    title: "Website",
    items: [
      { label: "Bilder", href: "/admin/bilder", icon: ImageIcon },
      { label: "Inhalte", href: "/admin/inhalte", icon: FileText },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Einstellungen", href: "/admin/einstellungen", icon: Settings },
    ],
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentPage =
    NAV_GROUPS.flatMap((g) => g.items).find((item) =>
      item.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(item.href)
    )?.label || "Admin";

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#0A0A0F", color: "#e5e7eb" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{
          background: "#0F0F18",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Brand */}
        <div
          className="flex items-center justify-between px-5 h-[60px] flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span
            className="text-base font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#C5A028",
              letterSpacing: "0.01em",
            }}
          >
            Plan A
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded transition-colors hover:bg-white/10"
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            <X size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
          </button>
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p
                className="px-3 mb-1"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.25)",
                }}
              >
                {group.title}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all"
                      style={{
                        fontSize: 13.5,
                        fontWeight: isActive ? 500 : 400,
                        color: isActive ? "#C5A028" : "rgba(255,255,255,0.55)",
                        background: isActive
                          ? "rgba(197,160,40,0.1)"
                          : "transparent",
                        borderLeft: isActive
                          ? "3px solid #C5A028"
                          : "3px solid transparent",
                        textDecoration: "none",
                      }}
                    >
                      <Icon size={15} style={{ flexShrink: 0 }} />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-3 py-4 space-y-0.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all hover:bg-white/05"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={14} />
            Website öffnen
          </a>
          <button
            onClick={signOut}
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg transition-all hover:bg-red-500/10"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <LogOut size={14} />
            Abmelden
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="flex items-center justify-between px-5 lg:px-8 h-[60px] flex-shrink-0"
          style={{
            background: "#0A0A0F",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <Menu size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
            </button>

            <div className="flex items-center gap-2 text-sm">
              <a
                href="/"
                className="hidden sm:flex items-center gap-1 hover:text-[#C5A028] transition-colors"
                style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
              >
                Website
              </a>
              <ChevronRight
                size={13}
                className="hidden sm:block"
                style={{ color: "rgba(255,255,255,0.2)" }}
              />
              <span
                className="font-medium"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {currentPage}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(197,160,40,0.15)",
                color: "#C5A028",
                border: "1px solid rgba(197,160,40,0.3)",
              }}
            >
              Admin
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
