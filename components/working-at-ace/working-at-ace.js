import { ImageWithLoader as Image } from "../image";
import styles from "./working-at-ace.module.css";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";

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
              &quot;At Ace Centre I get to work with a dedicated team of
              experienced professionals. I enjoy collaborating on a wide variety
              of projects within Ace Centre and working with external
              partners.&quot;
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
