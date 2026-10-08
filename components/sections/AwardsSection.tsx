"use client";

import Image from "next/image";
import { awards } from "@/data/awards";

export function AwardsSection() {
  return (
    <section id="awards" className="py-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] mb-1">
            <span>&gt; inspect ~/achievements/trophies.dat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] font-mono">
            Awards & Certificates
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-mono">
            Hackathons, engineering challenges, & certificates.
          </p>
        </div>

      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
        {awards.map((item, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all flex flex-col justify-between"
          >
            {item.image && (
              <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
                <Image
                  src={item.image}
                  alt={`${item.event} certificate`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[var(--color-primary)] px-2 py-0.5 rounded bg-[var(--color-primary-muted)] border border-[var(--color-primary)]">
                  {item.title}
                </span>
                <span className="text-xs text-[var(--color-text-subtle)]">
                  {item.year}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text)] mb-2">
                {item.event}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-subtle)]">
              <span className="uppercase tracking-wider font-semibold">
                Category: {item.category}
              </span>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  View proof 
                </a>
              ) : (
                <span className="text-[var(--color-primary)]">verified</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
