import { SearchBox } from "../../components/search-box/search-box";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { GettingStartedGrid } from "../../components/getting-started-grid/getting-started-grid";
import { getAllCourses } from "../../lib/products/get-courses";
import { CourseList } from "../../components/course-list/course-list";
import { AacBooksCta } from "../../components/aac-books-cta/aac-books-cta";
import { GettingStartedFaqs } from "../../components/getting-started-faqs/getting-started-faqs";

import styles from "../../styles/getting-started.module.css";

export default function GettingStartedLanding({ gettingStartedCourses }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <SearchBox
          includeSearch={false}
          title="Getting started with AAC and AT"
          description="Learn about Augmentative and Alternative Communication (AAC) and how it can help"
          backgroundImage="/pink-wave.svg"
          backgroundColor="#F1D1D0"
          textColor="#333333"
        />
        <GettingStartedGrid />
        <AacBooksCta />
        <CourseList
          products={gettingStartedCourses}
          title="Ace Centre Learning Courses to get started"
          viewAllLink="/learning/search?level=introductory"
          className={styles.resourcesList}
        />
        <GettingStartedFaqs />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const courses = await getAllCourses();

  const gettingStartedCourses = courses
    .filter((course) => course.level !== null)
    .filter((course) => course.level.toLowerCase() === "introductory");

  return {
    props: {
      gettingStartedCourses: gettingStartedCourses.slice(0, 4),
      seo: {
        title: "Getting started",
        description:
          "Learn about Augmentative and Alternative Communication (AAC) and how it can help",
      },
    },
  };
});
