import { withIronSession } from "next-iron-session";

function handler(req, res) {
  const user = req.session.get("user");
  res.send({ user });
}

export default withIronSession(handler, {
  cookieName: "next_auth",
  password: process.env.SESSION_SECRET,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
