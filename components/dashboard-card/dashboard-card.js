import Link from "next/link";
import styles from "./dashboard-card.module.css";

const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export const DashboardCard = ({
  title = "My courses",
  count,
  description = LOREM_IPSUM,
  linkText = "View your courses",
  linkUrl = "https://example.com",
}) => {
  const countAsInt = parseInt(count);

  return (
    <div className={styles.card}>
      <div className={styles.titleRow}>
        <h2 className={styles.title}>{title}</h2>
        {countAsInt > 0 && <div className={styles.count}>{count}</div>}
      </div>
      <p className={styles.description}>{description}</p>
      <Link href={linkUrl}>
        <a className={styles.link}>{linkText} &gt;</a>
      </Link>
    </div>
  );
};
