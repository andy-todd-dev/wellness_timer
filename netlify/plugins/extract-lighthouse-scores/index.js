const fs = require("fs");
const path = require("path");

module.exports = {
  onSuccess: async ({ constants, inputs, utils }) => {
    try {
      // Get configuration from inputs with defaults
      const outputPath = inputs.output_path || "reports/lighthouse.json";
      const allowedBranches = inputs.branch_filter
        ?.split(",")
        .map((b) => b.trim()) || ["main"];

      // Only extract JSON for specified branches
      const currentBranch = process.env.BRANCH || process.env.HEAD;
      console.log(`🔍 Debug: Environment variables - BRANCH: ${process.env.BRANCH}, HEAD: ${process.env.HEAD}, COMMIT_REF: ${process.env.COMMIT_REF}`);
      
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
        "reports",
        "lighthouse.html"
      );
      const lighthouseJsonPath = path.join(constants.PUBLISH_DIR, outputPath);

      // Debug: List what's actually in the publish directory
      console.log(`🔍 Debug: PUBLISH_DIR is ${constants.PUBLISH_DIR}`);
      console.log(`🔍 Debug: Current branch: ${currentBranch}`);
      console.log(`🔍 Debug: Allowed branches: ${allowedBranches.join(", ")}`);
      console.log(`🔍 Debug: Looking for HTML at ${lighthouseHtmlPath}`);
      
      // Check if reports directory exists
      const reportsDir = path.join(constants.PUBLISH_DIR, "reports");
      if (fs.existsSync(reportsDir)) {
        console.log(`🔍 Debug: Reports directory exists, contents:`);
        const files = fs.readdirSync(reportsDir);
        files.forEach(file => console.log(`   - ${file}`));
      } else {
        console.log(`🔍 Debug: Reports directory does not exist at ${reportsDir}`);
        
        // Check if it might be in the root build directory
        const rootFiles = fs.readdirSync(constants.PUBLISH_DIR);
        console.log(`🔍 Debug: Files in PUBLISH_DIR root:`);
        rootFiles.forEach(file => console.log(`   - ${file}`));
        
        // Also check for any lighthouse-related files anywhere
        console.log(`🔍 Debug: Searching for any lighthouse files...`);
        try {
          const findLighthouseFiles = (dir, results = []) => {
            const items = fs.readdirSync(dir);
            for (const item of items) {
              const fullPath = path.join(dir, item);
              if (fs.statSync(fullPath).isDirectory()) {
                findLighthouseFiles(fullPath, results);
              } else if (item.toLowerCase().includes('lighthouse')) {
                results.push(fullPath);
              }
            }
            return results;
          };
          
          const lighthouseFiles = findLighthouseFiles(constants.PUBLISH_DIR);
          if (lighthouseFiles.length > 0) {
            console.log(`🔍 Debug: Found lighthouse files:`);
            lighthouseFiles.forEach(file => console.log(`   - ${file}`));
          } else {
            console.log(`🔍 Debug: No lighthouse files found anywhere in PUBLISH_DIR`);
          }
        } catch (searchError) {
          console.log(`🔍 Debug: Error searching for lighthouse files:`, searchError.message);
        }
      }

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

      // Extract the JSON data embedded in the HTML
      const jsonMatch = htmlContent.match(
        /window\.__LIGHTHOUSE_JSON__\s*=\s*({.*?});/s
      );

      if (!jsonMatch) {
        utils.build.failPlugin(
          "Could not find Lighthouse JSON data in HTML report"
        );
        return;
      }

      const lighthouseData = JSON.parse(jsonMatch[1]);

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

      // Use utils.status.show for better visibility in deploy summary
      utils.status.show({
        title: "Lighthouse JSON Extracted",
        summary: `Successfully extracted Lighthouse scores to ${outputPath}`,
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
      // Use proper error reporting instead of just console.error
      utils.build.failPlugin("Error extracting Lighthouse JSON", { error });
    }
  },
};
