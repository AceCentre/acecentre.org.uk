module.exports = {
  onPostBuild: async ({ utils: { run } }) => {
    await run.command("cp _redirects .next/");
  },
};
