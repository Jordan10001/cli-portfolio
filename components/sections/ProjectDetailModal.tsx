"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { pauseLenis, resumeLenis } from "@/components/providers/SmoothScrollProvider";
import { SITE } from "@/data/site";

interface ProjectDetailModalProps {
  slug: string | null;
  onClose: () => void;
}

export function ProjectDetailModal({ slug, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "proof">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (slug) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      pauseLenis();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
      resumeLenis();
    };
  }, [slug, onClose]);

  if (!slug) return null;

  const project: Project | undefined = projects.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) return null;

  return (
    <div
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs font-mono overscroll-contain lenis-prevent"
    >
      {/* Modal Dialog */}
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-[var(--color-border-bright)] bg-[var(--color-surface)] shadow-2xl overflow-hidden overscroll-contain lenis-prevent"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[var(--terminal-title-bg)] border-b border-[var(--color-border)] select-none shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              type="button"
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-110 flex items-center justify-center text-[10px] text-black/70 cursor-pointer"
              title="Close modal (Esc)"
            >
              &times;
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
            <span className="text-xs text-[var(--color-text-muted)] pl-2">
              inspect :: <span className="text-[var(--color-primary)] font-bold">{project.slug}</span>.json
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-primary-muted)] text-[var(--color-primary)] border border-[var(--color-primary)]">
              {project.statusLabel}
            </span>
            <button
              onClick={onClose}
              type="button"
              className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] px-2 py-0.5 rounded border border-[var(--color-border)] hover:border-[var(--color-primary)] cursor-pointer"
            >
              [ESC]
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[var(--color-background)] border-b border-[var(--color-border)] text-xs shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            type="button"
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              activeTab === "overview"
                ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-bold border border-[var(--color-border-bright)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            1. Overview & Context
          </button>
          {project.proofArtifacts && project.proofArtifacts.length > 0 && (
            <button
              onClick={() => setActiveTab("proof")}
              type="button"
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === "proof"
                  ? "bg-[var(--color-surface)] text-[var(--color-primary)] font-bold border border-[var(--color-border-bright)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              2. Visual Proof & Screenshots ({project.proofArtifacts.length})
            </button>
          )}
        </div>

        {/* Modal Content Scroll Area */}
        <div
          data-lenis-prevent="true"
          className="p-4 sm:p-6 overflow-y-auto space-y-6 text-xs sm:text-sm overscroll-contain lenis-prevent"
        >
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                {project.title}
              </h2>
              <span className="text-xs text-[var(--color-primary)]">
                [{project.category}]
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-subtle)]">
              Role: <span className="text-[var(--color-text)]">{project.role}</span> · {project.contribution}
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap gap-2 pt-1 border-b border-[var(--color-border)] pb-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-background)] hover:opacity-90 transition-opacity"
              >
                <span>Live Application</span>
                <span>↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
              >
                <span>{project.githubLabel || "GitHub Repository"}</span>
                <span>↗</span>
              </a>
            )}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] space-y-2">
                <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                  Summary
                </span>
                <p className="text-[var(--color-text)] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                  <span className="text-xs font-bold text-[var(--color-primary-light)]">
                    Target Users
                  </span>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {project.targetUsers}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                  <span className="text-xs font-bold text-[var(--color-primary-light)]">
                    Problem Solved
                  </span>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {project.problemsolved}
                  </p>
                </div>
              </div>

              {project.outcome && (
                <div className="p-3.5 rounded-lg bg-[var(--color-primary-muted)]/20 border border-[var(--color-primary)]/40">
                  <span className="text-xs font-bold text-[var(--color-primary)]">
                    Key Outcome & Verification
                  </span>
                  <p className="text-xs text-[var(--color-text)] mt-1">
                    {project.outcome}
                  </p>
                </div>
              )}

              {/* Technologies */}
              <div>
                <span className="text-xs font-bold text-[var(--color-text-muted)] block mb-2">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded text-xs bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-primary)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specific Builds */}
              {project.SpecificBuilds && (
                <div>
                  <span className="text-xs font-bold text-[var(--color-text-muted)] block mb-2">
                    SPECIFIC ARCHITECTURAL BUILDS
                  </span>
                  <ul className="space-y-1.5 list-disc list-inside text-xs text-[var(--color-text-muted)]">
                    {project.SpecificBuilds.map((item, i) => (
                      <li key={i} className="text-[var(--color-text)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Visual Proof */}
          {activeTab === "proof" && project.proofArtifacts && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.proofArtifacts.map((art, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden"
                  >
                    <div className="relative aspect-video w-full bg-[var(--color-surface)]">
                      <Image
                        src={art.src}
                        alt={art.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-2.5 text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
                      {art.caption}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[var(--terminal-title-bg)] border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-subtle)] shrink-0">
          <span>{SITE.terminalname}@portfolio: inspect mode</span>
          <button
            onClick={onClose}
            type="button"
            className="px-3 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-primary)] cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
