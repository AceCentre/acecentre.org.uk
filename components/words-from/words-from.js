import styles from "./words-from.module.css";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Avatar } from "@material-ui/core";
import { ImageWithLoader as Image } from "../image";

import { Button } from "../button/button";

export const WordsFrom = ({ title, quote, featuredImage }) => {
  return (
    <div className={styles.container}>
      <h2>
        Words from <strong>{title}</strong>
      </h2>
      <div>
        <div>
          <Image {...featuredImage} />
          <div />
        </div>
        <div>
          <Avatar className={styles.avatar}>
            <FormatQuoteIcon className={styles.icon} />
          </Avatar>
          <div>
            <div dangerouslySetInnerHTML={{ __html: quote }} />
            {/* This string includes a pronoun so won't work if we change this someone with
            different pronouns */}
            <Button href="">Read his story</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
