"use client";

import React from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme, availableThemes } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-md bg-[var(--color-background)] border border-[var(--color-border)] text-xs">
      <span className="text-[11px] text-[var(--color-text-subtle)] px-1 hidden sm:inline">
        THEME:
      </span>
      {availableThemes.map((t) => {
        const isActive = mounted ? theme === t.id : t.id === "green";
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            title={`Switch to ${t.name}`}
            type="button"
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded transition-all cursor-pointer ${
              isActive
                ? "bg-[var(--color-surface-hover)] border border-[var(--color-primary)] text-[var(--color-primary)] font-bold shadow-xs"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-transparent"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full inline-block shrink-0"
              style={{ backgroundColor: t.color }}
            />
            <span className="text-[11px] capitalize hidden md:inline">{t.id}</span>
          </button>
        );
      })}
    </div>
  );
}
