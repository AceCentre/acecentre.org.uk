import Link from "next/link";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import {
  getAllFullPosts,
  getAllPostsForCategory,
} from "../../lib/posts/get-posts";
import { readFromStaticCache } from "../../lib/static-caching/read";
import { writeToStaticCache } from "../../lib/static-caching/write";
import styles from "../../styles/index.module.css";

export default function CategoryPage({ currentPost, featuredPosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  const publishedDate = new Date(currentPost.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <div className={styles.container}>
          <Link href={`/blog/category/${currentPost.featuredCategorySlug}`}>
            <a>&lt; Back to {currentPost.featuredCategoryName}</a>
          </Link>
        </div>
        <PageTitle
          heading="From the AceCentre blog"
          description={currentPost.title}
        />
        <div className={styles.container}>
          <p>
            <i>{formattedDate}</i>
          </p>
        </div>
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

  await writeToStaticCache(cacheKey, allPosts);

  return {
    paths: allPosts.map((post) => ({ params: { post: post.slug } })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(
  async ({ params: { post: postSlug } }) => {
    const allPosts = await readFromStaticCache(cacheKey);
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
