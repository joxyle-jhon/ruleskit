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
import IcebergIllustration from "@/components/IcebergIllustration";

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
        {/* Background Network Nodes */}
        <div className="absolute inset-0 z-0 opacity-20">
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

        {/* Iceberg Illustration Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-30 sm:opacity-35 overflow-hidden">
          <div className="w-full max-w-[650px] transform translate-y-8 sm:translate-y-12">
            <IcebergIllustration />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:py-32 flex flex-col items-center text-center">
          {/* Crystalline Ice Shard Badge */}
          <div className="relative group inline-flex items-center gap-3 border border-border/80 bg-surface/30 px-4 py-1.5 text-xs font-mono text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-foreground cursor-default [clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Iceberg Badge Icon */}
            <div className="flex items-center">
              <svg className="w-4 h-4 text-primary fill-none stroke-current" viewBox="0 0 24 24">
                {/* Peak */}
                <path d="M12 2L7 11H17L12 2Z" strokeWidth="1.5" className="text-primary animate-pulse" />
                {/* Waterline */}
                <line x1="4" y1="12" x2="20" y2="12" strokeWidth="1" className="text-accent/60" />
                {/* Submerged Base */}
                <path d="M7 13L5 18L12 22L19 18L17 13H7Z" strokeWidth="1.5" className="text-accent opacity-60 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
              </svg>
            </div>
            
            <span className="flex items-center gap-1.5">
              <span className="text-primary font-bold">ICEBERG //</span> 
              v1 — frontend pack ships today
            </span>
          </div>

          {/* Iceberg Themed Heading */}
          <div className="relative mt-8 w-full max-w-4xl mx-auto flex flex-col items-center">
            {/* Above-Water Peak Text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              AI rules for every
            </h1>
            
            {/* The Waterline Divider */}
            <div className="relative w-full max-w-xl my-5 sm:my-7 h-[1px] flex items-center justify-center">
              {/* Glowing gradients */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent blur-[1px]" />
              <div className="absolute w-[85%] h-[2px] bg-gradient-to-r from-transparent via-accent/80 to-transparent" />
              {/* Diamond crest */}
              <div className="absolute -top-1 w-2.5 h-2.5 rotate-45 border border-primary bg-background shadow-[0_0_8px_var(--color-primary)] animate-pulse" />
            </div>
            
            {/* Submerged Deep Base Text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary">
              engineering discipline.
            </h1>
          </div>

          <p className="mt-8 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
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
