import type { PackConfig } from "@/core/types";

const config: PackConfig = {
  id: "fullstack",
  label: "Full-Stack",
  status: "stable",
  description: "End-to-end rules bridging UI performance, API design, security, database hygiene, and AI self-healing",
  icon: "layers",
  source: "roadmap.sh/full-stack",
  frameworks: [
    { id: "agnostic", label: "Framework-agnostic", frameworkFile: null },
    { id: "nextjs", label: "Next.js (React)", frameworkFile: "nextjs.md" },
    { id: "nuxt", label: "Nuxt (Vue)", frameworkFile: "nuxt.md" },
    { id: "sveltekit", label: "SvelteKit", frameworkFile: "sveltekit.md" },
    { id: "laravel", label: "Laravel (PHP)", frameworkFile: "laravel.md" },
  ],
  blocks: [
    "general",
    "frontend",
    "backend",
    "database",
  ],
  optionalBlocks: [
    { id: "healing", label: "AI self-healing workflow", default: true },
  ],
  extras: [
    { id: "husky", label: "Husky pre-commit hook", default: true },
    { id: "linter", label: "Linter (ESLint/Flake8/etc.)", default: true },
    { id: "prettier", label: "Prettier formatter", default: true },
  ],
};

export default config;
