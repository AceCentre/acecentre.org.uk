import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { OrderDetailTable } from "../../components/table/table";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
import { getOrder } from "../../lib/products/get-orders";
import style from "../../styles/order.module.css";

export default function OrderPage({ orderId, order }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle heading="Order details" description={`Order #${orderId}`} />
        <div className={style.tableContainer}>
          <OrderDetailTable order={order} onClose={() => {}} />
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(
  async ({ params: { id: orderId }, req }) => {
    const order = await getOrder(req, orderId);

    return {
      props: { orderId, order },
    };
  }
);
