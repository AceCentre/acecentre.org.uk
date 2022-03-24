import styles from "./details-form.module.css";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import Link from "next/link";
import { Button } from "../button/button";
import { useState } from "react";

const useChangeDetails = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    const elements = e.target.elements;
    let details = {};

    if (elements.firstName) {
      details["firstName"] = elements.firstName.value || "";
    }

    if (elements.lastName) {
      details["lastName"] = elements.lastName.value || "";
    }

    if (elements.displayName) {
      details["name"] = elements.displayName.value || "";
    }

    if (elements.email) {
      details["email"] = elements.email.value || "";
    }

    if (!details.firstName) {
      setButtonDisabled(false);
      setErrorMessage("First name is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!details.lastName) {
      setButtonDisabled(false);
      setErrorMessage("Last name is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!details.name) {
      setButtonDisabled(false);
      setErrorMessage("Display name is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!details.email) {
      setButtonDisabled(false);
      setErrorMessage("Email is a required field.");
      setSuccessMessage(null);
      return;
    }

    const submit = async () => {
      try {
        const response = await fetch("/api/auth/details", {
          method: "POST",
          body: JSON.stringify({ details }),
        });

        const parsed = await response.json();

        if (parsed.success) {
          setButtonDisabled(false);
          setErrorMessage(null);
          setSuccessMessage("Successfully updated details");
          return;
        }

        throw new Error("An error occurred");
      } catch (error) {
        console.warn(error);
        setButtonDisabled(false);
        setErrorMessage("An error occurred");
        setSuccessMessage(null);
      }
    };

    submit();
  };

  return { onSubmit, buttonDisabled, successMessage, errorMessage };
};

export const DetailsForm = ({ details }) => {
  const { onSubmit, buttonDisabled, successMessage, errorMessage } =
    useChangeDetails();

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}{" "}
      <div className={styles.split}>
        <Input
          maxWidth="100%"
          placeholder="John"
          name="firstName"
          ariaLabel="First name"
          id="firstName"
          defaultValue={details.firstName}
        />
        <Input
          maxWidth="100%"
          placeholder="Smith"
          name="lastName"
          ariaLabel="Last name"
          id="lastName"
          defaultValue={details.lastName}
        />
      </div>
      <Input
        maxWidth="100%"
        placeholder="Johnny"
        name="displayName"
        ariaLabel="Display Name"
        id="displayName"
        defaultValue={details.displayName}
      />
      <Input
        maxWidth="100%"
        placeholder="john@smith.com"
        name="email"
        ariaLabel="Email"
        id="email"
        defaultValue={details.email}
      />
      <Link href="/my-acecentre/change-password">
        <a className={styles.link}>Send password reset email</a>
      </Link>
      <div>
        <Button disabled={buttonDisabled} type="submit">
          Save details
        </Button>
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
