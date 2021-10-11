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
      `MAILCHIMP_SERVER=${process.env.MAILCHIMP_SERVER}\n`
    );
    fs.appendFileSync(
      pathToEnv,
      `MAILCHIMP_API_KEY=${process.env.MAILCHIMP_API_KEY}\n`
    );
    fs.appendFileSync(pathToEnv, `SLACK_TOKEN=${process.env.SLACK_TOKEN}\n`);
    fs.appendFileSync(pathToEnv, `SLACK_SECRET=${process.env.SLACK_SECRET}\n`);
    fs.appendFileSync(pathToEnv, `POSTHOG_KEY=${process.env.POSTHOG_KEY}\n`);
  },
};
