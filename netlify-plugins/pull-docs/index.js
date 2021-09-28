const { remoteDocs } = require("../../remote-docs.json");

module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    for (const currentDocs of remoteDocs) {
      console.log(
        `Attempting to pull ${currentDocs.owner}/${currentDocs.repo}`
      );

      await run.command(
        `git clone https://github.com/${currentDocs.owner}/${currentDocs.repo} ~/temp-${currentDocs.repo}`
      );

      console.log("Successfully pulled to", `~/temp-${currentDocs.repo}`);
    }
  },
};
