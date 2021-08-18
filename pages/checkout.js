import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

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
import { loadStripe } from "@stripe/stripe-js";
import config from "../lib/config";
import { useRouter } from "next/dist/client/router";

const getMissingRequiredFields = (billingDetails, requiredFields) => {
  const missingFields = [];

  for (const requiredField of requiredFields) {
    if (!billingDetails[requiredField.key]) {
      missingFields.push(requiredField);
    }
  }

  return missingFields;
};

const useCheckoutForm = (freeCheckout) => {
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [showFullDelivery, setShowFullDelivery] = useState(false);
  const [billingError, setBillingError] = useState(null);
  const [deliveryError, setDeliveryError] = useState(null);
  const [cardError, setCardError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const differentAddressOnChange = (event) => {
    setShowFullDelivery(event.target.checked);
  };

  const checkoutSubmit = (event) => {
    event.preventDefault();
    setBillingError(null);
    setDeliveryError(null);
    setCardError(null);
    setGeneralError(null);
    setAllowSubmit(false);

    let billingDetails = {};
    let requiredBillingFields = [];

    // If its a paid product we need way more info
    if (!freeCheckout) {
      billingDetails = {
        firstName: event.target.firstNameBilling.value,
        lastName: event.target.lastNameBilling.value,
        company: event.target.companyBilling.value,
        country: event.target.countryBilling.value,
        address1: event.target.addressLine1Billing.value,
        address2: event.target.addressLine2Billing.value,
        city: event.target.cityBilling.value,
        state: event.target.countyBilling.value,
        postcode: event.target.postcodeBilling.value,
        phone: event.target.phoneBilling.value,
        email: event.target.emailBilling.value,
      };
      requiredBillingFields = [
        { key: "firstName", name: "First name" },
        { key: "lastName", name: "Last name" },
        { key: "country", name: "Country" },
        { key: "address1", name: "Address Line 1" },
        { key: "city", name: "Town / City" },
        { key: "postcode", name: "Postcode" },
        { key: "phone", name: "Phone number" },
        { key: "email", name: "Email address" },
      ];
    } else {
      // We need less info on a free product
      billingDetails = {
        firstName: event.target.firstNameBilling.value,
        lastName: event.target.lastNameBilling.value,
        phone: event.target.phoneBilling.value,
        email: event.target.emailBilling.value,
      };
      requiredBillingFields = [
        { key: "firstName", name: "First name" },
        { key: "lastName", name: "Last name" },
        { key: "phone", name: "Phone number" },
        { key: "email", name: "Email address" },
      ];
    }

    const missingBillingFields = getMissingRequiredFields(
      billingDetails,
      requiredBillingFields
    );

    if (missingBillingFields.length > 0) {
      setAllowSubmit(true);
      setBillingError(`${missingBillingFields[0].name} is a required field`);
    }

    let missingDeliveryFields = [];
    let deliveryDetails = {
      firstName: event.target?.firstNameDelivery?.value || "",
      lastName: event.target?.lastNameDelivery?.value || "",
      company: event.target?.companyDelivery?.value || "",
      country: event.target?.countryDelivery?.value || "",
      address1: event.target?.addressLine1Delivery?.value || "",
      address2: event.target?.addressLine2Delivery?.value || "",
      city: event.target?.cityDelivery?.value || "",
      state: event.target?.countyDelivery?.value || "",
      postcode: event.target?.postcodeDelivery?.value || "",
      notes: event.target?.orderNotesDelivery?.value || "",
    };

    if (showFullDelivery) {
      missingDeliveryFields = getMissingRequiredFields(deliveryDetails, [
        { key: "firstName", name: "First name" },
        { key: "lastName", name: "Last name" },
        { key: "country", name: "Country" },
        { key: "address1", name: "Address Line 1" },
        { key: "city", name: "Town / City" },
        { key: "postcode", name: "Postcode" },
      ]);
    }

    if (missingDeliveryFields.length > 0) {
      setAllowSubmit(true);
      setDeliveryError(`${missingDeliveryFields[0].name} is a required field`);
    }

    if (missingBillingFields.length > 0 || missingDeliveryFields.length > 0) {
      window.scrollTo(0, 0);
      return;
    }

    // Guard against stripe or elements not being available
    if (!stripe || !elements) {
      throw Error("Stripe or Elements is undefined");
    }

    const submit = async () => {
      let source = {};
      if (!freeCheckout) {
        // Extract the payment data from our <CardElement/> component
        const cardElements = elements.getElement(CardElement);

        // Guard against an undefined value
        if (!cardElements) {
          throw Error("cardElements not found");
        }
        // Create the Source object
        const result = await stripe.createSource(cardElements, {
          type: "card",
          owner: {
            email: billingDetails.email,
            name: billingDetails.firstName + " " + billingDetails.lastName,
            phone: billingDetails.phone,
          },
        });

        source = result.source;
        const sourceError = result.sourceError;

        if (sourceError && sourceError.message) {
          setAllowSubmit(true);
          setCardError(sourceError.message);
          return;
        }
      }

      try {
        const response = await fetch("/api/cart/checkout", {
          method: "POST",
          body: JSON.stringify({
            source,
            billingDetails,
            deliveryDetails,
            shipToDifferentAddress: showFullDelivery,
            orderNotesDelivery: event.target?.orderNotesDelivery?.value || "",
            addToMailingList: event.target.mailingList.checked,
          }),
        });

        const parsed = await response.json();

        if (parsed.success === true) {
          const id = parsed?.result?.order?.id || null;
          const order = parsed?.result?.order;

          if (id) {
            localStorage.setItem(`order-${id}`, JSON.stringify(order));
            router.push(`/order/${id}`);
            return;
          } else {
            router.push("/my-acecentre/orders");
            return;
          }
        }

        if (parsed.error) {
          setGeneralError(parsed.error);
          setAllowSubmit(true);
          window.scrollTo(0, 0);
          return;
        }

        throw new Error("An error occurred");
      } catch (error) {
        window.scrollTo(0, 0);
        setGeneralError(error.message);
        setAllowSubmit(true);
      }
    };

    submit();
  };

  return {
    showFullDelivery,
    differentAddressOnChange,
    billingError,
    deliveryError,
    checkoutSubmit,
    cardError,
    generalError,
    allowSubmit,
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
  needsDelivered,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <Elements stripe={loadStripe(config.stripeApiKey)}>
          <CheckoutForm
            lines={lines}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            discountTotal={discountTotal}
            countries={countries}
            billingDetails={billingDetails}
            deliveryDetails={deliveryDetails}
            needsDelivered={needsDelivered}
          />
        </Elements>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const CheckoutForm = ({
  lines,
  subtotal,
  shipping,
  total,
  discountTotal,
  countries,
  billingDetails,
  deliveryDetails,
  needsDelivered,
}) => {
  const {
    showFullDelivery,
    differentAddressOnChange,
    checkoutSubmit,
    billingError,
    deliveryError,
    cardError,
    generalError,
    allowSubmit,
  } = useCheckoutForm(isFree(total));

  return (
    <form onSubmit={checkoutSubmit}>
      <BackToLink where="basket" href="/basket" />

      {generalError && <p className={styles.error}>{generalError}</p>}

      <BillingDetails
        countries={countries}
        billingDetails={billingDetails}
        billingError={billingError}
        reducedInfo={isFree(total)}
      />

      <div className={styles.checkbox}>
        <Checkbox name="mailingList" id="mailingList">
          Email me about Ace related news and events
        </Checkbox>

        {needsDelivered && (
          <Checkbox
            name="differentAddress"
            id="differentAddress"
            onChange={differentAddressOnChange}
          >
            Deliver to a different address?
          </Checkbox>
        )}
      </div>

      <DeliveryDetails
        showFullDelivery={showFullDelivery}
        deliveryDetails={deliveryDetails}
        countries={countries}
        deliveryError={deliveryError}
        needsDelivered={needsDelivered}
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
        needsDelivered={needsDelivered}
      />

      {/* Only show the card box for paid products */}
      {!isFree(total) && <CardBox cardError={cardError} />}

      <div className={styles.placeOrderButtonContainer}>
        <Button disabled={!allowSubmit} type="submit">
          Place order
        </Button>
      </div>
    </form>
  );
};

const isFree = (total) => total === "£0.00";

export const getServerSideProps = withSession(async function ({ req }) {
  const {
    lines,
    subtotal,
    shipping,
    total,
    discountTotal,
    needsDelivered,
  } = await getCart(req);
  const user = req.session.get("user") || { customerId: "" };
  const { countries, billingDetails, shippingDetails } = await getAddresses(
    req,
    user
  );

  if (lines.length === 0) {
    return {
      redirect: {
        destination: "/basket",
        permanent: false,
      },
    };
  }

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
      needsDelivered,
    },
  };
});
