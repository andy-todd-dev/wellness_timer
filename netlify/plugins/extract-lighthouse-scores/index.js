const fs = require("fs");
const path = require("path");

module.exports = {
  onSuccess: async ({ constants, utils }) => {
    try {
      // Only extract JSON for main branch builds
      const currentBranch = process.env.BRANCH || process.env.HEAD;
      if (currentBranch !== "main") {
        console.log(
          `🔍 Skipping Lighthouse JSON extraction for branch: ${currentBranch}`
        );
        return;
      }

      const lighthouseHtmlPath = path.join(
        constants.PUBLISH_DIR,
        "reports",
        "lighthouse.html"
      );
      const lighthouseJsonPath = path.join(
        constants.PUBLISH_DIR,
        "reports",
        "lighthouse.json"
      );

      // Check if Lighthouse HTML report exists
      if (!fs.existsSync(lighthouseHtmlPath)) {
        console.log(
          "🔍 Lighthouse HTML report not found, skipping JSON extraction"
        );
        return;
      }

      console.log("🔍 Extracting Lighthouse JSON from HTML report...");

      // Read the HTML content
      const htmlContent = fs.readFileSync(lighthouseHtmlPath, "utf8");

      // Extract the JSON data embedded in the HTML
      const jsonMatch = htmlContent.match(
        /window\.__LIGHTHOUSE_JSON__\s*=\s*({.*?});/s
      );

      if (!jsonMatch) {
        console.error("❌ Could not find Lighthouse JSON data in HTML report");
        return;
      }

      const lighthouseData = JSON.parse(jsonMatch[1]);

      if (!lighthouseData.categories) {
        console.error("❌ Invalid Lighthouse data structure");
        return;
      }

      // Ensure reports directory exists
      const reportsDir = path.dirname(lighthouseJsonPath);
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }

      // Save the complete standard Lighthouse JSON
      fs.writeFileSync(
        lighthouseJsonPath,
        JSON.stringify(lighthouseData, null, 2)
      );

      console.log("✅ Lighthouse JSON extracted successfully:");
      console.log(`   Saved to: ${lighthouseJsonPath}`);
    } catch (error) {
      console.error("❌ Error extracting Lighthouse JSON:", error.message);
      // Don't fail the build, just log the error
    }
  },
};
