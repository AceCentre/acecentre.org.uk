const fs = require("fs");
const path = require("path");

module.exports = {
  onPreBuild: async () => {
    const pathToEnv = path.join(process.cwd(), "./.env");
    fs.appendFileSync(pathToEnv, "\nNETLIFY=true\n");
    fs.appendFileSync(pathToEnv, `CONTEXT=${process.env.CONTEXT}\n`);
    fs.appendFileSync(pathToEnv, `REDIS_URL=${process.env.REDIS_URL}\n`);
    fs.appendFileSync(pathToEnv, `GITHUB_SHA=${process.env.GITHUB_SHA}\n`);
    fs.appendFileSync(pathToEnv, `BUILD_ID=${process.env.BUILD_ID}\n`);
    fs.appendFileSync(pathToEnv, `DEPLOY_KEY=${process.env.DEPLOY_KEY}\n`);
    fs.appendFileSync(pathToEnv, `PROM_KEY=${process.env.PROM_KEY}\n`);
    fs.appendFileSync(pathToEnv, `IMAGE_URL=${process.env.IMAGE_URL}\n`);
    fs.appendFileSync(
      pathToEnv,
      `NEXT_PUBLIC_FORMIUM_PROJECTID=${process.env.NEXT_PUBLIC_FORMIUM_PROJECTID}\n`
    );
    fs.appendFileSync(
      pathToEnv,
      `FORMIUM_TOKEN=${process.env.FORMIUM_TOKEN}\n`
    );
  },
};
