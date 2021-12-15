import { gql } from "graphql-request";
import withSession from "../../lib/auth/with-session";
import { clientRequest } from "../../lib/client-request";
import { App } from "@slack/bolt";
import TurndownService from "turndown";
import exportEnv from "../../envs";
exportEnv();

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
    await res.send({ success: true });
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
  const result = await clientRequest(req, ADD_USERS_TO_COHORT, {
    cohortName,
    newUsers: emails.map((email) => ({
      email,
      firstName: email.split(/@/)[0],
      lastName: email.split(/@/)[1],
    })),
  });
  console.log("Finished addUserToCohort");

  return result;
};

export const handler = withSession(rawHandler);

export default withSession(rawHandler);
