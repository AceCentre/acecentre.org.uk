import styles from "./getting-started-quote.module.css";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Avatar from "@material-ui/core/Avatar";

import { Button } from "../../components/button/button";

export const GettingStartedQuote = ({ story, pronoun = "their" }) => {
  return (
    <div className={styles.quote}>
      <Avatar className={styles.avatar}>
        <FormatQuoteIcon className={styles.icon} />
      </Avatar>
      <div className={styles.quoteText}>
        <p className={styles.quoteContent}>&quot;{story.quote}&quot;</p>
        <div>
          <p>
            <strong>{story.title}</strong>
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Button href={`/people-we-support/case-study/${story.slug}`}>
            Read {pronoun} story
          </Button>
        </div>
      </div>
    </div>
  );
};
