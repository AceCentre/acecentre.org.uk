import styles from "./working-at-ace.module.css";

export const WorkingAtAce = () => {
  return (
    <div className={styles.container}>
      <h1>Working at AceCentre</h1>
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
          <p>- Will Wade AAC Consultant</p>
        </div>
      </div>
    </div>
  );
};
