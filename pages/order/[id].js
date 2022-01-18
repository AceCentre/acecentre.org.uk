import Link from "next/link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { OrderDetailTable } from "../../components/table/table";
import withSession from "../../lib/auth/with-session";
import { getOrder } from "../../lib/cart/order";
import { useGlobalProps } from "../../lib/global-props/hook";
import style from "../../styles/order.module.css";

export default function OrderPage({ orderId, order }) {
  const { currentYear } = useGlobalProps();

  console.log(order);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      {order.status.toLowerCase() === "completed" ||
      order.status.toLowerCase() === "processing" ? (
        <main id="mainContent">
          <PageTitle
            heading="Order details"
            description={`Order #${orderId}`}
          />
          <div className={style.tableContainer}>
            <OrderDetailTable order={order} />
          </div>
        </main>
      ) : (
        <>
          <style jsx>{`
            span {
              font-size: 100px;
            }

            main {
              text-align: center;
              width: 90%;
              margin: 0 auto;
              max-width: 1024px;
              padding: 6rem 0;
            }

            h1 {
              font-weight: normal;
            }
          `}</style>
          <main id="mainContent">
            <span>Order failed</span>
            <h1>An error occurred</h1>
            <p>
              An error occurred while processing your order, this could be due
              to insufficient funds. If you need help{" "}
              <Link href="/contact">
                <a>Contact Us</a>
              </Link>
            </p>
          </main>
        </>
      )}
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(
  async ({ req, params: { id: orderId } }) => {
    const order = await getOrder(req, orderId);

    return {
      props: { order, orderId },
    };
  }
);
