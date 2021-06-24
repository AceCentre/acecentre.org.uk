module.exports = {
  target: "serverless",
  env: {
    IMAGE_URL: process.env.IMAGE_URL,
  },
  images: {
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
};
