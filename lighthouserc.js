const PATHS_TO_TEST = require("./lighthouse-paths");

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
  const uploadToServer = process.env.UPLOAD_TO_LH === "true" ? true : false;

  if (uploadToServer) {
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
    "valid-source-maps": "off",
  };
};

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
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

        // This is down to how next handles css, it does clever things but lighthouse doesnt like it
        "unused-css-rules": "off",
        "uses-rel-preconnect": "off",
        "preload-lcp-image": "off",

        // This would require a lot of work to fix, issue has been opened
        // https://github.com/AceCentre/acecentre.org.uk/issues/108
        "csp-xss": "off",

        // I kinda hate turning this off but its the only option
        // WCAG color contrast is imperfect and reports failures when they are
        // actually high contrasting.
        // We can disable this when Lighthouse changes to APCA
        "color-contrast": "off",

        // While these are useful, they are triggered by youtube embeds. At some point we should switch out
        // the native youtube embeds for youtube-lite
        "font-display": "off",
        "third-party-facades": "off",

        // I really don't like disabling this but the forms iframe causes these
        // to fail. Ideally we would ignore it from the office origin
        "errors-in-console": "off",
        "unminified-javascript": "off",
        "valid-source-maps": "off",
        "unminified-css": "off",
        "uses-text-compression": "off",

        // Allow gifs
        "efficient-animated-content": "off",

        // Posthog does this
        "no-unload-listeners": "off",

        // We actually want to force the tab into the model so its trapped there. It initially focuses on close so a user can get out of it pretty easily.
        tabindex: "off",

        "offscreen-images": "off",
        "unsized-images": "off",
        "crawlable-anchors":"off"

        ...getExtraAssertions(),
      },
    },
  },
};
