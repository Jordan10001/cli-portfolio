"use client";

import React from "react";
import { experiences } from "@/data/experience";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] mb-1">
          <span>&gt; git log --oneline --decorate --graph ~/career</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] font-mono">
          Leadership & Work Experience
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-mono">
          Technical leadership, large-scale event, and committee operations.
        </p>
      </div>

      {/* Commit Tree List */}
      <div className="space-y-4 font-mono">
        {experiences.map((exp, idx) => {
          const fakeHash = (idx + 10).toString(16).padStart(7, "7a8b9c").slice(0, 7);
          return (
            <div
              key={`${exp.organization}-${idx}`}
              className="relative pl-6 sm:pl-8 border-l-2 border-[var(--color-border-bright)] hover:border-[var(--color-primary)] transition-colors group"
            >
              {/* Git commit branch node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-background)] border-2 border-[var(--color-border-bright)] group-hover:border-[var(--color-primary)] group-hover:bg-[var(--color-primary)] transition-all flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] group-hover:bg-[var(--color-background)]" />
              </div>

              {/* Commit content card */}
              <div className="p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] group-hover:border-[var(--color-border-bright)] transition-all space-y-2.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-[var(--color-primary)] font-bold">
                      commit {fakeHash}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-background)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
                    {exp.role} · <span className="text-[var(--color-primary-light)]">{exp.organization}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[var(--color-text-subtle)] block mb-1.5">
                      KEY DELIVERABLES & IMPACT:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[var(--color-text)] list-disc list-inside">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="text-[var(--color-text-muted)]">
                          <span className="text-[var(--color-text)]">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--color-border)]">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[11px] rounded bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-primary-light)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
