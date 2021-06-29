import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import {
  getAllFullPosts,
  getAllPostsForCategory,
} from "../../lib/posts/get-posts";
import { readFromStaticCache } from "../../lib/static-caching/read";
import { writeToStaticCache } from "../../lib/static-caching/write";
import styles from "../../styles/blog-post.module.css";
import redis from "../../lib/static-caching/redis";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { BlogMeta } from "../../components/blog-meta/blog-meta";

export default function CategoryPage({ currentPost, featuredPosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  const publishedDate = new Date(currentPost.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink
          href={`/blog/category/${currentPost.featuredCategorySlug}`}
          where={currentPost.featuredCategoryName.toLowerCase()}
        />
        <PageTitle
          heading="Ace Centre blog"
          description={currentPost.title}
          className={styles.pageTitle}
        />
        <BlogMeta date={formattedDate} />

        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        ></div>
        <FeaturedPosts
          title={`More from ${currentPost.featuredCategoryName}`}
          posts={featuredPosts}
        />
      </main>

      <Footer currentYear={currentYear} />
    </>
  );
}

const cacheKey = "ALL_FULL_POSTS";

export async function getStaticPaths() {
  const allPosts = await getAllFullPosts();

  await writeToStaticCache(cacheKey, allPosts, redis);

  return {
    paths: allPosts.map((post) => ({ params: { post: post.slug } })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(
  async ({ params: { post: postSlug } }) => {
    const allPosts = await readFromStaticCache(cacheKey, redis);
    const currentPost = allPosts.find((post) => post.slug === postSlug);

    const featuredPosts = (
      await getAllPostsForCategory(currentPost.featuredCategoryName)
    ).filter((post) => post.slug !== currentPost.slug);

    return {
      props: {
        currentPost,
        featuredPosts: featuredPosts.slice(0, 3),
      },
    };
  }
);
