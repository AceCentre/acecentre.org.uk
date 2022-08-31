import React, { useMemo, useState } from "react";
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
  CollectEmails,
  CollectDelegatedEmail,
} from "../components/checkout-address/checkout-address";
import { getAddresses } from "../lib/auth/get-user";
import { Checkbox } from "@chakra-ui/checkbox";
import { loadStripe } from "@stripe/stripe-js";
import config from "../lib/config";
import { cloneDeep } from "lodash";
import { validateEmail } from "../lib/auth/hooks";
import { useRouter } from "next/router";

const getMissingRequiredFields = (billingDetails, requiredFields) => {
  const missingFields = [];

  for (const requiredField of requiredFields) {
    if (!billingDetails[requiredField.key]) {
      missingFields.push(requiredField);
    }
  }

  return missingFields;
};

const useCheckoutForm = (
  freeCheckout,
  groupPurchaseLines,
  delegatedLearningLines,
  billingDetails,
  rawTotal
) => {
  const { refreshLoginStatus } = useGlobalProps();
  const [allowSubmit, setAllowSubmit] = useState(true);
  const [showFullDelivery, setShowFullDelivery] = useState(false);
  const [forceUkDelivery, setForceUkDelivery] = useState(
    billingDetails.country && billingDetails.country !== "GB"
  );
  const [billingError, setBillingError] = useState(null);
  const [deliveryError, setDeliveryError] = useState(null);
  const [cardError, setCardError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [tsAndCsError, setTsAndCsError] = useState(null);

  const { defaultGroupPurchases, emptyEmailErrors } = useMemo(() => {
    let defaultGroupPurchases = {};
    let emptyEmailErrors = {};
    for (const line of groupPurchaseLines) {
      defaultGroupPurchases[line.key] = Array(line.quantity).fill("");
      emptyEmailErrors[line.key] = null;
    }
    return { defaultGroupPurchases, emptyEmailErrors };
  });

  const [groupPurchaseErrors, setGroupPurchaseErrors] =
    useState(emptyEmailErrors);

  const [groupPurchaseEmails, setGroupPurchaseEmails] = useState(
    defaultGroupPurchases
  );

  const [delegatedLearningErrors, setDelegatedLearningErrors] = useState(() => {
    let defaultErrors = {};
    for (const line of delegatedLearningLines) {
      defaultErrors[line.key] = null;
    }

    return defaultErrors;
  });

  const router = useRouter();

  const stripe = useStripe();
  const elements = useElements();

  const [delegatedLearningEmails, setDelegatedLearningEmails] = useState({});

  const delegatedLearningEmailChanged = (key) => (event) => {
    const emails = cloneDeep(delegatedLearningEmails);
    emails[key] = event.target.value;
    setDelegatedLearningEmails(emails);
  };

  const [isDelegating, setIsDelegating] = useState({});

  const changeDelegation = (key) => (newIsDelegating) => {
    const allIsDelegating = cloneDeep(isDelegating);
    allIsDelegating[key] = newIsDelegating;
    setIsDelegating(allIsDelegating);
  };

  const differentAddressOnChange = (event) => {
    setShowFullDelivery(event.target.checked);
  };

  const emailsChanged = (key) => (newEmails) => {
    const emails = cloneDeep(groupPurchaseEmails);
    emails[key] = newEmails;
    setGroupPurchaseEmails(emails);
  };

  const checkoutSubmit = (event) => {
    event.preventDefault();
    setBillingError(null);
    setDeliveryError(null);
    setCardError(null);
    setGeneralError(null);
    setAllowSubmit(false);
    setTsAndCsError(null);
    setDelegatedLearningErrors(() => {
      let defaultErrors = {};
      for (const line of delegatedLearningLines) {
        defaultErrors[line.key] = null;
      }

      return defaultErrors;
    });
    setGroupPurchaseErrors(emptyEmailErrors);

    if (delegatedLearningLines.length !== Object.keys(isDelegating).length) {
      window.scrollTo(0, 0);

      Object.keys(delegatedLearningErrors).map((x) => {
        delegatedLearningErrors[x] =
          "You must specify who is taking the course";
      });
      setDelegatedLearningErrors(delegatedLearningErrors);
      setAllowSubmit(true);
      return;
    }

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
      // notes: event.target?.orderNotesDelivery?.value || "",
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

    let currentErrors = cloneDeep(emptyEmailErrors);
    let errorState = false;
    let currentDelegationErrors = cloneDeep(delegatedLearningErrors);

    Object.entries(groupPurchaseEmails).map(([key, currentEmails]) => {
      const invalidEmails = currentEmails.filter((x) => !validateEmail(x));

      if (invalidEmails.length > 0) {
        currentErrors[key] = "All emails must be valid";
        errorState = true;
      }
    });

    Object.entries(isDelegating).map(([key, isDelegatingCurrent]) => {
      if (isDelegatingCurrent) {
        const currentEmail = delegatedLearningEmails[key] || "";

        if (!validateEmail(currentEmail)) {
          currentDelegationErrors[key] = "All emails must be valid";
          errorState = true;
        }
      }
    });

    if (errorState) {
      setGroupPurchaseErrors(currentErrors);
      setDelegatedLearningErrors(currentDelegationErrors);
      window.scrollTo(0, 0);
      setAllowSubmit(true);
      return;
    }

    const hasAgreedToTsAndCs = event.target.tsAndCs.checked;
    if (!hasAgreedToTsAndCs) {
      setTsAndCsError("You must agree to the terms and conditions");
      setAllowSubmit(true);

      return;
    }

    // Guard against stripe or elements not being available
    if (!stripe || !elements) {
      throw Error("Stripe or Elements is undefined");
    }

    const submit = async () => {
      let source = {};

      // eslint-disable-next-line no-undef
      if (gtag) {
        // eslint-disable-next-line no-undef
        gtag("event", "conversion", {
          send_to: "AW-10885468875/GGRdCIugwrQDEMulzMYo",
          value: rawTotal,
          currency: "GBP",
          transaction_id: "",
        });
      }
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
        const sourceError = result.error;

        if (sourceError && sourceError.message) {
          setAllowSubmit(true);
          setCardError(sourceError.message);
          return;
        }
      }

      let delegatedEmailsAsGroupPurchases = {};
      Object.entries(isDelegating).forEach(([key, isDelegatingCurrent]) => {
        if (isDelegatingCurrent) {
          delegatedEmailsAsGroupPurchases[key] = [delegatedLearningEmails[key]];
        }
      });

      try {
        if (event.target.mailingList.checked) {
          const mailingListResponse = await fetch(
            "/api/cart/add-to-mailing-list",
            {
              method: "POST",
              body: JSON.stringify({
                email: billingDetails.email,
              }),
            }
          );
          const mailingListParsed = await mailingListResponse.json();

          if (mailingListParsed.success === false) {
            setGeneralError(parsed.error || "Failed to add to mailing list");
            setAllowSubmit(true);
            window.scrollTo(0, 0);
            return;
          }
        }

        const updateCustomerResponse = await fetch(
          "/api/cart/update-customer",
          {
            method: "POST",
            body: JSON.stringify({
              source,
              billingDetails,
              shippingDetails: deliveryDetails,
              shipToDifferentAddress: showFullDelivery,
              orderNotesDelivery: event.target?.orderNotesDelivery?.value || "",
              addToMailingList: event.target.mailingList.checked,
              groupPurchaseEmails: {
                ...groupPurchaseEmails,
                ...delegatedEmailsAsGroupPurchases,
              },
            }),
          }
        );

        const updateCustomerParsed = await updateCustomerResponse.json();

        if (updateCustomerParsed.success === false) {
          setGeneralError(parsed.error || "Failed to update customer");
          setAllowSubmit(true);
          window.scrollTo(0, 0);
          return;
        }

        const response = await fetch("/api/cart/checkout", {
          method: "POST",
          body: JSON.stringify({
            source,
            billingDetails,
            shippingDetails: deliveryDetails,
            shipToDifferentAddress: showFullDelivery,
            orderNotesDelivery: event.target?.orderNotesDelivery?.value || "",
            addToMailingList: event.target.mailingList.checked,
            groupPurchaseEmails: {
              ...groupPurchaseEmails,
              ...delegatedEmailsAsGroupPurchases,
            },
          }),
        });

        refreshLoginStatus();

        const parsed = await response.json();

        if (parsed.success === true) {
          try {
            await fetch("/api/cart/checkout", {
              method: "POST",
              body: JSON.stringify({}),
            });
          } catch (error) {
            console.warn("Failed to empty cart but its probably okay");
          }

          const id = parsed?.result?.order?.id || null;
          const order = parsed?.result?.order;

          if (id) {
            localStorage.setItem(`order-${id}`, JSON.stringify(order));

            if (!order.stripeFinishedCharging) {
              await stripe.confirmCardPayment(order.paymentIntent);
            }

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
    setForceUkDelivery,
    forceUkDelivery,
    billingError,
    deliveryError,
    checkoutSubmit,
    cardError,
    generalError,
    allowSubmit,
    emailsChanged,
    groupPurchaseErrors,
    delegatedLearningEmailChanged,
    delegatedLearningErrors,
    changeDelegation,
    tsAndCsError,
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
  groupPurchaseLines,
  delegatedLearningLines,
  vat,
  defaultEmail,
  rawTotal,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
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
            groupPurchaseLines={groupPurchaseLines}
            delegatedLearningLines={delegatedLearningLines}
            vat={vat}
            defaultEmail={defaultEmail}
            rawTotal={rawTotal}
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
  groupPurchaseLines,
  delegatedLearningLines,
  defaultEmail,
  vat,
  rawTotal,
}) => {
  const {
    showFullDelivery,
    differentAddressOnChange,
    setForceUkDelivery,
    checkoutSubmit,
    billingError,
    deliveryError,
    cardError,
    generalError,
    allowSubmit,
    emailsChanged,
    groupPurchaseErrors,
    delegatedLearningEmailChanged,
    delegatedLearningErrors,
    changeDelegation,
    tsAndCsError,
    forceUkDelivery,
  } = useCheckoutForm(
    isFree(total),
    groupPurchaseLines,
    delegatedLearningLines,
    billingDetails,
    rawTotal
  );

  return (
    <form onSubmit={checkoutSubmit}>
      <BackToLink where="basket" href="/basket" />
      {generalError && <p className={styles.error}>{generalError}</p>}
      <BillingDetails
        countries={countries}
        billingDetails={billingDetails}
        defaultEmail={defaultEmail}
        billingError={billingError}
        reducedInfo={isFree(total)}
        countryChanged={(newCountry) => {
          if (needsDelivered && newCountry !== "GB") {
            setForceUkDelivery(true);
          } else if (needsDelivered && newCountry === "GB") {
            setForceUkDelivery(false);
          }
        }}
      />
      <div className={styles.checkbox}>
        <Checkbox name="mailingList" id="mailingList">
          Email me about Ace Centre related news and events
        </Checkbox>

        {needsDelivered && !forceUkDelivery && (
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
        forceUkDelivery={forceUkDelivery}
        deliveryDetails={deliveryDetails}
        countries={countries}
        deliveryError={deliveryError}
        needsDelivered={needsDelivered}
      />
      {groupPurchaseLines.map((currentLine) => {
        return (
          <CollectEmails
            key={currentLine.key}
            currentLine={currentLine}
            emailsChanged={emailsChanged(currentLine.key)}
            error={groupPurchaseErrors[currentLine.key]}
          />
        );
      })}

      {delegatedLearningLines.map((currentLine) => {
        return (
          <CollectDelegatedEmail
            key={currentLine.key}
            currentLine={currentLine}
            emailChanged={delegatedLearningEmailChanged(currentLine.key)}
            error={delegatedLearningErrors[currentLine.key]}
            changeDelegation={changeDelegation(currentLine.key)}
          />
        );
      })}

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
        vat={vat}
      />
      {/* Only show the card box for paid products */}
      {!isFree(total) && <CardBox cardError={cardError} />}
      <div className={styles.placeOrderButtonContainer}>
        <div>
          {tsAndCsError && <p className={styles.error}>{tsAndCsError}</p>}
          <Checkbox name="tsAndCs" id="tsAndCs">
            I have read and agree to the website{" "}
            <Link href="/page/purchase-terms-and-conditions">
              terms and conditions
            </Link>
          </Checkbox>
        </div>
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
    vat,
    rawTotal,
  } = await getCart(req);
  const user = req.session.get("user") || { customerId: "" };
  const {
    countries,
    billingDetails,
    shippingDetails,
    email: defaultEmail,
  } = await getAddresses(req, user);

  if (lines.length === 0) {
    return {
      redirect: {
        destination: "/basket",
        permanent: false,
      },
    };
  }

  const groupPurchaseLines = lines.filter(
    (x) => x.groupPurchase && x.quantity > 1
  );

  const delegatedLearningLines = lines.filter(
    (x) => x.groupPurchase && x.quantity == 1
  );

  return {
    props: {
      lines,
      groupPurchaseLines,
      subtotal,
      shipping,
      total,
      discountTotal,
      countries,
      billingDetails,
      deliveryDetails: shippingDetails,
      needsDelivered,
      delegatedLearningLines,
      vat,
      defaultEmail,
      rawTotal,
    },
  };
});
