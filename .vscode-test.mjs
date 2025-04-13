import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "out/test/**/*.test.js",
  launchArgs: ["--disable-extensions"],
  mocha: { ui: "bdd", timeout: 60000 },
});
