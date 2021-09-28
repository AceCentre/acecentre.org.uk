const withMDX = require("@next/mdx")({ extension: /\.md?$/ });

module.exports = withMDX({
  pageExtensions: ["js", "md"],
  target: "serverless",
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
    CONTEXT: process.env.CONTEXT,
  },
  images: {
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
});
