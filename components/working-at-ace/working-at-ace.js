import { ImageWithLoader as Image } from "../image";
import styles from "./working-at-ace.module.css";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Avatar from "@material-ui/core/Avatar";

export const WorkingAtAce = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Working at Ace Centre</h2>
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/careers.jpeg"
            layout="fill"
            objectFit="cover"
            alt="Two people outside looking happy"
          />
          <div className={styles.blueBackground}></div>
        </div>
        <div className={styles.quote}>
          <Avatar className={styles.avatar}>
            <FormatQuoteIcon className={styles.icon} />
          </Avatar>
          <div className={styles.quoteText}>
            <p className={styles.quoteContent}>
              &quot;I enjoy working on new products guided by the our team of
              experts who are dedicated to making sure everything we do meets
              the needs of our clients.&quot;
            </p>
            <div>
              <p>
                <strong>Gavin Henderson</strong>
              </p>
              <p>Software Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
