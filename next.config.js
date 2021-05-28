const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withTM = require("next-transpile-modules")([
  "@adobe/react-spectrum",
  "@spectrum-icons/.*",
  "@react-spectrum/.*",
]);

module.exports = withPlugins([withCSS, withTM], {
  target: "serverless",
  images: {
    domains: ["acecentre.org.uk", "internal.acecentre.org.uk"],
  },
});
