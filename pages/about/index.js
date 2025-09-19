import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { DescriptionAndQuote } from "../../components/description-and-quote/description-and-quote";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { Footer } from "../../components/footer/footer";
import { LatestFromBlog } from "../../components/latest-from-blog/latest-from-blog";
import { OurFunding } from "../../components/our-funding/our-funding";
import { OurVision } from "../../components/our-vision/our-vision";
import { StaffAndTrustees } from "../../components/staff-and-trustees/staff-and-trustees";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { getLandingPagePosts } from "../../lib/posts/get-posts";
import { getSimpleStory } from "../../lib/story/get-story";

import styles from "../../styles/about.module.css";

export default function Home({ featuredStory, landingPagePosts }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          // objectPosition="0px -100px"
          imageClassName={styles.coverImage}
          src="/about-cover.jpeg"
          alt="cover photo of client and clinician using AAC"
        >
          <h1>About us</h1>
          <p>
            We’re dedicated to supporting people with{" "}
            <strong>complex communications difficulties</strong>
          </p>
        </VideoWithCardCover>
        <DescriptionAndQuote />
        <OurVision />
        <OurFunding />
        <FeaturedStory {...featuredStory} />
        <StaffAndTrustees />

        <div className={styles.latestFromTheBlogContainer}>
          <LatestFromBlog posts={landingPagePosts} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const featuredStory = await getSimpleStory("patrick");

  if (!featuredStory) {
    console.warn("Could not fetch story for landing page, using fallback");
  }

  const landingPagePosts = await getLandingPagePosts();

  if (!landingPagePosts) {
    console.warn("Could not fetch landing page posts, using fallback");
  }

  return {
    revalidate: 60,
    props: {
      featuredStory,
      landingPagePosts,
      seo: {
        title: "About",
      },
    },
  };
};
