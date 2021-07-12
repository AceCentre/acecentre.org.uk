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

export default function Learning({ popularCourses, categories }) {
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
        <CourseCategoriesGrid productCategories={categories} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const popularCourses = await getAllCoursesByPopularity();
  const categories = await getAllCourseCategories();

  return { props: { popularCourses: popularCourses.slice(0, 4), categories } };
});
