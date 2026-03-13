"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Users,
  Image as ImageIcon,
  Video,
  Building2,
  Settings,
  ExternalLink,
} from "lucide-react";

const ADMIN_EMAIL = "info@plana-immobilien-finanzierung.com";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size: number; style?: React.CSSProperties; className?: string }>;
};

type NavGroup = { title: string; items: NavItem[] };

const ADMIN_NAV_GROUPS: NavGroup[] = [
  {
    title: "Übersicht",
    items: [{ label: "Dashboard", href: "/konto", icon: LayoutDashboard }],
  },
  {
    title: "Verwaltung",
    items: [
      { label: "Anfragen", href: "/konto/anfragen", icon: MessageSquare },
      { label: "Partner", href: "/konto/partner", icon: Users },
    ],
  },
  {
    title: "Immobilien",
    items: [{ label: "Objekte", href: "/konto/objekte", icon: Building2 }],
  },
  {
    title: "Website",
    items: [
      { label: "Bilder", href: "/konto/bilder", icon: ImageIcon },
      { label: "Videos", href: "/konto/videos", icon: Video },
      { label: "Einstellungen", href: "/konto/einstellungen", icon: Settings },
    ],
  },
  {
    title: "Konto",
    items: [{ label: "Profil", href: "/konto/profil", icon: User }],
  },
];

const USER_NAV: NavItem[] = [
  { label: "Übersicht", href: "/konto", icon: LayoutDashboard },
  { label: "Meine Anfragen", href: "/konto/anfragen", icon: MessageSquare },
  { label: "Profil", href: "/konto/profil", icon: User },
];

export default function KontoShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAdmin = (user?.email?.toLowerCase() ?? "") === ADMIN_EMAIL;
  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "Benutzer";
  const userInitial = userName.charAt(0).toUpperCase();

  // ── Admin dark theme ──────────────────────────────────────────
  if (isAdmin) {
    const currentLabel =
      ADMIN_NAV_GROUPS.flatMap((g) => g.items).find((item) =>
        item.href === "/konto" ? pathname === "/konto" : pathname.startsWith(item.href)
      )?.label || "Dashboard";

    return (
      <div className="min-h-screen flex" style={{ background: "#0A0A0F", color: "#e5e7eb" }}>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Admin Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-60 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          style={{ background: "#0F0F18", borderRight: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Brand */}
          <div
            className="flex items-center justify-between px-5 h-[60px] flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Link
              href="/"
              className="text-base font-bold hover:opacity-80 transition-opacity"
              style={{ fontFamily: "var(--font-playfair)", color: "#C5A028", letterSpacing: "0.01em", textDecoration: "none" }}
            >
              Plan A
            </Link>
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
            {ADMIN_NAV_GROUPS.map((group) => (
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
                      item.href === "/konto"
                        ? pathname === "/konto"
                        : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all"
                        style={{
                          fontSize: 13.5,
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? "#C5A028" : "rgba(255,255,255,0.55)",
                          background: isActive ? "rgba(197,160,40,0.1)" : "transparent",
                          borderLeft: isActive ? "3px solid #C5A028" : "3px solid transparent",
                          textDecoration: "none",
                        }}
                      >
                        <Icon size={15} style={{ flexShrink: 0 }} />
                        {item.label}
                      </Link>
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
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors hover:bg-white/5"
              style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
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
            style={{ background: "#0A0A0F", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
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
                <Link
                  href="/"
                  className="hidden sm:flex items-center gap-1 hover:text-[#C5A028] transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
                >
                  Website
                </Link>
                <ChevronRight size={13} className="hidden sm:block" style={{ color: "rgba(255,255,255,0.2)" }} />
                <span className="font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {currentLabel}
                </span>
              </div>
            </div>
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
          </header>

          <main className="flex-1 overflow-auto p-5 lg:p-8">{children}</main>
        </div>
      </div>
    );
  }

  // ── User light theme ──────────────────────────────────────────
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Mobile top bar */}
      <div className="lg:hidden bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)" }}
          >
            {userInitial}
          </div>
          <span className="text-sm font-medium text-stone-900 dark:text-white">Mein Konto</span>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <Menu size={20} className="text-stone-600 dark:text-stone-400" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-stone-900 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
              <span
                className="text-lg text-stone-900 dark:text-white"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
              >
                Mein Konto
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <X size={18} className="text-stone-500" />
              </button>
            </div>
            <UserSidebarContent
              pathname={pathname}
              userName={userName}
              userInitial={userInitial}
              userEmail={user?.email || ""}
              signOut={signOut}
              onNavigate={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800">
          <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-800">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              style={{ textDecoration: "none" }}
            >
              <span
                className="text-base text-stone-900 dark:text-white group-hover:text-[#C5A028] transition-colors"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
              >
                Plan A Immobilien
              </span>
            </Link>
          </div>
          <UserSidebarContent
            pathname={pathname}
            userName={userName}
            userInitial={userInitial}
            userEmail={user?.email || ""}
            signOut={signOut}
          />
        </aside>

        <main className="flex-1 min-w-0">
          <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <Link href="/" className="hover:text-[#C5A028] transition-colors" style={{ textDecoration: "none" }}>
                Website
              </Link>
              <ChevronRight size={14} />
              <span className="text-stone-700 dark:text-stone-300 font-medium">Mein Konto</span>
            </div>
            <span className="text-sm text-stone-500 dark:text-stone-400">{user?.email}</span>
          </div>
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function UserSidebarContent({
  pathname,
  userName,
  userInitial,
  userEmail,
  signOut,
  onNavigate,
}: {
  pathname: string;
  userName: string;
  userInitial: string;
  userEmail: string;
  signOut: () => Promise<void>;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="px-5 py-5 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)" }}
          >
            {userInitial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-900 dark:text-white truncate">{userName}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">{userEmail}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {USER_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/konto" ? pathname === "/konto" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
              style={{
                background: isActive ? "rgba(197,160,40,0.08)" : "transparent",
                borderLeft: isActive ? "3px solid #C5A028" : "3px solid transparent",
                color: isActive ? "#C5A028" : "#78716c",
                fontWeight: isActive ? 500 : 400,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-6 border-t border-stone-100 dark:border-stone-800 pt-4">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all hover:bg-red-50 dark:hover:bg-red-950/20 text-stone-500 dark:text-stone-400 hover:text-red-500"
          style={{ fontSize: 14, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <LogOut size={17} />
          Abmelden
        </button>
      </div>
    </>
  );
}
