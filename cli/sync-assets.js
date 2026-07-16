import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CLI_ROOT = __dirname;
const REPO_ROOT = resolve(CLI_ROOT, "..");
const PACKS_SRC = join(REPO_ROOT, "packs");
const TEMPLATES_SRC = join(REPO_ROOT, "core", "templates");
const PACKS_DEST = join(CLI_ROOT, "packs");
const TEMPLATES_DEST = join(CLI_ROOT, "templates");

function transformPackConfig(content) {
  return content
    .replace(/import type \{ PackConfig \} from ["']@\/core\/types["'];\s*\n?/g, "")
    .replace(/:\s*PackConfig\b/g, "");
}

function copyPackConfigTs(srcDir, destDir) {
  const name = "pack.config.ts";
  const srcPath = join(srcDir, name);
  if (!existsSync(srcPath)) return;
  const out = transformPackConfig(readFileSync(srcPath, "utf-8"));
  writeFileSync(join(destDir, name), out, "utf-8");
}

function syncPacks() {
  if (!existsSync(PACKS_SRC)) {
    throw new Error(`Missing packs source: ${PACKS_SRC}`);
  }

  if (existsSync(PACKS_DEST)) {
    rmSync(PACKS_DEST, { recursive: true, force: true });
  }
  mkdirSync(PACKS_DEST, { recursive: true });

  for (const packId of readdirSync(PACKS_SRC)) {
    const srcPack = join(PACKS_SRC, packId);
    if (!statSync(srcPack).isDirectory()) continue;

    const destPack = join(PACKS_DEST, packId);
    cpSync(srcPack, destPack, {
      recursive: true,
      filter: (src) => !src.endsWith("pack.config.ts"),
    });
    copyPackConfigTs(srcPack, destPack);
  }

  console.log("✓ Synced packs/ from repo");
}

function syncTemplates() {
  if (!existsSync(TEMPLATES_SRC)) {
    throw new Error(`Missing templates source: ${TEMPLATES_SRC}`);
  }

  if (existsSync(TEMPLATES_DEST)) {
    rmSync(TEMPLATES_DEST, { recursive: true, force: true });
  }
  cpSync(TEMPLATES_SRC, TEMPLATES_DEST, { recursive: true });
  console.log("✓ Synced templates/ from core/templates");
}

function syncMetadataFiles() {
  const licenseSrc = join(REPO_ROOT, "LICENSE");
  const readmeSrc = join(REPO_ROOT, "README.md");
  
  if (existsSync(licenseSrc)) {
    cpSync(licenseSrc, join(CLI_ROOT, "LICENSE"));
    console.log("✓ Copied LICENSE from repo root");
  }
  if (existsSync(readmeSrc)) {
    cpSync(readmeSrc, join(CLI_ROOT, "README.md"));
    console.log("✓ Copied README.md from repo root");
  }
}

syncPacks();
syncTemplates();
syncMetadataFiles();
