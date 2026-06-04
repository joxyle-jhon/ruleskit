const CLI_EXAMPLES = [
  {
    label: "Defaults (frontend, agnostic, .cursorrules + tooling)",
    cmd: "npx ruleskit init",
  },
  {
    label: "Next.js + Cursor .mdc rules only",
    cmd: "npx ruleskit init --pack frontend --framework nextjs --format mdc --no-extras",
  },
  {
    label: "All formats + lint/husky extras",
    cmd: "npx ruleskit init --pack frontend --framework nextjs --format all",
  },
  {
    label: "Rules only, no config files",
    cmd: "npx ruleskit init --no-extras",
  },
] as const;

const OUTPUTS = [
  { file: ".cursorrules", desc: "Legacy Cursor project rules" },
  { file: ".cursor/rules/<pack>.mdc", desc: "Cursor rules with globs" },
  { file: "SKILL.md", desc: "Agent skill format" },
] as const;

const EXTRAS = [
  ".husky/pre-commit & pre-push",
  "eslint.config.js",
  ".stylelintrc.js",
  ".prettierrc.js",
  ".lintstagedrc.js",
  ".lighthouserc.json",
] as const;

export function UseInstructions() {
  return (
    <section id="use" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-2 font-mono text-xs text-primary">for developers</div>
        <h2 className="text-2xl font-bold">Use ruleskit in your project</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          You do not need this repo. Generate rule files for your stack, drop them in your app root,
          and commit so your team and AI agents share the same standards.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Web */}
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-mono text-sm font-semibold text-primary">01 — Website</h3>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal list-inside">
              <li>
                Pick a pack above ( <span className="text-foreground font-mono">frontend</span> is
                stable today)
              </li>
              <li>Choose format, framework, and extras</li>
              <li>
                <span className="text-foreground">Download .zip</span> or copy the CLI command from
                step 05
              </li>
              <li>Extract into your project root and commit</li>
            </ol>
          </div>

          {/* CLI */}
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-mono text-sm font-semibold text-primary">02 — CLI</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              From your project directory (Node 18+):
            </p>
            <code className="mt-3 block rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-xs text-foreground">
              <span className="text-primary">$</span> npx ruleskit init
            </code>
            <p className="mt-4 text-xs text-muted-foreground">
              Installs nothing globally — runs once and writes your rule files.
            </p>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-12">
          <h3 className="text-base font-semibold">CLI examples</h3>
          <div className="mt-4 space-y-3">
            {CLI_EXAMPLES.map((ex) => (
              <div
                key={ex.cmd}
                className="rounded-md border border-border bg-surface/50 overflow-hidden"
              >
                <div className="border-b border-border px-4 py-2 text-xs text-muted-foreground">
                  {ex.label}
                </div>
                <code className="block overflow-x-auto px-4 py-3 font-mono text-xs text-foreground">
                  <span className="text-primary">$</span> {ex.cmd}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs table */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-base font-semibold">Generated files</h3>
            <ul className="mt-4 space-y-2">
              {OUTPUTS.map((o) => (
                <li
                  key={o.file}
                  className="flex flex-col gap-0.5 rounded-md border border-border bg-surface px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-mono text-xs text-foreground">{o.file}</span>
                  <span className="text-xs text-muted-foreground">{o.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold">Optional extras</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Toggle in the generator or pass{" "}
              <span className="font-mono text-foreground">--extras</span> /{" "}
              <span className="font-mono text-foreground">--no-extras</span>
            </p>
            <ul className="mt-4 space-y-1.5 font-mono text-xs text-muted-foreground">
              {EXTRAS.map((e) => (
                <li key={e} className="rounded border border-border/60 bg-surface/30 px-3 py-2">
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Workflow */}
        <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
          <h3 className="text-base font-semibold">Team workflow</h3>
          <p className="mt-3 font-mono text-xs text-muted-foreground leading-relaxed">
            generate → commit to git → AI reads rules → optional Husky/ESLint on commit
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            If you enable Husky or ESLint extras, install matching devDependencies in your project (
            <span className="font-mono">eslint</span>, <span className="font-mono">husky</span>,{" "}
            <span className="font-mono">lint-staged</span>, etc.).
          </p>
        </div>
      </div>
    </section>
  );
}
