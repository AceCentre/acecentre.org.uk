import { FeaturedPosts } from "../../../components/featured-posts/featured-posts";
import { Footer } from "../../../components/footer/footer";
import { PageTitle } from "../../../components/page-title/page-title";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { getAllCategories } from "../../../lib/posts/get-categories";
import { getAllPostsForCategory } from "../../../lib/posts/get-posts";
import styles from "../../../styles/index.module.css";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { useRouter } from "next/router";

export default function CategoryPage({ posts, category }) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle description={category.title} heading="Ace Centre blog" />
        <p className={styles.container}>{posts.length} articles</p>
        <FeaturedPosts posts={posts} />
      </main>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const blogCategories = await getAllCategories();

  if (!blogCategories) throw new Error("Couldn't get categories");

  return {
    paths: blogCategories.map((category) => ({
      params: { slug: category.slug },
    })),
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const blogCategories = await getAllCategories();
  if (!blogCategories) throw new Error("Couldn't get categories");

  const currentCategory = blogCategories.find(
    (category) => category.slug === slug
  );

  if (!currentCategory) return { notFound: true };

  const posts = await getAllPostsForCategory(currentCategory.title);

  return {
    revalidate: 60,
    props: {
      category: currentCategory,
      posts,
      seo: {
        title: `${currentCategory.title} on the Blog`,
        description:
          "Keep up to date with news on what we're up to and how you can get involved",
      },
    },
  };
};
