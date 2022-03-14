import styles from "./resources-ticks.module.css";
import CheckIcon from "@material-ui/icons/Check";
import Avatar from "@material-ui/core/Avatar";

export const ResourcesTicks = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <Tick>Over 100 resources</Tick>
        <Tick>Created by industry experts</Tick>
        <Tick>For beginners to experts</Tick>
        <Tick>Download instantly</Tick>
      </ul>
    </div>
  );
};

export const LearningTicks = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <Tick green>Over 100 courses run</Tick>
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
