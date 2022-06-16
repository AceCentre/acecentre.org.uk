import { gql, GraphQLClient, request } from "graphql-request";
import withSession from "../../lib/auth/with-session";
import { App } from "@slack/bolt";
import TurndownService from "turndown";
import exportEnv from "../../envs";

exportEnv();

const ENDPOINT = "https://backend.acecentre.org.uk/graphql";

const slackToken = process.env.SLACK_TOKEN;
const slackSecret = process.env.SLACK_SECRET;
const slackConfig = {
  token: slackToken,
  signingSecret: slackSecret,
};

const REFRESH_QUERY = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
      authToken
    }
  }
`;

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
    console.log("Finished waiting!");
    const body = JSON.parse(req.body);

    console.log(JSON.stringify(body, null, 2));

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

  const testEmailRegex = /test-[0-9]+(-[a-zA-Z0-9]*)*@acecentre.org.uk/;

  if (
    testEmailRegex.test(message) &&
    markdown.toLowerCase().includes("successfully")
  ) {
    console.log(
      "Swallowing the following message because it has the test email, its too noisy",
      markdown
    );
    return;
  }

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
  const refreshToken = user.refreshToken || null;
  const wooSession = cart.wooSessionToken || null;

  console.log("Getting a new auth token", refreshToken);
  let response = await request(ENDPOINT, REFRESH_QUERY, { refreshToken });
  const authToken = response.refreshJwtAuthToken.authToken;
  console.log("Got a new auth token", authToken, response);
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
