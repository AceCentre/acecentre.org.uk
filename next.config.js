const { withSentryConfig } = require("@sentry/nextjs");
const REDIRECTS = require("./redirects");

const nextConfig = {
  redirects: async () => {
    return REDIRECTS;
  },
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
    CONTEXT: process.env.CONTEXT,
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  sentry: {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
};

const SentryWebpackPluginOptions = {
  // Suppresses source map uploading logs during build
  silent: true,
  org: "ace-centre",
  project: "acecentreorguk",
};

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions);
