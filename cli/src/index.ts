import { parseArgs } from "node:util";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { generate, getPack, getStablePacks } from "./generator.js";
import type { OutputFormat } from "./types.js";
import { detectStack, promptForStack } from "./detector.js";
import { runDoctor } from "./doctor.js";

const VALID_FORMATS: OutputFormat[] = ["cursorrules", "mdc", "skill", "claude"];

async function main() {
  // ── Parse CLI arguments ──────────────────────────────────────────────
  const { values, positionals } = parseArgs({
    options: {
      pack: { type: "string", short: "p" },
      framework: { type: "string", short: "f" },
      format: { type: "string", short: "F", default: "cursorrules" },
      extras: { type: "string", short: "e" },
      "no-extras": { type: "boolean", default: false },
      out: { type: "string", short: "o", default: "." },
      help: { type: "boolean", short: "h", default: false },
      version: { type: "boolean", short: "v", default: false },
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
    npx ruleskit [command] [options]

  Commands:
    init                     Generate AI rules files (default)
    doctor                   Verify project rule enforcement setup

  Options:
    -p, --pack <name>        Pack to generate (e.g. "frontend", "backend")
    -f, --framework <id>     Framework variant (e.g. "nextjs", "laravel", "express")
    -F, --format <formats>   Output formats, comma-separated (default: "cursorrules")
                             Values: cursorrules, mdc, skill, claude, all
    -e, --extras <ids>       Extra configs, comma-separated
                             Values: husky, eslint, stylelint, prettier, lighthouse, backend-formatter, linter, ai-prompt
        --no-extras          Skip all extras
    -o, --out <dir>          Output directory (default: ".")
    -h, --help               Show this help
    -v, --version            Show version

  Examples:
    npx ruleskit init
    npx ruleskit init --pack backend --framework laravel --format claude
    npx ruleskit init --format all --extras eslint,prettier
    npx ruleskit doctor
    `);
    process.exit(0);
  }

  const command = positionals[0] ?? "init";

  if (command === "doctor") {
    console.log(`
  ╔══════════════════════════════════════════╗
  ║  ruleskit doctor — verifying setup       ║
  ╚══════════════════════════════════════════╝
    `);

    const results = runDoctor(process.cwd());
    let hasFailures = false;

    for (const r of results) {
      if (r.status === "pass") {
        console.log(`  ✓ ${r.title}\n    ${r.message}\n`);
      } else if (r.status === "warn") {
        console.log(`  ⚠ ${r.title}\n    ${r.message}`);
        if (r.fix) {
          console.log(`    💡 Fix: ${r.fix}`);
        }
        console.log();
      } else {
        console.log(`  ✗ ${r.title}\n    ${r.message}`);
        if (r.fix) {
          console.log(`    💡 Fix: ${r.fix}`);
        }
        console.log();
        hasFailures = true;
      }
    }

    if (hasFailures) {
      console.log("  ✗ doctor: Verification failed. Some required rule configurations are missing or broken.\n");
      process.exit(1);
    } else {
      console.log("  ✔ doctor: Verification passed! Your project rules setup is fully functional.\n");
      process.exit(0);
    }
  }

  if (command !== "init") {
    console.error(`\n  ✗ Unknown command: "${command}"\n`);
    process.exit(1);
  }

  // ── Resolve options ──────────────────────────────────────────────────
  let packId = values.pack as string | undefined;
  let frameworkId = values.framework as string | undefined;

  if (!packId && !frameworkId) {
    // Try to auto-detect
    const detected = detectStack(process.cwd());
    if (detected) {
      packId = detected.packId;
      frameworkId = detected.frameworkId;
      console.log(`\n  ✓ Auto-detected project stack: pack "${packId}", framework "${frameworkId}"`);
    } else {
      // Fallback to prompt
      const prompted = await promptForStack();
      packId = prompted.packId;
      frameworkId = prompted.frameworkId;
    }
  } else {
    // If only one is provided, fill default
    packId = packId ?? "frontend";
    frameworkId = frameworkId ?? "agnostic";
  }

  const outDir = resolve(process.cwd(), (values.out as string) ?? ".");

  // Validate pack exists
  const pack = getPack(packId);
  if (!pack) {
    const available = getStablePacks()
      .map((p) => p.id)
      .join(", ");
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
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
