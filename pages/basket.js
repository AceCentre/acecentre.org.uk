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

export default function Basket({
  lines,
  subtotal,
  shipping,
  total,
  discountTotal,
  needsDelivered,
}) {
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
        {lines.length > 0 ? (
          <>
            <PageTitle
              heading="Checkout"
              description="Here's a summary of your order"
            />
            <BasketTable onQuantityChange={onQuantityChange} lines={lines} />
            <div className={styles.rightAlign}>
              {updateCartError && (
                <p className={styles.error}>{updateCartError}</p>
              )}
              <Button disabled={updateButtonDisabled} onClick={sendUpdate}>
                Update quantities
              </Button>
            </div>
            <TotalsTable
              needsDelivered={needsDelivered}
              discountTotal={discountTotal}
              subtotal={subtotal}
              total={total}
              shipping={shipping}
            />
            <CouponArea
              isApplyVoucherDisabled={isApplyVoucherDisabled}
              applyCoupon={applyCoupon}
              onCouponChange={onCouponChange}
              error={couponError}
            />
          </>
        ) : (
          <div className={styles.emptyCart}>
            <h1>Your basket is currently empty</h1>
            <p>
              Add some resources or courses to your basket then come back to
              checkout
            </p>
            <div className={styles.allResourcesButton}>
              <Button href="/resources">See our resources</Button>
            </div>
          </div>
        )}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const {
    lines,
    subtotal,
    shipping,
    total,
    discountTotal,
    needsDelivered,
  } = await getCart(req, res);

  return {
    props: {
      lines,
      subtotal,
      shipping,
      total,
      discountTotal,
      needsDelivered,
    },
  };
});
