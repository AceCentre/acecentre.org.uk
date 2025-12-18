import { BackToLink } from "../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import Fuse from "fuse.js";

export default function SearchBlog({ allPosts, searchText }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink href="/blog" where="blog" />

        <FeaturedPosts
          title={`Results for: "${searchText}"`}
          posts={allPosts}
        />
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async (req) => {
  const allPosts = await getAllFullPosts();
  const nonEventPosts = allPosts.filter(
    (p) => !p?.categories?.some((c) => c?.slug === "events")
  );
  const searchText = req.query.searchText || false;

  if (!searchText) {
    return {
      redirect: {
        destination: "/blog",
        permanent: false,
      },
    };
  }

  const fuse = new Fuse(nonEventPosts, { keys: ["content", "title"] });
  const results = fuse.search(searchText);
  const filteredPosts = results.map((result) => result.item);

  return {
    props: {
      allPosts: filteredPosts,
      searchText,
      seo: {
        title: "Blog",
        description:
          "Keep up to date with news on what we're up to and how you can get involved",
      },
    },
  };
};
