import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { BackToLink } from "../components/back-to-link/back-to-link";

import { getAllFullPosts, getFullProjects } from "../lib/posts/get-posts";
import Fuse from "fuse.js";
import { getAllProducts } from "../lib/products/get-products";
import { ResourceList } from "../components/resource-list/resource-list";
import { CourseList } from "../components/course-list/course-list";
import { getAllCourses } from "../lib/products/get-courses";

import styles from "../styles/search.module.css";
import { CommunicationWorksBanner } from "../components/communication-works-banner/communication-works-banner";

export default function Search({
  blogPosts,
  projects,
  products,
  courses,
  searchText,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CommunicationWorksBanner />
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink href="/" where="home" />
        <div className={styles.container}>
          <h1
            className={styles.searchText}
          >{`Results for: "${searchText}"`}</h1>
        </div>
        <div className={styles.resultsContainer}>
          {products.length > 0 && (
            <ResourceList
              title="Resources"
              products={products}
              viewAllLink={`/resources/all?searchText=${searchText}`}
              viewAllText="Search all resources"
            />
          )}
          {blogPosts.length > 0 && (
            <FeaturedPosts
              title="Blog posts"
              smallCards
              posts={blogPosts}
              viewAllLink={`/blog/search?searchText=${searchText}`}
              viewAllText="Search all blog posts"
            />
          )}
          {projects.length > 0 && (
            <FeaturedPosts
              title="Projects"
              smallCards
              posts={projects}
              linkPrefix="projects"
              viewAllLink={`/projects/search?searchText=${searchText}`}
              viewAllText="Search all projects"
            />
          )}
          {courses.length > 0 && (
            <CourseList
              viewAllLink={`/learning/search?searchText=${searchText}`}
              viewAllText="Search all courses"
              title="Ace Centre Learning"
              products={courses}
            />
          )}
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async (req) => {
  const searchText = req.query.searchText || false;

  if (!searchText) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const allPosts = await getAllFullPosts();
  const blogFuse = new Fuse(allPosts, {
    keys: ["content", "title"],
  });
  const blogResults = blogFuse.search(searchText);
  const filteredPosts = blogResults.map((result) => result.item);

  const allProjects = await getFullProjects();
  const projectsFuse = new Fuse(allProjects, { keys: ["content", "title"] });
  const projectsResult = projectsFuse.search(searchText);
  const filteredProjects = projectsResult.map((result) => result.item);

  const allProducts = await getAllProducts();
  const productsFuse = new Fuse(allProducts, {
    keys: ["name", "description", "shortDescription"],
    includeScore: true,
  });
  const productsResult = productsFuse
    .search(searchText)
    .reverse()
    .sort((a, b) => {
      const aName = a.item.name.toLowerCase();
      const bName = b.item.name.toLowerCase();

      if (
        aName.includes(searchText.toLowerCase()) &&
        !bName.includes(searchText.toLowerCase())
      ) {
        return -1;
      }

      if (
        aName.includes(searchText.toLowerCase()) &&
        !bName.includes(searchText.toLowerCase())
      ) {
        return -1;
      }

      return 0;
    });

  const filteredProducts = productsResult.map((result) => result.item);

  const allCourses = await getAllCourses(true);
  const coursesFuse = new Fuse(allCourses, {
    keys: ["name", "description", "shortDescription"],
  });
  const courseResults = coursesFuse.search(searchText);
  const filteredCourses = courseResults.map((result) => result.item);

  return {
    props: {
      blogPosts: filteredPosts.slice(0, 4),
      projects: filteredProjects.slice(0, 4),
      products: filteredProducts
        .map((product) => ({
          title: htmlDecode(product.name),
          mainCategoryName: product.category.name,
          featuredImage: product.image,
          ...product,
        }))
        .slice(0, 4),
      searchText,
      courses: filteredCourses.slice(0, 4),
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
