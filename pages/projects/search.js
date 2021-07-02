import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getFullProjects } from "../../lib/posts/get-posts";
import Fuse from "fuse.js";
import { BackToLink } from "../../components/back-to-link/back-to-link";

export default function SearchProjects({ allProjects, searchText = "" }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink href="/projects" where="projects" />
        <FeaturedPosts
          title={`Results for: "${searchText}"`}
          posts={allProjects}
          linkPrefix="projects"
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async (req) => {
  const allProjects = await getFullProjects();

  const searchText = req.query.searchText || false;

  if (!searchText) {
    return {
      redirect: {
        destination: "/projects",
        permanent: false,
      },
    };
  }

  if (!allProjects) throw new Error("Could not get all the projects");

  const fuse = new Fuse(allProjects, { keys: ["content", "title"] });
  const results = fuse.search(searchText);
  const filteredProjects = results.map((result) => result.item);

  return { props: { allProjects: filteredProjects, searchText } };
});
