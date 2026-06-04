import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve paths relative to the CLI package root (one level up from dist/)
const PKG_ROOT = resolve(__dirname, "..");
const PACKS_DIR = join(PKG_ROOT, "packs");
const TEMPLATES_DIR = join(PKG_ROOT, "templates");

function readFile(path: string): string {
  if (!existsSync(path)) return "";
  return readFileSync(path, "utf-8");
}

export const registry = {
  getBlock(packId: string, blockName: string): string {
    return readFile(join(PACKS_DIR, packId, "blocks", `${blockName}.md`));
  },

  getFrameworkBlock(packId: string, file: string): string {
    return readFile(join(PACKS_DIR, packId, "blocks", "frameworks", file));
  },

  getConfigFile(packId: string, relPath: string): string {
    return readFile(join(PACKS_DIR, packId, "configs", relPath));
  },

  getTemplate(name: string): string {
    return readFile(join(TEMPLATES_DIR, `${name}.template.md`));
  },
};
