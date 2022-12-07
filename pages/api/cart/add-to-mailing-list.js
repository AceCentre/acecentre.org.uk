import withSession from "../../../lib/auth/with-session";

async function handler(req, res) {
  res.send({ success: false });
}

export default withSession(handler);
