import styles from "./recruit-trustees.module.css";
import PeopleIcon from "@material-ui/icons/People";
export const RecruitTrustees = () => {
  return (
    <div className={styles.container}>
      <PeopleIcon className={styles.icon} />
      <div className={styles.textSide}>
        <h2>Become a trustee</h2>
        <p>
          An opportunity to join the Board of Trustees of a rapidly expanding
          national charity providing assessment, advice, information and
          training services for people needing Assistive Technology, their
          families and professionals who support them.
        </p>
        <a href="https://reachvolunteering.org.uk/opp/trustee-health-management-experience-join-board-communication-disability-charity?utm_source=notification&utm_medium=email&utm_campaign=new-role-m">
          Find out more &gt;
        </a>
      </div>
    </div>
  );
};
