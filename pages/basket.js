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
import { useCoupon } from "../lib/use-coupon";
import { useUpdateCart } from "../lib/use-update-cart";

import styles from "../styles/basket.module.css";

export default function Basket({ lines, subtotal, shipping, total }) {
  const { currentYear } = useGlobalProps();

  const {
    onQuantityChange,
    sendUpdate,
    updateButtonDisabled,
    error: updateCartError,
  } = useUpdateCart(lines);

  const {
    applyCoupon,
    onCouponChange,
    isApplyVoucherDisabled,
    error: couponError,
  } = useCoupon();

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
        <BasketTable onQuantityChange={onQuantityChange} lines={lines} />
        <div className={styles.rightAlign}>
          {updateCartError && <p className={styles.error}>{updateCartError}</p>}
          <Button disabled={updateButtonDisabled} onClick={sendUpdate}>
            Update quantities
          </Button>
        </div>
        <TotalsTable subtotal={subtotal} total={total} shipping={shipping} />
        <CouponArea
          isApplyVoucherDisabled={isApplyVoucherDisabled}
          applyCoupon={applyCoupon}
          onCouponChange={onCouponChange}
          error={couponError}
        />
        <pre>{JSON.stringify(lines, null, 2)}</pre>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const { lines, subtotal, shipping, total } = await getCart(req);

  return {
    props: {
      lines,
      subtotal,
      shipping,
      total,
    },
  };
});
