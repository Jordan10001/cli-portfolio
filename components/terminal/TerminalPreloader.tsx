"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { pauseLenis, resumeLenis } from "@/components/providers/SmoothScrollProvider";

const LOG_MESSAGES = [
  { threshold: 0, text: "[init] Initializing portfolio environment..." },
  { threshold: 25, text: "[pack] Compiling data analytics & full-stack modules..." },
  { threshold: 60, text: "[optm] Optimizing asset bundles & terminal shaders..." },
  { threshold: 90, text: "[done] Build successful! Launching portfolio..." },
];

export function TerminalPreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [totalBlocks, setTotalBlocks] = useState(42);

  useEffect(() => {
    pauseLenis();
    document.body.style.overflow = "hidden";

    // Dynamically calculate block count based on screen/container width
    const updateBlocks = () => {
      // Container max-width is 512px (max-w-lg) with padding ~48px => max usable width ~464px
      const usableWidth = Math.min(window.innerWidth - 64, 464);
      // In monospace text-xs/sm, each character is ~8.5px. Reserve ~24px for brackets "[" and "]"
      const calculatedBlocks = Math.max(22, Math.floor((usableWidth - 24) / 9.5));
      setTotalBlocks(calculatedBlocks);
    };

    updateBlocks();
    window.addEventListener("resize", updateBlocks);

    // Progress animation interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random incremental step between 3 and 7 for realistic terminal build feel
        const step = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + step, 100);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateBlocks);
      resumeLenis();
      document.body.style.overflow = "unset";
    };
  }, []);

  // When progress reaches 100%, hold briefly then exit
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        resumeLenis();
        document.body.style.overflow = "unset";
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Support ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLoading) {
        setProgress(100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading]);

  // Build ASCII progress bar [████████░░░░]
  const filledBlocks = Math.round((progress / 100) * totalBlocks);
  const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);
  const asciiBar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="terminal-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98, y: -16 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-background)] px-4 select-none"
        >
          {/* Subtle background grid pattern */}
          <div className="fixed inset-0 terminal-grid-bg pointer-events-none opacity-40" />

          {/* Terminal Window Box */}
          <div className="relative w-full max-w-lg rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/80 overflow-hidden font-mono z-10">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--terminal-title-bg)] border-b border-[var(--color-border)]">
              {/* Window Controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                <span className="ml-2 text-xs text-[var(--color-text-muted)] hidden sm:inline">
                  bash — aaron@portfolio: ~/build
                </span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-subtle)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                <span className="text-[var(--color-primary)] font-medium">building</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
              {/* Command Prompt */}
              <div className="flex items-center gap-2 text-[var(--color-text)] font-semibold pb-1 border-b border-[var(--color-border)]/50">
                <span className="text-[var(--color-primary)] font-bold">➜</span>
                <span className="text-[var(--color-text-muted)]">~</span>
                <span className="text-[var(--color-text)]">build aaron@portfolio</span>
                <span className="w-2 h-4 bg-[var(--color-primary)] animate-cursor inline-block ml-0.5" />
              </div>

              {/* Build Log Streams */}
              <div className="space-y-1.5 text-[11px] sm:text-xs text-[var(--color-text-muted)] min-h-[5.5rem]">
                {LOG_MESSAGES.filter((msg) => progress >= msg.threshold).map((msg, index) => {
                  const isLatest =
                    index === LOG_MESSAGES.filter((m) => progress >= m.threshold).length - 1;
                  return (
                    <div
                      key={msg.text}
                      className={`flex items-center gap-2 transition-opacity duration-200 ${
                        isLatest ? "text-[var(--color-text)]" : "text-[var(--color-text-subtle)]"
                      }`}
                    >
                      <span className="text-[var(--color-primary)]">›</span>
                      <span>{msg.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Terminal ASCII Progress Bar */}
              <div className="pt-2 space-y-2 border-t border-[var(--color-border)]/50">
                <div className="flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-[var(--color-text-muted)]">Progress</span>
                  <span className="text-[var(--color-primary)] font-bold">{progress}%</span>
                </div>

                {/* ASCII Block Bar (stretches to follow container width) */}
                <div className="w-full text-[var(--color-primary)] font-mono text-xs sm:text-sm tracking-wider overflow-hidden whitespace-nowrap py-1">
                  [{asciiBar}]
                </div>
              </div>

              {/* Bottom hint */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-[var(--color-text-subtle)]">
                <span>portfolio v2.0 · production</span>
                <span className="hidden sm:inline">Press ESC to skip</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
