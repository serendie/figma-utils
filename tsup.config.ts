import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli/*.ts"],
  format: ["esm"],
  platform: "node",
  shims: true,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
});
