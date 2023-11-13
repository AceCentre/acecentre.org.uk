import styles from "./story-content-and-quote.module.css";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Avatar from "@mui/material/Avatar";

export const StoryContentAndQuote = ({ story }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.contentContainer}
        dangerouslySetInnerHTML={{ __html: story.content }}
      ></div>

      {story.quote && (
        <div className={styles.quoteContainer}>
          <Avatar className={styles.avatar}>
            <FormatQuoteIcon className={styles.icon} />
          </Avatar>
          <div>
            <p className={styles.quoteText}>{story.quote}</p>
          </div>
        </div>
      )}
    </div>
  );
};
