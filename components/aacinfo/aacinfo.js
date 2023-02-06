import { Image } from "../image";
import { MsForm, AAC_INFO } from "../ms-form";
import { ResourceList } from "../resource-list/resource-list";
import { NewsletterSignup } from "../resources-download/resources-download";
import styles from "./aacinfo.module.css";

export const Aacinfo = ({ featuredResources }) => {
  return (
    <div>
      <div className={styles.explanationContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/aacinfo.png"
            layout="fill"
            alt="AAC Info logo"
            objectFit="contain"
          />
        </div>
        <div className={styles.rightHandSide}>
          <h1>AACInfo has Shutdown</h1>
          <p>
            AACInfo is a monthly newsletter of all things AAC (Augmentative &
            Alternative Communication) edited by the Ace Centre. Information is
            sourced from suppliers, user forums, twitter and email lists.
          </p>
          <p>
            If you feel you&apos;d like to be involved in developing a new
            AACInfo we&apos;d love to hear from you.
          </p>
        </div>
      </div>
      <div className={styles.formContainer}>
        <MsForm form={AAC_INFO} />
      </div>

      <div className={styles.newsletterContainer}>
        <h2>Ace Centre Newsletter</h2>
        <p>
          Sign up to our free newsletter to stay up to date with the latest news
          from Ace Centre
        </p>
        <NewsletterSignup signUpIdentifier="aacinfo" />
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
