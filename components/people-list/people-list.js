import styles from "./people-list.module.css";

export const PeopleList = ({ peopleList, children }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {peopleList.map((person) => (
          <li key={`person-${person.name}`} className={styles.personCard}>
            {children(person)}
          </li>
        ))}
      </ul>
    </div>
  );
};
