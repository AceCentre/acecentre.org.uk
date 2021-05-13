import Link from "next/link";

import styles from "./story-highlight.module.css";

export const StoryHighlight = () => {
  return (
    <div className={styles.container}>
      <h2>Words from Lisa</h2>
      <div className={styles.innerContainer}>
        <div>
          <img
            alt="placeholder"
            width="100%"
            height="100%"
            src="/placeholder.jpeg"
          />
        </div>
        <div>
          <p>
            &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque gravida rutrum mattis. Aenean tincidunt neque id turpis
            viverra pellentesque.&quot;
          </p>
          <p>- Lisa</p>
          <Link href="/stories/lisa">
            <a>Read her story</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
