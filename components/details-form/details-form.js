import styles from "./details-form.module.css";
import { Input as ChakraInput, FormControl, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import { Button } from "../button/button";

export const DetailsForm = () => {
  return (
    <form className={styles.container}>
      <div className={styles.split}>
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
        placeholder="Johnny"
        name="displayName"
        ariaLabel="Display Name"
        id="displayName"
      />
      <Input
        maxWidth="100%"
        placeholder="john@smith.com"
        name="email"
        ariaLabel="Email"
        id="email"
      />
      <Link href="forgot-password">
        <a className={styles.link}>Send password reset email</a>
      </Link>
      <div>
        <Button type="submit">Save details</Button>
      </div>
    </form>
  );
};

const Input = ({ placeholder, name, ariaLabel, id, type, defaultValue }) => {
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
          defaultValue={defaultValue}
        />
      </FormControl>
    </>
  );
};
