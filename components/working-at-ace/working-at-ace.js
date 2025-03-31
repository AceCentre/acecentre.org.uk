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
              &quot;People are at the heart of everything we do here at Ace Centre, and this drives us to constantly explore innovative ideas and develop better
               services. It is a privilege to work alongside such a dynamic and energetic team who share this passion for delivering excellence, and commitment to
                helping people communicate.&quot;
            </p>
            <div>
              <p>
                <strong>Bob Birchall</strong>
              </p>
              <p>CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
