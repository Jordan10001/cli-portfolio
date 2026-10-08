"use client";

import React from "react";
import { SITE } from "@/data/site";
import { CiMail } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";

export function ContactSection() {
  return (
    <section id="contact" className="py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] mb-1">
          <span>&gt; ssh {SITE.terminalname.toLocaleLowerCase()}@contact.host</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] font-mono">
          Contact & Network
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-mono">
          Open for {SITE.focus}
        </p>
      </div>

      {/* Main Terminal Contact Card */}
      <div className="rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-5 sm:p-8 font-mono space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Availability Status: Active
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] mt-1">
              Let&apos;s Build Something Impactful
            </h3>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
              Have an idea, project inquiry, or internship opening? Send a message directly.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap gap-2">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-xs hover:opacity-90 transition-opacity shadow-md"
            >
              <span>Send Email</span>
            </a>
            <a
              href={SITE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] text-xs font-bold transition-colors"
            >
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              name: "Email",
              val: SITE.email,
              href: `mailto:${SITE.email}`,
              icon: <CiMail />,
            },
            {
              name: "LinkedIn",
              val: SITE.linkedin,
              href: SITE.linkedin,
              icon: <CiLinkedin />,
            },
            {
              name: "GitHub",
              val: SITE.github,
              href: SITE.github,
              icon: <FaGithub />,
            },
          ].map((ch) => (
            <a
              key={ch.name}
              href={ch.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base">{ch.icon}</span>
                <div className="min-w-0">
                  <div className="text-[10px] text-[var(--color-text-subtle)] uppercase tracking-wider font-semibold">
                    {ch.name}
                  </div>
                  <div className="text-xs text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                    {ch.val}
                  </div>
                </div>
              </div>
              <span className="text-[var(--color-primary)] text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
