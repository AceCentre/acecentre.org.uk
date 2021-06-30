import Link from "next/link";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllProjects } from "../../lib/posts/get-posts";

import styles from "../../styles/index.module.css";

export default function AllProjects({ allProjects }) {
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
          linkPrefix="projects"
          title="All projects"
          posts={allProjects}
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allProjects = await getAllProjects();
  if (!allProjects) throw new Error("Could not get the latest projects");

  return { props: { allProjects } };
});
