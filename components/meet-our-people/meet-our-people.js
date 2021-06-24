import { ImageWithLoader as Image } from "../image";
import styles from "./meet-our-people.module.css";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Avatar } from "@material-ui/core";

export const MeetOurPeople = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <Image src="/group-photo.png" layout="fill" objectFit="cover" />
          <div className={styles.blueBackground}></div>
        </div>
        <div className={styles.quote}>
          <Avatar className={styles.avatar}>
            <FormatQuoteIcon className={styles.icon} />
          </Avatar>
          <div className={styles.quoteText}>
            <p className={styles.quoteContent}>
              &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque gravida rutrum mattis. Aenean tincidunt neque id
              turpis viverra pellentesque.&quot;
            </p>
            <div>
              <p>
                <strong>Anna Reeves DL</strong>
              </p>
              <p>CEO</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
