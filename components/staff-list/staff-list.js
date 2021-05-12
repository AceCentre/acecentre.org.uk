import styles from "./staff-list.module.css";

export const StaffList = ({ staffList }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {staffList.map((staffMember) => (
          <StaffCard key={staffMember.name} staffMember={staffMember} />
        ))}
      </ul>
    </div>
  );
};

const StaffCard = ({ staffMember }) => {
  return (
    <li className={styles.staffCard}>
      <p>{staffMember.name}</p>
    </li>
  );
};
