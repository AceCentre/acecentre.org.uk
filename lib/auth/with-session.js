// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    cookieName: "next_auth",
    password: process.env.SESSION_SECRET,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
