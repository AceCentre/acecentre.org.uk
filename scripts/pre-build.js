const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

let step = 1;

const runStep = async (name, task) => {
  console.log(`${step}. ${name} - Started`);

  await task();

  console.log(`${step}. ${name} - Finished`);
  console.log("");
  step++;
};

const setBuildId = async () => {
  const envPath = path.join(__dirname, "../.env");
  const buildId = crypto.randomUUID();
  fs.appendFileSync(envPath, `\nBUILD_ID=${buildId}\n`);

  console.log("Set build key to", buildId);
};

// Main
(async () => {
  console.log("");

  await runStep("Set BuildID", setBuildId);

  console.log("");
})();
