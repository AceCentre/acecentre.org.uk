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
import { TrainingTypes } from "../../components/training-types/training-types";
import { LearningLevelDescriptions } from "../../components/learning-level-descriptions/learning-level-descriptions";

export default function Learning({ categories, featuredCourses }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LearningSearch />
        <LearningTicks />

        <CourseCategoriesGrid
          productCategories={categories}
          overlayColor="rgba(138,217,202,0.2)"
          textBackground="rgba(138,217,202,0.8)"
          textColor="#ffffff"
          objectFit={"contain"}
        />
        <div className={styles.buttonContainer}>
          <Button className={styles.button} href="/learning/search">
            View all courses
          </Button>
        </div>
        <TrainingTypes />
        <CourseList
          viewAllLink="/learning/search"
          viewAllText="View all courses"
          title="Featured courses"
          products={featuredCourses}
        />
        <LearningLevelDescriptions />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const popularCourses = await getAllCoursesByPopularity(true);
  const categories = await getAllCourseCategories();
  const featuredCourses = popularCourses.filter(
    (course) => course.featured === true
  );

  return {
    props: {
      categories,
      featuredCourses,
      seo: {
        title: "Ace Centre Learning",
        description:
          "Our courses focus on the use of Assistive Technology to enable independence, access to education, learning and leisure activities, and communication.",
      },
    },
  };
});
