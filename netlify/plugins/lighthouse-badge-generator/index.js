const fs = require("fs");
const path = require("path");

function extractLighthouseJSON(htmlContent) {
  // Extract the first script tag that contains __LIGHTHOUSE_JSON__
  const scriptMatch = htmlContent.match(
    /<script>window.__LIGHTHOUSE_JSON__=(.+)<\/script>/
  );

  if (scriptMatch && scriptMatch[1]) {
    try {
      // The extracted content is a JavaScript object literal, not JSON
      // We need to evaluate it as JavaScript instead of parsing as JSON
      const objectLiteral = scriptMatch[1];

      // Remove the trailing semicolon if present
      const cleanedObject = objectLiteral.replace(/;$/, "");

      // Use Function constructor to safely evaluate the object literal
      const parsed = new Function("return " + cleanedObject)();

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
      console.log(
        "❌ Failed to parse extracted JavaScript object:",
        parseError.message
      );
      console.log(
        `🔍 Object content (first 200 chars):`,
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
      const outputDirectory = inputs.output_directory || "reports";
      const completeJsonFilename =
        inputs.complete_json_filename || "lighthouse.json";
      const badgeFilenamePrefix = inputs.badge_filename_prefix || "lighthouse";
      const allowedBranches = inputs.branch_filter
        ?.split(",")
        .map((b) => b.trim()) || ["main"];

      // Only generate badges for specified branches
      const currentBranch = process.env.BRANCH || process.env.HEAD;

      if (!allowedBranches.includes(currentBranch)) {
        console.log(
          `🔍 Skipping Lighthouse badge generation for branch: ${currentBranch} (only runs on: ${allowedBranches.join(
            ", "
          )})`
        );
        return;
      }

      // Build paths using the configured directory
      const lighthouseHtmlPath = path.join(
        constants.PUBLISH_DIR,
        outputDirectory,
        "lighthouse.html"
      );
      const lighthouseJsonPath = path.join(
        constants.PUBLISH_DIR,
        outputDirectory,
        completeJsonFilename
      );

      // Check if Lighthouse HTML report exists
      if (!fs.existsSync(lighthouseHtmlPath)) {
        console.log(
          "🔍 Lighthouse HTML report not found at expected location, skipping badge generation"
        );
        return;
      }

      console.log("🔍 Generating Lighthouse badges from HTML report...");

      // Read the HTML content
      const htmlContent = fs.readFileSync(lighthouseHtmlPath, "utf8");

      // Use the robust extraction function
      const lighthouseData = extractLighthouseJSON(htmlContent);

      if (!lighthouseData) {
        utils.build.failPlugin(
          "Could not extract Lighthouse data from HTML report. The HTML file exists but doesn't contain valid Lighthouse data."
        );
        return;
      }

      if (!lighthouseData.categories) {
        utils.build.failPlugin("Invalid Lighthouse data structure");
        return;
      }

      // Ensure output directory exists
      const outputDir = path.join(constants.PUBLISH_DIR, outputDirectory);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Save the complete standard Lighthouse JSON
      fs.writeFileSync(
        lighthouseJsonPath,
        JSON.stringify(lighthouseData, null, 2)
      );

      // Create individual JSON files for each category with percentage scores and colors
      const categories = {
        performance: lighthouseData.categories.performance,
        accessibility: lighthouseData.categories.accessibility,
        "best-practices": lighthouseData.categories["best-practices"],
        seo: lighthouseData.categories.seo,
      };

      // Function to determine color based on score
      const getColorForScore = (score) => {
        const percentage = Math.round(score * 100);
        if (percentage >= 90) return "brightgreen";
        if (percentage >= 70) return "green";
        if (percentage >= 50) return "yellow";
        if (percentage >= 30) return "orange";
        return "red";
      };

      // Create individual category files
      Object.entries(categories).forEach(([categoryName, categoryData]) => {
        const score = Math.round(categoryData.score * 100);
        const color = getColorForScore(categoryData.score);

        const categoryJson = {
          schemaVersion: 1,
          label: categoryName.replace("-", " "),
          message: `${score}%`,
          color: color,
        };

        // Use configured prefix and directory for filename
        const categoryPath = path.join(
          constants.PUBLISH_DIR,
          outputDirectory,
          `${badgeFilenamePrefix}-${categoryName}.json`
        );

        fs.writeFileSync(categoryPath, JSON.stringify(categoryJson, null, 2));
        console.log(
          `✅ Created ${categoryName} badge JSON: ${score}% (${color})`
        );
      });

      utils.status.show({
        title: "Lighthouse Badges Generated",
        summary: `Successfully generated Lighthouse badges and data files`,
        text: `Performance: ${Math.round(
          lighthouseData.categories.performance.score * 100
        )}%\nAccessibility: ${Math.round(
          lighthouseData.categories.accessibility.score * 100
        )}%\nBest Practices: ${Math.round(
          lighthouseData.categories["best-practices"].score * 100
        )}%\nSEO: ${Math.round(lighthouseData.categories.seo.score * 100)}%`,
      });

      console.log("✅ Lighthouse badges generated successfully:");
      console.log(
        `   Complete data saved to: ${path.join(
          outputDirectory,
          completeJsonFilename
        )}`
      );
      console.log(
        `   Individual badge files created in ${outputDirectory}/ directory`
      );
    } catch (error) {
      utils.build.failPlugin("Error generating Lighthouse badges", { error });
    }
  },
};
