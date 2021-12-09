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

export const CollectDelegatedEmail = ({
  currentLine,
  error,
  emailChanged,
  changeDelegation,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={`${styles.outerContainer} ${styles.createAccount}`}>
      <h2>{currentLine.name} - Delegated learner</h2>
      <p>
        By default we will assume the user purchasing the course is the person
        who will be enrolled on the course.
      </p>
      <p>
        If this is not the case, then check the box below and enter the email
        address of the person you want to be enrolled
      </p>
      <div className={styles.checkboxContainer}>
        <Checkbox
          name="registerAnotherUser"
          onChange={(event) => {
            setIsChecked(event.target.checked);
            changeDelegation(event.target.checked);
          }}
        >
          Would you like to enroll a different user onto the course?
        </Checkbox>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {isChecked && (
        <>
          <Input
            maxWidth="100%"
            placeholder="learner@academy.co.uk"
            ariaLabel={"Student email"}
            key={`input-${currentLine.key}`}
            onChange={emailChanged}
          />
        </>
      )}
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
  forceUkDelivery,
}) => {
  return (
    <div className={`${styles.outerContainer} ${styles.delivery}`}>
      <h2>{needsDelivered ? "Delivery details" : "Additional Information"}</h2>
      {deliveryError && <p className={styles.error}>{deliveryError}</p>}
      <div className={styles.container}>
        {showFullDelivery || forceUkDelivery ? (
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
              <p className={styles.shippingWarning}>
                We currently <strong>do not</strong> offer shipping outwith the
                UK through our online shop. If you would like one of our
                products to be shipped outside of the UK then call us on{" "}
                <strong>0800 080 3115</strong> and we can calculate shipping
                costs to your location.
              </p>
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
  countryChanged = () => {},
}) => {
  return (
    <div className={styles.outerContainer}>
      <h2>{reducedInfo ? "Personal details" : "Billing details"}</h2>
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
                  onChange={(e) => countryChanged(e.target.value)}
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
