import { Button } from "../button/button";
import styles from "./coupon-area.module.css";
import { Input as ChakraInput, FormControl } from "@chakra-ui/react";

export const CouponArea = ({
  applyCoupon,
  onCouponChange,
  isApplyVoucherDisabled,
  error,
}) => {
  return (
    <div className={styles.container}>
      <div>
        <form onSubmit={applyCoupon} className={styles.voucherInput}>
          <Input
            maxWidth="100%"
            placeholder="VALID VOUCHER"
            name="voucher"
            ariaLabel="Voucher"
            id="voucher"
            onChange={onCouponChange}
          />
          <Button type="submit" disabled={isApplyVoucherDisabled}>
            Apply Voucher
          </Button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.checkoutContainer}>
        <Button className={styles.button} href="/checkout">
          Checkout
        </Button>
      </div>
    </div>
  );
};

const Input = ({
  placeholder,
  name,
  ariaLabel,
  id,
  type,
  defaultValue,
  onChange,
}) => {
  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <ChakraInput
          className={styles.input}
          backgroundColor={"#F5F5F5"}
          placeholder={placeholder}
          name={name}
          aria-label={ariaLabel}
          type={type}
          defaultValue={defaultValue}
          onChange={onChange}
        />
      </FormControl>
    </>
  );
};
