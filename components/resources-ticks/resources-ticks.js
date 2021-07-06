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

const Tick = ({ children }) => {
  return (
    <li className={styles.listItem}>
      <Avatar className={styles.avatar}>
        <CheckIcon className={styles.checkIcon} />
      </Avatar>
      {children}
    </li>
  );
};
