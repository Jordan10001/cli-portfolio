"use client";

import React from "react";
import { IoHelp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoProjectRoadmap } from "react-icons/go";
import { FiZap } from "react-icons/fi";
import { CiMedicalClipboard } from "react-icons/ci";
import { FaAward } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { PiReadCvLogoLight } from "react-icons/pi";
import { TbSunMoon } from "react-icons/tb";
import { FaBackspace } from "react-icons/fa";

interface QuickCommandsProps {
  onSelectCommand: (cmd: string) => void;
}

const QUICK_COMMANDS = [
  { label: "help", icon: <IoHelp /> },
  { label: "about", icon: <CgProfile /> },
  { label: "projects", icon: <GoProjectRoadmap />},
  { label: "skills", icon: <FiZap /> },
  { label: "experience", icon: <CiMedicalClipboard /> },
  { label: "awards", icon: <FaAward /> },
  { label: "contact", icon: <IoIosContact /> },
  { label: "cv", icon: <PiReadCvLogoLight /> },
  { label: "theme", icon: <TbSunMoon /> },
  { label: "clear", icon: <FaBackspace /> },
];

export function QuickCommands({ onSelectCommand }: QuickCommandsProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-3 bg-[var(--color-surface)] border-b border-[var(--color-border)] no-scrollbar text-xs font-mono">
      <span className="text-[11px] text-[var(--color-text-subtle)] font-bold shrink-0 hidden sm:inline">
        QUICK:
      </span>
      {QUICK_COMMANDS.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelectCommand(item.label)}
          className="flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] text-[var(--color-text-muted)] transition-all shrink-0 cursor-pointer text-xs"
        >
          <span className="text-[11px]">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
