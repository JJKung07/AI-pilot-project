import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  reporter: [
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/junit.xml" }],
    ["line"],
  ],
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  use: {
    trace: "on-first-retry",
    baseURL: process.env.BASE_URL || "https://restful-booker.herokuapp.com",
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  projects: [
    {
      name: "auth-setup",
      testMatch: /auth-login.*\.spec\.js/,
    },
    {
      name: "tests",
      dependencies: ["auth-setup"],
      testIgnore: [/auth-login.*\.spec\.js/],
    },
  ],
});
