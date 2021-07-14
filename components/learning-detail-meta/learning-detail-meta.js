import { Avatar } from "@material-ui/core";
import styles from "./learning-detail-meta.module.css";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import EventIcon from "@material-ui/icons/Event";
import LanguageIcon from "@material-ui/icons/Language";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import CategoryIcon from "@material-ui/icons/Category";
import ClassIcon from "@material-ui/icons/Class";
import Link from "next/link";

export const LearningDetailMeta = ({ course }) => {
  return (
    <div className={styles.container}>
      {course.location && (
        <MetaItem
          heading={course.location.title}
          subheading={course.location.tagline}
          type="Location"
        >
          {course.location.title === "Online course" ? (
            <LanguageIcon className={styles.icon} />
          ) : (
            <HomeWorkIcon className={styles.icon} />
          )}
        </MetaItem>
      )}
      {course.date && (
        <MetaItem
          heading={course.date.title}
          subheading={course.date.tagline}
          type="Start Date"
        >
          <EventIcon className={styles.icon} />
        </MetaItem>
      )}
      {course.level && (
        <MetaItem
          heading="Access"
          subheading="Some text about access"
          type="Course type"
        >
          <CategoryIcon className={styles.icon} />
        </MetaItem>
      )}
      {course.level && (
        <MetaItem
          heading={course.level}
          subheading="Learn about course learning levels"
          href="/learning#levels"
          type="Course level"
        >
          <ClassIcon className={styles.icon} />
        </MetaItem>
      )}
    </div>
  );
};

const MetaItem = ({ children, heading, subheading, type, href }) => {
  return (
    <div className={styles.metaItem}>
      <p className={styles.type}>{type}</p>
      <div className={styles.avatarContainer}>
        <Avatar className={styles.avatar}>{children}</Avatar>
        <div>
          <p className={styles.heading}>{heading}</p>
          {href ? (
            <Link href={href}>
              <a className={styles.link}>{subheading}</a>
            </Link>
          ) : (
            <p className={styles.subheading}>{subheading}</p>
          )}
        </div>
      </div>
    </div>
  );
};
