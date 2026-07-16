import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

export interface CheckResult {
  status: "pass" | "warn" | "fail";
  title: string;
  message: string;
  fix?: string;
}

export function runDoctor(projectDir: string): CheckResult[] {
  const results: CheckResult[] = [];

  // Helper to run commands
  const runCmd = (cmd: string, args: string[]) => {
    return spawnSync(cmd, args, { cwd: projectDir, encoding: "utf-8" });
  };

  // ── Check 1: Rule Files Existence ────────────────────────────────────
  const ruleFiles: string[] = [];
  if (existsSync(join(projectDir, ".cursorrules"))) ruleFiles.push(".cursorrules");
  if (existsSync(join(projectDir, "SKILL.md"))) ruleFiles.push("SKILL.md");
  if (existsSync(join(projectDir, "CLAUDE.md"))) ruleFiles.push("CLAUDE.md");
  
  const mdcDir = join(projectDir, ".cursor", "rules");
  if (existsSync(mdcDir)) {
    try {
      const files = readdirSync(mdcDir).filter(f => f.endsWith(".mdc"));
      for (const f of files) {
        ruleFiles.push(join(".cursor", "rules", f));
      }
    } catch {
      // ignore
    }
  }

  if (ruleFiles.length === 0) {
    results.push({
      status: "fail",
      title: "Rule Files Existence",
      message: "No AI rules files found in this project.",
      fix: "Run 'npx ruleskit init' to generate rule files.",
    });
  } else {
    results.push({
      status: "pass",
      title: "Rule Files Existence",
      message: `Found rule files: ${ruleFiles.join(", ")}`,
    });

    // ── Check 2: Git Tracking (only run if rule files exist) ──────────────
    const untracked: string[] = [];
    // Check if git repository first
    const isGit = existsSync(join(projectDir, ".git"));
    if (isGit) {
      for (const file of ruleFiles) {
        const checkGit = runCmd("git", ["ls-files", "--error-unmatch", file]);
        if (checkGit.status !== 0) {
          untracked.push(file);
        }
      }

      if (untracked.length > 0) {
        results.push({
          status: "warn",
          title: "Git Tracking",
          message: `The following rule files are not tracked by git: ${untracked.join(", ")}`,
          fix: `Run 'git add ${untracked.join(" ")}' to track them.`,
        });
      } else {
        results.push({
          status: "pass",
          title: "Git Tracking",
          message: "All rule files are tracked in git.",
        });
      }
    } else {
      results.push({
        status: "warn",
        title: "Git Tracking",
        message: "Not a git repository. Git tracking status check skipped.",
        fix: "Run 'git init' to initialize a git repository.",
      });
    }
  }

  // ── Check 3: Husky Config ───────────────────────────────────────────
  const huskyPath = join(projectDir, ".husky", "pre-commit");
  if (existsSync(huskyPath)) {
    let executable = true;
    
    // Check executable on non-Windows platforms
    if (process.platform !== "win32") {
      try {
        const stats = statSync(huskyPath);
        executable = (stats.mode & 0o111) !== 0;
      } catch {
        executable = false;
      }
    }

    // Check git config core.hooksPath
    const isGit = existsSync(join(projectDir, ".git"));
    let hooksPathConfigured = true;
    if (isGit) {
      const gitHooks = runCmd("git", ["config", "core.hooksPath"]);
      const stdout = (gitHooks.stdout ?? "").trim();
      hooksPathConfigured = stdout.includes(".husky");
    }

    if (!executable) {
      results.push({
        status: "fail",
        title: "Husky Executable Check",
        message: ".husky/pre-commit is not executable.",
        fix: "Run 'chmod +x .husky/pre-commit' or 'git update-index --chmod=+x .husky/pre-commit'.",
      });
    } else if (!hooksPathConfigured) {
      results.push({
        status: "fail",
        title: "Husky Git Hooks Path",
        message: "Husky is present but git is not configured to use .husky for hooks.",
        fix: "Run 'npx husky' to configure git hooks path.",
      });
    } else {
      results.push({
        status: "pass",
        title: "Husky Configuration",
        message: "Husky pre-commit hook is present, executable, and correctly configured in git.",
      });
    }
  } else {
    // Check if husky folder exists or is part of project configuration
    results.push({
      status: "warn",
      title: "Husky Hook Verification",
      message: ".husky/pre-commit hook was not found in this project.",
      fix: "Run 'npx ruleskit init --extras husky' to add pre-commit rule verification.",
    });
  }

  // ── Check 4: CI Workflow ────────────────────────────────────────────
  const workflowsDir = join(projectDir, ".github", "workflows");
  if (existsSync(workflowsDir)) {
    try {
      const files = readdirSync(workflowsDir).filter(f => f.endsWith(".yml") || f.endsWith(".yaml"));
      let runsLinter = false;
      
      for (const f of files) {
        const content = readFileSync(join(workflowsDir, f), "utf-8").toLowerCase();
        if (
          content.includes("lint") ||
          content.includes("format") ||
          content.includes("eslint") ||
          content.includes("stylelint") ||
          content.includes("prettier")
        ) {
          runsLinter = true;
          break;
        }
      }

      if (files.length === 0) {
        results.push({
          status: "warn",
          title: "CI Workflow Linter",
          message: "No workflow configuration files found in .github/workflows/.",
          fix: "Create a workflow file (e.g. ci.yml) in .github/workflows/ that runs your linter.",
        });
      } else if (!runsLinter) {
        results.push({
          status: "warn",
          title: "CI Workflow Linter",
          message: "GitHub Actions workflow files found, but none of them appear to run a linter or formatter.",
          fix: "Add a step to your workflow (e.g., 'run: npm run lint') to enforce rules on PRs.",
        });
      } else {
        results.push({
          status: "pass",
          title: "CI Workflow Linter",
          message: "Found GitHub Actions workflow enforcing rules and/or code style checks.",
        });
      }
    } catch {
      results.push({
        status: "warn",
        title: "CI Workflow Linter",
        message: "Unable to read .github/workflows directory.",
      });
    }
  } else {
    results.push({
      status: "warn",
      title: "CI Workflow Linter",
      message: "No GitHub Actions workflow directory found.",
      fix: "Set up a CI workflow in '.github/workflows/ci.yml' to automatically run your linter/formatter on pull requests.",
    });
  }

  return results;
}
