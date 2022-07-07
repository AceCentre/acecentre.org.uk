import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import {
  getAllFullPosts,
  getAllPostsForCategory,
} from "../../lib/posts/get-posts";
import styles from "../../styles/blog-post.module.css";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { BlogMeta } from "../../components/blog-meta/blog-meta";

export default function CategoryPage({ currentPost, featuredPosts }) {
  const { currentYear } = useGlobalProps();

  const publishedDate = new Date(currentPost.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
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
          className={styles.contentContainer}
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        ></div>
        <FeaturedPosts
          title={`More from ${currentPost.featuredCategoryName}`}
          posts={featuredPosts}
          viewAllLink={`/blog/category/${currentPost.featuredCategorySlug}`}
        />
      </main>

      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllFullPosts();

  return {
    paths: allPosts.map((post) => ({ params: { post: post.slug } })),
    // Currently this is ignored by Netlify so we have to use `notFound`
    // Ref: https://github.com/netlify/netlify-plugin-nextjs/issues/1179
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(
  async ({ params: { post: postSlug } }) => {
    const allPosts = await getAllFullPosts();

    const currentPost = allPosts.find((post) => post.slug === postSlug);

    if (!currentPost) return { notFound: true };

    const featuredPosts = (
      await getAllPostsForCategory(currentPost.featuredCategoryName)
    ).filter((post) => post.slug !== currentPost.slug);

    return {
      props: {
        currentPost,
        featuredPosts: featuredPosts.slice(0, 3),
        seo: {
          title: currentPost.title,
          description: currentPost.description,
          image: currentPost.featuredImage,
        },
      },
    };
  }
);
