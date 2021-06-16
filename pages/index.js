import Link from "next/link";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { FeaturedStory } from "../components/featured-story/featured-story";
import { Footer } from "../components/footer/footer";
import { GetInvolved } from "../components/get-involved/get-involved";
import { HowCanWeHelpCards } from "../components/how-can-we-help-cards/how-can-we-help-cards";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { WhatWeDo } from "../components/what-we-do/what-we-do";
import { useCartCount } from "../lib/cart/use-cart-count";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { getLandingPagePosts } from "../lib/posts/get-posts";
import { getSimpleStory } from "../lib/story/get-story";
import styles from "../styles/index.module.css";

export default function Home({ featuredStory, landingPagePosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover>
          <p>
            Working with people of all ages to overcome communication challenges
          </p>
          <div className={styles.aboutUs}>
            <Link href="/donate">Learn about us</Link>
          </div>
        </VideoWithCardCover>
        <HowCanWeHelpCards />
        <WhatWeDo />
        <FeaturedStory {...featuredStory} />
        <FeaturedPosts
          title="Latest from the blog"
          viewAllLink="/blog"
          posts={landingPagePosts}
        />
        <GetInvolved />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

  if (!featuredStory) throw new Error("Could not fetch story for landing page");

  const landingPagePosts = await getLandingPagePosts();

  if (!landingPagePosts) throw new Error("Could not fetch landing page posts");

  return { props: { featuredStory, landingPagePosts } };
});
