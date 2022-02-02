const { App } = require("@slack/bolt");

const script = async () => {
  await sendSlackMessage("Remember to remove all the test users from Moodle!");
};

const sendSlackMessage = async (message) => {
  console.log("Trying to send a slack message", message);
  const app = new App({
    token: process.env.SLACK_TOKEN,
    signingSecret: process.env.SLACK_SECRET,
  });
  await app.client.chat.postMessage({
    channel: "C02E0MC3HB2",
    text: `<@U01S5QXCDV3> - ${message}`,
    link_names: true,
  });
  console.log("Sent a slack message");
};

module.exports = script;
