import { rmSync, writeFileSync, copyFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { build, BuildOptions, context } from "esbuild";

import packageJSON from "../package.json";

const dev = process.argv.includes("--dev");

rmSync("dist", { force: true, recursive: true });

const serverOptions: BuildOptions = {
  bundle: true,
  platform: "node",
  target: "node14",
  legalComments: "inline",
  loader: {
    ".png": "dataurl",
  },
  external: Object.keys(packageJSON.peerDependencies || {}).concat(
    Object.keys(packageJSON.dependencies || {}),
  ),
};

const buildOrWatch = async (options: BuildOptions) => {
  if (!dev) return build(options);
  const ctx = await context(options);
  await ctx.watch();
  await ctx.rebuild();
};

Promise.all([
  buildOrWatch({
    ...serverOptions,
    stdin: {
      contents: `import * as mod from "./src";
module.exports = mod;
`,
      resolveDir: ".",
    },
    outfile: "dist/index.cjs",
    logOverride: { "empty-import-meta": "silent" },
  }),
  buildOrWatch({
    ...serverOptions,
    entryPoints: ["src/index.tsx"],
    format: "esm",
    outfile: "dist/index.mjs",
  }),
]).then(() => {
  // copyFileSync("LICENSE", "dist/LICENSE");
  // copyFileSync("README.md", "dist/README.md");

  execSync(
    "tsc src/index.tsx --declaration --jsx react --emitDeclarationOnly --outDir dist --module preserve --target es2020 --allowSyntheticDefaultImports --skipLibCheck --moduleResolution bundler --types ./src/node.d.ts,./src/style.d.ts",
    { stdio: "inherit" },
  );

  writeFileSync(
    "dist/package.json",
    JSON.stringify(
      {
        name: "@gpichot/spectacle-deck",
        version: packageJSON.version,
        license: "MIT",
        type: "module",
        main: "index.cjs",
        types: "index.d.ts",
        module: "index.mjs",
        exports: {
          ".": {
            types: "./index.d.ts",
            require: "./index.cjs",
            import: "./index.mjs",
          },
        },
        keywords: ["spectacle"],
        peerDependencies: packageJSON.peerDependencies,
        dependencies: packageJSON.dependencies,
      },
      null,
      2,
    ),
  );
});
