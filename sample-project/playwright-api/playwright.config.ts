import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // API tests run sequentially to avoid state collisions
  reporter: [['html'], ['line']],
  use: {
    baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'api' }, // No browsers configured
  ],
});
