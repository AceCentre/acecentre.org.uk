import { AllStories } from "../../components/all-stories/all-stories";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { StoryHighlight } from "../../components/story-highlight/story-highlight";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { WordsFrom } from "../../components/words-from/words-from";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllStories, getSimpleStory } from "../../lib/story/get-story";

import styles from "../../styles/people-we-support.module.css";

export default function StoriesLandingPage({
  featuredStories,
  storyHighlight,
  wordsFrom,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="People we support"
          description="Its not the work that we do here at Ace Centre that's amazing, it's the people we work with"
        />
        <StoryHighlight
          imageClassName={styles.highlightImage}
          {...storyHighlight}
        />
        <WordsFrom {...wordsFrom} />
        <AllStories stories={featuredStories} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allStories = await getAllStories();

  const storyHighlight = await getSimpleStory("megan");
  const wordsFrom = await getSimpleStory("paul-pickford");

  if (!allStories)
    throw new Error("Could not get all the stories for stories page");

  return {
    props: {
      featuredStories: allStories,
      storyHighlight,
      wordsFrom,
      seo: {
        title: "People we support",
        description:
          "It’s not the work that we do here at the Ace Centre that’s amazing, it’s the people that we work with. Time after time we’re humbled and inspired by their sheer tenacity and desire to communicate.",
      },
    },
  };
});
