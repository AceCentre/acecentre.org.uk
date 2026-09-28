import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { BackToLink } from "../components/back-to-link/back-to-link";
import { ServiceSearchResults } from "../components/service-search-results/service-search-results";

import { getAllFullPosts, getFullProjects } from "../lib/posts/get-posts";
import Fuse from "fuse.js";
import { getAllProducts } from "../lib/products/get-products";
import { ResourceList } from "../components/resource-list/resource-list";
import { searchLearning } from "../lib/search/searchable-learning";
import { searchPages } from "../lib/search/searchable-pages";
import { searchServices } from "../lib/search/searchable-services";
import { POST_SEARCH_OPTIONS } from "../lib/search/post-search-options";
import { PRODUCT_SEARCH_OPTIONS } from "../lib/search/product-search-options";

import styles from "../styles/search.module.css";

export default function Search({
  blogPosts,
  events,
  projects,
  products,
  learning = [],
  services = [],
  pages = [],
  searchText,
}) {
  return (
    <>
      <header>
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
          {services.length > 0 && (
            <ServiceSearchResults
              items={services}
              title="Services"
              subtitle="Services"
              viewAllLink="/services"
              viewAllText="View all services"
              keyPrefix="service-search"
            />
          )}
          {pages.length > 0 && (
            <ServiceSearchResults
              items={pages}
              title="Pages"
              subtitle="Pages"
              viewAllLink="/"
              viewAllText="Go to home"
              keyPrefix="page-search"
            />
          )}
          {learning.length > 0 && (
            <ServiceSearchResults
              items={learning}
              title="Learning"
              subtitle="Learning"
              viewAllLink="/learning"
              viewAllText="View all learning"
              keyPrefix="learning-search"
            />
          )}
          {events.length > 0 && (
            <FeaturedPosts
              title="Events"
              smallCards
              posts={events}
              linkPrefix="events"
              viewAllLink="/events"
              viewAllText="View all events"
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
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (req) => {
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
  const isEventPost = (post) =>
    Array.isArray(post?.categories) &&
    post.categories.some((c) => c?.slug === "events");

  const blogPostsSource = allPosts.filter((p) => !isEventPost(p));
  const eventsSource = allPosts.filter(isEventPost);

  const blogFuse = new Fuse(blogPostsSource, POST_SEARCH_OPTIONS);
  const blogResults = blogFuse.search(searchText);
  const filteredPosts = blogResults.map((result) => result.item);

  const eventsFuse = new Fuse(eventsSource, POST_SEARCH_OPTIONS);
  const eventsResults = eventsFuse.search(searchText);
  const filteredEvents = eventsResults.map((result) => result.item);

  const allProjects = await getFullProjects();
  const projectsFuse = new Fuse(allProjects, POST_SEARCH_OPTIONS);
  const projectsResult = projectsFuse.search(searchText);
  const filteredProjects = projectsResult.map((result) => result.item);

  const allProducts = await getAllProducts();
  const productsFuse = new Fuse(allProducts, PRODUCT_SEARCH_OPTIONS);
  const productsResult = productsFuse
    .search(searchText)
    .reverse()
    .sort((a, b) => {
      const aName = a.item.name.toLowerCase();
      const bName = b.item.name.toLowerCase();
      const query = searchText.toLowerCase();

      if (aName.includes(query) && !bName.includes(query)) {
        return -1;
      }

      if (bName.includes(query) && !aName.includes(query)) {
        return 1;
      }

      return 0;
    });

  const filteredProducts = productsResult.map((result) => result.item);
  const filteredLearning = searchLearning(searchText);
  const filteredServices = searchServices(searchText);
  const filteredPages = searchPages(searchText);

  return {
    props: {
      blogPosts: filteredPosts.slice(0, 4),
      events: filteredEvents.slice(0, 4),
      projects: filteredProjects.slice(0, 4),
      learning: filteredLearning,
      services: filteredServices,
      pages: filteredPages,
      products: filteredProducts
        .map((product) => ({
          title: htmlDecode(product.name),
          mainCategoryName: product.category.name,
          featuredImage: product.image,
          ...product,
        }))
        .slice(0, 4),
      searchText,
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
