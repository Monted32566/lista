const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.spec.js", // Include .spec.js files in the e2e folder
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
