import { AllStories } from "../../components/all-stories/all-stories";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { StoryHighlight } from "../../components/story-highlight/story-highlight";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllStories } from "../../lib/story/get-story";

export default function StoriesLandingPage({ featuredStories }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />;
      </header>
      <main>
        <PageTitle
          heading="People we support"
          description="Its not the work that we do here at the AceCentre that's amazing, it's the people we work with"
        />
        <VideoWithCardCover>
          <p>
            An insight into Paul and Julie&apos;s lives and how they manage
            their challenges
          </p>
        </VideoWithCardCover>
        <StoryHighlight />
        <AllStories stories={featuredStories} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allStories = await getAllStories();

  if (!allStories)
    throw new Error("Could not get all the stories for stories page");

  const featuredStories = allStories.slice(0, 6);

  return { props: { featuredStories } };
});
