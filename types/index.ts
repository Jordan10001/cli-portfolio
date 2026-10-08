export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  problemsolved?: string;
  targetUsers: string;
  role: string;
  contribution: string;
  technologies: string[];
  statusLabel: "Live" | "In Development" | "Prototype" | "Academic" | "Competition";
  outcome?: string;
  screenshot?: string;
  liveUrl?: string;
  githubUrl?: string;
  githubLabel?: string;
  proofArtifacts?: ProjectArtifact[];
  SpecificBuilds?: string[];
}

export interface ProjectArtifact {
  src: string;
  alt: string;
  caption: string;
  kind?: "image" | "video";
  poster?: string;
}

export interface Experience {
  organization: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  skills?: string[];
}

export interface Award {
  title: string;
  event: string;
  year: string;
  description: string;
  category: string;
  image?: string;
  link?: string;
}

export interface CapabilityGroup {
  name: string;
  items: {
    name: string;
    description?: string;
  }[];
}

export interface SiteConfig {
  name: string;
  degree: string;
  university: string;
  major: string;
  gpa: number;
  focus: string;
  image: string;
  description: string;
  url: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  cvUrl: string;
  availabilityMessage: string;
  terminalname: string;
  subheadline: string;
}

