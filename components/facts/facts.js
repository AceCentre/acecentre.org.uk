import styles from "./facts.module.css";

import EventNoteIcon from "@material-ui/icons/EventNote";
import { Avatar } from "@material-ui/core";
export const Facts = () => {
  return (
    <div className={styles.container}>
      <Fact number="15" unit="Years">
        <EventNoteIcon className={styles.icon} />
      </Fact>
      <Fact number="34" unit="Research projects">
        <EventNoteIcon className={styles.icon} />
      </Fact>
      <Fact number="1,000" unit="Customers">
        <EventNoteIcon className={styles.icon} />
      </Fact>
      <Fact number="15" unit="Years">
        <EventNoteIcon className={styles.icon} />
      </Fact>
    </div>
  );
};

const Fact = ({ number, unit, children }) => {
  return (
    <div className={styles.fact}>
      <Avatar className={styles.avatar}>{children}</Avatar>
      <div>
        <p className={styles.number}>{number}</p>
        <p className={styles.unit}>{unit}</p>
      </div>
    </div>
  );
};
