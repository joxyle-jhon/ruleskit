import { registry } from "./registry";
import type { GenerateOptions, GeneratedFile, OutputFormat, PackConfig } from "./types";

const FORMAT_META: Record<OutputFormat, { template: string; filename: string; language: string }> =
  {
    cursorrules: {
      template: "cursorrules",
      filename: ".cursorrules",
      language: "markdown",
    },
    mdc: {
      template: "mdc",
      filename: ".cursor/rules/{{pack}}.mdc",
      language: "markdown",
    },
    skill: {
      template: "skill",
      filename: "SKILL.md",
      language: "markdown",
    },
    claude: {
      template: "claude",
      filename: "CLAUDE.md",
      language: "markdown",
    },
  };

function composeBlocks(
  pack: PackConfig,
  frameworkId: string,
  selectedOptionalBlocks: string[],
): string {
  const parts: string[] = [];

  for (const blockId of pack.blocks) {
    const content = registry.getBlock(pack.id, blockId).trim();
    if (content) parts.push(content);
  }

  for (const opt of pack.optionalBlocks ?? []) {
    if (selectedOptionalBlocks.includes(opt.id)) {
      const content = registry.getBlock(pack.id, opt.id).trim();
      if (content) parts.push(content);
    }
  }

  const fw = pack.frameworks.find((f) => f.id === frameworkId);
  if (fw?.frameworkFile) {
    const content = registry.getFrameworkBlock(pack.id, fw.frameworkFile).trim();
    if (content) parts.push(content);
  }

  return parts.join("\n\n");
}

export function generate(options: GenerateOptions): GeneratedFile[] {
  const pack = registry.getPack(options.packId);
  if (!pack) throw new Error(`Unknown pack: ${options.packId}`);

  const blocks = composeBlocks(pack, options.frameworkId, options.selectedOptionalBlocks);
  const frameworkLabel =
    pack.frameworks.find((f) => f.id === options.frameworkId)?.label ?? "Framework-agnostic";

  const ruleFiles: GeneratedFile[] = options.formats.map((fmt) => {
    const meta = FORMAT_META[fmt];
    const tpl = registry.getTemplate(meta.template);
    const content = tpl
      .replaceAll("{{BLOCKS}}", blocks)
      .replaceAll("{{PACK}}", pack.label)
      .replaceAll("{{FRAMEWORK}}", frameworkLabel)
      .replaceAll("{{SOURCE}}", pack.source ?? "");
    const filename = meta.filename.replaceAll("{{pack}}", pack.id);
    return { filename, content, language: meta.language };
  });

  const extraFiles = generateExtras(pack.id, options.extras, options.frameworkId, frameworkLabel);
  return [...ruleFiles, ...extraFiles];
}

function generateExtras(packId: string, extras: string[], frameworkId: string, frameworkLabel: string): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  if (packId === "frontend") {
    if (extras.includes("husky")) {
      files.push({
        filename: ".husky/pre-commit",
        content: registry.getConfigFile(packId, "husky/pre-commit"),
        language: "bash",
      });
      files.push({
        filename: ".husky/pre-push",
        content: registry.getConfigFile(packId, "husky/pre-push"),
        language: "bash",
      });
      files.push({
        filename: ".lintstagedrc.js",
        content: registry.getConfigFile(packId, "lint-staged/base.js"),
        language: "javascript",
      });
    }

    if (extras.includes("eslint")) {
      const fwFile =
        frameworkId === "nextjs"
          ? "eslint/nextjs.js"
          : frameworkId === "nuxt"
            ? "eslint/vue.js"
            : frameworkId === "sveltekit"
              ? "eslint/svelte.js"
              : frameworkId === "angular"
                ? "eslint/angular.js"
                : "eslint/base.js";
      files.push({
        filename: "eslint.config.js",
        content: registry.getConfigFile(packId, fwFile),
        language: "javascript",
      });
    }

    if (extras.includes("stylelint")) {
      files.push({
        filename: ".stylelintrc.js",
        content: registry.getConfigFile(packId, "stylelint/base.js"),
        language: "javascript",
      });
    }

    if (extras.includes("prettier")) {
      files.push({
        filename: ".prettierrc.js",
        content: registry.getConfigFile(packId, "prettier/base.js"),
        language: "javascript",
      });
    }

    if (extras.includes("lighthouse")) {
      files.push({
        filename: ".lighthouserc.json",
        content: registry.getConfigFile(packId, "lighthouse/budget.json"),
        language: "json",
      });
    }
  }

  if (packId === "backend") {
    if (extras.includes("husky")) {
      files.push({
        filename: ".husky/pre-commit",
        content: registry.getConfigFile(packId, "husky/pre-commit"),
        language: "bash",
      });
    }

    if (extras.includes("backend-formatter")) {
      files.push({
        filename: "FORMATTER.md",
        content: registry.getConfigFile(packId, "formatter/formatter.md"),
        language: "markdown",
      });
    }

    if (extras.includes("linter")) {
      files.push({
        filename: "LINTER.md",
        content: registry.getConfigFile(packId, "linter/linter.md"),
        language: "markdown",
      });
    }

    if (extras.includes("ai-prompt")) {
      const raw = registry.getConfigFile(packId, "ai-prompt/generate-rules.md");
      const content = raw.replaceAll("{{FRAMEWORK}}", frameworkLabel);
      files.push({
        filename: "AI_GENERATE_PROMPT.md",
        content,
        language: "markdown",
      });
    }
  }

  return files;
}

export function buildCliCommand(opts: GenerateOptions): string {
  const formats = opts.formats.length === 4 ? "all" : opts.formats.join(",");
  const extras = opts.extras.length ? `--extras ${opts.extras.join(",")}` : "--no-extras";
  return `npx ruleskit init --pack ${opts.packId} --framework ${opts.frameworkId} --format ${formats} ${extras}`;
}
