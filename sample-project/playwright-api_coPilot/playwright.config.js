import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['line']],
  use: {
    baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'auth-setup',
      testMatch: /auth-login\/.*\.spec\.js/,
    },
    {
      name: 'tests',
      dependencies: ['auth-setup'],
      testIgnore: [/auth-login\/.*\.spec\.js/],
    },
  ],
});
