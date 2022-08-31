import { Avatar } from "@material-ui/core";
import Link from "next/link";
import styles from "./learning-level-descriptions.module.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const LearningLevelDescriptions = () => {
  return (
    <div className={styles.container}>
      <h2>Ace Centre Learning Levels</h2>
      <div className={styles.levelsContainer}>
        <div className={styles.level}>
          <h3>Introductory</h3>
          <ul>
            <ListItem>What&apos;s possible with Assistive Technology</ListItem>
            <ListItem>What equipment is available</ListItem>
            <ListItem>
              Case studies to illustrate the resources and its implementation.
            </ListItem>
          </ul>
          <Link href="/learning/search?level=introductory">
            View introductory courses &gt;
          </Link>
        </div>
        <div className={styles.level}>
          <h3>Developing</h3>
          <ul>
            <ListItem>
              The what, why and how to use Assistive Technology
            </ListItem>
            <ListItem>Knowledge about assessment and implementation</ListItem>
            <ListItem>Information of strategies and resources</ListItem>
          </ul>
          <Link href="/learning/search?level=developing">
            View developing courses &gt;
          </Link>
        </div>

        <div className={styles.level}>
          <h3>Enhanced</h3>
          <ul>
            <ListItem>Developing reflective practice</ListItem>
            <ListItem>
              Evidence knowledge and skills supporting individuals who use AT
            </ListItem>
            <ListItem>Interdisciplinary requirements of ATs</ListItem>
          </ul>
          <Link href="/learning/search?level=enhanced">
            View enhanced courses &gt;
          </Link>
        </div>

        <div className={styles.level}>
          <h3>Specialist</h3>
          <ul>
            <ListItem>Develop interdisciplinary expertise</ListItem>
            <ListItem>Reflective practice to support others</ListItem>
            <ListItem>
              Explore opportunities for consultation, collaboration and coaching
            </ListItem>
          </ul>
          <Link href="/learning/search?level=specialist">
            View specialist courses &gt;
          </Link>
        </div>
      </div>
    </div>
  );
};

const ListItem = ({ children }) => {
  return (
    <li className={styles.listItem}>
      <Avatar className={styles.listAvatar}>
        <ChevronRightIcon />
      </Avatar>
      {children}
    </li>
  );
};
