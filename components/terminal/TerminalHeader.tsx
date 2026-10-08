"use client";

import React from "react";
import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
import { SITE } from "@/data/site";

interface TerminalHeaderProps {
  onClear: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export function TerminalHeader({ onClear, isMaximized = false, onToggleMaximize }: TerminalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 bg-[var(--terminal-title-bg)] border-b border-[var(--color-border)] select-none">
      {/* Window Controls */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onClear}
            title="Clear terminal (Ctrl+L)"
            type="button"
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer transition-transform hover:scale-110"
          >
            <span className="opacity-0 group-hover:opacity-100 font-bold">&times;</span>
          </button>
          <button
            title="Minimize"
            type="button"
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer transition-transform hover:scale-110"
          >
            <span className="opacity-0 group-hover:opacity-100 font-bold">&minus;</span>
          </button>
          <button
            onClick={onToggleMaximize}
            title={isMaximized ? "Restore window size" : "Maximize window"}
            type="button"
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-110 flex items-center justify-center text-[8px] text-black/60 group cursor-pointer transition-transform hover:scale-110"
          >
            <span className="opacity-0 group-hover:opacity-100 font-bold">
              {isMaximized ? "▫" : "+"}
            </span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 pl-2 text-xs text-[var(--color-text-muted)] font-mono">
          <span className="text-[var(--color-primary)] font-semibold">{SITE.terminalname.toLocaleLowerCase()}@portfolio</span>
          <span className="text-[var(--color-text-subtle)]">:</span>
          <span className="text-[var(--color-text-subtle)]">~</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-emerald-400">
            ● bash {isMaximized ? "[max]" : ""}
          </span>
        </div>
      </div>

      {/* Terminal Title / Center */}
      <div className="text-xs font-mono text-[var(--color-text-muted)] hidden md:block">
        Terminal · {SITE.name} Portfolio v2.0
      </div>

      {/* Actions & Theme */}
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
