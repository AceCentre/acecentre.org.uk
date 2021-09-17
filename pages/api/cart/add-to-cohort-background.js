import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";
import { App } from "@slack/bolt";
import TurndownService from "turndown";
import config from "../../../lib/config";

const ADD_USERS_TO_COHORT = gql`
  mutation AddUsersToCohort($cohortName: String, $newUsers: [NewCohortUsers]) {
    addUsersToCohort(
      input: { input: { cohortName: $cohortName, newUsers: $newUsers } }
    ) {
      success
    }
  }
`;

const app = new App(config.slack);

async function handler(req, res) {
  try {
    console.log("Function handling began");
    const body = JSON.parse(req.body);
    console.log("With body:", JSON.stringify(body, null, 2));
    const cohortNames = body.cohortNames;
    for (let current of cohortNames) {
      const addUserResult = await addUserToCohort(
        req,
        current.cohortName,
        body.groupPurchaseEmails[current.productId]
      );
      console.log("Add user result", JSON.stringify(addUserResult, null, 2));
      await sendSlackMessage(addUserResult.msg);
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
  console.log(
    "Begin addUserToCohort",
    JSON.stringify({ cohortName, emails }, null, 2)
  );
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

export default withSession(handler);
