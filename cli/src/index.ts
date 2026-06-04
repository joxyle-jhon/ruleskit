import { parseArgs } from "node:util";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { generate, getPack, getStablePacks } from "./generator.js";
import type { OutputFormat } from "./types.js";

const VALID_FORMATS: OutputFormat[] = ["cursorrules", "mdc", "skill"];

// ── Parse CLI arguments ──────────────────────────────────────────────
const { values } = parseArgs({
  options: {
    pack:       { type: "string",  short: "p", default: "frontend" },
    framework:  { type: "string",  short: "f", default: "agnostic" },
    format:     { type: "string",  short: "F", default: "cursorrules" },
    extras:     { type: "string",  short: "e" },
    "no-extras": { type: "boolean", default: false },
    out:        { type: "string",  short: "o", default: "." },
    help:       { type: "boolean", short: "h", default: false },
    version:    { type: "boolean", short: "v", default: false },
  },
  allowPositionals: true,
  strict: false,
});

// ── Version ──────────────────────────────────────────────────────────
if (values.version) {
  console.log("ruleskit v1.0.0");
  process.exit(0);
}

// ── Help ─────────────────────────────────────────────────────────────
if (values.help) {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║  ruleskit — AI rules for your stack      ║
  ╚══════════════════════════════════════════╝

  Usage:
    npx ruleskit init [options]

  Options:
    -p, --pack <name>        Pack to generate (default: "frontend")
    -f, --framework <id>     Framework variant (default: "agnostic")
    -F, --format <formats>   Output formats, comma-separated (default: "cursorrules")
                             Values: cursorrules, mdc, skill, all
    -e, --extras <ids>       Extra configs, comma-separated
                             Values: husky, eslint, stylelint, prettier, lighthouse
        --no-extras          Skip all extras
    -o, --out <dir>          Output directory (default: ".")
    -h, --help               Show this help
    -v, --version            Show version

  Examples:
    npx ruleskit init
    npx ruleskit init --pack frontend --framework nextjs --format mdc
    npx ruleskit init --format all --extras eslint,prettier
    npx ruleskit init --no-extras
  `);
  process.exit(0);
}

// ── Resolve options ──────────────────────────────────────────────────
const packId = (values.pack as string) ?? "frontend";
const frameworkId = (values.framework as string) ?? "agnostic";
const outDir = resolve(process.cwd(), (values.out as string) ?? ".");

// Validate pack exists
const pack = getPack(packId);
if (!pack) {
  const available = getStablePacks().map((p) => p.id).join(", ");
  console.error(`\n  ✗ Unknown pack: "${packId}"`);
  console.error(`    Available packs: ${available}\n`);
  process.exit(1);
}

// Validate framework
const validFw = pack.frameworks.find((f) => f.id === frameworkId);
if (!validFw) {
  const available = pack.frameworks.map((f) => f.id).join(", ");
  console.error(`\n  ✗ Unknown framework: "${frameworkId}"`);
  console.error(`    Available for ${packId}: ${available}\n`);
  process.exit(1);
}

// Parse formats
const formatStr = (values.format as string) ?? "cursorrules";
const formats: OutputFormat[] =
  formatStr === "all"
    ? [...VALID_FORMATS]
    : (formatStr.split(",").map((f) => f.trim()) as OutputFormat[]);

for (const f of formats) {
  if (!VALID_FORMATS.includes(f)) {
    console.error(`\n  ✗ Unknown format: "${f}"`);
    console.error(`    Available: ${VALID_FORMATS.join(", ")}, all\n`);
    process.exit(1);
  }
}

// Parse extras
let extras: string[];
if (values["no-extras"]) {
  extras = [];
} else if (values.extras) {
  extras = (values.extras as string).split(",").map((e) => e.trim());
} else {
  // Default: include all extras marked as default in the pack
  extras = pack.extras.filter((e) => e.default).map((e) => e.id);
}

// Parse optional blocks — include all defaults
const selectedOptionalBlocks = (pack.optionalBlocks ?? [])
  .filter((b) => b.default)
  .map((b) => b.id);

// ── Generate files ───────────────────────────────────────────────────
console.log(`
  ╔══════════════════════════════════════════╗
  ║  ruleskit — generating your rules        ║
  ╚══════════════════════════════════════════╝
`);
console.log(`  Pack:      ${pack.label}`);
console.log(`  Framework: ${validFw.label}`);
console.log(`  Formats:   ${formats.join(", ")}`);
console.log(`  Extras:    ${extras.length ? extras.join(", ") : "none"}`);
console.log(`  Output:    ${outDir}`);
console.log();

const files = generate({
  packId,
  frameworkId,
  selectedOptionalBlocks,
  extras,
  formats,
});

// ── Write files to disk ──────────────────────────────────────────────
for (const file of files) {
  const fullPath = resolve(outDir, file.filename);
  const dir = dirname(fullPath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(fullPath, file.content, "utf-8");
  console.log(`  ✓ ${file.filename}`);
}

console.log(`\n  ✔ Done! ${files.length} file${files.length === 1 ? "" : "s"} written.\n`);
