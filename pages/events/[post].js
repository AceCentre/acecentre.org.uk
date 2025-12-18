import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import {
  getAllFullPosts,
  getAllPostsForCategory,
  getPostBySlug,
} from "../../lib/posts/get-posts";
import styles from "../../styles/blog-post.module.css";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { BlogMeta } from "../../components/blog-meta/blog-meta";
import { useRouter } from "next/router";

const isEventPost = (post) =>
  Array.isArray(post?.categories) &&
  post.categories.some((c) => c?.slug === "events");

export default function EventPostPage({ currentPost, featuredPosts }) {
  const { isFallback } = useRouter();
  if (isFallback) return null;

  const publishedDate = new Date(currentPost.publishedDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(publishedDate);

  return (
    <>
      <style jsx global>
        {`
          .size-medium,
          .size-full,
          .size-medium-large {
            width: 100%;
            height: auto;
            text-align: center;
          }

          .size-medium > a,
          .size-medium-large > a,
          .size-full > a {
            width: 100%;
          }

          .size-medium > a > img,
          .size-medium > img,
          .size-medium-large > a > img,
          .size-medium-large > img,
          .size-full > a > img,
          .size-full > img {
            width: 100%;
            height: auto;
            max-width: 600px;
          }

          figure {
            text-align: center;
          }

          figure > img {
            width: 100%;
            height: auto;
            max-width: 600px;
            margin: 0 auto;
          }
        `}
      </style>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink href="/events" where="events" />
        <PageTitle
          heading="Events"
          description={currentPost.title}
          className={styles.pageTitle}
        />
        <BlogMeta date={formattedDate} />

        <div
          className={styles.contentContainer}
          dangerouslySetInnerHTML={{ __html: currentPost.content }}
        ></div>

        <FeaturedPosts
          title="More events"
          posts={featuredPosts}
          linkPrefix="events"
          viewAllLink="/events"
        />
      </main>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllFullPosts();
  const eventPosts = allPosts.filter(isEventPost);

  return {
    paths: eventPosts.map((post) => ({ params: { post: post.slug } })),
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { post: postSlug } }) => {
  // Legacy redirects (mirrors /blog/[post] behavior)
  if (postSlug === "comm-works") {
    return {
      redirect: {
        destination: "/communication-works",
        permanent: true,
      },
    };
  }

  if (postSlug === "comm-works-2025") {
    return {
      redirect: {
        destination: "/communication-works-2025",
        permanent: true,
      },
    };
  }
  if (postSlug === "comm-works-2024") {
    return {
      redirect: {
        destination: "/communication-works-2024",
        permanent: true,
      },
    };
  }
  if (postSlug === "comm-works-2023") {
    return {
      redirect: {
        destination: "/communication-works-2023",
        permanent: true,
      },
    };
  }
  if (postSlug === "comm-works-2026") {
    return {
      redirect: {
        destination: "/communication-works-2026",
        permanent: true,
      },
    };
  }

  // Try to get the post directly by slug first
  let currentPost = await getPostBySlug(postSlug);

  // Fallback to searching all posts if direct query fails
  if (!currentPost) {
    const allPosts = await getAllFullPosts();
    currentPost = allPosts.find((post) => post.slug === postSlug);
    if (!currentPost) return { notFound: true };
  }

  // Only allow posts in the Events category to render here
  if (!isEventPost(currentPost)) {
    return { notFound: true };
  }

  const featuredPosts = (await getAllPostsForCategory("Events")).filter(
    (post) => post.slug !== currentPost.slug
  );

  return {
    revalidate: 60,
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
};
