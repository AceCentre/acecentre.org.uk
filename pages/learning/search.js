import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { CourseFilter } from "../../components/course-filter/course-filter";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { CourseList } from "../../components/course-list/course-list";
import { getAllCourses, LOCATIONS } from "../../lib/products/get-courses";

import Fuse from "fuse.js";

import { uniqBy, uniq } from "lodash";
import { ORDER_BY_OPTIONS } from "../../components/course-filter/order-by-options";

export default function LearningSearchPage({
  courses,
  categories,
  levels,
  types,
  locations,
  prices,
  orderByOptions,
  selectedLocation,
  selectedType,
  selectedCategory,
  selectedLevel,
  selectedPrice,
  searchText,
  selectedOrderBy,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="Ace Centre Learning" href="/learning" />
        <CourseFilter
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          selectedType={selectedType}
          selectedLocation={selectedLocation}
          selectedPrice={selectedPrice}
          selectedOrderBy={selectedOrderBy}
          allCategories={categories}
          allLevels={levels}
          allTypes={types}
          allLocations={locations}
          allPrices={prices}
          allOrderBy={orderByOptions}
          courseCount={courses.length}
          searchText={searchText}
        />
        <CourseList products={courses} showDate withMeta threeWide />
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
   * All unique course locations
   */
  const locations = Object.values(LOCATIONS);

  /**
   * All unique price ranges
   */
  const prices = [
    {
      slug: "0",
      name: "Free",
      min: 0,
      max: 0.01,
    },
    {
      slug: "<100",
      name: "£0 - 100",
      min: 0.01,
      max: 100,
    },
    {
      slug: ">100",
      name: "£100 +",
      min: 100,
      max: 9999999,
    },
  ];

  /**
   * All unique order by options
   */

  const orderByOptions = ORDER_BY_OPTIONS.map((x) => ({
    slug: x.slug,
    name: x.name,
  }));

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
  if (selectedType) {
    if (selectedType.toLowerCase() === "On-demand".toLowerCase()) {
      courses = courses.filter((course) => course.date.type === "On-demand");
    } else if (selectedType.toLowerCase() == "Scheduled".toLowerCase()) {
      courses = courses.filter((course) => course.date.type === "Scheduled");
    }
  }

  /**
   * Filter by location
   */
  const selectedLocation = req.query.location || null;
  if (selectedLocation) {
    courses = courses.filter(
      (course) =>
        course.location.slug.toLowerCase() === selectedLocation.toLowerCase()
    );
  }

  /**
   * Filter by price
   */
  const selectedPrice = req.query.price || null;
  let currentPriceRangeMeta = null;
  if (selectedPrice) {
    currentPriceRangeMeta = prices.find((x) => x.slug === selectedPrice);
  }
  if (currentPriceRangeMeta) {
    courses = courses.filter(({ price }) => {
      return (
        price >= currentPriceRangeMeta.min && price < currentPriceRangeMeta.max
      );
    });
  }

  /**
   * orderBy => Default to 'first'
   */
  const selectedOrderBy = req.query.orderby || "first";
  const orderByFunction = ORDER_BY_OPTIONS.find(
    (x) => x.slug === selectedOrderBy
  );
  if (orderByFunction) {
    courses = courses.sort(orderByFunction.sort);
  }

  return {
    props: {
      courses,
      categories,
      selectedCategory,
      selectedLevel,
      selectedType,
      selectedLocation,
      selectedPrice,
      selectedOrderBy,
      levels,
      types,
      locations,
      prices,
      orderByOptions,
      searchText,
      seo: {
        title: "Ace Centre Learning",
        description:
          "Our courses focus on the use of Assistive Technology to enable independence, access to education, learning and leisure activities, and communication.",
      },
    },
  };
});
