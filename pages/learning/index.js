import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LearningSearch } from "../../components/learning-search/learning-search";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { LearningTicks } from "../../components/resources-ticks/resources-ticks";
import { getAllCoursesByPopularity } from "../../lib/products/get-courses";
import { CourseList } from "../../components/course-list/course-list";
import { getAllCourseCategories } from "../../lib/products/get-all-categories";
import { CourseCategoriesGrid } from "../../components/course-categories-grid/course-categories-grid";

import styles from "../../styles/resources.module.css";
import { Button } from "../../components/button/button";
import { LearningLevels } from "../../components/learning-levels/learning-levels";
import { getLearningLevels } from "../../lib/products/get-learning-levels";
import { BespokeTraining } from "../../components/bespoke-training/bespoke-training";

export default function Learning({
  popularCourses,
  categories,
  featuredCourses,
  levels,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <LearningSearch />
        <LearningTicks />
        <CourseList title="Popular courses" products={popularCourses} />
        <CourseCategoriesGrid
          productCategories={categories}
          overlayColor="rgba(138,217,202,0.2)"
          textBackground="rgba(138,217,202,0.8)"
          textColor="#ffffff"
        />
        <div className={styles.buttonContainer}>
          <Button className={styles.button} href="/learning/search">
            View all courses
          </Button>
        </div>
        <CourseList title="Featured courses" products={featuredCourses} />
        <LearningLevels levels={levels} />
        <BespokeTraining />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const popularCourses = await getAllCoursesByPopularity();
  const categories = await getAllCourseCategories();
  const featuredCourses = popularCourses.filter(
    (course) => course.featured === true
  );
  const levels = await getLearningLevels();

  return {
    props: {
      popularCourses: popularCourses.slice(0, 4),
      categories,
      featuredCourses,
      levels,
    },
  };
});
