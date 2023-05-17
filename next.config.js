const { withSentryConfig } = require("@sentry/nextjs");
const REDIRECTS = require("./redirects");

const normalConfig = {
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
};

const SentryWebpackPluginOptions = {
  silent: false,
};

module.exports = withSentryConfig(normalConfig, SentryWebpackPluginOptions);
