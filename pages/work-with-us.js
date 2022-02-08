import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { JobList } from "../components/job-list/job-list";
import { JobsAndPeople } from "../components/jobs-and-people/jobs-and-people";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { WhyWorkAtAce } from "../components/why-work-at-ace/why-work-at-ace";
import { WorkingAtAce } from "../components/working-at-ace/working-at-ace";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { getAllJobs } from "../lib/jobs";

import styles from "../styles/work-with-us.module.css";

export default function Careers({ allJobs }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/careers-cover.jpeg"
          alt="A person using an AAC device"
          imageClassName={styles.coverImage}
        >
          <h1>Work with us</h1>
          <p>
            Do you enjoy supporting people with complex communication
            difficulties? <strong>Then join us now.</strong>
          </p>
        </VideoWithCardCover>
        <WorkingAtAce />
        <JobList allJobs={allJobs} />
        <WhyWorkAtAce />
        <JobsAndPeople />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allJobs = await getAllJobs();

  return {
    props: {
      allJobs,
      seo: {
        title: "Work with us",
        description: "The latest vacancies and jobs available at Ace Centre",
      },
    },
  };
});
