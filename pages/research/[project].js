import Link from "next/link";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getFullProjects } from "../../lib/posts/get-posts";
import { readFromStaticCache } from "../../lib/static-caching/read";
import { writeToStaticCache } from "../../lib/static-caching/write";
import redis from "../../lib/static-caching/redis";

import styles from "../../styles/index.module.css";

export default function CategoryPage({ currentProject, featuredProjects }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  const publishedDate = new Date(currentProject.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <div className={styles.container}>
          <Link href="/research">
            <a>&lt; Back to projects</a>
          </Link>
        </div>
        <PageTitle
          heading="From the AceCentre projects"
          description={currentProject.title}
        />
        <div className={styles.container}>
          <p>
            <i>{formattedDate}</i>
          </p>
        </div>
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: currentProject.content }}
        ></div>
        <FeaturedPosts
          title="You might also be interested in"
          posts={featuredProjects}
          linkPrefix="research"
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const CACHE_KEY = "ALL_FULL_PROJECTS";

export async function getStaticPaths() {
  const allProjects = await getFullProjects();

  if (!allProjects) throw new Error("Could not get all the projects");

  await writeToStaticCache(CACHE_KEY, allProjects, redis);

  return {
    paths: allProjects.map((project) => ({
      params: { project: project.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(
  async ({ params: { project: projectSlug } }) => {
    const allProjects = await readFromStaticCache(CACHE_KEY);
    const currentProject = allProjects.find(
      (project) => project.slug === projectSlug
    );

    const featuredProjects = allProjects.filter(
      (project) => project.slug !== currentProject.slug
    );

    return {
      props: {
        currentProject,
        featuredProjects: featuredProjects.slice(0, 4),
      },
    };
  }
);
