import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { registry } from "@/core/registry";
import { PackGrid } from "@/components/PackGrid";
import { Generator } from "@/components/Generator";
import { UseInstructions } from "@/components/UseInstructions";
import { Documentation } from "@/components/Documentation";
import AmbientGlow from "@/components/AmbientGlow";
import QuantumNodes from "@/components/QuantumNodes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ruleskit — AI rules for every engineering discipline" },
      {
        name: "description",
        content:
          "Generate .cursorrules, .mdc, or SKILL.md files pre-loaded with performance, design, and linting rules for your stack.",
      },
      { property: "og:title", content: "ruleskit — AI rules for engineers" },
      {
        property: "og:description",
        content:
          "Drop in performance, design, and linting rules so your AI coding agent follows them automatically.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const packs = registry.getPacks();
  const stablePacks = registry.getStablePacks();
  const [selectedId, setSelectedId] = useState(stablePacks[0]?.id ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selected = registry.getPack(selectedId);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* Global Ambient Glow Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AmbientGlow />
      </div>

      {/* Main Page Layout Wrapper */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-bold text-primary">▲</span>
            <span className="font-mono text-sm font-semibold tracking-tight">ruleskit</span>
            <span className="ml-2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              v1
            </span>
          </div>

          <nav className="hidden sm:flex items-center gap-3 sm:gap-5 text-[11px] sm:text-xs font-mono text-muted-foreground">
            <a href="#how" className="hover:text-foreground">
              how it works
            </a>
            <a href="#use" className="hover:text-foreground">
              for developers
            </a>
            <a href="#docs" className="hover:text-foreground">
              docs
            </a>
            <a href="#roadmap" className="hidden md:inline hover:text-foreground">
              roadmap
            </a>
            <a
              href="https://github.com"
              className="rounded border border-border px-2 py-0.5 sm:px-2.5 sm:py-1 hover:border-border-strong hover:text-foreground"
            >
              github
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex sm:hidden items-center justify-center rounded border border-border p-1.5 text-muted-foreground hover:border-border-strong hover:text-foreground transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-md px-6 py-4 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-4 font-mono text-xs text-muted-foreground">
              <a
                href="#how"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 border-b border-border/40"
              >
                how it works
              </a>
              <a
                href="#use"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 border-b border-border/40"
              >
                for developers
              </a>
              <a
                href="#docs"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 border-b border-border/40"
              >
                docs
              </a>
              <a
                href="#roadmap"
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-primary transition-colors py-1 border-b border-border/40"
              >
                roadmap
              </a>
              <a
                href="https://github.com"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between hover:text-primary transition-colors py-1"
              >
                <span>github</span>
                <span className="text-primary">↗</span>
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 opacity-40">
          <QuantumNodes
            mode="grid"
            backgroundColor="transparent"
            nodeColorIdle="oklch(0.88 0.20 130 / 0.15)"
            nodeColorActive="oklch(0.88 0.20 130)"
            nodeRadiusIdle={1.5}
            nodeRadiusActive={3.5}
            nodeOpacityIdle={0.2}
            glowColor="oklch(0.88 0.20 130)"
            glowStrength={0.7}
            connectToCursor={true}
            cursorConnectDistance={140}
            cursorLineColor="oklch(0.88 0.20 130)"
            cursorLineWidth={1}
            cursorLineOpacity={0.2}
            connectNodes={true}
            nodeConnectDistance={85}
            nodeLineColor="oklch(0.88 0.20 130)"
            nodeLineWidth={0.5}
            nodeLineOpacity={0.12}
            maxNodeConnectionsPerNode={3}
            gridSpacing={48}
            jitter={12}
            pauseWhenOffscreen={true}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            v1 — frontend pack ships today
          </div>
          <h1 className="mt-6 max-w-3xl mx-auto text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            AI rules for every <span className="text-gradient-primary">engineering discipline</span>
            .
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Generate <span className="font-mono text-foreground">.cursorrules</span>,{" "}
            <span className="font-mono text-foreground">.mdc</span>, or{" "}
            <span className="font-mono text-foreground">SKILL.md</span> files pre-loaded with
            performance, design, and linting rules for your stack. Drop them in your project. Your
            AI follows them automatically.
          </p>
          <div className="mt-10 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <a
              href="#generator"
              className="rounded-md bg-primary px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground glow-primary hover:opacity-90"
            >
              Generate my rules file ↓
            </a>
            <code className="rounded-md border border-border bg-surface px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-mono text-foreground">
              <span className="text-primary">$</span> npx ruleskit init
            </code>
          </div>
        </div>
      </section>

      {/* Pack selector */}
      <section id="generator" className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-primary">00</span>
              <h2 className="text-2xl font-bold">Pick your pack</h2>
            </div>
            <span className="text-xs text-muted-foreground">
              — each discipline is self-contained
            </span>
          </div>
          <PackGrid packs={packs} selectedId={selectedId} onSelect={setSelectedId} />

          {selected && selected.status === "stable" && (
            <div className="mt-16">
              <Generator pack={selected} />
            </div>
          )}
          {selected && selected.status !== "stable" && (
            <div className="mt-12 rounded-lg border border-warning/30 bg-warning/5 p-6 text-sm">
              <span className="font-mono text-warning">{selected.label}</span> pack is coming soon.
              Follow along on GitHub for updates.
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Pick your pack and framework",
              "Toggle extras: design rules, hooks, linting",
              "Download the zip or run npx ruleskit init",
              "Your agent and pipeline follow the rules automatically",
            ].map((step, i) => (
              <div key={i} className="rounded-lg border border-border bg-surface p-5">
                <div className="font-mono text-xs text-primary">
                  step {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-3 text-sm text-foreground leading-relaxed">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UseInstructions />

      <Documentation />

      {/* Coverage */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-bold">What's covered (frontend pack)</h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              "Performance",
              "Design",
              "Accessibility",
              "Git Hooks",
              "Linting",
              "Lighthouse CI",
            ].map((label) => (
              <div
                key={label}
                className="rounded-md border border-border bg-surface px-4 py-6 text-center text-sm font-mono text-muted-foreground hover:border-primary hover:text-foreground transition"
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="border-b border-border bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-2xl font-bold">Pack roadmap</h2>
          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-sm">
            {[
              { label: "v1 Frontend", state: "shipped" },
              { label: "v2 Backend", state: "next" },
              { label: "v3 DevOps", state: "later" },
              { label: "v4 Mobile", state: "later" },
            ].map((m, i, arr) => (
              <span key={m.label} className="flex items-center gap-3">
                <span
                  className={`rounded-md border px-3 py-2 ${
                    m.state === "shipped"
                      ? "border-success text-success"
                      : m.state === "next"
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {m.label}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-muted-foreground hidden sm:inline">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-xs font-mono text-muted-foreground sm:flex-row sm:items-center">
          <div>
            Frontend rules sourced from{" "}
            <a
              href="https://roadmap.sh/frontend-performance-best-practices"
              className="text-foreground hover:text-primary"
            >
              roadmap.sh/frontend-performance-best-practices
            </a>
          </div>
          <div className="flex gap-4">
            <a href="https://github.com" className="hover:text-foreground">
              github
            </a>
            <a href="https://npmjs.com" className="hover:text-foreground">
              npm
            </a>
            <a href="https://roadmap.sh" className="hover:text-foreground">
              roadmap.sh
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
