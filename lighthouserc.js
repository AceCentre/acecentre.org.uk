// If there is a base URL then we are running in a prod like environment
const isProd = !!process.env.BASE_URL;

const getTargetBaseUrl = () => {
  if (isProd) {
    return process.env.BASE_URL;
  }

  return "http://localhost:3000";
};

// On local just upload to temp storage
const getUploadTarget = () => {
  if (isProd) {
    return {
      target: "lhci",
      serverBaseUrl: "https://ace-lh-ci.herokuapp.com/",
    };
  }

  return {
    target: "temporary-public-storage",
  };
};

// On local we want to disable some assertions on a few extra things
// for example we don't mind HTTP on local
const getExtraAssertions = () => {
  if (isProd) {
    return {};
  }

  return {
    "total-byte-weight": "off",
    "unminified-css": "off",
    "unminified-javascript": "off",
    "uses-text-compression": "off",
    "valid-source-maps": "off",
  };
};

const PATHS_TO_TEST = [
  "/",
  "/about",
  "/about/staff",
  "/about/trustees",
  "/careers",
  "/stories",
  "/blog",
  "/blog/category/general",
  "/blog/covid-19-update-clients-at-the-centre-of-our-covid-19-strategy",
];

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      url: PATHS_TO_TEST.map((path) => getTargetBaseUrl() + path),
      settings: {
        preset: "desktop",
        maxWaitForLoad: 5000,
      },
    },
    upload: getUploadTarget(),
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

        ...getExtraAssertions(),
      },
    },
  },
};
