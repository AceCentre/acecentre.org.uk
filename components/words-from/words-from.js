import styles from "./words-from.module.css";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Avatar from "@material-ui/core/Avatar";
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
            {/* This string includes a pronoun so won't work if we change this someone with
            different pronouns */}
            <div>
              <Button href={`/people-we-support/case-study/${slug}`}>
                Read his story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
