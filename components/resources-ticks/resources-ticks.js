import styles from "./resources-ticks.module.css";
import CheckIcon from "@material-ui/icons/Check";
import { Avatar } from "@material-ui/core";

export const ResourcesTicks = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <Tick>Over 200 resources</Tick>
        <Tick>Over 200 resources</Tick>
        <Tick>Over 200 resources</Tick>
        <Tick>Over 200 resources</Tick>
        <Tick>Over 200 resources</Tick>
      </ul>
    </div>
  );
};

export const LearningTicks = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <Tick green>Over 100 courses</Tick>
        <Tick green>On-demand and face-to-face</Tick>
        <Tick green>Courses for any learning level</Tick>
        <Tick green>Earn certificates</Tick>
      </ul>
    </div>
  );
};

const Tick = ({ children, green = false }) => {
  return (
    <li className={styles.listItem}>
      <Avatar className={`${styles.avatar} ${green ? styles.greenAvatar : ""}`}>
        <CheckIcon />
      </Avatar>
      {children}
    </li>
  );
};
