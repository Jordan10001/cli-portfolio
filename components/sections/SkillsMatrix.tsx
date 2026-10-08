"use client";

import React from "react";
import { capabilities } from "@/data/capabilities";
import { SITE } from "@/data/site";

export function SkillsMatrix() {
  return (
    <section id="skills" className="py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] mb-1">
          <span>&gt; cat ~/system/capabilities.env</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] font-mono">
          Technical Capabilities & Stack
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-mono">
          {SITE.focus} 
        </p>
      </div>

      {/* Grid of Capability Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {capabilities.map((group) => (
          <div
            key={group.name}
            className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)]/70 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--color-border)]">
                <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                  {"//"} {group.name}
                </span>
                <span className="text-[10px] text-[var(--color-text-subtle)]">
                  {group.items.length} items
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className="px-2.5 py-1 text-xs rounded-md bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-[11px] text-[var(--color-text-subtle)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
              <span>production verified</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
