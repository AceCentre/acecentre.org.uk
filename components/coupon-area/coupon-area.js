import { Button } from "../button/button";
import styles from "./coupon-area.module.css";
import { Input as ChakraInput, FormControl } from "@chakra-ui/react";

export const CouponArea = () => {
  return (
    <div className={styles.container}>
      <div className={styles.voucherInput}>
        <Input
          maxWidth="100%"
          placeholder="John"
          name="firstName"
          ariaLabel="First name"
          id="firstName"
        />
        <Button>Apply Voucher</Button>
      </div>
      <div className={styles.checkoutContainer}>
        <Button className={styles.button} onClick={() => {}}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

const Input = ({ placeholder, name, ariaLabel, id, type, defaultValue }) => {
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
        />
      </FormControl>
    </>
  );
};
