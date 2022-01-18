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
      "PROM_KEY",
      "IMAGE_URL",
      "MAILCHIMP_SERVER",
      "MAILCHIMP_API_KEY",
      "SLACK_TOKEN",
      "SLACK_SECRET",
      "POSTHOG_KEY",
    ];

    console.log("Exposing vars", varToExpose);

    const pathToEnv = path.join(process.cwd(), "./.env");
    const pathToJs = path.join(process.cwd(), "./envs.js");

    const pathToBackgroundFunc = path.join(
      process.cwd(),
      "./.netlify/functions-internal/add-to-cohort.js"
    );

    const fileAsString = fs
      .readFileSync(pathToBackgroundFunc, "utf8")
      .toString();
    let newBlock = "";

    fs.appendFileSync(pathToEnv, "\nNETLIFY=true\n");
    fs.appendFileSync(
      pathToJs,
      "const exportEnvs = () => {\nprocess.env.NETLIFY=true\n"
    );

    console.log({ pathToEnv, pathToJs, pathToBackgroundFunc, fileAsString });

    for (const varName of varToExpose) {
      console.log(`Exposing ${varName} as ${process.env[varName]}`);
      fs.appendFileSync(pathToEnv, `${varName}=${process.env[varName]}\n`);
      fs.appendFileSync(
        pathToJs,
        `process.env.${varName}='${process.env[varName]}'\n`
      );

      newBlock += `process.env.${varName}='${process.env[varName]}';\n`;
    }

    fs.appendFileSync(
      pathToJs,
      "\n}\nexportEnvs();\nexport default exportEnvs\n"
    );

    console.log(newBlock + fileAsString);

    fs.writeFileSync(pathToBackgroundFunc, newBlock + fileAsString);
  },
};
