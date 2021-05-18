import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { ProjectsSearch } from "../../components/projects-search/projects-search";
import { ResearchCta } from "../../components/research-cta/research-cta";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllProjects } from "../../lib/posts/get-posts";

export default function Home({ latestProjects }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <ProjectsSearch />
        <FeaturedPosts
          title="Latest projects"
          viewAllLink="/research/all"
          posts={latestProjects}
          linkPrefix="research"
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

  return { props: { latestProjects: latestProjects.slice(0, 8) } };
});
