import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { ProjectsSearch } from "../../components/projects-search/projects-search";
import { ResearchCta } from "../../components/research-cta/research-cta";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllProjects } from "../../lib/posts/get-posts";

import styles from "../../styles/projects.module.css";

export default function Home({ latestProjects }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <ProjectsSearch />
        <FeaturedPosts
          className={styles.container}
          title="Latest projects"
          viewAllLink="/projects/all"
          posts={latestProjects}
          linkPrefix="projects"
        />
        <ResearchCta />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const latestProjects = await getAllProjects();

  if (!latestProjects) throw new Error("Could not get the latest projects");

  return {
    props: {
      latestProjects: latestProjects.slice(0, 3),
      seo: {
        title: "Projects",
        description:
          "Ace Centre works with companies, universities and other charities to investigate issues, trial new products and find solutions for individuals.",
      },
    },
  };
});
