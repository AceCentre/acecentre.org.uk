import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";

const UPDATE_DETAILS = gql`
  mutation UpdateDetails($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
      }
    }
  }
`;

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const user = req.session.get("user");

  await clientRequest(req, res, UPDATE_DETAILS, {
    input: {
      id: user.userId,
      firstName: body.details.firstName,
      lastName: body.details.lastName,
      displayName: body.details.name,
      email: body.details.email,
    },
  });

  res.send({
    success: true,
  });
}

export default withSession(handler);
