const { remoteDocs } = require("../../remote-docs.json");
const path = require("path");

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    console.log("================");
    for (const currentDocs of remoteDocs) {
      console.log(
        `Attempting to pull ${currentDocs.owner}/${currentDocs.repo}`
      );

      const cloneTarget = `~/temp-${currentDocs.repo}`;

      try {
        await run.command(
          `git clone https://github.com/${currentDocs.owner}/${currentDocs.repo} ${cloneTarget}`
        );
      } catch (error) {
        if (
          error.stderr ===
          "fatal: destination path '~/temp-pasco' already exists and is not an empty directory."
        ) {
          console.log("Repo already cloned");
          console.log("Attempting to pull latest changes");
          await run.command(`git -C ${cloneTarget} pull`);
          console.log("Pulled changes");
        } else {
          throw error;
        }
      }

      console.log(
        "Successfully got latest version of repo in",
        `~/temp-${currentDocs.repo}`
      );

      const source = `~/temp-${currentDocs.repo}/${currentDocs.folder}`;
      const target = path.join(
        __dirname,
        "../../pages/product-docs",
        `./${currentDocs.urlPath}`
      );

      console.log("Attempting the target directory");

      await run.command(`mkdir -p ${target}`);

      console.log("Created directory");

      console.log(`Attempting to copy ${source} to ${target}`);

      await run.command(`cp -R ${source}/. ${target}`);

      console.log(`Successfully copy ${source} to ${target}`);
      console.log("================");
    }
  },
};
