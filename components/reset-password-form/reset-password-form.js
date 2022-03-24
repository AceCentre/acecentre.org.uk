import { useState } from "react";
import styles from "./reset-password-form.module.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "../button/button";

export const ResetPasswordForm = () => {
  const [success, setSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    const username = e.target.username.value;

    const submit = async () => {
      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({ username }),
        });

        const parsed = await response.json();

        if (parsed.success) {
          setSuccess(true);
        }

        if (parsed.success === false)
          throw new Error(JSON.stringify(parsed.error, null, 2));
      } catch (error) {
        console.warn(error);
        setError("Something went wrong");
        setButtonDisabled(false);
      }
    };

    submit();
  };

  return (
    <div className={styles.container}>
      {success ? (
        <div className={styles.success}>
          <SvgIcon className={styles.succuessIcon}>
            <MailOutlineIcon />
          </SvgIcon>
          <p>
            We have sent you a password reset email. Please check your spam
            inbox.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className={styles.form}>
          <h2>Forgot password</h2>
          <Input
            maxWidth="100%"
            placeholder="john@smith.com"
            name="username"
            ariaLabel="Username or email address"
            id="username"
          />
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <Button disabled={buttonDisabled} type="submit">
              Reset password
            </Button>
          </div>
        </form>
      )}
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
