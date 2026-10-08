"use client";

import React, { useState, useEffect } from "react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { SITE } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 font-mono ${
        scrolled
          ? "bg-[var(--color-background)]/90 backdrop-blur-md border-b border-[var(--color-border)] shadow-md"
          : "bg-transparent border-b border-[var(--color-border)]/50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo / Prompt Brand */}
        <a
          href="#terminal"
          className="flex items-center gap-2 text-xs sm:text-sm hover:opacity-80 transition-opacity select-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
          <span className="font-bold text-[var(--color-primary)]">~/{SITE.terminalname.toLocaleLowerCase()}</span>
          <span className="text-[var(--color-text-subtle)] hidden sm:inline">
            [bash]
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-4 text-xs">
          <a
            href="#terminal"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            $ terminal
          </a>
          <a
            href="#projects"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            $ projects
          </a>
          <a
            href="#skills"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            $ skills
          </a>
          <a
            href="#experience"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            $ experience
          </a>
          <a
            href="#awards"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            $ awards
          </a>
          <a
            href="#contact"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            $ contact
          </a>
        </nav>

        {/* Theme Switcher */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
