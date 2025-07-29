import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: "http://localhost:3000",
    supportFile: false,
    video: false,
    async setupNodeEvents(on, config) {
      // Register the Cucumber preprocessor as the file preprocessor
      await addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", createBundler({
        plugins: [
          createEsbuildPlugin(config)
        ],
      }));
      return config;
    },
  },
});
