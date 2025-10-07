import { defineConfig } from '@playwright/test';

export default defineConfig({
    webServer: {
        command: 'npm run start', // Your React dev server start command
        url: 'http://localhost:3000', // Default React dev server URL
        reuseExistingServer: !process.env.CI, // Reuse dev server if not in CI
    },
    use: {
        baseURL: 'http://localhost:3000', // Base URL for tests
        browserName: 'chromium', // Default browser (can also use 'firefox' or 'webkit')
    },
    projects: [
        {
            name: 'chromium',
            use: { browserName: 'chromium' },
        },
        // Add more projects for other browsers if needed
    ],
});