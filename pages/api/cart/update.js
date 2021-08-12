import withSession from "../../../lib/auth/with-session";

async function handler(req, res) {
  res.send({ success: true });
}

export default withSession(handler);
