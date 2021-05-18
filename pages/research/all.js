import Link from "next/link";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
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
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <div className={styles.container}>
          <Link href="/research">
            <a>&lt; Back to research</a>
          </Link>
        </div>
        <FeaturedPosts title="All research projects" posts={allProjects} />
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
