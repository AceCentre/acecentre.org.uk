import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { getAllStories } from "../../../lib/story/get-story";
import { PageTitle } from "../../../components/page-title/page-title";
import { StoryCoverImage } from "../../../components/story-cover-image/story-cover-image";
import { ReadMoreStories } from "../../../components/all-stories/all-stories";
import { StoryContentAndQuote } from "../../../components/story-content-and-quote/story-content-and-quote";
import { useRouter } from "next/router";

export default function StoryDetail({ story, featuredStories }) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="People we support"
          description={`Meet ${story.title}`}
        />

        {story.image && <StoryCoverImage story={story} />}

        <StoryContentAndQuote story={story} />

        <ReadMoreStories stories={featuredStories} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const allStories = await getAllStories();

  if (!allStories) throw new Error("Could not get all the stories");

  return {
    paths: allStories.map((story) => ({
      params: {
        slug: story.slug,
      },
    })),
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const allStories = await getAllStories();

  if (!allStories) throw new Error("Could not get all the stories");

  const currentStory = allStories.find((project) => project.slug === slug);

  if (!currentStory) {
    return { notFound: true };
  }

  const featuredStories = allStories
    .filter((story) => story.slug !== slug)
    .slice(0, 3);

  return {
    props: {
      story: currentStory,
      featuredStories,
      seo: {
        title: currentStory.title,
        description: currentStory.shortDescription,
        image: currentStory.image,
      },
    },
  };
};
