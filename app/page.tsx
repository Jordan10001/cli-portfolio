"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { SkillsMatrix } from "@/components/sections/SkillsMatrix";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProjectDetailModal } from "@/components/sections/ProjectDetailModal";
import { TerminalHeroSection } from "@/components/sections/TerminalHeroSection";

export default function HomePage() {
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-background)] text-[var(--color-text)] relative">
      {/* Background terminal grid pattern */}
      <div className="fixed inset-0 terminal-grid-bg pointer-events-none z-0 opacity-40" />

      {/* Navigation */}
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10 space-y-6">
        {/* Terminal Hero Section */}
        <TerminalHeroSection onOpenProject={(slug) => setSelectedProjectSlug(slug)} />

        {/* Projects Explorer */}
        <ProjectsExplorer onSelectProject={(slug) => setSelectedProjectSlug(slug)} />

        {/* Technical Skills Matrix */}
        <SkillsMatrix />

        {/* Career & Leadership Experience */}
        <ExperienceTimeline />

        {/* Awards & Hackathon Achievements */}
        <AwardsSection />

        {/* Contact Information & Channels */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Project Inspector Modal */}
      <ProjectDetailModal
        slug={selectedProjectSlug}
        onClose={() => setSelectedProjectSlug(null)}
      />
    </div>
  );
}
