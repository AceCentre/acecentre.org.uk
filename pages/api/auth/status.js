import withSession from "../../../lib/auth/with-session";

async function handler(req, res) {
  const user = req.session.get("user");

  if (user) {
    res.send({ loggedIn: true });
  } else {
    res.send({ loggedIn: false });
  }
}

export default withSession(handler);
