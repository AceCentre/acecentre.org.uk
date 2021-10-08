import { ImageWithLoader as Image } from "../image";
import styles from "./meet-our-people.module.css";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Avatar } from "@material-ui/core";

export const MeetOurPeople = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/group-photo.jpeg"
            layout="fill"
            objectFit="cover"
            alt="A group photo of everyone at Ace Centre"
          />
          <div className={styles.blueBackground}></div>
        </div>
        <div className={styles.quote}>
          <Avatar className={styles.avatar}>
            <FormatQuoteIcon className={styles.icon} />
          </Avatar>
          <div className={styles.quoteText}>
            <p className={styles.quoteContent}>
              &quot;Ace Centre&apos;s greatest strength and biggest asset is its
              people. Our friendly and professional team have a wealth of
              specialist knowledge and experience. We work closely together as a
              team to enable us to help others and achieve great results.&quot;
            </p>
            <div>
              <p>
                <strong>Stephen Carroll</strong>
              </p>
              <p>Business Director</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
