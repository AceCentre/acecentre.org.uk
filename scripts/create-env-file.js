const fs = require("fs");
const path = require("path");

const ENVIRONMENT_VARIABLES = [
  "CONTEXT",
  "REDIS_URL",
  "GITHUB_SHA",
  "BUILD_ID",
  "DEPLOY_KEY",
  "IMAGE_URL",
  "SLACK_TOKEN",
  "SLACK_SECRET",
  "POSTHOG_KEY",
  "CLOUDINARY_CLOUD",
  "SPEECH_KEY",
  "SPEECH_REGION",
];

const envFilePath = path.join(__dirname, "../.env");

let envContent = "";
for (const current of ENVIRONMENT_VARIABLES) {
  if (!process.env[current]) {
    throw new Error(`Environment variable not defined (${current})`);
  }

  envContent += `${current}=${process.env[current]}\n`;
}

envContent += "\n";

fs.appendFileSync(envFilePath, envContent);
