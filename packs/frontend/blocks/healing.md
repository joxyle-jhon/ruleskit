## Self-Healing System

Self-healing is a separate layer on top of the rules delivery system. It runs in 3 levels, each opt-in via the CLI and website:

- `devkit init --with-healing=1` (Level 1 only)
- `devkit init --with-healing=2` (Level 1 + 2)
- `devkit init --with-healing=3` (All levels - full self-healing)
- `devkit watch` (Starts the Level 3 background agent)

### Level 1 — Auto-fix on save (editor-level, no AI)

- **What it does**: Developer saves a file → ESLint + Stylelint + Prettier auto-fix silently in the background before the file is even staged.
- **How it works**: devkit generates editor config files that enable format-on-save and lint-fix-on-save for all major editors.
- **Generated `.vscode/settings.json`**:
  ```json
  {
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.fixAll.stylelint": "explicit"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact",
      "vue",
      "svelte"
    ],
    "stylelint.validate": ["css", "scss", "vue"]
  }
  ```
- **Generated `.zed/settings.json`**:
  ```json
  {
    "format_on_save": "on",
    "formatter": "prettier",
    "languages": {
      "TypeScript": { "format_on_save": "on" },
      "TSX": { "format_on_save": "on" },
      "CSS": { "format_on_save": "on" }
    }
  }
  ```
- **Generated `.editorconfig`**:

  ```ini
  root = true

  [*]
  indent_style = space
  indent_size = 2
  end_of_line = lf
  charset = utf-8
  trim_trailing_whitespace = true
  insert_final_newline = true

  [*.md]
  trim_trailing_whitespace = false
  ```

- **Level 1 Rules**:
  - Never silently change code logic — only formatting and fixable lint rules.
  - Auto-fix must be reversible via Ctrl+Z.
  - Must not run on files listed in `.gitignore` or `.devkitignore`.
  - Show a status bar indicator in VS Code when fixing is active.

### Level 2 — AI-powered pre-commit healing (git hook level)

- **What it does**: Developer commits → pre-commit hook runs lint-staged → if violations remain after auto-fix → AI agent patches the file → re-runs lint to verify → if green, re-stages and commits → if still failing after 3 attempts, blocks commit and shows diff.
- **How it works**: The Husky pre-commit hook is extended with an AI healing step that calls the Anthropic API with the violation + file context.
- **Extended `.husky/pre-commit`**:

  ```sh
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  echo "devkit: running pre-commit checks..."

  # Step 1: run lint-staged auto-fix
  npx lint-staged

  # Step 2: if lint-staged exits with errors, run AI healing
  if [ $? -ne 0 ]; then
    echo "devkit: lint violations found — running AI healing..."
    node .devkit/heal.js --stage pre-commit

    # Step 3: re-run lint to verify the fix
    npx lint-staged

    if [ $? -ne 0 ]; then
      echo "devkit ✗ AI healing failed — review .devkit/heal.log"
      exit 1
    fi

    echo "devkit ✓ AI healing applied — review changes before pushing"
  fi
  ```

- **`.devkit/heal.js` (core healing agent)**:
  Follows this pipeline for every violation:
  1. **DETECT**: Run ESLint / Stylelint with `--format json` to get structured output and extract `{ file, line, column, ruleId, message, source }`.
  2. **CONTEXT**: Read the full file content, read the relevant rule block from the active pack, and build the prompt:
     - **SYSTEM**: You are a frontend code healer. Fix ONLY the violation described. Do not change anything else. Return ONLY the corrected file content. No explanation, no markdown, no preamble. The fix must pass ESLint rule: `{ruleId}`.
     - **USER**: File: `{filename}`, Violation: `{message}` at line `{line}:{column}`, Rule reference: `{ruleBlock excerpt}`. Current file content: `{fileContent}`. Return the corrected file content only.
  3. **GENERATE**: Call Anthropic API (`claude-sonnet-4-20250514`) and parse response as corrected file content.
  4. **VERIFY**: Write corrected content to a temp file, re-run ESLint on it. If violations remain, retry (max 3 attempts). If still failing, abort, log, and show diff.
  5. **APPLY**: Overwrite original file, stage it (`git add {filename}`), and log to `.devkit/heal.log` with timestamp, file, ruleId, and attempts.
  6. **NEVER auto-apply fixes to**: Files matching patterns in `.devkitignore`, files with git conflicts, files changed by another process in the last 500ms, logic changes (formatting/lint only), or any fix changing >20% of the file.
- **Healing Safety Rules**:
  - Every fix is verified by re-running the linter before applying.
  - Fixes that introduce new violations are rejected.
  - Human review is always required before pushing (Level 2 never auto-pushes).
  - All healing activity is logged to `.devkit/heal.log`.
  - Developer can review the exact diff: `devkit diff --last`.
  - Developer can undo the last heal: `devkit undo --last`.
  - Max 3 retry attempts per violation — never infinite loops.

### Level 3 — Background file watcher agent (devkit watch)

- **What it does**: Developer writes code → background agent watches all files in real time → detects rule violations as they are written → suggests or auto-applies fixes immediately → logs all healing activity → surfaces a summary at the end of each session.
- **How it works**: Uses `chokidar` v5 (ESM-only, Node 20+) to watch file changes. On each change, runs the same detect → context → generate → verify → apply pipeline in real time. Run with `npx devkit watch` or add to `package.json`: `"dev:heal": "devkit watch & vite"`.
- **`packages/cli/watch.js`**:

  ```javascript
  import chokidar from "chokidar";
  import { heal } from "../.devkit/heal.js";
  import { log } from "../.devkit/logger.js";

  const WATCH_PATTERNS = ["src/**/*.{ts,tsx,js,jsx,vue,svelte}", "src/**/*.{css,scss}"];

  const IGNORE_PATTERNS = [
    "**/node_modules/**",
    "**/.git/**",
    "**/dist/**",
    "**/.next/**",
    "**/.devkit/**",
  ];

  const watcher = chokidar.watch(WATCH_PATTERNS, {
    ignored: IGNORE_PATTERNS,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  });

  watcher.on("change", async (filePath) => {
    const violations = await lint(filePath);
    if (violations.length === 0) return;

    log.detected(filePath, violations);

    for (const violation of violations) {
      const result = await heal({ filePath, violation, mode: "watch" });

      if (result.status === "healed") {
        log.healed(filePath, violation.ruleId);
      } else if (result.status === "failed") {
        log.failed(filePath, violation.ruleId, result.reason);
      }
    }
  });

  watcher.on("error", (error) => log.error(error));

  process.on("SIGINT", () => {
    watcher.close();
    log.sessionSummary();
    process.exit(0);
  });
  ```

- **Healing modes for Level 3**:
  - `devkit watch --mode suggest` (shows fix in terminal, developer applies)
  - `devkit watch --mode auto` (applies fix automatically, default)
  - `devkit watch --mode log` (logs only, no fixes applied)
- **`.devkit/logger.js` — session summary format**:
  ```text
  devkit session summary
  ─────────────────────────────────────────
  Duration      : 2h 14m
  Files watched : 47
  Violations    : 23
  Auto-healed   : 19  (82%)
  Failed        : 4   (review .devkit/heal.log)
  Rules healed  :
    [CSS]  unit-disallowed-list            × 8
    [JS]   no-console                      × 5
    [JS]   import/no-cycle                 × 4
    [A11Y] jsx-a11y/alt-text               × 2
  ─────────────────────────────────────────
  ```

### Devkit Ignore File — `.devkitignore`

Developers can exclude files from all healing levels:

```text
# .devkitignore
node_modules/
dist/
.next/
coverage/
**/*.generated.ts
**/*.d.ts
src/legacy/**
public/
```

### Healing Log — `.devkit/heal.log`

All healing activity is written here in append-only format. Never auto-deleted. Developers review it like a git log.

- **Log Format**:
  `2026-06-04T10:23:11Z | HEALED  | src/Button.tsx      | jsx-a11y/alt-text    | attempt 1`
- **CLI commands**:
  - `devkit log` (show last 20 entries)
  - `devkit log --all` (show full history)
  - `devkit log --failed` (show only failed heals)
  - `devkit diff --last` (show diff of last healed file)
  - `devkit undo --last` (revert last heal using git checkout)
  - `devkit stats` (show healing stats across all sessions)

### Self-Healing Best Practices

- **VERIFY BEFORE APPLY**: Every AI-generated fix is re-linted before being written to disk. A fix introducing a new violation is rejected entirely.
- **MAX 3 ATTEMPTS PER VIOLATION**: If the agent cannot fix a violation in 3 attempts, it logs the failure and surfaces it to the developer.
- **MINIMAL DIFF PRINCIPLE**: The agent changes only what is necessary to resolve the violation. If a fix changes more than 20% of a file, it is rejected.
- **HUMAN IS ALWAYS IN THE LOOP**: Level 2 requires review before push; Level 3 suggest requires human input; Level 3 auto mode is undoable at any time.
- **NEVER FIX WHAT YOU DON'T UNDERSTAND**: If the violation involves business logic, architecture, or complex patterns, the agent logs `NEEDS_HUMAN` and skips it.
- **LOG EVERYTHING**: Success and failure are logged with timestamp, file, rule, and attempt count.
- **RESPECT IGNORES**: `.devkitignore`, `.gitignore`, and `.eslintignore` are all respected.
