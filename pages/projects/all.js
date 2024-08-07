import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { getAllProjects } from "../../lib/posts/get-posts";

export default function AllProjects({ allProjects }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink href="/projects" where="projects" />
        <FeaturedPosts
          linkPrefix="projects"
          title="All projects"
          posts={allProjects}
        />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const allProjects = await getAllProjects();
  if (!allProjects) throw new Error("Could not get the latest projects");

  return {
    revalidate: 60,
    props: {
      allProjects,
      seo: {
        title: "Projects",
        description:
          "Ace Centre works with companies, universities and other charities to investigate issues, trial new products and find solutions for individuals.",
      },
    },
  };
};
