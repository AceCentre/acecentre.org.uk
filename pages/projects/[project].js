import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getFullProjects } from "../../lib/posts/get-posts";

import styles from "../../styles/project-detail.module.css";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { BlogMeta } from "../../components/blog-meta/blog-meta";

export default function CategoryPage({ currentProject, featuredProjects }) {
  const { currentYear } = useGlobalProps();

  const publishedDate = new Date(currentProject.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink href="/projects" where="projects" />
        <PageTitle
          heading="From Ace Centre projects"
          description={currentProject.title}
          className={styles.pageTitle}
        />
        <BlogMeta
          date={formattedDate}
          shareText="Checkout out this project from Ace Centre"
          shareCta="Share this project"
        />
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
    // Currently this is ignored by Netlify so we have to use `notFound`
    // Ref: https://github.com/netlify/netlify-plugin-nextjs/issues/1179
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

    if (!currentProject) {
      return { notFound: true };
    }

    const featuredProjects = allProjects.filter(
      (project) => project.slug !== currentProject.slug
    );

    return {
      props: {
        currentProject,
        featuredProjects: featuredProjects.slice(0, 3),
        seo: {
          title: currentProject.title,
          description: currentProject.description,
          image: currentProject.featuredImage,
        },
      },
    };
  }
);
