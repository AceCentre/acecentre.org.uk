const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotsFolder: "./artifacts/screenshots",
  videosFolder: "./artifacts/videos",
  projectId: "2da7p6",
  retries: 1,
  chromeWebSecurity: false,
  pageLoadTimeout: 60000,
  requestTimeout: 60000,
  responseTimeout: 60000,
  defaultCommandTimeout: 20000,
  viewportHeight: 800,
  viewportWidth: 1280,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("file:preprocessor", config);
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
