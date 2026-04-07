import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 1,
  fullyParallel: true,
  workers: 4,

  reporter: [
    ['list'],
    ['html']
  ]

});
