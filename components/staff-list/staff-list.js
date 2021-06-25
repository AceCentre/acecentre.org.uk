import { PeopleList } from "../people-list/people-list";
import styles from "./staff-list.module.css";

import { CropToSquareAroundFace } from "../image";

export const StaffList = ({ staffList }) => {
  return <PeopleList peopleList={staffList} renderCardContent={StaffCard} />;
};

const LOCATION_MAP = {
  oldham: "North office",
  abingdon: "South office",
};

const StaffCard = ({ person }) => {
  const location = LOCATION_MAP[person.location.trim().toLowerCase()];

  if (!location) throw new Error("Could get a location for", person);

  return (
    <button
      className={styles.staffButton}
      onClick={() => console.log("clicked", person)}
    >
      <div className={styles.imageContainer}>
        <CropToSquareAroundFace
          alt={`Head shot of ${person.name}`}
          width={200}
          height={200}
          src={person.image.src}
          className={styles.image}
        />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.personName}>{person.name}</p>
        <p className={styles.job}>{person.role.trim()}</p>
        <div className={styles.locationContainer}>
          <span className={styles.location}>{location}</span>
        </div>
      </div>
    </button>
  );
};
