import { useState } from "react";
import { BookOpen, ShieldAlert, Award, FileText, CheckCircle2, Terminal } from "lucide-react";

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
      subtitle: "Choose the target format matching your development workflows",
      content: (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Different AI assistants and orchestration engines consume instructions in different ways. ruleskit targets three standard outputs:
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <h4 className="font-mono text-xs font-bold text-foreground">1. Cursor Legacy Rules (.cursorrules)</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Placed at your project root. Contains the entire aggregated collection of rules. It is loaded globally into the context window for all chats and inline generation calls within Cursor.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <h4 className="font-mono text-xs font-bold text-foreground">2. Modular Cursor Rules (.cursor/rules/*.mdc)</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Fine-grained rules mapped to target glob paths. For example, rules targeting only components (<code className="font-mono">src/components/**/*.tsx</code>) or configurations. Helps keep context windows lean by loading only when active files match defined paths.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface/50 p-4">
              <h4 className="font-mono text-xs font-bold text-foreground">3. Agent Skill Format (SKILL.md)</h4>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                Structured for background autonomous agents, pipeline workflows, or non-Cursor engines (like Cline or custom LangChain/LlamaIndex agents). Employs strict system role-play syntax and structured prompt templates.
              </p>
            </div>
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
                    <td className="px-3 py-2">frontend, backend, mobile, devops</td>
                    <td className="px-3 py-2">frontend</td>
                    <td className="px-3 py-2">Discipline pack ruleset template</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-f, --framework</td>
                    <td className="px-3 py-2">agnostic, nextjs, nuxt, sveltekit, angular</td>
                    <td className="px-3 py-2">agnostic</td>
                    <td className="px-3 py-2">Add framework specific hooks / rules</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-F, --format</td>
                    <td className="px-3 py-2">cursorrules, mdc, skill, all</td>
                    <td className="px-3 py-2">cursorrules</td>
                    <td className="px-3 py-2">Rule output format file types</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 text-foreground font-semibold">-e, --extras</td>
                    <td className="px-3 py-2">husky, eslint, stylelint, prettier, lighthouse</td>
                    <td className="px-3 py-2">none</td>
                    <td className="px-3 py-2">Extra config files to write on disk</td>
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
                <h4 className="font-mono text-xs font-bold text-foreground">1. Agnostic Project-wide Baseline</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Fast setup for small teams using vanilla JS/HTML or general tools. Restricts formatting and comments project-wide.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack frontend --framework agnostic --format cursorrules --no-extras
                </code>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">2. Production Next.js Suite (Full Extras)</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Best for enterprise Next.js stacks. Generates modular .mdc rules and configures git hooks, Prettier, ESLint, and lighthouse parameters.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack frontend --framework nextjs --format mdc --extras husky,eslint,prettier,lighthouse
                </code>
              </div>

              <div className="rounded-lg border border-border bg-surface p-4">
                <h4 className="font-mono text-xs font-bold text-foreground">3. Agent Orchestrators & background workflows</h4>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Generate agentic SKILL.md specs for pipeline workers, Github Actions agents, or terminal coding prompts.
                </p>
                <code className="mt-2 block rounded bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground">
                  $ npx ruleskit init --pack frontend --format skill
                </code>
              </div>
            </div>
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
          <div className="flex gap-2 overflow-x-auto md:w-64 md:flex-col md:overflow-x-visible shrink-0 pb-4 md:pb-0 md:sticky md:top-24">
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
