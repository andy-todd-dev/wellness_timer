const fs = require("fs");
const path = require("path");

function extractLighthouseJSON(htmlContent) {
  console.log(
    "First characters of HTML content:",
    htmlContent.substring(0, 2000)
  );

  // Extract the first script tag that contains __LIGHTHOUSE_JSON__
  const scriptMatch = htmlContent.match(
    /<script>window.__LIGHTHOUSE__JSON=(.+)<\/script>/
  );

  if (scriptMatch && scriptMatch[1]) {
    try {
      const parsed = JSON.parse(scriptMatch[1]);

      // Validate it's actually Lighthouse data
      if (parsed && parsed.lighthouseVersion && parsed.categories) {
        console.log(
          "✅ Successfully extracted Lighthouse JSON from script tag"
        );
        return parsed;
      } else {
        console.log(
          "❌ Extracted JSON doesn't contain expected Lighthouse structure"
        );
        return null;
      }
    } catch (parseError) {
      console.log("❌ Failed to parse extracted JSON:", parseError.message);
      console.log(
        `🔍 JSON content (first 200 chars):`,
        scriptMatch[1].substring(0, 200)
      );
      return null;
    }
  }

  console.log(
    "❌ Could not find script tag with window.__LIGHTHOUSE_JSON__ assignment"
  );
  return null;
}

module.exports = {
  onPostBuild: async ({ constants, inputs, utils }) => {
    try {
      // Get configuration from inputs with defaults
      const outputPath = inputs.output_path || "reports/lighthouse.json";
      const allowedBranches = inputs.branch_filter
        ?.split(",")
        .map((b) => b.trim()) || ["main"];

      // Only extract JSON for specified branches
      const currentBranch = process.env.BRANCH || process.env.HEAD;

      if (!allowedBranches.includes(currentBranch)) {
        console.log(
          `🔍 Skipping Lighthouse JSON extraction for branch: ${currentBranch} (only runs on: ${allowedBranches.join(
            ", "
          )})`
        );
        return;
      }

      const lighthouseHtmlPath = path.join(
        constants.PUBLISH_DIR,
        "reports/lighthouse.html"
      );
      const lighthouseJsonPath = path.join(constants.PUBLISH_DIR, outputPath);

      // Check if Lighthouse HTML report exists
      if (!fs.existsSync(lighthouseHtmlPath)) {
        console.log(
          "🔍 Lighthouse HTML report not found at expected location, skipping JSON extraction"
        );
        return;
      }

      console.log("🔍 Extracting Lighthouse JSON from HTML report...");

      // Read the HTML content
      const htmlContent = fs.readFileSync(lighthouseHtmlPath, "utf8");

      // Use the robust extraction function
      const lighthouseData = extractLighthouseJSON(htmlContent);

      if (!lighthouseData) {
        utils.build.failPlugin(
          "Could not extract Lighthouse JSON data from HTML report. The HTML file exists but doesn't contain valid Lighthouse data."
        );
        return;
      }

      if (!lighthouseData.categories) {
        utils.build.failPlugin("Invalid Lighthouse data structure");
        return;
      }

      // Ensure output directory exists
      const outputDir = path.dirname(lighthouseJsonPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Save the complete standard Lighthouse JSON
      fs.writeFileSync(
        lighthouseJsonPath,
        JSON.stringify(lighthouseData, null, 2)
      );

      utils.status.show({
        title: "Lighthouse JSON Extracted",
        summary: `Successfully extracted Lighthouse JSON to ${outputPath}`,
        text: `Performance: ${Math.round(
          lighthouseData.categories.performance.score * 100
        )}%\nAccessibility: ${Math.round(
          lighthouseData.categories.accessibility.score * 100
        )}%\nBest Practices: ${Math.round(
          lighthouseData.categories["best-practices"].score * 100
        )}%\nSEO: ${Math.round(lighthouseData.categories.seo.score * 100)}%`,
      });

      console.log("✅ Lighthouse JSON extracted successfully:");
      console.log(`   Saved to: ${lighthouseJsonPath}`);
    } catch (error) {
      utils.build.failPlugin("Error extracting Lighthouse JSON", { error });
    }
  },
};
