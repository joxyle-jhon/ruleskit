import type { PackConfig } from "./types";

// Eager-load every pack.config.ts under /packs/*/
const packModules = import.meta.glob("/packs/*/pack.config.ts", {
  eager: true,
}) as Record<string, { default: PackConfig }>;

// Eager-load every block file under /packs/*/blocks/**/*.md as raw text
const blockFiles = import.meta.glob("/packs/*/blocks/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Eager-load every config file (any extension) as raw text
const configFiles = import.meta.glob("/packs/*/configs/**/*", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Eager-load shared templates as raw
const templateFiles = import.meta.glob("/core/templates/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const packs: PackConfig[] = Object.entries(packModules)
  .map(([path, mod]) => ({ path, config: mod.default }))
  .sort((a, b) => {
    const order = ["frontend", "backend", "devops", "mobile"];
    return order.indexOf(a.config.id) - order.indexOf(b.config.id);
  })
  .map((x) => x.config);

export const registry = {
  getPacks(): PackConfig[] {
    return packs;
  },
  getStablePacks(): PackConfig[] {
    return packs.filter((p) => p.status === "stable");
  },
  getPack(id: string): PackConfig | undefined {
    return packs.find((p) => p.id === id);
  },
  getBlock(packId: string, blockName: string): string {
    const key = Object.keys(blockFiles).find(
      (k) => k === `/packs/${packId}/blocks/${blockName}.md`,
    );
    return key ? blockFiles[key] : "";
  },
  getFrameworkBlock(packId: string, file: string): string {
    const key = `/packs/${packId}/blocks/frameworks/${file}`;
    return blockFiles[key] ?? "";
  },
  getConfigFile(packId: string, relPath: string): string {
    const key = `/packs/${packId}/configs/${relPath}`;
    return configFiles[key] ?? "";
  },
  getTemplate(name: string): string {
    const key = `/core/templates/${name}.template.md`;
    return templateFiles[key] ?? "";
  },
};
