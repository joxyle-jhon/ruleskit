# ruleskit

Generate `.cursorrules`, `.mdc`, or `SKILL.md` files pre-loaded with performance, design, and linting rules for your stack. Drop them into your project so your AI coding agent and tooling follow the same standards.

- **Web app:** run the site locally or use the deployed generator
- **CLI:** `npx ruleskit init` (after the package is published to npm)

---

## For developers (using ruleskit in your project)

You do not need this repository. Pick a pack, generate files, and commit them to your app repo so your whole team shares the same rules.

### Option 1 — Website

1. Open the ruleskit generator (deployed site or `pnpm run dev` locally).
2. Select **Frontend** (the only stable pack today).
3. Choose output format(s), framework, optional blocks, and extras.
4. **Download the zip** or copy the CLI command shown in the generator.
5. Extract into your **project root** and commit.

### Option 2 — CLI

From your project directory (requires Node 18+):

```bash
npx ruleskit init
```

Common examples:

```bash
# Next.js + Cursor rules only
npx ruleskit init --pack frontend --framework nextjs --format mdc --no-extras

# All rule formats + default tooling (husky, eslint, stylelint, prettier)
npx ruleskit init --pack frontend --framework nextjs --format all

# Rules only, no lint/husky configs
npx ruleskit init --no-extras

# Write into a specific folder
npx ruleskit init -o ./my-app
```

#### CLI options

| Flag              | Description                                                     | Default       |
| ----------------- | --------------------------------------------------------------- | ------------- |
| `-p, --pack`      | Pack id (`frontend`)                                            | `frontend`    |
| `-f, --framework` | `agnostic`, `nextjs`, `nuxt`, `sveltekit`, `angular`, `vanilla` | `agnostic`    |
| `-F, --format`    | `cursorrules`, `mdc`, `skill`, or `all` (comma-separated)       | `cursorrules` |
| `-e, --extras`    | `husky`, `eslint`, `stylelint`, `prettier`, `lighthouse`        | pack defaults |
| `--no-extras`     | Skip all extra config files                                     | —             |
| `-o, --out`       | Output directory                                                | `.` (cwd)     |
| `-h, --help`      | Show help                                                       | —             |
| `-v, --version`   | Show version                                                    | —             |

> **Note:** `npx ruleskit` works globally once the [`ruleskit`](https://www.npmjs.com/package/ruleskit) package is published. Until then, use the website zip or build the CLI from `cli/` (see below).

### What you get

| Output                     | Purpose                                   |
| -------------------------- | ----------------------------------------- |
| `.cursorrules`             | Legacy Cursor project rules               |
| `.cursor/rules/<pack>.mdc` | Cursor rules with globs and `alwaysApply` |
| `SKILL.md`                 | Agent skill format for compatible tools   |

**Optional extras** (when enabled): `.husky/pre-commit`, `.husky/pre-push`, `eslint.config.js`, `.stylelintrc.js`, `.prettierrc.js`, `.lintstagedrc.js`, `.lighthouserc.json`.

Rule content includes HTML/CSS/JS performance, images, fonts, network, Web Vitals, optional design principles, and framework-specific guidance when you pick Next.js, Nuxt, etc.

### Workflow

```
Pick stack on ruleskit → download zip OR run npx ruleskit init
        → files land in project root → commit to git
        → Cursor / AI reads .mdc / .cursorrules / SKILL.md
        → (optional) Husky + ESLint enforce standards on commit
```

If you enable Husky/ESLint extras, install the matching devDependencies in your project (`eslint`, `husky`, `lint-staged`, etc.).

### Packs

| Pack     | Status      |
| -------- | ----------- |
| Frontend | **Stable**  |
| Backend  | Coming soon |
| DevOps   | Coming soon |
| Mobile   | Coming soon |

---

## Contributing (this repository)

### Web app

```bash
pnpm install
pnpm run dev      # http://localhost:5173 (port may vary)
pnpm run build    # production build
```

### CLI package

The CLI lives in `cli/`. It syncs `packs/` and `core/templates/` from the repo root on every build.

```bash
cd cli
npm install
npm run build
node dist/index.js init --pack frontend --framework nextjs --format mdc
```

Link globally for local testing:

```bash
cd cli
npm link
ruleskit init --help
```

Publish to npm (maintainers):

```bash
cd cli
npm publish
```

### Project layout

```
frontend-rules/
├── packs/           # Rule blocks and config templates per discipline
├── core/            # Generator + templates (used by the web app)
├── cli/             # Publishable `ruleskit` npm package
└── src/             # TanStack Start site
```

Frontend rules are sourced from [roadmap.sh frontend performance best practices](https://roadmap.sh/frontend-performance-best-practices).

---

## License

MIT
