import styles from "./address-field.module.css";
import { Input as ChakraInput, FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "../button/button";

export const AddressField = ({ title }) => {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.twoWide}>
        <Input
          maxWidth="100%"
          placeholder="John"
          name="firstName"
          ariaLabel="First name"
          id="firstName"
        />
        <Input
          maxWidth="100%"
          placeholder="Smith"
          name="lastName"
          ariaLabel="Last name"
          id="lastName"
        />
      </div>
      <Input
        maxWidth="100%"
        placeholder="John Smith Inc."
        name="companyName"
        ariaLabel="Company name (optional)"
        id="companyName"
      />
      <Input
        maxWidth="100%"
        placeholder="80 Smith Street"
        name="addressLine1"
        ariaLabel="Address Line 1"
        id="addressLine1"
      />
      <Input
        maxWidth="100%"
        placeholder="Flat 1"
        name="addressLine2"
        ariaLabel="Address Line 2 (optional)"
        id="addressLine2"
      />
      <Input
        maxWidth="100%"
        placeholder="Manchester"
        name="city"
        ariaLabel="Town / City"
        id="city"
      />
      <Input
        maxWidth="100%"
        placeholder="OL8 3QL"
        name="postcode"
        ariaLabel="Postcode"
        id="postcode"
      />
      <Input
        maxWidth="100%"
        placeholder="07585634751"
        name="phone"
        ariaLabel="Phone"
        id="phone"
      />
      <Input
        maxWidth="100%"
        placeholder="john@smith.com"
        name="email"
        ariaLabel="Email"
        id="email"
      />
      <div>
        <Button type="submit">Save address</Button>
      </div>
    </form>
  );
};

const Input = ({ placeholder, name, ariaLabel, id, type }) => {
  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <FormLabel>{ariaLabel}</FormLabel>
        <ChakraInput
          className={styles.input}
          backgroundColor={"#F5F5F5"}
          placeholder={placeholder}
          name={name}
          aria-label={ariaLabel}
          type={type}
        />
      </FormControl>
    </>
  );
};

export const BillingDetails = () => {
  return <AddressField title="Billing address" />;
};

export const ShippingDetails = () => {
  return <AddressField title="Shipping address" />;
};
