const REDIRECTS = require("./redirects");

module.exports = {
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
