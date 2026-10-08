"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

interface ProjectsExplorerProps {
  onSelectProject: (slug: string) => void;
}

export function ProjectsExplorer({ onSelectProject }: ProjectsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Exclude private projects if marked
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesTech = p.technologies.some((t) => t.toLowerCase().includes(q));
        const matchesCat = p.category.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesTech || matchesCat;
      }

      return true;
    });
  }, [searchQuery]);

  return (
    <section id="projects" className="py-6 sm:py-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-primary)] mb-1">
            <span>&gt; ls -la ~/projects</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-primary-muted)] border border-[var(--color-primary)]">
              {filteredProjects.length} builds
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
            Documented Projects & Builds
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 font-mono">
            Networking System, Full-stack software, Analytics & Data Visualization.
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <div className="relative flex items-center">
            <span className="absolute left-3 text-xs text-[var(--color-text-subtle)] font-mono">
              /
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="grep tech, title..."
              aria-label="Search projects"
              className="w-full pl-7 pr-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-primary)] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.slug}
            className="flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all overflow-hidden group shadow-lg"
          >
            {/* Project Image Preview if available */}
            {project.screenshot ? (
              <div
                onClick={() => onSelectProject(project.slug)}
                className="relative aspect-video w-full bg-[var(--color-background)] overflow-hidden cursor-pointer border-b border-[var(--color-border)]"
              >
                <Image
                  src={project.screenshot}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />
                <span className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-[var(--color-primary-light)] border border-[var(--color-primary)]/40 backdrop-blur-xs">
                  {project.statusLabel}
                </span>
              </div>
            ) : (
              <div
                onClick={() => onSelectProject(project.slug)}
                className="h-24 w-full bg-[var(--color-background)] flex items-center justify-between p-4 cursor-pointer border-b border-[var(--color-border)]"
              >
                <span className="text-xs font-mono text-[var(--color-primary)]">
                  {project.slug}/
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                  {project.statusLabel}
                </span>
              </div>
            )}

            {/* Project Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-mono">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    onClick={() => onSelectProject(project.slug)}
                    className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors cursor-pointer truncate"
                  >
                    {project.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[var(--color-primary-light)] font-medium">
                  {project.category}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] rounded bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-subtle)]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded text-[var(--color-text-subtle)]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-xs">
                  <button
                    onClick={() => onSelectProject(project.slug)}
                    type="button"
                    className="text-[var(--color-primary)] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect details</span>
                    <span>&rarr;</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline"
                        title="Live application"
                      >
                        Demo ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:underline"
                        title="GitHub repository"
                      >
                        Code ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
