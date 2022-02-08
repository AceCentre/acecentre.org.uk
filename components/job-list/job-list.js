import Link from "next/link";
import styles from "./job-list.module.css";

export const JobList = ({ allJobs }) => {
  if (!allJobs || allJobs.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2>Current vacancies</h2>
      <div className={styles.cardList}>
        {allJobs.map((job, index) => (
          <JobCard key={`job-${index}`} job={job} />
        ))}
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  const locationLink = job.location.toLowerCase().includes("north")
    ? "/contact/oldham"
    : "/contact/abingdon";

  return (
    <div className={styles.card}>
      <h3>{job.title}</h3>
      <div>
        <p>
          <strong>Salary: </strong>
          {job.salary}
        </p>
        <p>
          <strong>Contract: </strong>
          {job.contract}
        </p>
        <p>
          <strong>Working Pattern: </strong>
          {job.workingPattern}
        </p>
        <p>
          <strong>Location: </strong>
          <Link href={locationLink}>{job.location}</Link>
        </p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
      <Link href={job.applyAt}>Apply for this job &gt;</Link>
    </div>
  );
};
