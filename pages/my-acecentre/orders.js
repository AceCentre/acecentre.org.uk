import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { Table } from "../../components/table/table";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
import { getOrders } from "../../lib/products/get-orders";

// import styles from "../../styles/my-acecentre.module.css";

export default function OrdersPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle heading="My orders" description="A summary of your orders" />
        <Table
          headings={["ID", "Date", "Status", "Cost", "Quantity"]}
          rows={[
            [123456, new Date(), "Completed", "£100", "1"],
            [123456, new Date(), "Completed", "£100", "1"],
            [123456, new Date(), "Completed", "£100", "1"],
            [123456, new Date(), "Completed", "£100", "1"],
            [123456, new Date(), "Completed", "£100", "1"],
          ]}
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async function ({ req }) {
  const user = req.session.get("user");

  console.log(user.customerId);

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

  console.log(orders);

  return { props: {} };
});
