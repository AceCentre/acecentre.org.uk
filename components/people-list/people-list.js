import styles from "./people-list.module.css";

export const PeopleList = ({ peopleList, children }) => {
  // Create a map to track name usage and generate unique keys
  const nameCount = {};
  const generateKey = (person) => {
    const nameKey = `person-${person.name}`;
    if (nameCount[person.name]) {
      // If name is already used, append slug to make it unique
      nameCount[person.name]++;
      return `${nameKey}-${person.slug}`;
    } else {
      // First time seeing this name, use just the name
      nameCount[person.name] = 1;
      return nameKey;
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {peopleList.map((person, index) => (
          <li key={generateKey(person)} className={styles.personCard}>
            {children(person, index)}
          </li>
        ))}
      </ul>
    </div>
  );
};
