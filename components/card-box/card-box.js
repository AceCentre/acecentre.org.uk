import { CardElement } from "@stripe/react-stripe-js";
import styles from "./card-box.module.css";

export const CardBox = () => {
  return (
    <div className={styles.container}>
      <h3>Pay with your credit card</h3>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "red",
            },
          },
        }}
      />
    </div>
  );
};
