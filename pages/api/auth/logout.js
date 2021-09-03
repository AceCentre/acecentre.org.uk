import withSession from "../../../lib/auth/with-session";

function handler(req, res) {
  req.session.destroy();

  res.send({ success: true });
}

export default withSession(handler);
