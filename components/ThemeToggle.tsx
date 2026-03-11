"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Zum Hellmodus wechseln" : "Zum Dunkelmodus wechseln"}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-[#C5A028]/10"
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
    >
      {theme === "dark"
        ? <Sun size={17} style={{ color: "#C5A028" }} />
        : <Moon size={17} style={{ color: "#4A3728" }} />}
    </button>
  );
}
