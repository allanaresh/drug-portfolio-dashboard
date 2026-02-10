const isCI = process.env.CI === "true";

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:3000"],
      numberOfRuns: 1,
    },

    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.8 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
      },
    },

    upload: isCI
      ? {
          target: "temporary-public-storage",
        }
      : {
          target: "filesystem",
          outputDir: "./lhci-reports",
        },
  },
};
