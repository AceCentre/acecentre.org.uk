import styles from "./words-from.module.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";
import { ImageWithLoader as Image } from "../image";

import { Button } from "../button/button";

export const WordsFrom = ({ shortTitle, quote, featuredImage, slug }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Words from <strong>{shortTitle}</strong>
      </h2>
      <div className={styles.lowerContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={featuredImage.src}
            alt={`Image of ${shortTitle}`}
            layout="fill"
            objectFit="cover"
            objectPosition={"50% 35%"}
          />
          <div className={styles.backgroundColor} />
        </div>
        <div className={styles.quoteContainer}>
          <Avatar className={styles.avatar}>
            <FormatQuoteIcon className={styles.icon} />
          </Avatar>
          <div className={styles.quoteTextContainer}>
            <div>&quot;{quote}&quot;</div>
            <div>
              <Button href={`/people-we-support/case-study/${slug}`}>
                Read full story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
