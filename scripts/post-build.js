const { execSync } = require("child_process");
const path = require("path");

let step = 1;

const runStep = async (name, task) => {
  console.log(`${step}. ${name} - Started`);

  await task();

  console.log(`${step}. ${name} - Finished`);
  console.log("");
  step++;
};

const buildSitemap = async () => {
  await execSync("yarn next-sitemap", {
    cwd: path.join(__dirname, "../"),
  });
};

// Main
(async () => {
  console.log("");

  await runStep("Build sitemap", buildSitemap);

  console.log("");
})();
