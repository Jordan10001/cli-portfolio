import React from "react";
import { SITE } from "@/data/site";
import { projects } from "@/data/projects";
import { capabilities } from "@/data/capabilities";
import { experiences } from "@/data/experience";
import { awards } from "@/data/awards";
import type { ThemeType } from "@/types/terminal";

export interface CommandContext {
  setTheme: (theme: ThemeType) => void;
  openProjectModal: (slug: string) => void;
  executeCommand: (cmd: string) => void;
  clearTerminal: () => void;
}

export function processCommand(rawInput: string, ctx: CommandContext): React.ReactNode {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case "help":
    case "?": {
      return (
        <div className="space-y-3 py-1 font-mono text-sm">
          <p className="text-[var(--color-primary-light)] font-semibold">
            {SITE.terminalname}&apos;s Portfolio Shell — Available Commands:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {[
              { cmd: "about", desc: "Profile summary & bio (whoami)" },
              { cmd: "projects", desc: "List documented projects" },
              { cmd: "project <slug>", desc: "Inspect specific project details" },
              { cmd: "skills", desc: "Technical capabilities & stack" },
              { cmd: "experience", desc: "Work & leadership timeline" },
              { cmd: "awards", desc: "Hackathons, competitions & honors" },
              { cmd: "contact", desc: "Email, LinkedIn, socials" },
              { cmd: "cv", desc: "View & download resume / CV" },
              { cmd: "theme <name>", desc: "Change theme (green|purple|blue|red)" },
              { cmd: "clear", desc: "Clear terminal buffer (Ctrl+L)" },
              { cmd: "date", desc: "Show current date & time" },
              { cmd: "echo <text>", desc: "Echo text to terminal" },
              { cmd: "sudo <command>", desc: "Execute command with elevated privileges" },              
            ].map((item) => (
              <button
                key={item.cmd}
                onClick={() => ctx.executeCommand(item.cmd)}
                type="button"
                className="flex flex-col text-left p-2 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer group"
              >
                <span className="text-[var(--color-primary)] font-bold group-hover:underline">
                  $ {item.cmd}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
          <p className="text-xs text-[var(--color-text-subtle)] mt-2">
            Tip: You can click any suggestion chip above, or use &uarr;/&darr; for history, Tab for auto-completion.
          </p>
        </div>
      );
    }

    case "whoami":
    case "about": {
      return (
        <div className="space-y-3 py-2 font-mono text-sm leading-relaxed border-l-2 border-[var(--color-primary)] pl-4 my-1 bg-[var(--color-primary-muted)]/20 p-3 rounded-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {SITE.name}
            </span>
            <span className="px-2 py-0.5 rounded text-xs bg-[var(--color-primary-muted)] text-[var(--color-primary)] border border-[var(--color-primary)]">
              GPA {SITE.gpa} / 4.00
            </span>
            <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {SITE.availabilityMessage}
            </span>
          </div>
          <p className="text-sm font-semibold text-[var(--color-text)]">
            {SITE.major} student · {SITE.university}
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {SITE.subheadline}
          </p>
          <div className="pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)] space-y-1">
            <p>
              <span className="text-[var(--color-text)]">Surabaya, Indonesia</span> · {SITE.university} {SITE.major} student
            </p>
            <p>
              <span className="text-[var(--color-text)]">Focus:</span> {SITE.focus}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => ctx.executeCommand("projects")}
              className="px-2.5 py-1 text-xs rounded bg-[var(--color-surface)] border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] transition-colors cursor-pointer"
            >
              Explore Projects &rarr;
            </button>
            <button
              onClick={() => ctx.executeCommand("contact")}
              className="px-2.5 py-1 text-xs rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            >
              Contact Me &rarr;
            </button>
            <a
              href={SITE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-xs rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors"
            >
              Download CV ↗
            </a>
          </div>
        </div>
      );
    }

    case "projects":
    case "project": {
      if (args.length > 0 && args[0] !== "all") {
        const slug = args[0].toLowerCase();
        const p = projects.find((item) => item.slug.toLowerCase() === slug || item.title.toLowerCase().includes(slug));
        if (p) {
          return (
            <div className="space-y-3 py-2 font-mono text-sm border border-[var(--color-border-bright)] bg-[var(--color-surface)] p-4 rounded-lg my-1">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h3 className="text-base font-bold text-[var(--color-primary)]">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {p.category} · {p.role}
                  </p>
                </div>
                <span className="px-2 py-0.5 text-xs rounded bg-[var(--color-primary-muted)] text-[var(--color-primary)] border border-[var(--color-primary)]">
                  {p.statusLabel}
                </span>
              </div>
              <p className="text-xs text-[var(--color-text)] leading-relaxed">
                {p.description}
              </p>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-[var(--color-primary-light)] font-semibold">Problem: </span>
                  <span className="text-[var(--color-text-muted)]">{p.problemsolved}</span>
                </p>
                <p>
                  <span className="text-[var(--color-primary-light)] font-semibold">Target Users: </span>
                  <span className="text-[var(--color-text-muted)]">{p.targetUsers}</span>
                </p>
                {p.outcome && (
                  <p>
                    <span className="text-[var(--color-primary-light)] font-semibold">Outcome: </span>
                    <span className="text-[var(--color-text-muted)]">{p.outcome}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[11px] bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => ctx.openProjectModal(p.slug)}
                  className="px-3 py-1 text-xs font-semibold rounded bg-[var(--color-primary)] text-[var(--color-background)] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  View Case Study Modal ⤢
                </button>
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                  >
                    Live Demo ↗
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)] transition-colors"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <div className="text-sm font-mono text-amber-400 py-1">
              Project &quot;{args[0]}&quot; not found. Type <span className="text-[var(--color-primary)] underline cursor-pointer" onClick={() => ctx.executeCommand("projects")}>projects</span> to see all available projects.
            </div>
          );
        }
      }

      return (
        <div className="space-y-3 py-2 font-mono text-sm">
          <div className="flex justify-between items-center">
            <p className="text-[var(--color-primary-light)] font-semibold">
              Documented Projects ({projects.length} builds):
            </p>
            <span className="text-xs text-[var(--color-text-subtle)]">
              Click any project to inspect
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {projects.map((p) => (
              <div
                key={p.slug}
                onClick={() => ctx.openProjectModal(p.slug)}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors truncate">
                      {p.title}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-muted)] shrink-0">
                      {p.statusLabel}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mb-2">
                    {p.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between text-[11px]">
                  <span className="text-[var(--color-text-subtle)] truncate max-w-[150px]">
                    {p.technologies.slice(0, 3).join(", ")}
                  </span>
                  <span className="text-[var(--color-primary)] font-semibold group-hover:translate-x-0.5 transition-transform">
                    inspect &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "skills":
    case "stack":
    case "capabilities": {
      return (
        <div className="space-y-4 py-2 font-mono text-sm">
          <p className="text-[var(--color-primary-light)] font-semibold">
            Technical Capabilities & Engineering Stack:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {capabilities.map((group) => (
              <div
                key={group.name}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[var(--color-border)]">
                  <span className="text-xs text-[var(--color-primary)] font-bold uppercase tracking-wider">
                    {group.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="px-2 py-0.5 rounded text-xs bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "experience":
    case "work": {
      return (
        <div className="space-y-3 py-2 font-mono text-sm">
          <p className="text-[var(--color-primary-light)] font-semibold">
            Work Experience & Leadership History:
          </p>
          <div className="space-y-2.5">
            {experiences.map((exp, idx) => (
              <div
                key={`${exp.organization}-${idx}`}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary-light)] transition-colors"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-bold text-[var(--color-primary)]">
                    {exp.role} @ {exp.organization}
                  </h4>
                  <span className="text-xs text-[var(--color-text-subtle)]">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mb-2">
                  {exp.description}
                </p>
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="text-xs text-[var(--color-text)] space-y-1 list-disc list-inside mb-2">
                    {exp.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="text-[var(--color-text-muted)]">
                        <span className="text-[var(--color-text)]">{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.skills && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-background)] text-[var(--color-primary-light)] border border-[var(--color-border)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "awards":
    case "certificates":
    case "achievements": {
      return (
        <div className="space-y-3 py-2 font-mono text-sm">
          <p className="text-[var(--color-primary-light)] font-semibold">
            Awards & Certificates:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {awards.map((a, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-[var(--color-primary)]">
                    {a.title}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-subtle)]">
                    {a.year}
                  </span>
                </div>
                <h5 className="text-xs font-semibold text-[var(--color-text)] mb-1">
                  {a.event}
                </h5>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "contact": {
      return (
        <div className="space-y-3 py-2 font-mono text-sm border-l-2 border-[var(--color-primary)] pl-4 my-1 bg-[var(--color-surface)] p-3 rounded-r">
          <p className="text-[var(--color-primary-light)] font-semibold">
            Get in touch with {SITE.terminalname}:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 p-2 rounded border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              <span></span>
              <span className="truncate">{SITE.email}</span>
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              <span></span>
              <span>{SITE.linkedin}</span>
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded border border-[var(--color-border)] hover:border-[var(--color-primary)] text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
            >
              <span></span>
              <span>{SITE.github}</span>
            </a>
          </div>
        </div>
      );
    }

    case "cv":
    case "resume": {
      return (
        <div className="space-y-2 py-2 font-mono text-sm">
          <p className="text-[var(--color-text)]">
            Curriculum Vitae / Resume is available for download:
          </p>
          <a
            href={SITE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--color-primary)] text-[var(--color-background)] font-bold text-xs hover:opacity-90 transition-opacity"
          >
            <span>Download CV (PDF) ↗</span>
          </a>
        </div>
      );
    }

    case "theme": {
      if (args.length > 0) {
        const targetTheme = args[0].toLowerCase() as ThemeType;
        if (["green", "purple", "blue", "red", "yellow"].includes(targetTheme)) {
          ctx.setTheme(targetTheme);
          return (
            <div className="text-sm font-mono py-1 text-[var(--color-primary)]">
              Switched terminal theme to <span className="font-bold underline">{targetTheme}</span>.
            </div>
          );
        } else {
          return (
            <div className="text-sm font-mono text-amber-400 py-1">
              Invalid theme &quot;{args[0]}&quot;. Choose from: <span className="text-[var(--color-primary)]">green</span>, <span className="text-[var(--color-primary)]">purple</span>, <span className="text-[var(--color-primary)]">blue</span>, <span className="text-[var(--color-primary)]">red</span>, <span className="text-[var(--color-primary)]">yellow</span>.
            </div>
          );
        }
      }

      return (
        <div className="space-y-2 py-2 font-mono text-sm">
          <p className="text-[var(--color-primary-light)] font-semibold">
            Select a terminal theme:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "green", name: "Matrix Green", color: "#10b981" },
              { id: "purple", name: "Cyber Purple", color: "#a855f7" },
              { id: "blue", name: "Arctic Blue", color: "#38bdf8" },
              { id: "red", name: "Crimson Red", color: "#f43f5e" },
              { id: "yellow", name: "Amber Yellow", color: "#eab308" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => ctx.setTheme(t.id as ThemeType)}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all cursor-pointer text-xs"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: t.color }}
                />
                <span className="text-[var(--color-text)] font-semibold">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      );
    }

    case "clear": {
      ctx.clearTerminal();
      return null;
    }

    case "github": {
      if (typeof window !== "undefined") {
        window.open(SITE.github, "_blank");
      }
      return (
        <div className="text-xs font-mono py-1 text-[var(--color-text-muted)]">
          Opening GitHub ({SITE.github})...
        </div>
      );
    }

    case "linkedin": {
      if (typeof window !== "undefined") {
        window.open(SITE.linkedin, "_blank");
      }
      return (
        <div className="text-xs font-mono py-1 text-[var(--color-text-muted)]">
          Opening LinkedIn ({SITE.linkedin})...
        </div>
      );
    }

    case "date": {
      return (
        <div className="text-xs font-mono py-1 text-[var(--color-text-muted)]">
          {new Date().toString()}
        </div>
      );
    }

    case "echo": {
      return (
        <div className="text-xs font-mono py-1 text-[var(--color-text)]">
          {args.join(" ")}
        </div>
      );
    }

    case "sudo": {
      return (
        <div className="text-xs font-mono text-red-400 py-1">
          Permission denied: User &apos;visitor&apos; is not in the sudoers file. This incident will be reported to {SITE.terminalname.toLocaleLowerCase()}!
        </div>
      );
    }

    default: {
      return (
        <div className="text-xs font-mono text-red-400 py-1">
          command not found: <span className="font-bold">{trimmed}</span>
          <br />
          <span className="text-[var(--color-text-muted)]">
            Type{" "}
            <button
              onClick={() => ctx.executeCommand("help")}
              className="text-[var(--color-primary)] underline hover:opacity-80 cursor-pointer"
            >
              help
            </button>{" "}
            to see available commands.
          </span>
        </div>
      );
    }
  }
}
