// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import withSession from "../../lib/auth/with-session";
import { clientRequest } from "../../lib/client-request";

import { gql } from "graphql-request";

const DecreaseStock = gql`
  mutation decreaseStock($id: String!) {
    decreaseStock(input: { productSlug: $id }) {
      success
    }
  }
`;

const handler = async (req, res) => {
  if (!req.query.course)
    return res.send({ error: "You didn't pass a course in" });

  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return res.send({ error: "You are not logged in" });
  }

  try {
    const response = await clientRequest(req, DecreaseStock, {
      id: req.query.course,
    });

    if (response && response.decreaseStock && response.decreaseStock.success) {
      return res.redirect(307, `/learning/${req.query.course}`);
    }
    return res.send({ error: response });
  } catch (error) {
    console.log(error);
    return res.send({ error: error });
  }
};

export default withSession(handler);
