const config = require("../../lib/config");

// GITHUB actions will remove secrets from logs
module.exports = {
  onPostBuild: async () => {
    console.log("======= CONFIG =======");
    console.log(JSON.stringify(config, null, 2));
    console.log("======= CONFIG =======");
  },
};
