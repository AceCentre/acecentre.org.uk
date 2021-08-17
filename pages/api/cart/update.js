import { gql } from "graphql-request";
import withSession from "../../../lib/auth/with-session";
import { clientRequest } from "../../../lib/client-request";

const FILL_CART = gql`
  mutation FillCart($items: [CartItemInput]!) {
    fillCart(input: { items: $items }) {
      cart {
        total
      }
    }
  }
`;

const EMPTY_CART = gql`
  mutation EmptyCart {
    emptyCart(input: {}) {
      cart {
        total
      }
    }
  }
`;

async function handler(req, res) {
  const body = JSON.parse(req.body);

  const items = Object.entries(body.cart)
    .map(([key, value]) => {
      const ids = key.split("-");

      let item = { quantity: value, productId: parseInt(ids[0]) };

      if (ids.length > 1) {
        item["variationId"] = parseInt(ids[1]);
      }

      return item;
    })
    .filter((item) => item.quantity > 0);

  await clientRequest(req, EMPTY_CART);
  await clientRequest(req, FILL_CART, { items });

  res.send({ success: true });
}

export default withSession(handler);
