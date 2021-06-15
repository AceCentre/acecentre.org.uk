import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { DescriptionAndQuote } from "../../components/description-and-quote/description-and-quote";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { Footer } from "../../components/footer/footer";
import { StaffAndTrustees } from "../../components/staff-and-trustees/staff-and-trustees";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import {
  getLandingPagePosts,
  getLandingPageProjects,
} from "../../lib/posts/get-posts";
import { getSimpleStory } from "../../lib/story/get-story";

export default function Home({
  featuredStory,
  landingPagePosts,
  researchProjects,
}) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />;
      </header>
      <main>
        <VideoWithCardCover>
          <h1>About us</h1>
          <p>
            Dedicated to supporting people with complex communication
            difficulties
          </p>
        </VideoWithCardCover>
        <DescriptionAndQuote />
        <FeaturedStory {...featuredStory} />
        <StaffAndTrustees />
        <FeaturedPosts
          title="Research projects"
          viewAllLink="/research"
          posts={researchProjects}
        />
        <FeaturedPosts
          title="Latest from the blog"
          viewAllLink="/blog"
          posts={landingPagePosts}
        />
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

  const researchProjects = await getLandingPageProjects();

  if (!researchProjects || researchProjects.length < 3)
    throw new Error("Could not fetch research posts posts");

  return {
    props: {
      featuredStory,
      landingPagePosts,
      researchProjects: researchProjects.slice(0, 3),
    },
  };
});
