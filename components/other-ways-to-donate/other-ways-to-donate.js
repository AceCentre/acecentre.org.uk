import styles from "./other-ways-to-donate.module.css";
import { Button } from "../button/button";

export const OtherWaysToDonate = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Other ways to donate</h2>
        <div className={styles.grid}>
          <div>
            <h3>One off donations</h3>
            <p>
              You can donate here on our giving site or directly through bank
              transfer.
            </p>
          </div>
          <div>
            <h3>Fundraise</h3>
            <p>
              You can sign up to give £1 a month or more here on our giving site
              or directly through your bank by setting up a standing order. If
              you do this directly through your bank using our account details
              please let us know so we can look out for your donation. If you
              prefer, you can complete this form and let us contact your bank.
            </p>
          </div>
          <div>
            <h3>Volunteer</h3>
            <p>
              Some presents really are priceless! Ask your family and friends to
              donate to Ace Centre rather than give you another scented candle
              (no offence to scented candle givers!) Or perhaps you could donate
              in place of a present for someone else.
            </p>
          </div>
          <div>
            <h3>Donate in memory</h3>
            <p>
              Leaving a gift in memory of a loved one is a special way to help
              others. Every gift really does make a difference – your donation
              will help us to improve the quality of life for children and
              adults with the most challenging communication needs by ensuring
              they have prompt access to the advice and support they need so
              they can achieve their goals.
            </p>
          </div>
          <div>
            <h3>Amazon Smile</h3>
            <p>
              With Amazon Smile you can shop on Amazon and they will make a
              donation every time you make an eligible purchase.
            </p>
            <div className={styles.buttonContainer}>
              <Button href="https://smile.amazon.co.uk/ch/1089313-0">
                Find out more
              </Button>
            </div>
          </div>
          <div className={styles.inlineCard}>
            <h3>Donate today</h3>
            <p>
              Choose to help Ace Centre and ensure we can continue to provides
              services and support to children and adults with severe
              communication difficulties.
            </p>
            <div className={styles.buttonContainer}>
              <Button href="/contact">Get in touch online</Button>
            </div>
            <p>
              or call us on <strong>0800 080 3115</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
