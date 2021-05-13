import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { PageTitle } from "../../components/page-title/page-title";
import { StoryHighlight } from "../../components/story-highlight/story-highlight";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

export default function StoriesLandingPage() {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
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
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  return { props: {} };
});
