"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Übersicht", href: "/konto", icon: LayoutDashboard },
  { label: "Meine Anfragen", href: "/konto/anfragen", icon: MessageSquare },
  { label: "Profil", href: "/konto/profil", icon: User },
];

export default function KontoShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Benutzer";
  const userInitial = userName.charAt(0).toUpperCase();

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
          <span className="text-sm font-medium text-stone-900 dark:text-white">
            Mein Konto
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <Menu size={20} className="text-stone-600 dark:text-stone-400" />
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-stone-900 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800">
              <span
                className="text-lg text-stone-900 dark:text-white"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}
              >
                Mein Konto
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <X size={18} className="text-stone-500" />
              </button>
            </div>
            <SidebarContent
              pathname={pathname}
              userName={userName}
              userInitial={userInitial}
              userEmail={user?.email || ""}
              signOut={signOut}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800">
          {/* Brand */}
          <div className="px-6 py-5 border-b border-stone-100 dark:border-stone-800">
            <a href="/" className="flex items-center gap-2 group">
              <span
                className="text-base text-stone-900 dark:text-white group-hover:text-[#C5A028] transition-colors"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}
              >
                Plan A Immobilien
              </span>
            </a>
          </div>
          <SidebarContent
            pathname={pathname}
            userName={userName}
            userInitial={userInitial}
            userEmail={user?.email || ""}
            signOut={signOut}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Desktop header */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
              <a href="/" className="hover:text-[#C5A028] transition-colors">
                Website
              </a>
              <ChevronRight size={14} />
              <span className="text-stone-700 dark:text-stone-300 font-medium">
                Mein Konto
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-500 dark:text-stone-400">
                {user?.email}
              </span>
            </div>
          </div>

          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function SidebarContent({
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
      {/* User info */}
      <div className="px-5 py-5 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #C5A028, #d4b040)" }}
          >
            {userInitial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-900 dark:text-white truncate">
              {userName}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
              {userEmail}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/konto"
              ? pathname === "/konto"
              : pathname.startsWith(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
              style={{
                background: isActive ? "rgba(197,160,40,0.08)" : "transparent",
                borderLeft: isActive
                  ? "3px solid #C5A028"
                  : "3px solid transparent",
                color: isActive ? "#C5A028" : "#78716c",
                fontWeight: isActive ? 500 : 400,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              <Icon size={17} />
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-6 border-t border-stone-100 dark:border-stone-800 pt-4 space-y-0.5">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all hover:bg-red-50 dark:hover:bg-red-950/20 text-stone-500 dark:text-stone-400 hover:text-red-500 dark:hover:text-red-400"
          style={{ fontSize: 14, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
        >
          <LogOut size={17} />
          Abmelden
        </button>
      </div>
    </>
  );
}
