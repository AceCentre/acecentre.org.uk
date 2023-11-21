import { useRouter } from "next/router";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { FeaturedStory } from "../components/featured-story/featured-story";
import { Footer } from "../components/footer/footer";
import { GetInvolved } from "../components/get-involved/get-involved";
import { HowCanWeHelpCards } from "../components/how-can-we-help-cards/how-can-we-help-cards";
import { LandingPageCover } from "../components/landing-page-cover/landing-page-cover";
import { LatestFromBlog } from "../components/latest-from-blog/latest-from-blog";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { WhatWeDo } from "../components/what-we-do/what-we-do";

import { getLandingPagePosts } from "../lib/posts/get-posts";
import { getSimpleStoryByIndex } from "../lib/story/get-story";

export default function Home({ featuredStory, landingPagePosts }) {
  const router = useRouter();
  const { query } = router;

  // Redirect moodle logins
  if (query && query.verify_code && query.mdl_uid && query.wdmaction) {
    router.push(
      `https://backend.acecentre.org.uk?verify_code=${query.verify_code}&mdl_uid=${query.mdl_uid}&wdmaction=${query.wdmaction}`
    );
  }

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LandingPageCover />
        <HowCanWeHelpCards />
        <WhatWeDo />
        <FeaturedStory objectPosition="top" {...featuredStory} />
        <LatestFromBlog posts={landingPagePosts} />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const featuredStory = await getSimpleStoryByIndex(0);

  if (!featuredStory) throw new Error("Could not fetch story for landing page");

  const landingPagePosts = await getLandingPagePosts();

  if (!landingPagePosts) throw new Error("Could not fetch landing page posts");

  return {
    revalidate: 60,
    props: { featuredStory, landingPagePosts, seo: { showSearchBox: true } },
  };
};
