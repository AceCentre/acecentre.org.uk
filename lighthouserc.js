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
      preset: "lighthouse:no-pwa",
      // NOTE: When turning a rule off please not why you are turning it off and what we can do to turn it back on
      assertions: {
        "is-crawlable": "off", // We don't want the previews to be crawlable
        "non-composited-animations": "off", // Annoying to fix, remove this one day
        "unused-javascript": "off", // We don't have much control over this its down to Next
      },
    },
  },
};
