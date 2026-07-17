import { useState } from "react";
import { BookOpen, ShieldAlert, Award, FileText, CheckCircle2, Terminal, GitCommit } from "lucide-react";

interface DocSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

export function Documentation() {
  const [activeTab, setActiveTab] = useState("intro");

  const sections: DocSection[] = [
    {
      id: "intro",
      label: "Introduction",
      icon: <BookOpen className="h-4 w-4" />,
      title: "Introduction to ruleskit",
      subtitle: "Why rules matter in the era of AI-assisted engineering",
      content: (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            In modern software development, software engineers work side-by-side with AI coding agents (such as Cursor, Copilot, Cline, and custom LLM workflows). However, without strict constraints, AI agents often generate bloated layouts, write outdated code syntax, introduce arbitrary colors, or pollute files with redundant inline comments.
          </p>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
            <h4 className="font-mono text-xs font-semibold text-primary uppercase tracking-wider mb-2">Core Purpose</h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              <strong className="text-foreground font-semibold">ruleskit</strong> bridges this gap by acting as a single, machine-readable source of truth. By defining rules in your repository root, you force both your human teammates and your AI assistants to follow the exact same standards for performance, design systems, comments, and accessibility.
            </p>
          </div>
          <h3 className="text-lg font-semibold mt-6">How It Helps You</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <h4 className="font-mono text-xs font-bold text-foreground">Zero Prompt Fatigue</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You don't need to write long custom system prompts or constantly remind the model about your grid settings. The instructions are read automatically.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <h4 className="font-mono text-xs font-bold text-foreground">Continuous Quality</h4>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rules are checked and enforced at save time, during git commits, and by the CI environment automatically.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "rules",
      label: "Rule Categories",
      icon: <Award className="h-4 w-4" />,
      title: "Enforced Code Standards",
      subtitle: "Comprehensive guardrails for code, performance, design, and styling",
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-semibold">1. Code Comments Philosophy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We treat code as the primary medium of communication. Comments should be a last resort.
            </p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 ml-2">
              <li>Comments explain <strong className="text-foreground font-medium">WHY</strong> a decision was made, never <strong className="text-foreground font-medium">WHAT</strong> or <strong className="text-foreground font-medium">HOW</strong>.</li>
              <li>Only function-level header comments or JSDocs for public APIs are allowed.</li>
              <li>Inline comments are strictly prohibited. If a block of code needs inline explanations, it must be refactored.</li>
            </ul>
          </div>

          <div className="border-t border-border/60 my-6"></div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold">2. Design & Spacing System</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Maintains pixel-perfect aesthetic consistency and design token alignment.
            </p>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 ml-2">
              <li>All spacings, paddings, and margins must align to an <strong className="text-foreground font-medium">8pt grid system</strong> (multiples of 4px or 8px).</li>
              <li>Arbitrary style values (like <code className="text-foreground font-mono bg-surface px-1 py-0.5 rounded">p-[13px]</code>) are banned. Always map to design tokens.</li>
              <li>Typography scales must be strictly limited to predefined tokens (xs, sm, base, lg, xl, 2xl, etc.).</li>
            </ul>
          </div>

          <div className="border-t border-border/60 my-6"></div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold">3. Performance & Web Vitals</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Strict optimization targets aligned with Google Core Web Vitals.
            </p>
            <div className="grid gap-3 font-mono text-xs text-muted-foreground">
              <div className="flex justify-between border-b border-border/40 pb-1">
                <span>LCP (Largest Contentful Paint)</span>
                <span className="text-success">&lt; 2.5s</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-1">
                <span>INP (Interaction to Next Paint)</span>
                <span className="text-success">&lt; 200ms</span>
              </div>
              <div className="flex justify-between border-b border-border/40 pb-1">
                <span>CLS (Cumulative Layout Shift)</span>
                <span className="text-success">&lt; 0.1</span>
              </div>
            </div>
            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1.5 ml-2">
              <li>All media elements must specify explicit width and height dimensions to prevent shifts.</li>
              <li>Bundle size budgets are set to maximum 200kB per entry point.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "healing",
      label: "Self-Healing Pipeline",
      icon: <ShieldAlert className="h-4 w-4" />,
      title: "Three-Level Self-Healing Pipeline",
      subtitle: "Automated corrective layers that intercept and fix rules deviations",
      content: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            The ruleskit self-healing workflow is an opt-in runtime layer. Instead of just raising linting errors, it actively repairs rule violations using the following three phases:
          </p>

          <div className="space-y-6 mt-4">
            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">
                1
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold text-foreground">Level 1 — Auto-Fix on Save (IDE Level)</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Bypasses AI. Automatically configures VS Code, Zed, and EditorConfig rules inside your project. Every save event automatically corrects style, formatting, and file structures instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">
                2
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold text-foreground">Level 2 — Pre-Commit Hook (Git Level)</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Triggers on Git commit via Husky and lint-staged. If code changes fail basic validation checks, a lightweight script (<code className="font-mono bg-surface px-1 py-0.5 text-foreground">.devkit/heal.js</code>) calls an LLM engine to patch formatting, comments, or design token alignment automatically before staging.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-xs font-bold text-primary">
                3
              </div>
              <div>
                <h4 className="font-mono text-xs font-bold text-foreground">Level 3 — Background Watcher (Daemon Level)</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Runs a local terminal watch tool (<code className="font-mono bg-surface px-1 py-0.5 text-foreground">devkit watch</code>) that utilizes Chokidar to monitor files. When structural anomalies or deprecated component parameters are detected, it builds correction proposals or writes inline repairs in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "formats",
      label: "Formats Explained",
      icon: <FileText className="h-4 w-4" />,
      title: "Understanding Output Formats",
      subtitle: "Four target formats — each maps to a specific AI tool or workflow",
      content: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Different AI tools read rules from different files. ruleskit generates the exact file each tool expects — drop it in your project root and the agent picks it up automatically.
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-mono text-xs font-bold text-foreground">Cursor</h4>
                <code className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">.cursorrules</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Placed at your project root. Loaded globally into Cursor's context window for every chat and inline generation. The original and most widely supported format.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-mono text-xs font-bold text-foreground">Windsurf</h4>
                <code className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">.cursor/rules/*.mdc</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Modular rules scoped to specific file glob paths. Keeps context windows lean — rules are injected only when the active file matches the defined pattern. Ideal for large multi-team projects.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-mono text-xs font-bold text-foreground">Agent Skill</h4>
                <code className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">SKILL.md</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Structured for autonomous agents, pipeline workers, and non-editor AI tools (Cline, LangChain, custom LLM orchestrators). Uses role-play system prompt syntax so the agent knows exactly how to audit and report.
              </p>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-mono text-xs font-bold text-foreground">Claude Code</h4>
                  <span className="font-mono text-[10px] text-primary border border-primary/40 rounded px-1.5 py-0.5">new</span>
                </div>
                <code className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">CLAUDE.md</code>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Targets Claude Code running in the terminal. Claude natively reads <code className="font-mono text-foreground">CLAUDE.md</code> from the project root at startup — no configuration needed. The generated file uses an enforcement-action framing, instructing Claude to flag violations proactively rather than wait to be asked.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-border/60 bg-background/40 px-4 py-3">
            <p className="text-[11px] font-mono text-muted-foreground">
              <span className="text-foreground font-semibold">Tip:</span> You can select multiple formats. Each generates a separate file — useful if your team uses both Cursor and Claude Code in the same project.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "usecases",
      label: "CLI & Use Cases",
      icon: <Terminal className="h-4 w-4" />,
      title: "CLI Command Reference & Core Use Cases",
      subtitle: "Commands parameters, options, and common project setups",
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">CLI Options Reference</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Execute <code className="font-mono bg-surface px-1 py-0.5 text-foreground">npx ruleskit init [options]</code> to configure rules. Available parameters:
            </p>
            <div className="overflow-x-auto rounded-md border border-border bg-surface/30">
              <table className="w-full text-left text-[11px] font-mono text-muted-foreground">
                <thead>
                  <tr className="border-b border-border bg-surface-elevated/40 text-foreground text-xs">
                    <th className="px-3 py-2">Option</th>
                    <th className="px-3 py-2">Values</th>
                    <th className="px-3 py-2">Default</th>
                    <th className="px-3 py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-p, --pack</td>
                    <td className="px-3 py-2">frontend, backend, fullstack</td>
                    <td className="px-3 py-2">frontend</td>
                    <td className="px-3 py-2">Discipline pack ruleset template</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-f, --framework</td>
                    <td className="px-3 py-2">agnostic, nextjs, nuxt, sveltekit, angular, laravel, express, nestjs, fastify, django</td>
                    <td className="px-3 py-2">agnostic</td>
                    <td className="px-3 py-2">Add framework specific hooks / rules</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-F, --format</td>
                    <td className="px-3 py-2">cursorrules, mdc, skill, claude, all</td>
                    <td className="px-3 py-2">cursorrules</td>
                    <td className="px-3 py-2">Output format — maps to the target AI tool</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-e, --extras</td>
                    <td className="px-3 py-2">husky, eslint, stylelint, prettier, lighthouse, linter, backend-formatter, ai-prompt</td>
                    <td className="px-3 py-2">none</td>
                    <td className="px-3 py-2">Extra config files to include in the output zip</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">--no-extras</td>
                    <td className="px-3 py-2">boolean</td>
                    <td className="px-3 py-2">false</td>
                    <td className="px-3 py-2">Skip all extra lint/husky helper configs</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-o, --out</td>
                    <td className="px-3 py-2">path directory</td>
                    <td className="px-3 py-2">.</td>
                    <td className="px-3 py-2">Target directory to place rules</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-border/60 my-6"></div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Key Use Case Setups</h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">1. Frontend — Agnostic baseline</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Minimal setup for any JS/HTML project. Rules only, no extra config files.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack frontend --framework agnostic --format cursorrules --no-extras
                </code>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">2. Frontend — Next.js full suite</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Enterprise Next.js setup. Modular Windsurf rules with git hooks, Prettier, ESLint, and Lighthouse budget.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack frontend --framework nextjs --format mdc --extras husky,eslint,prettier,lighthouse
                </code>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">3. Backend — Laravel with Claude Code</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Backend rules with Laravel-specific additions, output as <code className="font-mono text-foreground">CLAUDE.md</code> for terminal-based Claude Code workflows.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack backend --framework laravel --format claude --extras husky
                </code>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">4. Backend — Framework-agnostic, all formats</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Stack-agnostic backend rules covering REST, security, database hygiene, and logging. Generates all four format files at once.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack backend --framework agnostic --format all --extras husky,linter
                </code>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">5. Agent pipelines — SKILL.md</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Generate an agentic <code className="font-mono text-foreground">SKILL.md</code> for pipeline workers, GitHub Actions agents, or custom LLM orchestrators.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack frontend --format skill
                </code>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">6. Full-Stack — Laravel + Next.js combined rules</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Full-stack rules bridging UI performance, API design, security, and database hygiene into a single output file.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack fullstack --framework laravel --format skill --extras husky,linter,prettier
                </code>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "changelog",
      label: "Changelog",
      icon: <GitCommit className="h-4 w-4" />,
      title: "Changelog",
      subtitle: "What's new, what changed, and why",
      content: (
        <div className="space-y-10">
          {/* v1.1 release */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs font-bold text-primary border border-primary/40 rounded px-2 py-0.5">v1.1</span>
              <h3 className="text-base font-semibold">Full-Stack Pack + TypeScript Fix</h3>
              <span className="font-mono text-[10px] text-muted-foreground">2026-07-17</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <h4 className="font-mono text-xs font-bold text-foreground">New pack — <code className="text-primary">fullstack</code></h4>
                </div>
                <div className="pl-3.5 space-y-1.5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">What:</span> The fullstack pack combines frontend UI performance rules with backend API design, security, database hygiene, and AI self-healing into one output file.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Frameworks:</span> agnostic, Next.js, Nuxt, SvelteKit, Laravel.
                  </p>
                  <code className="mt-1 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                    $ npx ruleskit init --pack fullstack --framework laravel --format skill
                  </code>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <h4 className="font-mono text-xs font-bold text-foreground">Fullstack extras: husky, linter, prettier</h4>
                </div>
                <div className="pl-3.5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">What:</span> The fullstack pack now supports extras — <code className="font-mono text-foreground">husky</code> (pre-commit hook), <code className="font-mono text-foreground">linter</code> (LINTER.md guide), and <code className="font-mono text-foreground">prettier</code> (.prettierrc.js). These reuse the existing backend and frontend config files.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* v2 release */}
          <div className="border-t border-border/40 pt-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs font-bold text-primary border border-primary/40 rounded px-2 py-0.5">v2.0</span>
              <h3 className="text-base font-semibold">Backend Pack + Claude Code</h3>
              <span className="font-mono text-[10px] text-muted-foreground">2026-07-16</span>
            </div>

            <div className="space-y-6">
              {/* Change 1 */}
              <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <h4 className="font-mono text-xs font-bold text-foreground">New output format — Claude Code (<code className="text-primary">CLAUDE.md</code>)</h4>
                </div>
                <div className="pl-3.5 space-y-1.5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">What:</span> A fourth output format targeting Claude Code running in the terminal.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Why:</span> Claude Code natively reads <code className="font-mono text-foreground">CLAUDE.md</code> from the project root at startup — no configuration required. Terminal-based AI workflows need a dedicated file, separate from editor-specific formats like <code className="font-mono text-foreground">.cursorrules</code>.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">How to use:</span> Select <span className="font-mono text-foreground">Claude Code</span> as the output format in the generator, or pass <code className="font-mono text-foreground">--format claude</code> to the CLI. Drop the generated <code className="font-mono text-foreground">CLAUDE.md</code> into your project root and Claude Code will load it automatically on the next session.
                  </p>
                </div>
              </div>

              {/* Change 2 */}
              <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <h4 className="font-mono text-xs font-bold text-foreground">Relabeled output format buttons</h4>
                </div>
                <div className="pl-3.5 space-y-1.5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">What:</span> Format selector buttons now show the tool name rather than the file extension.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Why:</span> Most users don't know what <code className="font-mono text-foreground">.mdc</code> or <code className="font-mono text-foreground">.cursorrules</code> map to. Showing the tool name (Cursor, Windsurf, Agent Skill, Claude Code) removes that ambiguity.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                    {[
                      ["Cursor", ".cursorrules"],
                      ["Windsurf", ".mdc"],
                      ["Agent Skill", "SKILL.md"],
                      ["Claude Code", "CLAUDE.md"],
                    ].map(([label, file]) => (
                      <div key={label} className="flex items-center justify-between rounded border border-border/60 bg-background/40 px-2 py-1">
                        <span className="text-foreground">{label}</span>
                        <span className="text-primary">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Change 3 */}
              <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <h4 className="font-mono text-xs font-bold text-foreground">Generalized backend extras</h4>
                </div>
                <div className="pl-3.5 space-y-1.5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">What:</span> The backend pack's extras are now stack-agnostic. <span className="line-through text-muted-foreground/50">Laravel Pint (PHP)</span> is replaced by <span className="text-foreground font-medium">Backend formatter</span>, and <span className="line-through text-muted-foreground/50">ESLint (Node.js)</span> is renamed to <span className="text-foreground font-medium">Linter</span>.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Why:</span> The backend pack targets Laravel, Express, NestJS, Django, Go, and more. Extras should not assume the user's runtime. The new guides cover Prettier, Pint, Black, and gofmt (formatter) and ESLint, PHPStan, Flake8, and golangci-lint (linter).
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">How to use:</span> Toggle <span className="font-mono text-foreground">Backend formatter (config file)</span> or <span className="font-mono text-foreground">Linter (config file)</span> in the Extras section. The downloaded <code className="font-mono text-foreground">FORMATTER.md</code> and <code className="font-mono text-foreground">LINTER.md</code> contain setup instructions for every major stack — delete the sections that don't apply.
                  </p>
                </div>
              </div>

              {/* Change 4 */}
              <div className="rounded-lg border border-border bg-surface/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <h4 className="font-mono text-xs font-bold text-foreground">Framework-agnostic backend rule block</h4>
                </div>
                <div className="pl-3.5 space-y-1.5">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">What:</span> The backend rule block no longer contains any Laravel or PHP-specific references. Four new rule categories were added.
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="text-foreground font-medium">Why:</span> A backend rules file should be droppable into any project — Laravel, Express, Django, NestJS, Go — without requiring manual cleanup of irrelevant sections.
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {[
                      { label: "REST API conventions", desc: "Resource naming, HTTP methods, status codes, response shape" },
                      { label: "Env variable hygiene", desc: "No hardcoded secrets, validate at startup, never log values" },
                      { label: "Logging standards", desc: "Structured JSON, request_id in every line, never log PII" },
                      { label: "Query safety", desc: "Parameterized queries only, N+1 prevention, pagination required" },
                    ].map((item) => (
                      <div key={item.label} className="rounded border border-primary/20 bg-primary/5 px-3 py-2">
                        <div className="font-mono text-[11px] font-semibold text-primary">{item.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* v1 */}
          <div className="border-t border-border/40 pt-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold text-success border border-success/40 rounded px-2 py-0.5">v1.0</span>
              <h3 className="text-base font-semibold">Frontend Pack</h3>
              <span className="font-mono text-[10px] text-muted-foreground">Initial release</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Frontend pack shipping with rules for HTML, CSS, JavaScript, images, fonts, network, Web Vitals, design principles, and the three-level self-healing pipeline. Extras: Husky, ESLint, Stylelint, Prettier, Lighthouse CI.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const active = sections.find((s) => s.id === activeTab) ?? sections[0];

  return (
    <section id="docs" className="border-b border-border bg-surface/10">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-2 font-mono text-xs text-primary">documentation</div>
        <h2 className="text-2xl font-bold">Understanding the ruleskit system</h2>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          Comprehensive reference on how rules are compiled, why they are structured the way they are, and how the multi-level self-healing mechanism works.
        </p>

        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-start">
          {/* Tabs Sidebar */}
          <div className="flex gap-2 overflow-x-auto md:w-64 md:flex-col md:overflow-x-visible shrink-0 pb-4 md:pb-0">
            {sections.map((sec) => {
              const on = sec.id === activeTab;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-left font-mono text-xs transition border cursor-pointer whitespace-nowrap md:whitespace-normal ${
                    on
                      ? "border-primary bg-primary/10 text-foreground glow-primary"
                      : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                  }`}
                >
                  <span className={on ? "text-primary" : "text-muted-foreground"}>{sec.icon}</span>
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 rounded-lg border border-border bg-surface p-6 sm:p-8 min-h-[400px]">
            <div>
              <h3 className="text-lg font-bold text-foreground">{active.title}</h3>
              <p className="mt-1 text-xs font-mono text-primary/80">{active.subtitle}</p>
            </div>
            <div className="mt-8 border-t border-border/40 pt-6">
              {active.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
