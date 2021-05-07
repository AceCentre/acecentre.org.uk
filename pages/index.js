import { FeaturedStory } from "../components/featured-story/featured-story";
import { Footer } from "../components/footer/footer";
import { GetInvolved } from "../components/get-involved/get-involved";
import { HowCanWeHelpCards } from "../components/how-can-we-help-cards/how-can-we-help-cards";
import { Nav } from "../components/nav/nav";
import { defaultNavItems, SubNav } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { WhatWeDo } from "../components/what-we-do/what-we-do";
import { useCartCount } from "../lib/cart/use-cart-count";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { getLandingPagePosts } from "../lib/posts/get-posts";
import { getSimpleStory } from "../lib/story/get-story";

export default function Home({ featuredStory, landingPagePosts }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <VideoWithCardCover />
        <HowCanWeHelpCards />
        <WhatWeDo />
        <FeaturedStory {...featuredStory} />
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
