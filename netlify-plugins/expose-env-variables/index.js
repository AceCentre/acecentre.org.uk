const fs = require("fs");
const path = require("path");

module.exports = {
  onPreBuild: async () => {
    const varToExpose = [
      "CONTEXT",
      "REDIS_URL",
      "GITHUB_SHA",
      "BUILD_ID",
      "DEPLOY_KEY",
      "IMAGE_URL",
      "MAILCHIMP_SERVER",
      "MAILCHIMP_API_KEY",
      "SLACK_TOKEN",
      "SLACK_SECRET",
      "POSTHOG_KEY",
      "CLOUDINARY_CLOUD",
    ];

    const pathToEnv = path.join(process.cwd(), "./.env");
    const pathToJs = path.join(process.cwd(), "./envs.js");

    fs.appendFileSync(pathToEnv, "\nNETLIFY=true\n");
    fs.appendFileSync(
      pathToJs,
      "const exportEnvs = () => {\nprocess.env.NETLIFY=true\n"
    );

    for (const varName of varToExpose) {
      fs.appendFileSync(pathToEnv, `${varName}=${process.env[varName]}\n`);
      fs.appendFileSync(
        pathToJs,
        `process.env.${varName}='${process.env[varName]}'\n`
      );
    }

    fs.appendFileSync(
      pathToJs,
      "\n}\nexportEnvs();\nexport default exportEnvs\n"
    );
  },
};
