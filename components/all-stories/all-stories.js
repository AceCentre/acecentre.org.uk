import Link from "next/link";
import { Image } from "../image";
import styles from "./all-stories.module.css";

export const AllStories = ({ stories }) => {
  return (
    <div className={styles.container}>
      <h2>More Stories</h2>
      <Link href="/stories/all">View all</Link>
      <ul className={styles.list}>
        {stories.map((story) => (
          <li key={story.slug}>
            <Link href={`/stories/${story.slug}`}>
              <a>
                {story.image && <Image {...story.image} maxWidth={250} />}
                <p>{story.possessiveName} story</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
