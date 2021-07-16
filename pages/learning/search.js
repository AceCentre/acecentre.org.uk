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

import { uniqBy, uniq } from "lodash";

export default function LearningSearchPage({
  courses,
  categories,
  levels,
  types,
  selectedType,
  selectedCategory,
  selectedLevel,
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
          selectedLevel={selectedLevel}
          selectedType={selectedType}
          allCategories={categories}
          allLevels={levels}
          allTypes={types}
        />
        <CourseList products={courses} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async (req) => {
  let courses = await getAllCourses();

  /**
   * Get all unique categories
   */
  const categories = uniqBy(
    courses.map((course) => course.mainCategory),
    "name"
  );

  /**
   * Get all unique levels
   */
  const levels = uniq(courses.map((x) => x.level).filter((x) => x != null));

  /**
   * All unique course types
   */
  const types = ["On-demand", "Scheduled"];

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

  /**
   * Filter by level
   */
  const selectedLevel = req.query.level || null;
  if (selectedLevel) {
    courses = courses
      .filter((course) => course.level !== null)
      .filter(
        (course) => course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
  }

  /**
   * Filter by type
   */
  const selectedType = req.query.type || null;
  if (selectedType.toLowerCase() === "On-demand".toLowerCase()) {
    courses = courses.filter((course) => course.date.type === "On-demand");
  } else if (selectedType.toLowerCase() == "Scheduled".toLowerCase()) {
    courses = courses.filter((course) => course.date.type === "Scheduled");
  }

  return {
    props: {
      courses,
      categories,
      selectedCategory,
      selectedLevel,
      selectedType,
      levels,
      types,
    },
  };
});
