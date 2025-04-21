const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: "testy/e2e/**/*.spec.js",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});