import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { BackToLink } from "../components/back-to-link/back-to-link";

import { getAllFullPosts } from "../lib/posts/get-posts";
import Fuse from "fuse.js";

export default function Search({ posts }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink href="/" where="home" />
        <FeaturedPosts posts={posts} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalProps(async (req) => {
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
  const fuse = new Fuse(allPosts, { keys: ["content", "title"] });
  const results = fuse.search(searchText);
  const filteredPosts = results.map((result) => result.item);

  return { props: { posts: filteredPosts, searchText } };
});
