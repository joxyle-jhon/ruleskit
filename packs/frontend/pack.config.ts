import type { PackConfig } from "@/core/types";

const config: PackConfig = {
  id: "frontend",
  label: "Frontend",
  status: "stable",
  description: "Performance, design, and DX rules for frontend engineers",
  icon: "layout",
  source: "roadmap.sh/frontend-performance-best-practices",
  frameworks: [
    { id: "agnostic", label: "Framework-agnostic", frameworkFile: null },
    { id: "nextjs", label: "Next.js", frameworkFile: "nextjs.md" },
    { id: "nuxt", label: "Nuxt", frameworkFile: "nuxt.md" },
    { id: "sveltekit", label: "SvelteKit", frameworkFile: "sveltekit.md" },
    { id: "angular", label: "Angular", frameworkFile: "angular.md" },
    { id: "vanilla", label: "Vanilla JS", frameworkFile: null },
  ],
  blocks: [
    "html",
    "css",
    "javascript",
    "comments",
    "healing",
    "images",
    "fonts",
    "network",
    "web-vitals",
  ],
  optionalBlocks: [{ id: "design", label: "Design principles", default: true }],
  extras: [
    { id: "husky", label: "Husky + lint-staged", default: true },
    { id: "eslint", label: "ESLint", default: true },
    { id: "stylelint", label: "Stylelint", default: true },
    { id: "prettier", label: "Prettier", default: true },
    { id: "lighthouse", label: "Lighthouse CI budget", default: false },
  ],
};

export default config;
