import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { CourseFilter } from "../../components/course-filter/course-filter";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { CourseList } from "../../components/course-list/course-list";
import { getAllCourses } from "../../lib/products/get-courses";

export default function LearningSearchPage({ courses }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink where="Ace Centre Learning" href="/learning" />
        <CourseFilter />
        <CourseList products={courses} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async () => {
  let courses = await getAllCourses();

  return { props: { courses } };
});
