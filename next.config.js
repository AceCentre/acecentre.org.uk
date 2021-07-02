const { enableBundleAnalyzer } = require("./lib/config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: enableBundleAnalyzer,
});

module.exports = withBundleAnalyzer({
  target: "serverless",
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
    CONTEXT: process.env.CONTEXT,
  },
  images: {
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
});
