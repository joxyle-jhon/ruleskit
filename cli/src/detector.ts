import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import readline from "node:readline/promises";

export interface DetectedStack {
  packId: string;
  frameworkId: string;
}

export function detectStack(projectDir: string): DetectedStack | null {
  // 1. Check for Laravel (composer.json)
  const composerPath = join(projectDir, "composer.json");
  if (existsSync(composerPath)) {
    try {
      const composer = JSON.parse(readFileSync(composerPath, "utf-8"));
      const deps = { ...composer.require, ...composer["require-dev"] };
      if (deps && deps["laravel/framework"]) {
        return { packId: "backend", frameworkId: "laravel" };
      }
      return { packId: "backend", frameworkId: "agnostic" };
    } catch {
      // Ignore JSON parse errors and continue
    }
  }

  // 2. Check for JS/TS stack (package.json)
  const packagePath = join(projectDir, "package.json");
  if (existsSync(packagePath)) {
    try {
      const pkg = JSON.parse(readFileSync(packagePath, "utf-8"));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };

      if (deps) {
        if (deps["next"]) return { packId: "frontend", frameworkId: "nextjs" };
        if (deps["nuxt"] || deps["@nuxt/kit"]) return { packId: "frontend", frameworkId: "nuxt" };
        if (deps["@sveltejs/kit"]) return { packId: "frontend", frameworkId: "sveltekit" };
        if (deps["@angular/core"]) return { packId: "frontend", frameworkId: "angular" };
        
        if (deps["express"]) return { packId: "backend", frameworkId: "express" };
        if (deps["@nestjs/core"]) return { packId: "backend", frameworkId: "nestjs" };
        if (deps["fastify"]) return { packId: "backend", frameworkId: "fastify" };
      }
      
      // If we see React, Svelte, Vue, or Angular without specific meta-frameworks
      if (deps && (deps["react"] || deps["vue"] || deps["svelte"] || deps["angular"])) {
        return { packId: "frontend", frameworkId: "agnostic" };
      }
    } catch {
      // Ignore JSON parse errors and continue
    }
  }

  // 3. Other backend ecosystems
  // Go
  if (existsSync(join(projectDir, "go.mod"))) {
    return { packId: "backend", frameworkId: "agnostic" };
  }
  // Rust
  if (existsSync(join(projectDir, "Cargo.toml"))) {
    return { packId: "backend", frameworkId: "agnostic" };
  }
  // Python
  if (
    existsSync(join(projectDir, "requirements.txt")) ||
    existsSync(join(projectDir, "pyproject.toml")) ||
    existsSync(join(projectDir, "Pipfile"))
  ) {
    // Check if Django is explicitly mentioned in pyproject.toml or requirements.txt
    try {
      const reqPath = join(projectDir, "requirements.txt");
      if (existsSync(reqPath)) {
        const reqContent = readFileSync(reqPath, "utf-8");
        if (reqContent.toLowerCase().includes("django")) {
          return { packId: "backend", frameworkId: "django" };
        }
      }
      const pyprojectPath = join(projectDir, "pyproject.toml");
      if (existsSync(pyprojectPath)) {
        const pyproject = readFileSync(pyprojectPath, "utf-8");
        if (pyproject.toLowerCase().includes("django")) {
          return { packId: "backend", frameworkId: "django" };
        }
      }
    } catch {
      // ignore errors
    }
    return { packId: "backend", frameworkId: "agnostic" };
  }
  // Ruby
  if (existsSync(join(projectDir, "Gemfile"))) {
    return { packId: "backend", frameworkId: "agnostic" };
  }

  return null;
}

export async function promptForStack(): Promise<DetectedStack> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("\n  ruleskit was unable to auto-detect your project stack.");
    console.log("  Please select from the options below:\n");

    // 1. Prompt for Pack
    console.log("  [1] Frontend (React, Vue, Next.js, etc.)");
    console.log("  [2] Backend (Express, NestJS, Laravel, Go, Python, etc.)");
    console.log("  [3] Full-Stack (Next.js, Nuxt, Laravel, SvelteKit, etc.)");
    const packAnswer = await rl.question("\n  Select pack [1]: ");
    const packChoice = packAnswer.trim();
    const packId =
      packChoice === "2"
        ? "backend"
        : packChoice === "3"
          ? "fullstack"
          : "frontend";

    // 2. Prompt for Framework
    console.log(`\n  Select framework/variant for ${packId}:`);
    let frameworks: { id: string; label: string }[] = [];
    if (packId === "frontend") {
      frameworks = [
        { id: "agnostic", label: "Framework-agnostic" },
        { id: "nextjs", label: "Next.js" },
        { id: "nuxt", label: "Nuxt" },
        { id: "sveltekit", label: "SvelteKit" },
        { id: "angular", label: "Angular" },
      ];
    } else if (packId === "backend") {
      frameworks = [
        { id: "agnostic", label: "Framework-agnostic" },
        { id: "laravel", label: "Laravel" },
        { id: "express", label: "Express.js" },
        { id: "nestjs", label: "NestJS" },
        { id: "fastify", label: "Fastify" },
        { id: "django", label: "Django" },
      ];
    } else {
      frameworks = [
        { id: "agnostic", label: "Framework-agnostic" },
        { id: "nextjs", label: "Next.js (React)" },
        { id: "nuxt", label: "Nuxt (Vue)" },
        { id: "sveltekit", label: "SvelteKit" },
        { id: "laravel", label: "Laravel (PHP)" },
      ];
    }

    frameworks.forEach((fw, index) => {
      console.log(`  [${index + 1}] ${fw.label}`);
    });

    const fwAnswer = await rl.question(`\n  Select framework [1]: `);
    const fwIdx = parseInt(fwAnswer.trim(), 10) - 1;
    const frameworkId =
      fwIdx >= 0 && fwIdx < frameworks.length ? frameworks[fwIdx].id : "agnostic";

    return { packId, frameworkId };
  } finally {
    rl.close();
  }
}
