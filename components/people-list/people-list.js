import styles from "./people-list.module.css";

export const PeopleList = ({ peopleList, children }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {peopleList.map((person, index) => (
          <li key={`person-${person.name}`} className={styles.personCard}>
            {children(person, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};
