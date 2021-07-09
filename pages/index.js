import { CombinedNav } from "../components/combined-nav/combined-nav";
import { FeaturedStory } from "../components/featured-story/featured-story";
import { Footer } from "../components/footer/footer";
import { GetInvolved } from "../components/get-involved/get-involved";
import { HowCanWeHelpCards } from "../components/how-can-we-help-cards/how-can-we-help-cards";
import { LandingPageCover } from "../components/landing-page-cover/landing-page-cover";
import { LatestFromBlog } from "../components/latest-from-blog/latest-from-blog";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { WhatWeDo } from "../components/what-we-do/what-we-do";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { getLandingPagePosts } from "../lib/posts/get-posts";
import { getSimpleStory } from "../lib/story/get-story";

export default function Home({ featuredStory, landingPagePosts }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <LandingPageCover />
        <HowCanWeHelpCards />
        <WhatWeDo />
        <FeaturedStory {...featuredStory} />
        <LatestFromBlog posts={landingPagePosts} />
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
