import withSession from "../../../lib/auth/with-session";

function handler(req, res) {
  req.session.destroy();
  res.send("Logged out");
}

export default withSession(handler);
