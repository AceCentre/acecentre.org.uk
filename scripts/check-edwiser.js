const { App } = require("@slack/bolt");
const got = require("got");
const { parseHTML } = require("linkedom");
const { request, gql } = require("graphql-request");

const script = async () => {
  try {
    const {
      plugins: { nodes: allPlugins },
    } = await request({
      url: "https://backend.acecentre.org.uk/graphql",
      document: gql`
        query allPlugins {
          plugins(first: 999) {
            nodes {
              name
              version
            }
          }
        }
      `,
      requestHeaders: { Authorization: `Basic ${process.env.WORDPRESS_AUTH}` },
    });

    const currentGeneralVersion = allPlugins.find(
      (x) => x.name === "Edwiser Bridge - WordPress Moodle LMS Integration"
    );
    const newestGeneralVersion = await getNewestGeneralVersion();

    if (newestGeneralVersion !== currentGeneralVersion.version) {
      await sendSlackMessage(
        `EDWISER PLUGIN OUTDATED: There is a new version of the general edwiser plugin available. The newest version available is '${newestGeneralVersion}' but we are on '${currentGeneralVersion.option_value}'.`
      );
    }

    await checkVersionOfEdwiserPlugin({
      name: "Edwiser Bridge Single Sign On",
      url: "https://edwiser.org/bridge/extensions/single-sign-on",
      allPlugins,
    });

    await checkVersionOfEdwiserPlugin({
      name: "Bulk Purchase and Group Registration",
      url: "https://edwiser.org/bridge/extensions/bulk-purchase/",
      allPlugins,
    });

    await checkVersionOfEdwiserPlugin({
      name: "WooCommerce Integration",
      url: "https://edwiser.org/bridge/extensions/woocommerce-integration",
      allPlugins,
    });
  } catch (e) {
    await sendSlackMessage("Failed to get the edwiser plugin data.");
    throw e;
  }
};

const checkVersionOfEdwiserPlugin = async ({ name, url, allPlugins }) => {
  const currentVersion = allPlugins.find((x) => x.name === name);

  const newestVersion = await getNewestVersionOfEdwiserPlugin(url);

  if (newestVersion !== currentVersion.version) {
    await sendSlackMessage(
      `EDWISER PLUGIN OUTDATED: There is a new version of the ${name} Plugin available. The newest version available is '${newestVersion}' and we are on '${currentVersion.option_value}'`
    );
  }
};

const getNewestVersionOfEdwiserPlugin = async (url) => {
  const { document } = await domForUrl(url);

  const versionEl = document.querySelector(".pl-version > p");

  return versionEl.textContent;
};

const getNewestGeneralVersion = async () => {
  const { document } = await domForUrl(
    "https://en-gb.wordpress.org/plugins/edwiser-bridge/"
  );

  const widgets = document.querySelectorAll(".plugin-meta > ul > li");
  const versionEl = Array.from(widgets).find((el) => {
    return el.textContent.toLowerCase().includes("version");
  });

  return versionEl.textContent.trim().toLowerCase().replace("version: ", "");
};

const domForUrl = async (url) => {
  const response = await got(url);
  const dom = parseHTML(response.body);

  return dom;
};

const sendSlackMessage = async (message) => {
  console.log("Trying to send a slack message", message);
  const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SECRET,
  });
  await app.client.chat.postMessage({
    channel: "C02E0MC3HB2",
    text: `<@U01S5QXCDV3> <@UDH2285M5>\n\n${message}`,
    link_names: true,
  });
  console.log("Sent a slack message");
};

script();

module.exports = script;
