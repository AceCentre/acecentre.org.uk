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
          If you are smart, interested in making a difference, and want to work
          with an awesome team and just as amazing technology then get in touch
        </p>
        <div className={styles.buttonContainer}>
          <Button href="https://uk.indeed.com/cmp/Ace-Centre-3">
            View jobs on indeed.co.uk
          </Button>
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
          A multi-disciplinary team of specialist teachers, occupational
          therapists, speech & language therapists with the support of technical
          and administrative staff.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="/about/staff">Meet the team</Button>
        </div>
      </div>
    </div>
  );
};
