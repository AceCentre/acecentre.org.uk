import React from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "../lib/config";

export default function Checkout() {
  return (
    <>
      <h1>Checkout</h1>
      <Elements stripe={loadStripe(config.stripeApiKey)}>
        <CheckoutForm />
      </Elements>
    </>
  );
}

const CheckoutForm = () => {
  // This loads up the Stripe object
  const stripe = useStripe();

  // Used to pass the payment info to the Stripe API
  const elements = useElements();

  // We'll deal with this in a sec
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const source = await handleStripe();

      const result = await fetch("/api/cart/checkout", {
        method: "POST",
        body: JSON.stringify({ stripeSourceId: source.id }),
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleStripe() {
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
      }
    );

    // Guard against and error or undefined source
    if (sourceError || !source) {
      throw Error(sourceError?.message || "Unknown error generating source");
    }

    return source;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* CardElement will load up the necessary CC fields */}
      <CardElement
        options={{
          hidePostalCode: true, // We'll be sending up the postal ourselves
        }}
      />
      <button disabled={!stripe}>Pay</button>
    </form>
  );
};
