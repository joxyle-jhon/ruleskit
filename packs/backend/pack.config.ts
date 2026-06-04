import type { PackConfig } from "@/core/types";
const config: PackConfig = {
  id: "backend",
  label: "Backend",
  status: "coming-soon",
  description: "API design, security, caching, and performance rules for backend engineers",
  icon: "server",
  frameworks: [
    { id: "agnostic", label: "Framework-agnostic", frameworkFile: null },
    { id: "express", label: "Express", frameworkFile: null },
    { id: "nestjs", label: "NestJS", frameworkFile: null },
    { id: "fastify", label: "Fastify", frameworkFile: null },
    { id: "django", label: "Django", frameworkFile: null },
    { id: "laravel", label: "Laravel", frameworkFile: null },
  ],
  blocks: [],
  extras: [],
};
export default config;
