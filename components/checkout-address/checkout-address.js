import styles from "./checkout-address.module.css";
import { Textarea } from "@chakra-ui/textarea";
import { Stack } from "@chakra-ui/layout";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { useState } from "react";
import { cloneDeep } from "lodash";

const MYSELF = "myself";
const SOMEONE_ELSE = "someone-else";

export const CollectDelegatedEmail = ({
  currentLine,
  error,
  emailChanged,
  changeDelegation,
  delegatedKey,
}) => {
  console.log(delegatedKey);
  const [value, setValue] = useState(null);

  return (
    <div className={`${styles.outerContainer} ${styles.createAccount}`}>
      <h2>{currentLine.name} - Course Enrollment</h2>
      <p>
        <i>Please let us know who you are booking this course for:</i>
      </p>
      {error && <p className={styles.error}>{error}</p>}
      <RadioGroup
        onChange={(newValue) => {
          setValue(newValue);
          changeDelegation(newValue === SOMEONE_ELSE);
        }}
        value={value}
      >
        <Stack direction="column">
          <Radio value={MYSELF}>
            I am booking this course for <strong>myself</strong>
          </Radio>
          <Radio value={SOMEONE_ELSE}>
            I am booking this course for <strong>someone else</strong>
          </Radio>
        </Stack>
      </RadioGroup>
      {value === SOMEONE_ELSE && (
        <div className={styles.someoneElse}>
          <Input
            maxWidth="100%"
            placeholder="learner@academy.co.uk"
            ariaLabel={"Participant's email address"}
            key={`input-${currentLine.key}`}
            onChange={emailChanged}
          />
        </div>
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
  defaultEmail,
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
          {defaultEmail ? (
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="emailBilling"
              ariaLabel="Email address"
              id="email"
              disabled
              defaultValue={defaultEmail}
            />
          ) : (
            <Input
              maxWidth="100%"
              placeholder="john@smith.com"
              name="emailBilling"
              ariaLabel="Email address"
              id="email"
              defaultValue={billingDetails.email}
            />
          )}
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
  disabled = false,
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
          disabled={disabled}
        />
      </FormControl>
    </>
  );
};
