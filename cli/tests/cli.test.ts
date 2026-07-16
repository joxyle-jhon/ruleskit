import { test, describe } from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";

const CLI_PATH = resolve(import.meta.dirname, "../dist/index.js");

function runCLI(args: string[], cwd: string) {
  return spawnSync(process.execPath, [CLI_PATH, ...args], {
    cwd,
    encoding: "utf-8",
  });
}

describe("ruleskit CLI integration tests", () => {
  test("successfully generates .cursorrules for frontend pack", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "frontend", "--framework", "agnostic", "--format", "cursorrules"], tempDir);
      
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /Done!/);
      
      const expectedFile = join(tempDir, ".cursorrules");
      assert.ok(existsSync(expectedFile), ".cursorrules should exist");
      
      const content = readFileSync(expectedFile, "utf-8");
      assert.match(content, /ruleskit — Frontend Rules/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("successfully generates backend pack rules", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "backend", "--framework", "agnostic", "--format", "cursorrules"], tempDir);
      
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /Done!/);
      
      const expectedFile = join(tempDir, ".cursorrules");
      assert.ok(existsSync(expectedFile), ".cursorrules should exist");
      
      const content = readFileSync(expectedFile, "utf-8");
      assert.match(content, /ruleskit — Backend Rules/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("successfully generates fullstack pack rules", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "fullstack", "--framework", "agnostic", "--format", "cursorrules"], tempDir);
      
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /Done!/);
      
      const expectedFile = join(tempDir, ".cursorrules");
      assert.ok(existsSync(expectedFile), ".cursorrules should exist");
      
      const content = readFileSync(expectedFile, "utf-8");
      assert.match(content, /ruleskit — Full-Stack Rules/);
      assert.match(content, /Frontend Excellence/);
      assert.match(content, /Backend Excellence/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
  test("successfully generates CLAUDE.md when format is claude", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "frontend", "--framework", "agnostic", "--format", "claude"], tempDir);
      
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /Done!/);
      
      const expectedFile = join(tempDir, "CLAUDE.md");
      assert.ok(existsSync(expectedFile), "CLAUDE.md should exist");
      
      const content = readFileSync(expectedFile, "utf-8");
      assert.match(content, /CLAUDE: Frontend Rules/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("auto-detects Next.js project and runs zero-config", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      // Create mock package.json with next dependency
      writeFileSync(
        join(tempDir, "package.json"),
        JSON.stringify({
          dependencies: {
            next: "^14.0.0",
          },
        }),
      );

      const result = runCLI([], tempDir);
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /Auto-detected project stack: pack "frontend", framework "nextjs"/);
      
      const expectedFile = join(tempDir, ".cursorrules");
      assert.ok(existsSync(expectedFile), ".cursorrules should exist");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("auto-detects Laravel project and runs zero-config", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      // Create mock composer.json with laravel/framework dependency
      writeFileSync(
        join(tempDir, "composer.json"),
        JSON.stringify({
          require: {
            "laravel/framework": "^10.0.0",
          },
        }),
      );

      const result = runCLI([], tempDir);
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /Auto-detected project stack: pack "backend", framework "laravel"/);
      
      const expectedFile = join(tempDir, ".cursorrules");
      assert.ok(existsSync(expectedFile), ".cursorrules should exist");
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("fails loudly for invalid pack flag", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "non-existent-pack"], tempDir);
      
      assert.strictEqual(result.status, 1);
      assert.match(result.stderr, /Unknown pack: "non-existent-pack"/);
      assert.strictEqual(readdirSync(tempDir).length, 0);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("fails loudly for invalid format flag", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "frontend", "--format", "invalid-format"], tempDir);
      
      assert.strictEqual(result.status, 1);
      assert.match(result.stderr, /Unknown format: "invalid-format"/);
      assert.strictEqual(readdirSync(tempDir).length, 0);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("doctor command fails when no rule files are present", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["doctor"], tempDir);
      assert.strictEqual(result.status, 1);
      assert.match(result.stdout, /✗ Rule Files Existence/);
      assert.match(result.stdout, /No AI rules files found/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("doctor command passes when rules are correctly present", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      // First generate frontend rules
      runCLI(["--pack", "frontend", "--framework", "agnostic", "--format", "cursorrules"], tempDir);
      
      // Run doctor
      const result = runCLI(["doctor"], tempDir);
      assert.strictEqual(result.status, 0);
      assert.match(result.stdout, /✓ Rule Files Existence/);
      assert.match(result.stdout, /Found rule files: \.cursorrules/);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
