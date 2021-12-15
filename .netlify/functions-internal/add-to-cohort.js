import { gql, GraphQLClient } from "graphql-request";
import withSession from "../../lib/auth/with-session";
import { App } from "@slack/bolt";
import TurndownService from "turndown";
import exportEnv from "../../envs";
import config from "../../lib/config";

exportEnv();

const ENDPOINT = `${config.baseUrl}/graphql`;

const slackToken = process.env.SLACK_TOKEN;
const slackSecret = process.env.SLACK_SECRET;
const slackConfig = {
  token: slackToken,
  signingSecret: slackSecret,
};

const ADD_USERS_TO_COHORT = gql`
  mutation AddUsersToCohort($cohortName: String, $newUsers: [NewCohortUsers]) {
    addUsersToCohort(
      input: { input: { cohortName: $cohortName, newUsers: $newUsers } }
    ) {
      success
    }
  }
`;

const app = new App(slackConfig);

const wait = async (timer) => await new Promise((r) => setTimeout(r, timer));

async function rawHandler(req, res) {
  try {
    console.log("Function handling began");
    // Wait for 2 minutes so a user can 3D auth
    await wait(120000);
    console.log("Finished waiting");
    const body = JSON.parse(req.body);
    const cohortNames = body.cohortNames;
    for (let current of cohortNames) {
      const addUserResult = await addUserToCohort(
        req,
        current.cohortName,
        body.groupPurchaseEmails[current.productId]
      );
      console.log("Add user result", JSON.stringify(addUserResult, null, 2));

      if (addUserResult.msg) {
        await sendSlackMessage(addUserResult.msg);
      } else {
        /* eslint-disable indent */
        await app.client.chat.postMessage({
          channel: "C02E0MC3HB2",
          text: `
          FAILED to enroll the following emails:
          ${body.groupPurchaseEmails[current.productId].map(
            (email) => `* ${email}\n`
          )}
          `,
        });
        /* eslint-enable indent */
      }
    }
    console.log("Function handling finished");
    return;
  } catch (e) {
    console.log(e);
  }
}

const sendSlackMessage = async (message) => {
  console.log("Trying to send a slack message");
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(message);
  await app.client.chat.postMessage({
    channel: "C02E0MC3HB2",
    text: markdown,
  });
  console.log("Sent a slack message");
};

const addUserToCohort = async (req, cohortName, emails) => {
  console.log("Begin addUserToCohort");
  // Get the user and the cart from the session if the exist
  const user = req.session.get("user") || {};
  const cart = req.session.get("cart") || {};
  const authToken = user.authToken || null;
  const wooSession = cart.wooSessionToken || null;

  console.log({ user, cart, authToken, wooSession });

  let headers = {};
  if (authToken) headers["authorization"] = `Bearer ${authToken}`;
  if (wooSession) headers["woocommerce-session"] = `Session ${wooSession}`;
  if (req && req.socket && req.socket.remoteAddress) {
    headers["X-Forwarded-For"] = req.socket.remoteAddress;
  }

  if (req && req.headers && req.headers["client-ip"]) {
    headers["X-Forwarded-For"] = req.headers["client-ip"];
  }

  console.log({ headers, ENDPOINT });

  const client = new GraphQLClient(ENDPOINT, {
    headers,
  });
  const rawResult = await client.rawRequest(ADD_USERS_TO_COHORT, {
    cohortName,
    newUsers: emails.map((email) => ({
      email,
      firstName: email.split(/@/)[0],
      lastName: email.split(/@/)[1],
    })),
  });
  const { data: result } = rawResult;

  console.log({ result });

  console.log("Finished addUserToCohort");

  return result;
};

export const handler = withSession(rawHandler);

export default withSession(rawHandler);
