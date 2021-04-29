import { refreshToken } from "../lib/auth/refresh-token";
import withSession from "../lib/auth/with-session";

export default function CartPage() {
  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  await refreshToken(req);

  return {
    props: {},
  };
});
