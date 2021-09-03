// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../lib/auth/with-session";
import config from "../../lib/config";

const handler = async (req, res) => {
  const courseId = req.query.mdl_course_id;
  const user = req.session.get("user") || {};
  const authToken = user.authToken;

  if (!courseId) {
    res.redirect("/404");
    return;
  }

  if (!authToken) {
    res.redirect("/404");
    return;
  }

  const result = await fetch(`${config.baseUrl}?mdl_course_id=${courseId}`, {
    headers: {
      authorization: `Bearer ${authToken}`,
    },
    redirect: "manual",
  });

  if (result.status !== 302) {
    res.redirect("/404");
    return;
  }

  res.status(302).setHeader("location", result.headers.get("location")).send();
  return;
};

export default withSession(handler);
