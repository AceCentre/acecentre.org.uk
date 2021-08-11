import withSession from "../lib/auth/with-session";
import { getCart } from "../lib/cart/get";

export default function CartPage({ rawCart }) {
  return (
    <div>
      <h1>Cart</h1>
      <pre>{JSON.stringify(rawCart, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const rawCart = await getCart(req);

  return {
    props: { rawCart },
  };
});
