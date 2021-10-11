const mysql = require("mysql2/promise");
const { App } = require("@slack/bolt");
const got = require("got");
const { parseHTML } = require("linkedom");

const script = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      database: process.env.DB_DATABASE,
    });

    const [statusRows] = await connection.execute(
      `SELECT * FROM ace_options ao
    WHERE option_name LIKE "edd%status"`
    );

    await Promise.all(
      statusRows.map(async (row) => {
        if (row.option_value !== "valid") {
          await sendSlackMessage(
            `EDWISER PLUGIN DISABLED: The plugin ${row.option_name} has been disabled.`
          );
        }
      })
    );

    const [[currentGeneralVersion]] = await connection.execute(
      `SELECT * FROM ace_options ao
WHERE option_name LIKE "eb_current_version"`
    );

    const newestGeneralVersion = await getNewestGeneralVersion();

    if (newestGeneralVersion !== currentGeneralVersion.option_value) {
      await sendSlackMessage(
        "EDWISER PLUGIN OUTDATED: There is a new version of the general edwiser plugin available."
      );
    }

    await checkVersionOfEdwiserPlugin({
      connection,
      optionName: "eb_sso_version",
      url: "https://edwiser.org/bridge/extensions/single-sign-on",
    });

    await checkVersionOfEdwiserPlugin({
      connection,
      optionName: "eb_bp_plugin_version",
      url: "https://edwiser.org/bridge/extensions/bulk-purchase/",
    });

    await checkVersionOfEdwiserPlugin({
      connection,
      optionName: "woocommerce_integration_version",
      url: "https://edwiser.org/bridge/extensions/woocommerce-integration",
    });

    await connection.end();
  } catch (e) {
    await sendSlackMessage("Failed to get the edwiser plugin data.");
    throw e;
  }
};

const checkVersionOfEdwiserPlugin = async ({ connection, optionName, url }) => {
  const [[currentVersion]] = await connection.execute(
    `SELECT * FROM ace_options ao
          WHERE option_name LIKE "${optionName}"`
  );

  const newestVersion = await getNewestVersionOfEdwiserPlugin(url);

  if (newestVersion !== currentVersion.option_value) {
    await sendSlackMessage(
      `EDWISER PLUGIN OUTDATED: There is a new version of the ${optionName} Plugin available.`
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
    text: `<@U01S5QXCDV3>\n\n${message}`,
    link_names: true,
  });
  console.log("Sent a slack message");
};

module.exports = script;
