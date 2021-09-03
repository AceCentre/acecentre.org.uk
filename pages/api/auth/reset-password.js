import { resetPassword } from "../../../lib/auth/get-user";
import withSession from "../../../lib/auth/with-session";

async function handler(req, res) {
  const body = JSON.parse(req.body);
  const username = body.username;

  await resetPassword(req, res, username);

  res.send({
    success: true,
  });
}

export default withSession(handler);
