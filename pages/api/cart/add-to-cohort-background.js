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
  const body = JSON.parse(req.body);
  const cohortNames = body.cohortNames;
  for (let current of cohortNames) {
    const addUserResult = await addUserToCohort(
      req,
      res,
      current.cohortName,
      body.groupPurchaseEmails[current.productId]
    );
    await sendSlackMessage(addUserResult.msg);
  }
  await res.send({ success: true });
}

const sendSlackMessage = async (message) => {
  const turndownService = new TurndownService();
  const markdown = turndownService.turndown(message);
  await app.client.chat.postMessage({
    channel: "C02E0MC3HB2",
    text: markdown,
  });
};

const addUserToCohort = async (req, res, cohortName, emails) => {
  const result = await clientRequest(req, res, ADD_USERS_TO_COHORT, {
    cohortName,
    newUsers: emails.map((email) => ({
      email,
      firstName: email.split(/@/)[0],
      lastName: email.split(/@/)[1],
    })),
  });

  return result;
};

export default withSession(handler);
