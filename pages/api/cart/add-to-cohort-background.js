import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";

const ADD_USERS_TO_COHORT = gql`
  mutation AddUsersToCohort($cohortName: String, $newUsers: [NewCohortUsers]) {
    addUsersToCohort(
      input: { input: { cohortName: $cohortName, newUsers: $newUsers } }
    ) {
      success
    }
  }
`;

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const cohortNames = body.cohortNames;

  for (let current of cohortNames) {
    const addUserResult = await addUserToCohort(
      req,
      current.cohortName,
      body.groupPurchaseEmails[current.productId]
    );
    console.log(addUserResult);
  }

  await res.send({ success: true });
}

const addUserToCohort = async (req, cohortName, emails) => {
  const result = await clientRequest(req, ADD_USERS_TO_COHORT, {
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
