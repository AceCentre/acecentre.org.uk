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
      assertions: {
        "is-crawlable": "off", // We dont want the previews to be crawlable
        "non-composited-animations": "off", // Annoying to fix, remove this one day
        "unused-javascript": "off", // We dont have much control over this its down to Next
      },
    },
  },
};
