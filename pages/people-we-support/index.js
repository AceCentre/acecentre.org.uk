import { AllStories } from "../../components/all-stories/all-stories";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { StoryHighlight } from "../../components/story-highlight/story-highlight";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { WordsFrom } from "../../components/words-from/words-from";
import {
  getAllStories,
  getSimpleStoryByIndex,
} from "../../lib/story/get-story";

import styles from "../../styles/people-we-support.module.css";

export default function StoriesLandingPage({
  featuredStories,
  storyHighlight,
  wordsFrom,
}) {
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
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const allStories = await getAllStories();

  const storyHighlight = await getSimpleStoryByIndex(0);
  const wordsFrom = await getSimpleStoryByIndex(1);

  if (!allStories)
    throw new Error("Could not get all the stories for stories page");

  return {
    revalidate: 60,
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
};
