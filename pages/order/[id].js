import { useEffect, useState } from "react";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { OrderDetailTable } from "../../components/table/table";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
import style from "../../styles/order.module.css";

export default function OrderPage({ orderId }) {
  const { currentYear } = useGlobalProps();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    setOrder(JSON.parse(localStorage.getItem(`order-${orderId}`)));
  }, []);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle heading="Order details" description={`Order #${orderId}`} />
        {order && (
          <div className={style.tableContainer}>
            <OrderDetailTable order={order} />
          </div>
        )}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(
  async ({ params: { id: orderId } }) => {
    return {
      props: { orderId },
    };
  }
);
