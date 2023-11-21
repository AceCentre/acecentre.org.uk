import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { OrderTable } from "../../components/table/table";
import withSession from "../../lib/auth/with-session";
import { getOrders } from "../../lib/products/get-orders";

export default function OrdersPage({ orders }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="My orders" description="A summary of your orders" />
        <OrderTable orders={orders} />
      </main>
      <Footer />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const orders = await getOrders(req, user);

  if (orders === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { orders } };
});
