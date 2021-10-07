// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../lib/auth/with-session";

const handler = async (req, res) => {
  const { verify_code, mdl_uid, wdmaction } = req.query;

  console.log(verify_code, mdl_uid, wdmaction);

  if (!wdmaction || !mdl_uid || !verify_code) {
    res.redirect("/404");
    return;
  }

  res.status(302);
  res.redirect("https://learning.acecentre.org.uk");
  return;
};

export default withSession(handler);
