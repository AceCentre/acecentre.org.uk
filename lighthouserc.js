const getTargetBaseUrl = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  return "http://localhost:3000";
};

module.exports = {
  ci: {
    collect: {
      url: [getTargetBaseUrl()],
    },
    upload: {
      target: "temporary-public-storage",
    },
    assert: {
      assertions: {
        "seo/is-crawlable": "off", // We no-index the previews so we can ignore this rule
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
  },
};
