import { useMemo, useState, useEffect } from "react";
import { registry } from "@/core/registry";
import { generate, buildCliCommand } from "@/core/generator";
import type { OutputFormat, GeneratedFile, PackConfig } from "@/core/types";

const FORMAT_OPTIONS: { id: OutputFormat; label: string; ext: string }[] = [
  { id: "cursorrules", label: "Cursor", ext: ".cursorrules" },
  { id: "mdc", label: "Windsurf", ext: ".mdc" },
  { id: "skill", label: "Agent Skill", ext: "SKILL.md" },
  { id: "claude", label: "Claude Code", ext: "CLAUDE.md" },
];

interface Props {
  pack: PackConfig;
}

export function Generator({ pack }: Props) {
  const [formats, setFormats] = useState<OutputFormat[]>(["cursorrules"]);
  const [frameworkId, setFrameworkId] = useState(pack.frameworks[0]?.id ?? "agnostic");
  const [optionalBlocks, setOptionalBlocks] = useState<string[]>(
    (pack.optionalBlocks ?? []).filter((b) => b.default).map((b) => b.id),
  );
  const [extras, setExtras] = useState<string[]>(
    pack.extras.filter((e) => e.default).map((e) => e.id),
  );
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);

  const files: GeneratedFile[] = useMemo(
    () =>
      generate({
        packId: pack.id,
        frameworkId,
        selectedOptionalBlocks: optionalBlocks,
        extras,
        formats,
      }),
    [pack.id, frameworkId, optionalBlocks, extras, formats],
  );

  useEffect(() => {
    setFrameworkId(pack.frameworks[0]?.id ?? "agnostic");
    setOptionalBlocks((pack.optionalBlocks ?? []).filter((b) => b.default).map((b) => b.id));
    setExtras(pack.extras.filter((e) => e.default).map((e) => e.id));
    setActiveTab(0);
    setCopied(null);
  }, [pack.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeTab >= files.length) setActiveTab(0);
  }, [files.length, activeTab]);

  const cliCmd = buildCliCommand({
    packId: pack.id,
    frameworkId,
    selectedOptionalBlocks: optionalBlocks,
    extras,
    formats,
  });

  const toggle = <T,>(arr: T[], v: T) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const downloadZip = async () => {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const f of files) zip.file(f.filename, f.content);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ruleskit-${pack.id}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const active = files[activeTab];

  return (
    <div className="space-y-10">
      {/* Step 1: Format */}
      <Section step="01" title="Output format" hint="Pick your output format">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {FORMAT_OPTIONS.map((f) => {
            const on = formats.includes(f.id);
            return (
              <button
                key={f.id}
                onClick={() => {
                  setFormats([f.id]);
                }}
                className={`group rounded-md border px-4 py-3 text-left transition ${
                  on
                    ? "border-primary bg-primary/10 text-foreground glow-primary"
                    : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
              >
                <div className="text-xs font-mono opacity-70">{f.ext}</div>
                <div className="mt-1 text-sm font-medium">{f.label}</div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Step 2: Framework */}
      <Section step="02" title="Framework" hint="Adds framework-specific rules">
        <div className="flex flex-wrap gap-2">
          {pack.frameworks.map((fw) => {
            const on = frameworkId === fw.id;
            return (
              <button
                key={fw.id}
                onClick={() => setFrameworkId(fw.id)}
                className={`rounded-md border px-3 py-2 text-sm font-mono transition ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground"
                }`}
              >
                {fw.label}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Step 3: Extras */}
      <Section step="03" title="Extras" hint="Optional rule blocks and tooling configs">
        <div className="grid gap-2 sm:grid-cols-2">
          {(pack.optionalBlocks ?? []).map((b) => (
            <Toggle
              key={b.id}
              label={b.label}
              sub="rule block"
              on={optionalBlocks.includes(b.id)}
              onChange={() => setOptionalBlocks(toggle(optionalBlocks, b.id))}
            />
          ))}
          {pack.extras.map((e) => (
            <Toggle
              key={e.id}
              label={e.label}
              sub="config file"
              on={extras.includes(e.id)}
              onChange={() => setExtras(toggle(extras, e.id))}
            />
          ))}
        </div>
      </Section>

      {/* Step 4: Preview */}
      <Section
        step="04"
        title="Live preview"
        hint={`${files.length} file${files.length === 1 ? "" : "s"} ready`}
      >
        <div className="overflow-hidden rounded-lg border border-border bg-surface">
          <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-background/40 px-2 py-2">
            {files.map((f, i) => (
              <button
                key={f.filename + i}
                onClick={() => setActiveTab(i)}
                className={`whitespace-nowrap rounded px-3 py-1.5 text-xs font-mono transition ${
                  i === activeTab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                }`}
              >
                {f.filename}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => active && copy(active.content, "preview")}
              className="absolute right-3 top-3 z-10 rounded border border-border bg-surface-elevated px-2 py-1 text-xs font-mono text-muted-foreground hover:text-foreground"
            >
              {copied === "preview" ? "copied!" : "copy"}
            </button>
            <pre className="max-h-[480px] overflow-auto p-5 text-xs leading-relaxed text-foreground/90">
              <code>{active?.content ?? ""}</code>
            </pre>
          </div>
        </div>
      </Section>

      {/* Step 5: Get your files */}
      <Section step="05" title="Get your files" hint="Download the zip or copy the CLI command">
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={downloadZip}
            className="flex-1 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 glow-primary"
          >
            ↓ Download .zip
          </button>
          <button
            onClick={() => copy(cliCmd, "cli")}
            className="flex-1 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-mono text-foreground transition hover:bg-surface-elevated"
          >
            {copied === "cli" ? "✓ copied!" : "$ copy CLI command"}
          </button>
        </div>
        <div className="mt-3 overflow-x-auto rounded-md border border-border bg-background/60 px-4 py-3 font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> {cliCmd}
        </div>
      </Section>

      {/* Step 6: Manual Setup */}
      <ManualSetup files={files} copied={copied} onCopy={copy} />
    </div>
  );
}

function ManualSetup({
  files,
  copied,
  onCopy,
}: {
  files: GeneratedFile[];
  copied: string | null;
  onCopy: (text: string, key: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary">06</span>
        <h3 className="text-base font-semibold text-foreground">Manual setup</h3>
        <span className="text-xs text-muted-foreground">— no CLI, no zip, just copy-paste</span>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-md border border-border bg-surface px-4 py-3 text-left text-sm font-medium text-foreground transition hover:border-border-strong hover:bg-surface-elevated"
      >
        <span>How to manually add these files to my project</span>
        <span
          className="font-mono text-xs text-primary transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="mt-3 space-y-4 rounded-md border border-border bg-surface/40 p-4">
          {/* Intro */}
          <div className="rounded-md border border-border/60 bg-background/60 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">How it works: </span>
            Download the zip above (or copy each file below), then place every file exactly
            at the path shown in your project root. Commit them alongside your source code.
            Your AI editor will pick up the rules automatically on next reload.
          </div>

          {/* Per-file instructions */}
          {files.map((f, i) => (
            <div key={f.filename + i} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {f.filename}
                  </span>
                  <span className="ml-2 text-[10px] text-muted-foreground font-mono">
                    → place at <span className="text-primary">/{f.filename}</span> in your project root
                  </span>
                </div>
                <button
                  onClick={() => onCopy(f.content, `manual-${i}`)}
                  className="shrink-0 rounded border border-border bg-surface-elevated px-2 py-1 text-xs font-mono text-muted-foreground transition hover:text-foreground"
                >
                  {copied === `manual-${i}` ? "✓ copied!" : "copy"}
                </button>
              </div>
              <pre className="max-h-40 overflow-auto rounded-md border border-border bg-background px-4 py-3 text-[11px] leading-relaxed text-foreground/70">
                <code>{f.content.slice(0, 600)}{f.content.length > 600 ? "\n\n… (download zip for full content)" : ""}</code>
              </pre>
            </div>
          ))}

          {/* Placement cheatsheet */}
          <div className="rounded-md border border-border/60 bg-background/60 px-4 py-3 space-y-2">
            <p className="text-xs font-semibold text-foreground mb-2">File placement cheatsheet</p>
            <div className="space-y-1 font-mono text-[11px] text-muted-foreground">
                <div><span className="text-primary">.cursorrules</span> → project root (auto-loaded by Cursor)</div>
                <div><span className="text-primary">.cursor/rules/*.mdc</span> → project root (Windsurf modular rules)</div>
                <div><span className="text-primary">SKILL.md</span> → project root (paste into your agent system prompt)</div>
                <div><span className="text-primary">CLAUDE.md</span> → project root (auto-loaded by Claude Code terminal agent)</div>
                <div><span className="text-primary">eslint.config.js</span> → project root (replaces existing ESLint config)</div>
                <div><span className="text-primary">.stylelintrc.js</span> → project root</div>
                <div><span className="text-primary">.prettierrc.js</span> → project root</div>
                <div><span className="text-primary">.lintstagedrc.js</span> → project root</div>
                <div><span className="text-primary">.husky/pre-commit</span> → run <code className="text-foreground">npx husky init</code> first, then replace the file</div>
                <div><span className="text-primary">.lighthouserc.json</span> → project root</div>
              </div>
          </div>
        </div>
      )}
    </section>
  );
}

function Section({
  step,
  title,
  hint,
  children,
}: {
  step: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-mono text-xs text-primary">{step}</span>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground">— {hint}</span>
      </div>
      {children}
    </section>
  );
}

function Toggle({
  label,
  sub,
  on,
  onChange,
}: {
  label: string;
  sub: string;
  on: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`flex items-center justify-between rounded-md border px-4 py-3 text-left transition ${
        on
          ? "border-primary/60 bg-primary/5"
          : "border-border bg-surface hover:border-border-strong"
      }`}
    >
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground font-mono">{sub}</div>
      </div>
      <div className={`h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-primary" : "bg-border"}`}>
        <div
          className={`h-4 w-4 rounded-full bg-background transition ${on ? "translate-x-4" : ""}`}
        />
      </div>
    </button>
  );
}

export { registry };

