import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllCourses } from "../../lib/products/get-courses";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import styles from "../../styles/learning-detail.module.css";
import { LearningDetailBox } from "../../components/learning-detail-box/learning-detail-box";

export default function LearningDetail({ course }) {
  const { currentYear } = useGlobalProps();

  console.log(course);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink href="/learning" where="courses" />
        <div className={styles.container}>
          <h2 className={styles.courseTitle}>{course.name}</h2>
        </div>
        <LearningDetailBox course={course} />
        <div className={styles.contentBody}>
          <div dangerouslySetInnerHTML={{ __html: course.content }} />
          <div></div>
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allCourses = await getAllCourses();

  if (!allCourses) throw new Error("Could not get all the courses");

  return {
    paths: allCourses.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const allCourses = await getAllCourses();

  if (!allCourses) throw new Error("Could not get all the courses");

  const currentCourse = allCourses.find((product) => product.slug === slug);

  return {
    props: {
      course: currentCourse,
    },
  };
});
