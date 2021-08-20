import styles from "./learning-detail-box.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";
import { ShareButtons } from "../blog-meta/blog-meta";
import { useAddToCart } from "../resources-download/resources-download";

export const LearningDetailBox = ({ course }) => {
  const { disabled, addToCart, error } = useAddToCart();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.imageContainer}>
            <Image
              src={course.image.src}
              alt={
                course.image.alt
                  ? course.image.alt
                  : `Thumbnail for ${course.title}`
              }
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className={styles.rightHandSide}>
            <div>
              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.tagLine}>From Ace Centre Learning</p>
            </div>
            <p className={styles.price}>{getPriceText(course.price)}</p>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <ShareButtons
            shareCta="Share this course"
            shareText={`Check out ${course.title} on Ace Centre Learning`}
            avatarClassName={styles.avatar}
            className={styles.shareButtons}
          />
          <Button
            className={styles.bookButton}
            disabled={disabled}
            onClick={addToCart({
              productId: course.id,
            })}
          >
            Book this course
          </Button>
        </div>
      </div>
      <p className={styles.error}>{error}</p>
    </>
  );
};

const getPriceText = (price) => {
  if (price === 0) {
    return "Free";
  }
  return `£${price}`;
};
