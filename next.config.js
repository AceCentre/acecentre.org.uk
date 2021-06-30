const { enableBundleAnalyzer } = require("./lib/config");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: enableBundleAnalyzer,
});

module.exports = withBundleAnalyzer({
  target: "serverless",
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
  },
  images: {
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
});
