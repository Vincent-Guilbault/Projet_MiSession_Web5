import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.baseUrl= 'http://127.0.0.1:5173',
      config.specPattern= 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
    },
  },
});
