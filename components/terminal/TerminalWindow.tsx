"use client";

import React, { useState, useRef, useEffect } from "react";
import { TerminalHeader } from "./TerminalHeader";
import { QuickCommands } from "./QuickCommands";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalPrompt } from "./TerminalPrompt";
import { processCommand } from "@/lib/terminalEngine";
import { useTheme } from "@/components/providers/ThemeProvider";
import { pauseLenis, resumeLenis } from "@/components/providers/SmoothScrollProvider";
import type { CommandHistoryEntry } from "@/types/terminal";
import { SITE } from "@/data/site";

interface TerminalWindowProps {
  onOpenProject: (slug: string) => void;
}

function getTerminalTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const INITIAL_WELCOME: CommandHistoryEntry = {
  id: "init-welcome",
  command: "whoami",
  timestamp: getTerminalTime(),
  output: (
    <div className="space-y-2 py-2 text-xs sm:text-sm font-mono leading-relaxed">
      <p className="text-[var(--color-primary)] font-bold">
        {SITE.name} — Terminal Portfolio [Version 2.0.0]
      </p>
      <p className="text-[var(--color-text-muted)]">
        {SITE.major} {SITE.degree} at {SITE.university} ({SITE.gpa}/4.00).
        <br />
        {SITE.focus}
      </p>
      <div className="p-2.5 rounded bg-[var(--color-background)] border border-[var(--color-border)] text-xs text-[var(--color-text-subtle)] space-y-1">
        <p>
          Type <span className="text-[var(--color-primary)] font-bold">help</span> or click any quick command badge above to browse.
        </p>
        <p>
          Navigation: <span className="text-[var(--color-primary-light)]">projects</span> 
          · <span className="text-[var(--color-primary-light)]">skills</span> 
          · <span className="text-[var(--color-primary-light)]">experience</span> 
          · <span className="text-[var(--color-primary-light)]">awards</span> 
          · <span className="text-[var(--color-primary-light)]">contact</span>
        </p>
      </div>
    </div>
  ),
};

export function TerminalWindow({ onOpenProject }: TerminalWindowProps) {
  const { setTheme } = useTheme();
  const [history, setHistory] = useState<CommandHistoryEntry[]>([INITIAL_WELCOME]);
  const [commandStrings, setCommandStrings] = useState<string[]>(["whoami"]);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(1);

  useEffect(() => {
    setHistory((currentHistory) =>
      currentHistory.map((entry) =>
        entry.id === INITIAL_WELCOME.id
          ? {
              ...entry,
              timestamp: getTerminalTime(),
            }
          : entry,
      ),
    );
  }, []);

  useEffect(() => {
    // If only initial welcome or cleared, stay at top
    if (history.length <= 1) {
      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = 0;
      }
      return;
    }

    const latestEntry = history[history.length - 1];
    if (!latestEntry) return;

    // Scroll to the start of the newly executed command output
    requestAnimationFrame(() => {
      const container = terminalBodyRef.current;
      if (!container) return;

      const targetEl = container.querySelector(`[id="${latestEntry.id}"]`) as HTMLElement | null;
      if (targetEl) {
        const containerRect = container.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        const offset = targetRect.top - containerRect.top + container.scrollTop;
        container.scrollTo({
          top: Math.max(0, offset - 8),
          behavior: "smooth",
        });
      }
    });
  }, [history]);

  // Isolate wheel scrolling to the terminal body so the main page doesn't scroll instead
  useEffect(() => {
    const el = terminalBodyRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Prevent wheel events from propagating to window/Lenis
      e.stopPropagation();
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      el.removeEventListener("wheel", onWheel);
      resumeLenis();
    };
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      setHistory([INITIAL_WELCOME]);
      return;
    }

    const outputNode = processCommand(trimmed, {
      setTheme,
      openProjectModal: onOpenProject,
      executeCommand,
      clearTerminal: () => setHistory([INITIAL_WELCOME]),
    });

    counterRef.current += 1;
    const count = counterRef.current;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newEntry: CommandHistoryEntry = {
      id: `cmd-entry-${count}`,
      command: trimmed,
      timestamp: timeStr,
      output: outputNode,
    };

    setHistory((prev) => [...prev, newEntry]);
    setCommandStrings((prev) => [...prev, trimmed]);
  };

  const handleClear = () => {
    setHistory([INITIAL_WELCOME]);
  };

  return (
    <div
      data-lenis-prevent="true"
      onMouseEnter={() => pauseLenis()}
      onMouseLeave={() => resumeLenis()}
      className={`w-full rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] shadow-2xl overflow-hidden transition-all duration-300 flex flex-col lenis-prevent ${
        isMaximized ? "h-[80vh]" : "h-[380px] sm:h-[600px]"
      }`}
    >
      {/* Terminal Title Bar */}
      <TerminalHeader
        onClear={handleClear}
        isMaximized={isMaximized}
        onToggleMaximize={() => setIsMaximized(!isMaximized)}
      />

      {/* Clickable Quick Command Chips */}
      <QuickCommands onSelectCommand={executeCommand} />

      {/* Terminal Content / Scroll Area */}
      <div
        ref={terminalBodyRef}
        data-lenis-prevent="true"
        className="flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-3 font-mono bg-[var(--color-background)]/80 overscroll-contain lenis-prevent"
      >
        {/* Output List */}
        <TerminalOutput entries={history} />

        {/* Active Command Prompt */}
        <TerminalPrompt
          onExecute={executeCommand}
          commandHistory={commandStrings}
        />
      </div>

    </div>
  );
}
