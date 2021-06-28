import styles from "./jobs-and-people.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";

export const JobsAndPeople = () => {
  return (
    <div className={styles.container}>
      <div className={styles.jobImage}>
        <Image
          src="/job-opportunities.jpeg"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="Staff member on taking a phone call"
        />
        <div className={styles.blueBackground}></div>
      </div>
      <div className={styles.jobDescription}>
        <h2>Job opportunities</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="https://indeed.co.uk">View jobs on indeed.co.uk</Button>
        </div>
      </div>
      <div className={styles.peopleImage}>
        <Image
          src="/meet-our-people.jpeg"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          alt="Two staff members standing having a conversation"
        />
        <div className={styles.blueBackground}></div>
      </div>
      <div className={styles.peopleDescription}>
        <h2>Meet the team</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          gravida rutrum mattis. Aenean tincidunt neque id turpis viverra
          pellentesque.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="/about/staff">Meet the team</Button>
        </div>
      </div>
    </div>
  );
};
