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
import { MailingList } from "../../components/service-finder-mailing-list/service-finder-mailing-list";

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
      <main id="mainContent">
        <LearningSearch />
        <LearningTicks />
        <CourseList
          className={styles.courseList}
          viewAllLink="/learning/search"
          viewAllText="View all courses"
          title="Popular courses"
          products={popularCourses}
        />
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
        <CourseList
          viewAllLink="/learning/search"
          viewAllText="View all courses"
          title="Featured courses"
          products={featuredCourses}
        />
        <LearningLevels levels={levels} />
        <BespokeTraining />
        <MailingList
          signUpIdentifier="learning-home"
          description="Sign up to our free newsletter to get emails about our latest Ace Centre Learning courses and other news."
        />
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
  const levels = await getLearningLevels();

  return {
    props: {
      popularCourses: popularCourses.slice(0, 4),
      categories,
      featuredCourses,
      levels,
      seo: {
        title: "Ace Centre Learning",
        description:
          "Our courses focus on the use of Assistive Technology to enable independence, access to education, learning and leisure activities, and communication.",
      },
    },
  };
});
