import { Avatar } from "@material-ui/core";
import { useMemo, useState } from "react";
import styles from "./learning-reviews.module.css";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const LearningReviews = ({ reviews }) => {
  if (reviews.length === 0) {
    return null;
  }

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const currentReview = useMemo(() => {
    const review = reviews[currentReviewIndex];
    if (review) {
      return review;
    }
    return null;
  }, [currentReviewIndex, reviews]);
  const nextReview = () => {
    const nextIndex = (currentReviewIndex + 1) % reviews.length;

    setCurrentReviewIndex(nextIndex);
  };
  const prevReview = () => {
    let nextIndex = currentReviewIndex - 1;

    if (nextIndex < 0) {
      nextIndex = reviews.length + nextIndex;
    }

    setCurrentReviewIndex(nextIndex);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews of Ace Centre Learning</h2>
      <div className={styles.reviewContainer}>
        <button
          aria-label="Previous review"
          onClick={prevReview}
          className={styles.button}
        >
          <Avatar className={styles.avatar}>
            <ArrowBackIcon />
          </Avatar>
        </button>
        <div
          className={styles.quote}
          dangerouslySetInnerHTML={{ __html: currentReview.content }}
        />
        <button
          aria-label="Next review"
          onClick={nextReview}
          className={styles.button}
        >
          <Avatar className={styles.avatar}>
            <ArrowForwardIcon />
          </Avatar>
        </button>
      </div>
    </div>
  );
};
