import type { PackConfig } from "@/core/types";
const config: PackConfig = {
  id: "backend",
  label: "Backend",
  status: "stable",
  description: "API design, security, database, caching, and performance rules for backend engineers",
  icon: "server",
  source: "roadmap.sh/backend",
  frameworks: [
    { id: "agnostic", label: "Framework-agnostic", frameworkFile: null },
    { id: "laravel", label: "Laravel", frameworkFile: "laravel.md" },
    { id: "express", label: "Express.js", frameworkFile: "express.md" },
    { id: "nestjs", label: "NestJS", frameworkFile: null },
    { id: "fastify", label: "Fastify", frameworkFile: null },
    { id: "django", label: "Django", frameworkFile: null },
  ],
  blocks: [
    "api-design",
    "security",
    "database",
    "error-handling",
    "performance",
  ],
  optionalBlocks: [
    { id: "caching", label: "Caching strategies", default: true },
    { id: "architecture", label: "Code architecture", default: true },
  ],
  extras: [
    { id: "husky", label: "Husky pre-commit hook", default: true },
    { id: "backend-formatter", label: "Backend formatter (config file)", default: false },
    { id: "linter", label: "Linter (config file)", default: false },
    { id: "ai-prompt", label: "AI generation prompt", default: false },
  ],
};
export default config;
