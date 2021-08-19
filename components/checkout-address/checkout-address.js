import styles from "./checkout-address.module.css";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { cloneDeep } from "lodash";

export const NewUserDetails = ({
  checkboxOnChange,
  wantsToCreateAnAccount,
  createAccountError,
  forceOn,
}) => {
  return (
    <div className={`${styles.outerContainer} ${styles.createAccount}`}>
      <h2>Create an account</h2>
      {createAccountError && (
        <p className={styles.error}>{createAccountError}</p>
      )}
      <div className={styles.container}>
        <div className={styles.list}>
          {!forceOn && (
            <Checkbox
              name="createAccount"
              id="createAccount"
              onChange={checkboxOnChange}
            >
              Create an account?
            </Checkbox>
          )}
          {wantsToCreateAnAccount && (
            <>
              <Input
                maxWidth="100%"
                placeholder="Password"
                name="password"
                ariaLabel="Password"
                id="password"
                type="password"
              />
              <Input
                maxWidth="100%"
                placeholder="Confirm Password"
                name="passwordConfirm"
                ariaLabel="Confirm password"
                id="passwordConfirm"
                type="password"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const CollectEmails = ({
  currentLine,
  emailsChanged = () => {},
  error,
}) => {
  const [emails, setEmails] = useState(Array(currentLine.quantity).fill(""));

  const onEmailChange = (index) => (event) => {
    let emailsCopy = cloneDeep(emails);
    emailsCopy[index] = event.target.value;
    setEmails(emailsCopy);
    emailsChanged(emailsCopy);
  };

  return (
    <>
      <div className={`${styles.outerContainer} ${styles.createAccount}`}>
        <h2>{currentLine.name} - Group purchase</h2>
        <p>
          Enter the email addresses for the individuals you want to be given
          access to the course
        </p>
        <p>
          <i>
            Check these emails carefully as they will be used to access the
            course content
          </i>
        </p>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.container}>
          <div className={styles.list}>
            {/* This is so meh but its the cleanest option */}
            {emails.map((value, index) => (
              <Input
                maxWidth="100%"
                placeholder="learner@academy.co.uk"
                ariaLabel={`Student email ${index + 1}`}
                key={`input-${index}-${currentLine.key}`}
                onChange={onEmailChange(index)}
                defaultValue={value}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const DeliveryDetails = ({
  showFullDelivery,
  deliveryDetails,
  countries,
  deliveryError,
  needsDelivered,
}) => {
  return (
    <div className={`${styles.outerContainer} ${styles.delivery}`}>
      <h2>{needsDelivered ? "Delivery details" : "Additional Information"}</h2>
      {deliveryError && <p className={styles.error}>{deliveryError}</p>}
      <div className={styles.container}>
        {showFullDelivery ? (
          <>
            <div className={styles.list}>
              <div className={styles.twoWide}>
                <Input
                  maxWidth="100%"
                  placeholder="John"
                  name="firstNameDelivery"
                  ariaLabel="First name"
                  id="firstName"
                  defaultValue={deliveryDetails.firstName}
                />
                <Input
                  maxWidth="100%"
                  placeholder="Smith"
                  name="lastNameDelivery"
                  ariaLabel="Last name"
                  id="lastName"
                  defaultValue={deliveryDetails.lastName}
                />
              </div>
              <Input
                maxWidth="100%"
                placeholder="Company Inc"
                name="companyDelivery"
                ariaLabel="Company (optional)"
                id="company"
                defaultValue={deliveryDetails.company}
              />
              <FormControl className={styles.formControl} id="country">
                <FormLabel>Country</FormLabel>
                <Select
                  maxWidth={900}
                  width="100%"
                  borderRadius={4}
                  backgroundColor="#F5F5F5"
                  name="countryDelivery"
                  aria-label="Country"
                  placeholder="Select your country."
                  disabled
                  defaultValue={"GB"}
                >
                  {countries.map((country) => {
                    return (
                      <option
                        value={country.name}
                        key={`country-${country.name}`}
                      >
                        {country.description}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Input
                maxWidth="100%"
                placeholder="21 Manchester Street"
                name="addressLine1Delivery"
                ariaLabel="Address Line 1"
                id="addressLine1"
                defaultValue={deliveryDetails.address1}
              />
              <Input
                maxWidth="100%"
                placeholder="Flat 2"
                name="addressLine2Delivery"
                ariaLabel="Address Line 2 (optional)"
                id="addressLine2"
                defaultValue={deliveryDetails.address2}
              />
            </div>
            <div className={styles.list}>
              <Input
                maxWidth="100%"
                placeholder="Manchester"
                name="cityDelivery"
                ariaLabel="Town / City"
                id="city"
                defaultValue={deliveryDetails.city}
              />
              <Input
                maxWidth="100%"
                placeholder="Greater Manchester"
                name="countyDelivery"
                ariaLabel="County (optional)"
                id="county"
                defaultValue={deliveryDetails.state}
              />
              <Input
                maxWidth="100%"
                placeholder="OL8 3QL"
                name="postcodeDelivery"
                ariaLabel="Postcode"
                id="postcode"
                defaultValue={deliveryDetails.postcode}
              />
              <FormControl className={styles.formControl} id="deliveryNotes">
                <FormLabel>Order notes (optional)</FormLabel>
                <Textarea
                  className={styles.textArea}
                  backgroundColor={"#F5F5F5"}
                  placeholder={"Special delivery notes"}
                  name="orderNotesDelivery"
                  aria-label="Order notes (optional)"
                  resize="none"
                />
              </FormControl>
            </div>
          </>
        ) : (
          <FormControl className={styles.formControl} id="deliveryNotes">
            <FormLabel>Order notes (optional)</FormLabel>
            <Textarea
              className={styles.textArea}
              backgroundColor={"#F5F5F5"}
              placeholder={"Special delivery notes"}
              name="orderNotesDelivery"
              aria-label="Order notes (optional)"
              resize="none"
            />
          </FormControl>
        )}
      </div>
    </div>
  );
};

export const BillingDetails = ({
  countries,
  billingDetails,
  billingError,
  reducedInfo,
}) => {
  return (
    <div className={styles.outerContainer}>
      <h2>Billing details</h2>
      {billingError && <p className={styles.error}>{billingError}</p>}
      <div className={styles.container}>
        <div className={styles.list}>
          <div className={styles.twoWide}>
            <Input
              maxWidth="100%"
              placeholder="John"
              name="firstNameBilling"
              ariaLabel="First name"
              id="firstName"
              defaultValue={billingDetails.firstName}
            />
            <Input
              maxWidth="100%"
              placeholder="Smith"
              name="lastNameBilling"
              ariaLabel="Last name"
              id="lastName"
              defaultValue={billingDetails.lastName}
            />
          </div>
          {!reducedInfo && (
            <>
              <Input
                maxWidth="100%"
                placeholder="Company Inc"
                name="companyBilling"
                ariaLabel="Company (optional)"
                id="company"
                defaultValue={billingDetails.company}
              />
              <FormControl className={styles.formControl} id="country">
                <FormLabel>Country</FormLabel>
                <Select
                  maxWidth={900}
                  width="100%"
                  borderRadius={4}
                  backgroundColor="#F5F5F5"
                  name="countryBilling"
                  aria-label="Country"
                  placeholder="Select your country."
                  defaultValue={billingDetails.country}
                >
                  {countries.map((country) => {
                    return (
                      <option
                        value={country.name}
                        key={`country-${country.name}`}
                      >
                        {country.description}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Input
                maxWidth="100%"
                placeholder="21 Manchester Street"
                name="addressLine1Billing"
                ariaLabel="Address Line 1"
                id="addressLine1"
                defaultValue={billingDetails.address1}
              />
              <Input
                maxWidth="100%"
                placeholder="Flat 2"
                name="addressLine2Billing"
                ariaLabel="Address Line 2 (optional)"
                id="addressLine2"
                defaultValue={billingDetails.address2}
              />

              <Input
                maxWidth="100%"
                placeholder="Manchester"
                name="cityBilling"
                ariaLabel="Town / City"
                id="city"
                defaultValue={billingDetails.city}
              />
            </>
          )}
        </div>
        <div className={styles.list}>
          {!reducedInfo && (
            <>
              <Input
                maxWidth="100%"
                placeholder="Greater Manchester"
                name="countyBilling"
                ariaLabel="County (optional)"
                id="county"
                defaultValue={billingDetails.state}
              />
              <Input
                maxWidth="100%"
                placeholder="OL8 3QL"
                name="postcodeBilling"
                ariaLabel="Postcode"
                id="postcode"
                defaultValue={billingDetails.postcode}
              />
            </>
          )}
          <Input
            maxWidth="100%"
            placeholder="07415489657"
            name="phoneBilling"
            ariaLabel="Phone number"
            id="phone"
            defaultValue={billingDetails.phone}
          />
          <Input
            maxWidth="100%"
            placeholder="john@smith.com"
            name="emailBilling"
            ariaLabel="Email address"
            id="email"
            defaultValue={billingDetails.email}
          />
        </div>
      </div>
    </div>
  );
};

export const CheckoutAddress = () => {
  return (
    <div className={styles.container}>
      <h1>checkout-address -- CheckoutAddress</h1>
      <p>This component is generated by plop</p>
    </div>
  );
};

const Input = ({
  placeholder,
  name,
  ariaLabel,
  id,
  type,
  defaultValue,
  onChange = () => {},
}) => {
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
          onChange={onChange}
          defaultValue={defaultValue === null ? "" : defaultValue}
        />
      </FormControl>
    </>
  );
};
