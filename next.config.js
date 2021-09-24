const withMDX = require("@next/mdx")({ extension: /\.mdx?$/ });

module.exports = withMDX({
  pageExtensions: ["js", "mdx"],
  target: "serverless",
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
    CONTEXT: process.env.CONTEXT,
  },
  images: {
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
});
