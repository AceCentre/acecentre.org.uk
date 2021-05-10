import { DescriptionAndQuote } from "../../components/description-and-quote/description-and-quote";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getSimpleStory } from "../../lib/story/get-story";

export default function Home({ featuredStory }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
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
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

  if (!featuredStory) throw new Error("Could not fetch story for landing page");

  return { props: { featuredStory } };
});
