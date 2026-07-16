# ruleskit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/npm/v/ruleskit.svg)](https://www.npmjs.com/package/ruleskit)
[![CI Tests Status](https://github.com/joxyle-jhon/frontend-rules/workflows/CI%20Tests/badge.svg)](https://github.com/joxyle-jhon/frontend-rules/actions)

Instantly bootstrap tailored AI agent rules (`.cursorrules`, `.mdc`, `CLAUDE.md`, `SKILL.md`) for your codebase. Ensure that Cursor, Claude Code, Windsurf, and other AI coding assistants adhere strictly to your project's performance, design, and linter standards.

- 💻 **CLI:** Zero-config stack detection (`npx ruleskit init`)
- 🌐 **Web App:** Visual rules builder at [ruleskit.dev](https://ruleskit.dev)
- 🩺 **Doctor:** Automated rules setup verification (`npx ruleskit doctor`)

---

## ⚡ Quick Start

Bootstrap AI rules in your project root with a single, zero-config command:

```bash
npx ruleskit init
```

*ruleskit automatically inspects your repository dependencies (e.g. `package.json`, `composer.json`, `go.mod`, etc.) to detect your stack and write the correct files. If stack detection is ambiguous, it will fall back to an interactive prompt.*

### Manual CLI Overrides

Override the auto-detection by specifying flags:

```bash
# Generate Claude Code rules for Next.js
npx ruleskit init --pack frontend --framework nextjs --format claude

# Generate all formats for Laravel Backend with custom extras
npx ruleskit init --pack backend --framework laravel --format all --extras husky,linter

# Write files to a specific directory without lint/hook configs
npx ruleskit init --no-extras --out ./my-project-subdirectory
```

---

## 🩺 System Check: `ruleskit doctor`

Ensure that your development environment is correctly enforcing your rules. Run the doctor command in your repository root:

```bash
npx ruleskit doctor
```

It performs the following health checks:
1. **Rule Files Existence:** Verifies that at least one AI rules file is present.
2. **Git Tracking:** Warns if generated rule files are untracked by Git.
3. **Husky Config:** Checks if `.husky/pre-commit` exists, is marked executable, and is configured correctly in Git.
4. **CI Pipeline:** Checks if GitHub Actions is configured to run your linter/formatter on PRs.

The doctor output provides a clear checklist with actionable, one-line fixes for any failing item.

---

## 📦 Supported Packs & Frameworks

| Pack | Status | Supported Frameworks / Variants |
| :--- | :--- | :--- |
| **Frontend** | Stable | React, Next.js, Nuxt (Vue), SvelteKit, Angular, Vanilla |
| **Backend** | Stable | Express.js, NestJS, Fastify, Django (Python), Laravel (PHP), Go, Rust |
| **DevOps** | Coming soon | Docker, Kubernetes, GitHub Actions, Terraform |
| **Mobile** | Coming soon | React Native, Flutter, Swift, Kotlin |

---

## 🛠️ Supported Output Formats

| Format | Option Label | Target Tooling / AI Agent | Filename |
| :--- | :--- | :--- | :--- |
| **Cursor** | `cursorrules` | Cursor IDE (Legacy config) | `.cursorrules` |
| **Windsurf** | `mdc` | Cursor Rules Folder & Windsurf | `.cursor/rules/<pack>.mdc` |
| **Agent Skill** | `skill` | Agent Skill (Compatible agents) | `SKILL.md` |
| **Claude Code** | `claude` | Claude Code (Terminal CLI) | `CLAUDE.md` |

---

## ⚙️ CLI Reference

| Flag | Short | Description | Default |
| :--- | :--- | :--- | :--- |
| `--pack` | `-p` | Pack id (e.g. `frontend`, `backend`) | *Auto-detected* |
| `--framework`| `-f` | Framework variant (e.g. `nextjs`, `laravel`) | *Auto-detected* |
| `--format` | `-F` | Comma-separated output formats (`cursorrules`, `mdc`, `skill`, `claude`, or `all`) | `cursorrules` |
| `--extras` | `-e` | Comma-separated config extras | Pack defaults |
| `--no-extras`| — | Skip creating formatting / linting config files | — |
| `--out` | `-o` | Output directory | `.` (CWD) |
| `--help` | `-h` | Show help usage instructions | — |
| `--version` | `-v` | Show version | — |

### Available Extras
- **Frontend Pack:** `husky`, `eslint`, `stylelint`, `prettier`, `lighthouse`
- **Backend Pack:** `husky`, `backend-formatter`, `linter`, `ai-prompt`

---

## 🤝 Contributing (Local Development)

### 1. Web Application

The frontend dashboard is built using TanStack Start:

```bash
# Install dependencies
pnpm install

# Run the local development server
pnpm run dev

# Build for production deployment
pnpm run build
```

### 2. CLI Package

The CLI module lives under `cli/`. During local builds, it pulls the latest rules and templates from the root repository:

```bash
cd cli
npm install

# Sync assets and compile the TS codebase to dist/
npm run build

# Run local integration tests
npm test
```

To test the CLI globally on your machine:

```bash
cd cli
npm link
ruleskit init --help
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
