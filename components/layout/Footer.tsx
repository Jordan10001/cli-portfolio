"use client";

import React from "react";
import { SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] py-8 font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[var(--color-text)] font-bold">
                {SITE.name}
              </span>
              <span className="text-[var(--color-text-subtle)]">|</span>
              <span className="text-[var(--color-primary)]">
                v2.0 Next.js Terminal
              </span>
            </div>
            <p className="text-[var(--color-text-muted)] text-[11px]">
              {SITE.major} student · {SITE.university} (GPA {SITE.gpa}/4.00)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href={SITE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-primary)] transition-colors text-[var(--color-primary)] font-semibold"
            >
              CV / Resume ↗
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--color-border)]/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[var(--color-text-subtle)]">
          <span>
            TERMINAL EMULATION MODE · BUILT WITH NEXT.JS 16, REACT 19 & TAILWIND CSS
          </span>
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
