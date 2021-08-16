import styles from "./checkout-address.module.css";
import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

export const DeliveryDetails = ({
  showFullDelivery,
  deliveryDetails,
  countries,
}) => {
  return (
    <div className={`${styles.outerContainer} ${styles.delivery}`}>
      <h2>Delivery details</h2>
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
                  name="orderNotes"
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
              name="orderNotes"
              aria-label="Order notes (optional)"
              resize="none"
            />
          </FormControl>
        )}
      </div>
    </div>
  );
};

export const BillingDetails = ({ countries, billingDetails }) => {
  return (
    <div className={styles.outerContainer}>
      <h2>Billing details</h2>
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
                  <option value={country.name} key={`country-${country.name}`}>
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
        </div>
        <div className={styles.list}>
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
