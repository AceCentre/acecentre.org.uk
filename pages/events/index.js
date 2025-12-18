import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { PageTitle } from "../../components/page-title/page-title";

import { getAllPostsForCategory } from "../../lib/posts/get-posts";

import styles from "../../styles/index.module.css";

export default function EventsIndex({ posts }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle heading="Events" description="Upcoming and past events" />
        <p className={styles.container}>{posts.length} events</p>
        <FeaturedPosts posts={posts} linkPrefix="events" />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  // Events are stored as standard WP Posts, categorized under "Events" (slug: events)
  const posts = await getAllPostsForCategory("Events");

  return {
    revalidate: 60,
    props: {
      posts,
      seo: {
        title: "Events",
        description: "Upcoming and past events",
      },
    },
  };
};


