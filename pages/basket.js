import { Button } from "../components/button/button";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { CouponArea } from "../components/coupon-area/coupon-area";
import { Footer } from "../components/footer/footer";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
import { BasketTable, TotalsTable } from "../components/table/table";
import withSession from "../lib/auth/with-session"; // import { getCart } from "../lib/cart/get";
import { getCart } from "../lib/cart/get";
import { useGlobalProps } from "../lib/global-props/hook";

import styles from "../styles/basket.module.css";

export default function Basket({ lines }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Checkout"
          description="Here's a summary of your order"
        />
        <BasketTable lines={lines} />
        <div className={styles.rightAlign}>
          <Button onClick={() => {}}>Update quantities</Button>
        </div>
        <TotalsTable />
        <CouponArea />
        <pre>{JSON.stringify(lines, null, 2)}</pre>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const { lines } = await getCart(req);

  return {
    props: {
      lines,
    },
  };
});
