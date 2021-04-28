import { withIronSession } from "next-iron-session";

async function handler(req, res) {
  // get user from database then
  const body = JSON.parse(req.body);
  const user = body.user;

  console.log(user);

  req.session.set("user", user);

  await req.session.save();
  res.send({ success: true });
}

export default withIronSession(handler, {
  cookieName: "next_auth",
  password: process.env.SESSION_SECRET,
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
