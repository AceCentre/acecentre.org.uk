import { AllStories } from "../../components/all-stories/all-stories";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { StoryHighlight } from "../../components/story-highlight/story-highlight";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { WordsFrom } from "../../components/words-from/words-from";
import { useCartCount } from "../../lib/cart/use-cart-count";
import config from "../../lib/config";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllStories, getSimpleStory } from "../../lib/story/get-story";

export default function StoriesLandingPage({
  featuredStories,
  storyHighlight,
  wordsFrom,
}) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  console.log("render", config);

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="People we support"
          description="Its not the work that we do here at the AceCentre that's amazing, it's the people we work with"
        />
        <StoryHighlight {...storyHighlight} />
        <WordsFrom {...wordsFrom} />
        <AllStories stories={featuredStories} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  console.log("static", config);

  const allStories = await getAllStories();

  const storyHighlight = await getSimpleStory("jess");
  const wordsFrom = await getSimpleStory("glyn");

  if (!allStories)
    throw new Error("Could not get all the stories for stories page");

  return { props: { featuredStories: allStories, storyHighlight, wordsFrom } };
});
