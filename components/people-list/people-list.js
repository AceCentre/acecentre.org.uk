import styles from "./people-list.module.css";

export const PeopleList = ({ peopleList, renderCardContent }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {peopleList.map((person) => (
          <li key={person.name} className={styles.personCard}>
            {renderCardContent({ person })}
          </li>
        ))}
      </ul>
    </div>
  );
};
