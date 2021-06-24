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
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getLandingPagePosts } from "../../lib/posts/get-posts";
import { getSimpleStory } from "../../lib/story/get-story";

export default function Home({ featuredStory, landingPagePosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover src="/about-cover.jpeg">
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

        <LatestFromBlog posts={landingPagePosts} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("patrick");

  if (!featuredStory) throw new Error("Could not fetch story for landing page");

  const landingPagePosts = await getLandingPagePosts();

  if (!landingPagePosts) throw new Error("Could not fetch landing page posts");

  return {
    props: {
      featuredStory,
      landingPagePosts,
    },
  };
});
