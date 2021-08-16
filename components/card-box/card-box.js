import { CardElement } from "@stripe/react-stripe-js";
import styles from "./card-box.module.css";

export const CardBox = () => {
  return (
    <div className={styles.container}>
      <h3>Pay with your credit card</h3>

      <div className={styles.cardElementContainer}>
        <CardElement
          className={styles.cardElement}
          options={{
            style: {
              base: {
                iconColor: "#000000",
                color: "#000000",
                fontWeight: "500",
                fontFamily: "Montserrat",
                fontSize: "16px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
