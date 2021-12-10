require("@swc/register");
const { prefetchAll } = require("../../lib/prefetch-data");

module.exports = {
  onPreBuild: async () => {
    return prefetchAll();
  },
};
