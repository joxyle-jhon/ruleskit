export type PackStatus = "stable" | "coming-soon";

export interface FrameworkOption {
  id: string;
  label: string;
  frameworkFile: string | null;
}

export interface OptionalBlock {
  id: string;
  label: string;
  default: boolean;
}

export interface ExtraOption {
  id: string;
  label: string;
  default: boolean;
}

export interface PackConfig {
  id: string;
  label: string;
  status: PackStatus;
  description: string;
  icon: string;
  source?: string;
  frameworks: FrameworkOption[];
  blocks: string[];
  optionalBlocks?: OptionalBlock[];
  extras: ExtraOption[];
}

export type OutputFormat = "cursorrules" | "mdc" | "skill";

export interface GeneratedFile {
  filename: string;
  content: string;
  language: string;
}

export interface GenerateOptions {
  packId: string;
  frameworkId: string;
  selectedOptionalBlocks: string[];
  extras: string[];
  formats: OutputFormat[];
}
