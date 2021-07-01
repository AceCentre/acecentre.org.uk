import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllStories } from "../../lib/story/get-story";

export default function StoryDetail({ story }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  console.log(story);

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main></main>
      <Footer currentYear={currentYear} />
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
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const allStories = await getAllStories();

  if (!allStories) throw new Error("Could not get all the stories");

  const currentStory = allStories.find((project) => project.slug === slug);

  return {
    props: {
      story: currentStory,
    },
  };
});
