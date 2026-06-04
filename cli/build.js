import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const root = dirname(fileURLToPath(import.meta.url));
const sync = spawnSync(process.execPath, [join(root, "sync-assets.js")], {
  stdio: "inherit",
  cwd: root,
});
if (sync.status !== 0) process.exit(sync.status ?? 1);

await esbuild.build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  bundle: true,
  platform: "node",
  target: "node18",
  format: "esm",
  banner: {
    js: "#!/usr/bin/env node",
  },
  external: [],
});

console.log("✓ CLI built to dist/index.js");
