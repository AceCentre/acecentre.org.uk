import styles from "./login-and-register-boxes.module.css";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { Button } from "../button/button";
import Link from "next/link";
import { useLogin, useRegister } from "../../lib/auth/hooks";

export const LoginAndRegisterBoxes = () => {
  const {
    onChange: loginOnChange,
    submitDisabled: loginSubmitDisabled,
    onSubmit: loginOnSubmit,
    error: loginError,
  } = useLogin();

  const {
    onChange: registerOnChange,
    submitDisabled: registerSubmitDisabled,
    onSubmit: registerOnSubmit,
    generalError: registerGeneralError,
    emailError: registerEmailError,
    passwordError: registerPasswordError,
  } = useRegister();

  return (
    <div className={styles.container}>
      <div>
        <h2>Login</h2>
        <Card>
          <form
            className={styles.form}
            onSubmit={loginOnSubmit}
            onChange={loginOnChange}
            aria-label="Login form"
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
              label="Password"
              ariaLabel="Login Password"
              id="login-password"
              type="password"
            />
            {loginError && (
              <p data-testid="login-error" className={styles.loginError}>
                {loginError}
              </p>
            )}
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
          <Link href="/my-acecentre/forgot-password">
            <a className={styles.link}>Forgot your password?</a>
          </Link>
        </Card>
      </div>
      <div>
        <h2>Register</h2>
        <Card>
          <form
            className={styles.form}
            onSubmit={registerOnSubmit}
            onChange={registerOnChange}
            aria-label="Register form"
          >
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="email"
              ariaLabel="Email address"
              id="email"
              type="email"
            />
            {registerEmailError && (
              <p
                data-testid="register-email-error"
                className={styles.loginError}
              >
                {registerEmailError}
              </p>
            )}
            <Input
              maxWidth="100%"
              placeholder="Enter your password"
              name="password"
              label="Password"
              ariaLabel="Register Password"
              id="register-password"
              type="password"
            />
            {registerPasswordError && (
              <p
                data-testid="register-password-error"
                className={styles.loginError}
              >
                {registerPasswordError}
              </p>
            )}
            <Checkbox name="mailingList" id="mailingList">
              Email me about Ace Centre related news and events
            </Checkbox>
            {registerGeneralError && (
              <p data-testid="register-error" className={styles.loginError}>
                {registerGeneralError}
              </p>
            )}
            <div>
              <Button
                disabled={registerSubmitDisabled}
                className={styles.button}
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export const RegisterCheckout = () => {
  const {
    onChange: registerOnChange,
    submitDisabled: registerSubmitDisabled,
    onSubmit: registerOnSubmit,
    generalError: registerGeneralError,
    emailError: registerEmailError,
    passwordError: registerPasswordError,
  } = useRegister("/checkout");

  return (
    <div className={styles.container}>
      <div>
        <h2>Register</h2>
        <form
          className={styles.form}
          onSubmit={registerOnSubmit}
          onChange={registerOnChange}
          aria-label="Register form"
        >
          <Input
            maxWidth="100%"
            placeholder="john@smith.com"
            name="email"
            ariaLabel="Enter your email address"
            id="email"
            type="email"
          />
          {registerEmailError && (
            <p data-testid="register-email-error" className={styles.loginError}>
              {registerEmailError}
            </p>
          )}
          <Input
            maxWidth="100%"
            placeholder="Enter your password"
            name="password"
            label="Password"
            ariaLabel="Register Password"
            id="register-password"
            type="password"
          />
          {registerPasswordError && (
            <p
              data-testid="register-password-error"
              className={styles.loginError}
            >
              {registerPasswordError}
            </p>
          )}
          <Checkbox name="mailingList" id="mailingList">
            Email me about Ace Centre related news and events
          </Checkbox>
          {registerGeneralError && (
            <p data-testid="register-error" className={styles.loginError}>
              {registerGeneralError}
            </p>
          )}
          <div>
            <Button
              disabled={registerSubmitDisabled}
              className={styles.button}
              type="submit"
            >
              Register and checkout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const LoginCheckout = () => {
  const {
    onChange: loginOnChange,
    submitDisabled: loginSubmitDisabled,
    onSubmit: loginOnSubmit,
    error: loginError,
  } = useLogin("/checkout");

  return (
    <div className={styles.container}>
      <div>
        <h2>Login</h2>
        <form
          className={styles.form}
          onSubmit={loginOnSubmit}
          onChange={loginOnChange}
          aria-label="Login form"
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
            label="Password"
            ariaLabel="Login Password"
            id="login-password"
            type="password"
          />
          {loginError && (
            <p data-testid="login-error" className={styles.loginError}>
              {loginError}
            </p>
          )}
          <div className={styles.buttonContainer}>
            <Button
              className={styles.button}
              type="submit"
              disabled={loginSubmitDisabled}
            >
              Log in and checkout
            </Button>
          </div>
        </form>
        <Link href="/my-acecentre/forgot-password">
          <a className={styles.link}>Forgot your password?</a>
        </Link>
      </div>
    </div>
  );
};
const Input = ({ placeholder, name, ariaLabel, id, type, label }) => {
  const visibleLabel = label || ariaLabel;

  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <FormLabel>{visibleLabel}</FormLabel>
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
