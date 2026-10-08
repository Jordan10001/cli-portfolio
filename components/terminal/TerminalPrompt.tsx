"use client";

import React, { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { SITE } from "@/data/site";

interface TerminalPromptProps {
  onExecute: (command: string) => void;
  commandHistory: string[];
}

const KNOWN_COMMANDS = [
  "help",
  "about",
  "whoami",
  "projects",
  "skills",
  "capabilities",
  "experience",
  "work",
  "awards",
  "certificates",
  "contact",
  "cv",
  "resume",
  "theme",
  "clear",
  "github",
  "linkedin",
  "date",
  "echo",
  "sudo",
];

export function TerminalPrompt({ onExecute, commandHistory }: TerminalPromptProps) {
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on initial render
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Ctrl+L -> clear
    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      onExecute("clear");
      return;
    }

    // Up arrow -> previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || "");
      return;
    }

    // Down arrow -> next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] || "");
      }
      return;
    }

    // Tab -> autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return;
      const match = KNOWN_COMMANDS.find((cmd) => cmd.startsWith(trimmed));
      if (match) {
        setInput(match);
      }
      return;
    }

    // Enter -> execute
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = input.trim();
      if (cmd) {
        onExecute(cmd);
        setInput("");
        setHistoryIndex(-1);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex items-center gap-2 font-mono text-sm pt-2 select-none cursor-text"
    >
      <div className="flex items-center gap-1.5 shrink-0 text-xs sm:text-sm">
        <span className="text-[var(--color-primary)] font-bold">{SITE.terminalname.toLocaleLowerCase()}@portfolio</span>
        <span className="text-[var(--color-text-subtle)]">:</span>
        <span className="text-[var(--color-primary-light)]">~</span>
        <span className="text-[var(--color-primary)] font-bold">$</span>
      </div>

      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal command prompt"
          placeholder="type 'help' or click any command..."
          className="w-full bg-transparent text-[var(--color-text)] outline-none border-none font-mono text-xs sm:text-sm placeholder:text-[var(--color-text-subtle)]/70 py-1 caret-[var(--color-cursor)]"
          style={{ caretColor: "var(--color-cursor)" }}
        />
      </div>
    </div>
  );
}
