import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { BackToLink } from "../components/back-to-link/back-to-link";

import { getAllFullPosts, getFullProjects } from "../lib/posts/get-posts";
import Fuse from "fuse.js";
import { getAllProducts } from "../lib/products/get-products";
import { ResourceList } from "../components/resource-list/resource-list";

import styles from "../styles/search.module.css";

export default function Search({
  blogPosts,
  events,
  projects,
  products,
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

  const blogFuse = new Fuse(blogPostsSource, {
    keys: ["content", "title"],
  });
  const blogResults = blogFuse.search(searchText);
  const filteredPosts = blogResults.map((result) => result.item);

  const eventsFuse = new Fuse(eventsSource, {
    keys: ["content", "title"],
  });
  const eventsResults = eventsFuse.search(searchText);
  const filteredEvents = eventsResults.map((result) => result.item);

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

  return {
    props: {
      blogPosts: filteredPosts.slice(0, 4),
      events: filteredEvents.slice(0, 4),
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
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
