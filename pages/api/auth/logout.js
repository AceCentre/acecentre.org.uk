import withSession from "../../../lib/auth/with-session";
import { withSentry } from "@sentry/nextjs";

function handler(req, res) {
  req.session.destroy();
  res.send({ success: true });
}

export default withSentry(withSession(handler));
