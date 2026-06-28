import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env.api") });

export default defineConfig({
  testDir: "./tests/api",
  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
  ],
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "auth-setup",
      testMatch: /auth-login.*\.spec\.js/,
    },
    {
      name: "tests",
      dependencies: ["auth-setup"],
      testIgnore: /auth-login.*\.spec\.js/,
    },
  ],
});
