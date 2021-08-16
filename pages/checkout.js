import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../lib/config";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";
import { Footer } from "../components/footer/footer";
import { useGlobalProps } from "../lib/global-props/hook";
import withSession from "../lib/auth/with-session";
import { getCart } from "../lib/cart/get";
import { OrderSummaryTable } from "../components/table/table";
import Link from "next/link";

import styles from "../styles/checkout.module.css";
import { CardBox } from "../components/card-box/card-box";
import { Button } from "../components/button/button";
import { BackToLink } from "../components/back-to-link/back-to-link";
import {
  BillingDetails,
  DeliveryDetails,
} from "../components/checkout-address/checkout-address";
import { getAddresses } from "../lib/auth/get-user";
import { Checkbox } from "@chakra-ui/react";

const getMissingRequiredFields = (billingDetails, requiredFields) => {
  const missingFields = [];

  for (const requiredField of requiredFields) {
    if (billingDetails[requiredField.key] === "") {
      missingFields.push(requiredField);
    }
  }

  return missingFields;
};

const useCheckoutForm = () => {
  const [showFullDelivery, setShowFullDelivery] = useState(false);
  const [billingError, setBillingError] = useState(null);

  const differentAddressOnChange = (event) => {
    setShowFullDelivery(event.target.checked);
  };

  const checkoutSubmit = (event) => {
    event.preventDefault();

    const billingDetails = {
      firstName: event.target.firstNameBilling.value,
      lastName: event.target.lastNameBilling.value,
      company: event.target.companyBilling.value,
      country: event.target.countryBilling.value,
      addressLine1: event.target.addressLine1Billing.value,
      addressLine2: event.target.addressLine2Billing.value,
      city: event.target.cityBilling.value,
      state: event.target.countyBilling.value,
      postcode: event.target.postcodeBilling.value,
      phone: event.target.phoneBilling.value,
      email: event.target.email.value,
    };

    const missingFields = getMissingRequiredFields(billingDetails, [
      { key: "firstName", name: "First name" },
      { key: "lastName", name: "Last name" },
      { key: "country", name: "Country" },
      { key: "addressLine1", name: "Address Line 1" },
      { key: "city", name: "Town / City" },
      { key: "postcode", name: "Postcode" },
      { key: "phone", name: "Phone number" },
      { key: "email", name: "Email address" },
    ]);

    if (missingFields.length > 0) {
      setBillingError(`${missingFields[0].name} is a required field`);
    }
  };

  return {
    showFullDelivery,
    differentAddressOnChange,
    billingError,
    checkoutSubmit,
  };
};

export default function Checkout({
  lines,
  subtotal,
  shipping,
  total,
  discountTotal,
  countries,
  billingDetails,
  deliveryDetails,
}) {
  const { currentYear } = useGlobalProps();

  const {
    showFullDelivery,
    differentAddressOnChange,
    checkoutSubmit,
    billingError,
  } = useCheckoutForm();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <form onSubmit={checkoutSubmit}>
          <Elements stripe={loadStripe(config.stripeApiKey)}>
            <BackToLink where="basket" href="/basket" />

            <BillingDetails
              countries={countries}
              billingDetails={billingDetails}
              billingError={billingError}
            />

            <div className={styles.checkbox}>
              <Checkbox name="mailingList" id="mailingList">
                Email me about Ace related news and events
              </Checkbox>
              <Checkbox
                name="differentAddress"
                id="differentAddress"
                onChange={differentAddressOnChange}
              >
                Deliver to a different address?
              </Checkbox>
            </div>

            <DeliveryDetails
              showFullDelivery={showFullDelivery}
              deliveryDetails={deliveryDetails}
              countries={countries}
            />

            <div className={styles.tableLabel}>
              <h3>Order summary</h3>
              <Link href="/basket">
                <a className={styles.editBasket}>Edit basket</a>
              </Link>
            </div>

            <OrderSummaryTable
              lines={lines}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              discountTotal={discountTotal}
            />

            <CardBox />
            <div className={styles.placeOrderButtonContainer}>
              <Button onClick={() => {}}>Place order</Button>
            </div>
          </Elements>
        </form>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withSession(async function ({ req }) {
  const { lines, subtotal, shipping, total, discountTotal } = await getCart(
    req
  );
  const user = req.session.get("user") || { customerId: "" };
  const { countries, billingDetails, shippingDetails } = await getAddresses(
    req,
    user
  );

  return {
    props: {
      lines,
      subtotal,
      shipping,
      total,
      discountTotal,
      countries,
      billingDetails,
      deliveryDetails: shippingDetails,
    },
  };
});

// eslint-disable-next-line no-unused-vars
const CheckoutForm = () => {
  // This loads up the Stripe object
  const stripe = useStripe();

  // Used to pass the payment info to the Stripe API
  const elements = useElements();

  // We'll deal with this in a sec
  async function handleSubmit(event) {
    event.preventDefault();

    const value = event.target["free-input"].value;
    let parsed = JSON.parse(value);

    const name =
      parsed.billingDetails.firstName + " " + parsed.billingDetails.lastName;

    const source = await handleStripe(
      name,
      parsed.billingDetails.email,
      parsed.billingDetails.phoneNo
    );

    parsed.billingDetails.stripeSourceId = source.id;
    const result = await fetch("/api/cart/checkout", {
      method: "POST",
      body: JSON.stringify(parsed),
    });

    const resultParsed = await result.json();

    console.log({ parsed, result, resultParsed });
  }

  async function handleStripe(name, email, phone) {
    // Guard against stripe or elements not being available
    if (!stripe || !elements) {
      throw Error("stripe or elements undefined");
    }

    // Extract the payment data from our <CardElement/> component
    const cardElements = elements.getElement(CardElement);

    // Guard against an undefined value
    if (!cardElements) {
      throw Error("cardElements not found");
    }

    // Create the Source object
    const { source, error: sourceError } = await stripe.createSource(
      cardElements,
      {
        type: "card",
        owner: {
          email,
          name,
          phone,
        },
      }
    );

    // Guard against and error or undefined source
    if (sourceError || !source) {
      throw Error(sourceError?.message || "Unknown error generating source");
    }

    return source;
  }

  return (
    <>
      <style jsx>{`
        form {
          display: grid;
        }
      `}</style>
      <form onSubmit={handleSubmit}>
        <label htmlFor="free-input">Free Input</label>
        <textarea
          name="free-input"
          defaultValue={`
        {
            "billingDetails": {
              "firstName": "Gavin",
              "lastName": "Henderson",
              "address1": "1 Real Street",
              "city": "dundee",
              "postcode": "DD1 5PT",
              "phoneNo": "07898565478",
              "email": "myemail@email.com",
              "country": "GB"
            }
          }
          
        `}
        ></textarea>

        <CardElement
          options={{
            hidePostalCode: true, // We'll be sending up the postal ourselves
          }}
        />
        <button disabled={!stripe}>Pay</button>
      </form>
    </>
  );
};
