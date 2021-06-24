import styles from "./meet-our-people.module.css";

export const MeetOurPeople = () => {
  return (
    <div className={styles.container}>
      <h2>Meet our team</h2>
      <div className={styles.innerContainer}>
        <div>
          <img
            alt="placeholder"
            width="100%"
            height="100%"
            src="/placeholder.jpeg"
          />
        </div>
        <div>
          <p>
            &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque gravida rutrum mattis. Aenean tincidunt neque id turpis
            viverra pellentesque.&quot;
          </p>
          <p>- Anna Reeves DL CEO</p>
        </div>
      </div>
    </div>
  );
};
