"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { ThemeType } from "@/types/terminal";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: { id: ThemeType; name: string; color: string }[];
}

export const THEMES: { id: ThemeType; name: string; color: string }[] = [
  { id: "green", name: "Matrix Green", color: "#10b981" },
  { id: "purple", name: "Cyber Purple", color: "#a855f7" },
  { id: "blue", name: "Arctic Blue", color: "#38bdf8" },
  { id: "red", name: "Crimson Red", color: "#f43f5e" },
  { id: "yellow", name: "Amber Yellow", color: "#eab308" },
];

const ThemeContext = createContext<ThemeContextType>({
  theme: "green",
  setTheme: () => {},
  availableThemes: THEMES,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("green");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme") as ThemeType;
      if (saved && ["green", "purple", "blue", "red", "yellow"].includes(saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (newTheme: ThemeType) => {
    if (!["green", "purple", "blue", "red", "yellow"].includes(newTheme)) return;
    setThemeState(newTheme);
    try {
      localStorage.setItem("portfolio-theme", newTheme);
    } catch {
      // ignore
    }
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
