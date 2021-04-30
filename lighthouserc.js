const getTargetBaseUrl = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  return "http://localhost:3000";
};

const PATHS_TO_TEST = ["/", "/staff", "/staff/will-wade", "/trustees"];

module.exports = {
  ci: {
    collect: {
      url: PATHS_TO_TEST.map((path) => getTargetBaseUrl() + path),
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
        "uses-optimized-images": "off", // This complains because we don't serve images in WebP. It would be nice to do this one day but right now its not worth it
        redirects: "off", // For previews netlify bounces you about abit, to .com => .app => http => https. This makes redirect rule fail. Doesn't do the redirecting in prod though
      },
    },
  },
};
