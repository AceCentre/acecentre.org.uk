import { Button } from "../button/button";
import styles from "./coupon-area.module.css";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";

export const CouponArea = ({
  applyCoupon,
  onCouponChange,
  isApplyVoucherDisabled,
  error,
  isLoggedIn,
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
      {isLoggedIn ? (
        <Button
          className={`${styles.button} ${styles.normalCheckout}`}
          href="/checkout"
        >
          Checkout
        </Button>
      ) : (
        <>
          <Button
            className={`${styles.button} ${styles.existingUser}`}
            href="/login-checkout"
          >
            Checkout as Existing User
          </Button>
          <Button className={styles.button} href="/register-checkout">
            Checkout as New User
          </Button>
        </>
      )}
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
