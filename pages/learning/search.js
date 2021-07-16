import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { CourseFilter } from "../../components/course-filter/course-filter";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { CourseList } from "../../components/course-list/course-list";
import { getAllCourses } from "../../lib/products/get-courses";

import Fuse from "fuse.js";

import { uniqBy } from "lodash";

export default function LearningSearchPage({
  courses,
  categories,
  selectedCategory,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink where="Ace Centre Learning" href="/learning" />
        <CourseFilter
          selectedCategory={selectedCategory}
          allCategories={categories}
        />
        <CourseList products={courses} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async (req) => {
  let courses = await getAllCourses();
  const categories = uniqBy(
    courses.map((course) => course.mainCategory),
    "name"
  );

  /**
   * Free text search
   */
  const searchText = req.query.searchText || null;
  if (searchText) {
    const fuse = new Fuse(courses, {
      keys: ["name", "description", "shortDescription"],
    });
    const result = fuse.search(searchText);
    courses = result.map((x) => x.item);
  }

  /**
   * Filter by category
   */
  const selectedCategory = req.query.category || null;
  if (selectedCategory) {
    courses = courses.filter((course) => {
      return (
        course.mainCategory.name.toLowerCase() ===
        selectedCategory.toLowerCase()
      );
    });
  }

  return { props: { courses, categories, selectedCategory } };
});
