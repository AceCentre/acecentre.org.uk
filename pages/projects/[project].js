import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getFullProjects } from "../../lib/posts/get-posts";

import styles from "../../styles/project-detail.module.css";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { BlogMeta } from "../../components/blog-meta/blog-meta";

export default function CategoryPage({ currentProject, featuredProjects }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  const publishedDate = new Date(currentProject.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink href="/projects" where="projects" />
        <PageTitle
          heading="From Ace Centre projects"
          description={currentProject.title}
          className={styles.pageTitle}
        />
        <BlogMeta date={formattedDate} shareCta="Share this project" />
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: currentProject.content }}
        ></div>
        <FeaturedPosts
          title="More projects"
          posts={featuredProjects}
          linkPrefix="projects"
          viewAllText="View all projects"
          viewAllLink="/projects/all"
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allProjects = await getFullProjects();

  if (!allProjects) throw new Error("Could not get all the projects");

  return {
    paths: allProjects.map((project) => ({
      params: { project: project.slug },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(
  async ({ params: { project: projectSlug } }) => {
    const allProjects = await getFullProjects();

    if (!allProjects) throw new Error("Could not get all the projects");

    const currentProject = allProjects.find(
      (project) => project.slug === projectSlug
    );

    const featuredProjects = allProjects.filter(
      (project) => project.slug !== currentProject.slug
    );

    return {
      props: {
        currentProject,
        featuredProjects: featuredProjects.slice(0, 3),
      },
    };
  }
);
