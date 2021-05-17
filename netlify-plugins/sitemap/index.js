module.exports = {
  onPostBuild: async ({ utils: { run } }) => {
    await run.command("yarn build-sitemap");
  },
};
