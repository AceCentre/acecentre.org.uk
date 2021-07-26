import { SearchBox } from "../../components/search-box/search-box";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { GettingStartedGrid } from "../../components/getting-started-grid/getting-started-grid";
import { getAllProducts } from "../../lib/products/get-products";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { filterProducts } from "../../lib/products/filter-products";
import { ResourceList } from "../../components/resource-list/resource-list";
import { getAllCourses } from "../../lib/products/get-courses";
import { CourseList } from "../../components/course-list/course-list";
import { AacBooksCta } from "../../components/aac-books-cta/aac-books-cta";
import { GettingStartedFaqs } from "../../components/getting-started-faqs/getting-started-faqs";

export default function GettingStartedLanding({
  gettingStartedResources,
  gettingStartedCourses,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <SearchBox
          includeSearch={false}
          title="Getting started with AAC and AT"
          description="Learn about Augmentative and Alternative Communication (AAC) and how it can help"
          backgroundImage="/pink-wave.svg"
          backgroundColor="#F1D1D0"
          textColor="#333333"
        />
        <GettingStartedGrid />
        <ResourceList
          title="Resources to get started"
          viewAllLink="/resources/all?category=getting-started"
          products={gettingStartedResources}
        />
        <CourseList
          products={gettingStartedCourses}
          title="Ace Centre Learning Courses to get started"
          viewAllLink="/learning/search?level=introductory"
        />
        <AacBooksCta />
        <GettingStartedFaqs />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const products = await getAllProducts();
  const productCategories = await getAllProductCategories();
  const courses = await getAllCourses();

  const { results: gettingStartedResources } = filterProducts(
    products,
    productCategories,
    {
      page: 0,
      productsPerPage: 1000,
      category: "getting-started",
    }
  );

  const resources = gettingStartedResources.map((product) => ({
    title: htmlDecode(product.name),
    mainCategoryName: product.category.name,
    featuredImage: product.image,
    ...product,
  }));

  const gettingStartedCourses = courses
    .filter((course) => course.level !== null)
    .filter((course) => course.level.toLowerCase() === "introductory");

  return {
    props: {
      gettingStartedResources: resources,
      gettingStartedCourses,
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
