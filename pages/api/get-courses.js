// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../lib/auth/with-session";
import { getMyCourses } from "../../lib/products/get-courses";

const handler = async (req, res) => {
  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return res.send({ courses: [] });
  }

  try {
    const courses = await getMyCourses(req, user);
    return res.send({ courses });
  } catch (error) {
    console.log(error);
    return res.send({ courses: [] });
  }
};

export default withSession(handler);
