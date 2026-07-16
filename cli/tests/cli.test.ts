import { test, describe } from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";
import { join, resolve } from "node:path";
import { mkdtempSync, rmSync, existsSync, readFileSync, readdirSync } from "node:fs";
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

  test("fails loudly for unsupported backend pack", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--pack", "backend"], tempDir);
      
      assert.strictEqual(result.status, 1);
      assert.match(result.stderr, /Unknown pack: "backend"/);
      assert.match(result.stderr, /Available packs: frontend/);
      assert.strictEqual(readdirSync(tempDir).length, 0);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("fails loudly for unsupported claude format", () => {
    const tempDir = mkdtempSync(join(tmpdir(), "ruleskit-test-"));
    try {
      const result = runCLI(["--format", "claude"], tempDir);
      
      assert.strictEqual(result.status, 1);
      assert.match(result.stderr, /Unknown format: "claude"/);
      assert.match(result.stderr, /Available: cursorrules, mdc, skill, all/);
      assert.strictEqual(readdirSync(tempDir).length, 0);
    } finally {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });
});

