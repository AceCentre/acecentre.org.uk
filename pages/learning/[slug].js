import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import {
  getAllCourses,
  getRandomReviews,
} from "../../lib/products/get-courses";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import styles from "../../styles/learning-detail.module.css";
import { LearningDetailBox } from "../../components/learning-detail-box/learning-detail-box";
import { LearningDetailMeta } from "../../components/learning-detail-meta/learning-detail-meta";

import { LearningReviews } from "../../components/learning-reviews/learning-reviews";

export default function LearningDetail({ course, reviews }) {
  const { currentYear } = useGlobalProps();

  console.log(reviews);

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
          <div>
            <div dangerouslySetInnerHTML={{ __html: course.content }} />
            <LearningReviews reviews={reviews} />
          </div>
          <LearningDetailMeta course={course} />
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

  const reviews = await getRandomReviews();

  return {
    props: {
      course: currentCourse,
      reviews,
    },
  };
});
