import styles from "./login-and-register-boxes.module.css";
import { Input as ChakraInput, FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "../button/button";
import Link from "next/link";

export const LoginAndRegisterBoxes = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>Login</h2>
        <Card>
          <form className={styles.form}>
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="Email address"
              ariaLabel="Email address"
              id="email"
            />
            <Input
              maxWidth="100%"
              placeholder="Enter your password"
              name="Password"
              ariaLabel="Password"
              type="password"
            />
            <div className={styles.buttonContainer}>
              <Button className={styles.button} type="submit">
                Log in
              </Button>
            </div>
          </form>
          <Link href="/forgot-password">
            <a className={styles.link}>Forgot your password?</a>
          </Link>
        </Card>
      </div>
      <div>
        <h2>Register</h2>
        <Card>
          <form className={styles.form}>
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="Email address"
              ariaLabel="Email address"
              id="email"
            />
            <Input
              maxWidth="100%"
              placeholder="Enter your password"
              name="Password"
              ariaLabel="Password"
              type="password"
            />
            <div className={styles.buttonContainer}>
              <Button className={styles.button} type="submit">
                Register
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

const Input = ({ placeholder, name, ariaLabel, id, type }) => {
  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <FormLabel>{name}</FormLabel>
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

const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
