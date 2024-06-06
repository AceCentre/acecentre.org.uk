import { ImageWithLoader as Image } from "../image";
import styles from "./meet-our-people.module.css";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";

export const MeetOurPeople = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/staff-photo-2024.jpeg"
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
