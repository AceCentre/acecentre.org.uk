import Link from "next/link";
import { Card } from "../latest-from-blog/latest-from-blog";
import styles from "./all-stories.module.css";

export const AllStories = ({ stories }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {stories.map((story) => (
          <Card
            title={story.title}
            featuredImage={story.image}
            key={`story-${story.slug}`}
            href={`/stories/${story.slug}`}
            subtitle={"story"}
            background
          >
            <div className={styles.content}>
              <p className={styles.learnAbout}>Learn about</p>
              <p className={styles.storyText}>{story.possessiveName} story</p>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export const ReadMoreStories = ({ stories }) => {
  return (
    <div>
      <div className={`${styles.titleContainer} ${styles.container}`}>
        <h3 className={styles.readMoreTitle}>Read more stories</h3>
        <Link href="/stories">
          <a className={styles.viewAllLink}>View all &gt;</a>
        </Link>
      </div>
      <AllStories stories={stories} />
    </div>
  );
};
