const getTargetBaseUrl = () => {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }

  return "http://localhost:3000";
};

const PATHS_TO_TEST = ["/", "/about", "/about/staff", "/about/trustees"];

module.exports = {
  ci: {
    collect: {
      url: PATHS_TO_TEST.map((path) => getTargetBaseUrl() + path),
      settings: {
        preset: "desktop",
      },
    },
    upload: {
      target: "lhci",
      serverBaseUrl: "https://ace-lh-ci.herokuapp.com/",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      // NOTE: When turning a rule off please not why you are turning it off and what we can do to turn it back on
      assertions: {
        // We don't want the previews to be crawlable
        "is-crawlable": "off",

        // Annoying to fix, remove this one day
        "non-composited-animations": "off",

        // We don't have much control over this its down to Next
        "unused-javascript": "off",

        // This complains because we don't serve images in WebP.
        // It would be nice to do this one day but right now its not worth it
        "uses-optimized-images": "off",

        // For previews netlify bounces you about abit, to .com => .app => http => https.
        // This makes redirect rule fail. Doesn't do the redirecting in prod though
        redirects: "off",

        // Despite using responsive images i get this error
        "uses-responsive-images": "off",

        // Not a huge deal, if you have large event handlers then it
        // matters more, only need to worry about this if scrolling becomes janky
        "uses-passive-event-listeners": "off",

        // Youtube doesnt set the same site attribute on cookies which causes a bunch of noise
        "inspector-issues": "off",
      },
    },
  },
};
