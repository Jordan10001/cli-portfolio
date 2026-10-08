"use client"

import Image from "next/image";
import { SITE } from "@/data/site";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";

interface TerminalHeroSectionProps {
    onOpenProject: (slug: string) => void;
}

export function TerminalHeroSection({ onOpenProject }: TerminalHeroSectionProps) {
  return (
    <section id="terminal" className="pt-6 sm:pt-10 space-y-6">
        {/* Developer System Intro Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/70 backdrop-blur-xs font-mono text-xs">
        <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[var(--color-primary)] shrink-0 bg-[var(--color-background)]">
            <Image
                src={SITE.image}
                alt={SITE.name}
                fill
                className="object-cover"
                priority
            />
            </div>
            <div>
            <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-[var(--color-text)]">
                {SITE.name}
                </h1>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-emerald-400 font-semibold">
                AVAILABLE
                </span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)]">
                {SITE.major} student · {SITE.university} · {SITE.availabilityMessage}
            </p>
            </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <div className="px-2.5 py-1 rounded bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
            GPA: <span className="text-[var(--color-primary)] font-bold">{SITE.gpa}</span>/4.00
            </div>
            <a
            href={SITE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-[var(--color-primary)] text-[var(--color-background)] font-bold hover:opacity-90 transition-opacity"
            >
            Resume ↗
            </a>
        </div>
        </div>

        {/* Interactive Terminal Window */}
        <TerminalWindow onOpenProject={onOpenProject} />
    </section>
  );
}