import styles from "./address-field.module.css";
import { Input as ChakraInput, FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "../button/button";
import { Select } from "@chakra-ui/react";
import { useState } from "react";

const useAddressSubmit = (addressType) => {
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const formSubmit = (e) => {
    e.preventDefault();
    setSubmitDisabled(true);

    let address = {};
    const elements = e.target.elements;

    if (elements.firstName) {
      address["firstName"] = elements.firstName.value || "";
    }
    if (elements.lastName) {
      address["lastName"] = elements.lastName.value || "";
    }
    if (elements.company) {
      address["company"] = elements.company.value || "";
    }
    if (elements.country) {
      address["country"] = elements.country.value || null;
    }
    if (elements.addressLine1) {
      address["address1"] = elements.addressLine1.value || "";
    }
    if (elements.addressLine2) {
      address["address2"] = elements.addressLine2.value || "";
    }
    if (elements.city) {
      address["city"] = elements.city.value || "";
    }
    if (elements.postcode) {
      address["postcode"] = elements.postcode.value || "";
    }
    if (elements.phone) {
      address["phone"] = elements.phone.value || "";
    }
    if (elements.email) {
      address["email"] = elements.email.value || "";
    }
    if (elements.county) {
      address["state"] = elements.county.value || "";
    }

    if (!address.firstName) {
      setSubmitDisabled(false);
      setErrorMessage("First name is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.lastName) {
      setSubmitDisabled(false);
      setErrorMessage("Last name is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.country) {
      setSubmitDisabled(false);
      setErrorMessage("Country is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.address1) {
      setSubmitDisabled(false);
      setErrorMessage("Address Line 1 is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.city) {
      setSubmitDisabled(false);
      setErrorMessage("City is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.postcode) {
      setSubmitDisabled(false);
      setErrorMessage("Postcode is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.state) {
      setSubmitDisabled(false);
      setErrorMessage("County is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.phone && addressType === "billing") {
      setSubmitDisabled(false);
      setErrorMessage("Phone is a required field.");
      setSuccessMessage(null);
      return;
    }

    if (!address.email && addressType === "billing") {
      setSubmitDisabled(false);
      setErrorMessage("Email is a required field.");
      setSuccessMessage(null);
      return;
    }

    const submit = async () => {
      try {
        const response = await fetch("/api/auth/addresses", {
          method: "POST",
          body: JSON.stringify({ address, addressType }),
        });

        const parsed = await response.json();

        if (parsed.success) {
          setSubmitDisabled(false);
          setErrorMessage(null);
          setSuccessMessage("Successfully updated details");
          return;
        }

        if (parsed.validationError) {
          setSubmitDisabled(false);
          setErrorMessage(parsed.validationError);
          setSuccessMessage(null);
          return;
        }

        throw new Error("An error occurred");
      } catch (error) {
        console.warn(error);
        setSubmitDisabled(false);
        setErrorMessage("An error occurred");
        setSuccessMessage(null);
      }
    };

    submit();
  };

  return { formSubmit, submitDisabled, successMessage, errorMessage };
};

export const AddressField = ({
  title,
  details = {},
  countries,
  billing = false,
}) => {
  const {
    formSubmit,
    submitDisabled,
    successMessage,
    errorMessage,
  } = useAddressSubmit(billing ? "billing" : "shipping");

  return (
    <form className={styles.form} onSubmit={formSubmit}>
      <h2 className={styles.title}>{title}</h2>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <div className={styles.twoWide}>
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
        placeholder="John Smith Inc."
        name="company"
        ariaLabel="Company name (optional)"
        id="company"
        defaultValue={details.company}
      />
      {billing ? (
        <FormControl className={styles.formControl} id="country">
          <FormLabel>Country</FormLabel>
          <Select
            maxWidth={900}
            width="100%"
            borderRadius={4}
            backgroundColor="#F5F5F5"
            defaultValue={details.country || "GB"}
            name="country"
            aria-label="Country"
            placeholder="Select your country."
          >
            {countries.map((country) => {
              return (
                <option value={country.name} key={`country-${country.name}`}>
                  {country.description}
                </option>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        <FormControl className={styles.formControl} id="country">
          <FormLabel>Country</FormLabel>
          <Select
            maxWidth={900}
            width="100%"
            borderRadius={4}
            backgroundColor="#F5F5F5"
            name="country"
            aria-label="Country"
            placeholder="Select your country."
            value="GB"
            disabled
          >
            {countries.map((country) => {
              return (
                <option value={country.name} key={`country-${country.name}`}>
                  {country.description}
                </option>
              );
            })}
          </Select>
        </FormControl>
      )}

      <Input
        maxWidth="100%"
        placeholder="80 Smith Street"
        name="addressLine1"
        ariaLabel="Address Line 1"
        id="addressLine1"
        defaultValue={details.address1}
      />
      <Input
        maxWidth="100%"
        placeholder="Flat 1"
        name="addressLine2"
        ariaLabel="Address Line 2 (optional)"
        id="addressLine2"
        defaultValue={details.address2}
      />
      <Input
        maxWidth="100%"
        placeholder="Manchester"
        name="city"
        ariaLabel="Town / City"
        id="city"
        defaultValue={details.city}
      />
      <Input
        maxWidth="100%"
        placeholder="Greater Manchester"
        name="county"
        ariaLabel="County"
        id="county"
        defaultValue={details.state}
      />

      <Input
        maxWidth="100%"
        placeholder="OL8 3QL"
        name="postcode"
        ariaLabel="Postcode"
        id="postcode"
        defaultValue={details.postcode}
      />
      {billing && (
        <>
          <Input
            maxWidth="100%"
            placeholder="07585634751"
            name="phone"
            ariaLabel="Phone"
            id="phone"
            defaultValue={details.phone}
          />
          <Input
            maxWidth="100%"
            placeholder="john@smith.com"
            name="email"
            ariaLabel="Email"
            id="email"
            defaultValue={details.email}
          />
        </>
      )}
      <div>
        <Button disabled={submitDisabled} type="submit">
          Save address
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
          defaultValue={defaultValue === null ? "" : defaultValue}
        />
      </FormControl>
    </>
  );
};

export const BillingDetails = ({ details, countries }) => {
  return (
    <AddressField
      title="Billing address"
      countries={countries}
      details={details}
      billing
    />
  );
};

export const ShippingDetails = ({ details, countries }) => {
  return (
    <AddressField
      title="Shipping address"
      countries={countries}
      details={details}
    />
  );
};
