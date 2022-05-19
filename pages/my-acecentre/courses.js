import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { MyCourseList } from "../../components/course-list/course-list";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
import { getMyCourses } from "../../lib/products/get-courses";
import { PageTitle } from "../../components/page-title/page-title";

import styles from "../../styles/my-acecentre.module.css";

export default function CoursesPage({ courses }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="My courses"
          description="A summary of your courses"
          className={styles.pageTitle}
        />
        <div className={styles.instructions}>
          <p>Click on the course you want to begin</p>
        </div>
        <MyCourseList courses={courses} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const courses = await getMyCourses(req, user);
  const coursesWithLink = courses.map((course) => {
    return {
      ...course,
      href: `/api/moodle?mdl_course_id=${course.moodleCourseId}`,
    };
  });

  return { props: { courses: coursesWithLink } };
});
