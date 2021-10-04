import { FeaturedPosts } from "../../../components/featured-posts/featured-posts";
import { Footer } from "../../../components/footer/footer";
import { PageTitle } from "../../../components/page-title/page-title";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";
import { getAllCategories } from "../../../lib/posts/get-categories";
import { getAllPostsForCategory } from "../../../lib/posts/get-posts";
import styles from "../../../styles/index.module.css";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";

export default function CategoryPage({ posts, category }) {
  const { currentYear } = useGlobalProps();

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

      <Footer currentYear={currentYear} />
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
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const blogCategories = await getAllCategories();
  if (!blogCategories) throw new Error("Couldn't get categories");

  const currentCategory = blogCategories.find(
    (category) => category.slug === slug
  );

  const posts = await getAllPostsForCategory(currentCategory.title);

  return {
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
});
