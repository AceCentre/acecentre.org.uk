import { Image } from "../image";
import { MsForm, SPEECHBUBBLE } from "../ms-form";
import { ResourceList } from "../resource-list/resource-list";
import { NewsletterSignup } from "../resources-download/resources-download";
import styles from "./speechbubble.module.css";

export const Speechbubble = ({ featuredResources }) => {
  return (
    <div>
      <div className={styles.explanationContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/speechbubble.png"
            layout="fill"
            alt="Illustrations of individuals reading books on tablets"
            objectFit="contain"
          />
        </div>
        <div className={styles.rightHandSide}>
          <h1>SpeechBubble has Shutdown</h1>
          <p>
            Thank you for using speech bubble, your help is appreciated.
            Something something, this needs thought out more. If you want would
            like it come back let us know by filling out the form below.
          </p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <MsForm form={SPEECHBUBBLE} />
      </div>

      <div className={styles.newsletterContainer}>
        <h2>Ace Centre Newsletter</h2>
        <p>
          Sign up to our free newsletter to stay up to date with the latest news
          from Ace Centre
        </p>
        <NewsletterSignup signUpIdentifier="speechbubble" />
      </div>
      <ResourceList
        className={styles.featuredResources}
        title="Ace Centre Resources"
        tagline="Check out resources created by Ace Centre"
        products={featuredResources}
        viewAllLink="/resources/all"
        viewAllText="View all resources"
      />
    </div>
  );
};
