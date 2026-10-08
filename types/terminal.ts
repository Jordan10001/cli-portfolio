import type { ReactNode } from "react";

export type ThemeType = "green" | "purple" | "blue" | "red" | "yellow";

export interface CommandHistoryEntry {
  id: string;
  command: string;
  timestamp: string;
  output: ReactNode;
  isError?: boolean;
}

export interface CommandDefinition {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  category: "navigation" | "system" | "portfolio" | "custom";
}
