# Contributing to ruleskit

Thank you for your interest in contributing to ruleskit! We welcome contributions of all forms, including bug reports, new framework packs, improved rules, and new features.

---

## 🗺️ Project Architecture

```
frontend-rules/
├── packs/           # Rule blocks and config templates per discipline
│   ├── frontend/    # Frontend pack
│   └── backend/     # Backend pack
├── core/            # Registry and composable generator engine
├── cli/             # npx ruleskit command-line package
└── src/             # TanStack Start web application dashboard
```

- **Rule Packs:** The core rule blocks are written in Markdown files under `packs/<pack-id>/blocks/` and frameworks under `packs/<pack-id>/blocks/frameworks/`.
- **Generator Core:** Handles parsing formats, merging blocks, and templating output files.
- **Web Interface:** Exposes the visual configurator for dev tools at `ruleskit.dev`.
- **CLI Tool:** Consumes the exact same packages and configs to generate files directly in any local workspace.

---

## 🚀 Setting Up Your Workspace

Requires [Node.js v22.14.0+](https://nodejs.org) and [pnpm](https://pnpm.io).

1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/frontend-rules.git
   cd frontend-rules
   ```

2. **Install Monorepo Dependencies**
   ```bash
   pnpm install
   ```

3. **Run the Web Application Locally**
   ```bash
   pnpm run dev
   # Access at http://localhost:5173
   ```

4. **Develop and Test the CLI**
   ```bash
   cd cli
   npm install
   npm run build   # Syncs assets and compiles TypeScript
   npm test        # Runs native TS integration tests
   ```

---

## 📝 Adding or Modifying Rules

All rule contents are written as plain Markdown files.

1. **Adding a Block:** Add a `.md` file to `packs/<pack-id>/blocks/` and register it in the corresponding `pack.config.ts`.
2. **Adding a Framework:** Add a `.md` file to `packs/<pack-id>/blocks/frameworks/` and configure its ID and filename in `pack.config.ts`.
3. **Format Customization:** Templates for output formats (e.g. `.cursorrules`, `CLAUDE.md`) are located in `core/templates/`.

Before submitting a Pull Request, always run `npm test` inside `cli/` to verify that rule generation builds and executes correctly.

---

## 🤝 Code of Conduct

Please note that we participate in the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By interacting with this repository, you agree to abide by its terms.
