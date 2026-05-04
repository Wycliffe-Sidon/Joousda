"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d5c191]/55 bg-white text-[#123c74] shadow-[0_18px_35px_-26px_rgba(12,43,87,0.72)] transition hover:-translate-y-0.5 hover:bg-[#fffaf0] dark:border-slate-700 dark:bg-slate-900 dark:text-[#f2ddab] dark:hover:bg-slate-800"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
