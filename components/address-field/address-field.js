import styles from "./address-field.module.css";
import { Input as ChakraInput, FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "../button/button";
import { Select } from "@chakra-ui/react";

export const AddressField = ({ title, details = {}, countries }) => {
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
        name="companyName"
        ariaLabel="Company name (optional)"
        id="companyName"
        defaultValue={details.company}
      />

      <FormControl className={styles.formControl} id="country">
        <FormLabel>Country</FormLabel>
        <Select
          maxWidth={900}
          width="100%"
          borderRadius={4}
          backgroundColor="#F5F5F5"
          defaultValue={details.country}
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
        ariaLabel="County (optional)"
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
      <div>
        <Button type="submit">Save address</Button>
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

export const BillingDetails = ({ details, countries }) => {
  return (
    <AddressField
      title="Billing address"
      countries={countries}
      details={details}
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
