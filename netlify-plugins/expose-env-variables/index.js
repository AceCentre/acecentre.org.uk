const fs = require("fs");
const path = require("path");

module.exports = {
  onPreBuild: async () => {
    const pathToEnv = path.join(process.cwd(), "./.env");

    fs.appendFileSync(pathToEnv, "\nNETLIFY=true\n");
    fs.appendFileSync(pathToEnv, `CONTEXT=${process.env.CONTEXT}\n`);
    fs.appendFileSync(pathToEnv, `REDIS_URL=${process.env.REDIS_URL}\n`);
    fs.appendFileSync(pathToEnv, `GITHUB_SHA=${process.env.GITHUB_SHA}\n`);
  },
};
