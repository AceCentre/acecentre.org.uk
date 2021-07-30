import styles from "./login-and-register-boxes.module.css";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { Button } from "../button/button";
import Link from "next/link";
import { useLogin } from "../../lib/auth/hooks";

export const LoginAndRegisterBoxes = () => {
  const {
    onChange: loginOnChange,
    submitDisabled: loginSubmitDisabled,
    onSubmit: loginOnSubmit,
    error: loginError,
  } = useLogin();

  return (
    <div className={styles.container}>
      <div>
        <h2>Login</h2>
        <Card>
          <form
            className={styles.form}
            onSubmit={loginOnSubmit}
            onChange={loginOnChange}
          >
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="username"
              ariaLabel="Username or email address"
              id="username"
            />
            <Input
              maxWidth="100%"
              placeholder="Enter your password"
              name="password"
              ariaLabel="Password"
              id="password"
              type="password"
            />
            {loginError && <p className={styles.loginError}>{loginError}</p>}
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

const Card = ({ children }) => {
  return <div className={styles.card}>{children}</div>;
};
