import { resetPassword } from "../../../lib/auth/get-user";
import withSession from "../../../lib/auth/with-session";
import { withSentry } from "@sentry/nextjs";

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const username = body.username;

  await resetPassword(req, username);

  res.send({
    success: true,
  });
}

export default withSentry(withSession(handler));
