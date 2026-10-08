"use client";

import React from "react";
import type { CommandHistoryEntry } from "@/types/terminal";
import { SITE } from "@/data/site";

interface TerminalOutputProps {
  entries: CommandHistoryEntry[];
}

export function TerminalOutput({ entries }: TerminalOutputProps) {
  if (entries.length === 0) return null;

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} id={entry.id} data-terminal-entry="true" className="space-y-1 font-mono scroll-mt-2">
          {/* Prompt echo */}
          <div className="flex items-center gap-1.5 text-xs sm:text-sm">
            <span className="text-[var(--color-primary)] font-semibold">{SITE.terminalname.toLocaleLowerCase()}@portfolio</span>
            <span className="text-[var(--color-text-subtle)]">:</span>
            <span className="text-[var(--color-primary-light)]">~</span>
            <span className="text-[var(--color-primary)] font-semibold">$</span>
            <span className="text-[var(--color-text)] font-bold">{entry.command}</span>
            <span suppressHydrationWarning className="text-[10px] text-[var(--color-text-subtle)] ml-auto">
              {entry.timestamp}
            </span>
          </div>

          {/* Rendered Command Output */}
          <div className="pt-0.5">{entry.output}</div>
        </div>
      ))}
    </div>
  );
}
