import styles from "./login-and-register-boxes.module.css";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { Button } from "../button/button";
import Link from "next/link";
import { useState } from "react";

const useLoginValidation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return {
    // Disable submit when nothing is entered
    submitDisabled: email.length === 0 || password.length === 0,
    onChange: (event) => {
      const id = event.target.id;
      const newValue = event.target.value;

      if (id === "email") {
        setEmail(newValue);
      } else if (id === "password") {
        setPassword(newValue);
      }
    },
  };
};

export const LoginAndRegisterBoxes = () => {
  const {
    onChange: loginOnChange,
    submitDisabled: loginSubmitDisabled,
  } = useLoginValidation();

  return (
    <div className={styles.container}>
      <div>
        <h2>Login</h2>
        <Card>
          <form className={styles.form} onChange={loginOnChange}>
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="email"
              ariaLabel="Email address"
              id="email"
            />
            <Input
              maxWidth="100%"
              placeholder="Enter your password"
              name="password"
              ariaLabel="Password"
              id="password"
              type="password"
            />
            <div className={styles.buttonContainer}>
              <Button
                className={styles.button}
                type="submit"
                disabled={loginSubmitDisabled}
              >
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
            <Checkbox>Email me about Ace related news and events</Checkbox>
            <div>
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
