import styles from "./facts.module.css";

import EventNoteIcon from "@mui/icons-material/EventNote";
import AccessibleIcon from "@mui/icons-material/Accessible";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NoteIcon from "@mui/icons-material/Note";
import Avatar from "@mui/material/Avatar";

export const Facts = () => {
  return (
    <div className={styles.container}>
      <Fact number="70+" unit="Partnerships">
        <SupervisorAccountIcon className={styles.icon} />
      </Fact>
      <Fact number="30+" unit="Years">
        <EventNoteIcon className={styles.icon} />
      </Fact>
      <Fact number="3,400+" unit="Referrals">
        <AccessibleIcon className={styles.icon} />
      </Fact>
      <Fact number="100+" unit="Resources">
        <NoteIcon className={styles.icon} />
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
