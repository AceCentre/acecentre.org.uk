import { Footer } from "../components/footer/footer";
import { Nav } from "../components/nav/nav";
import { defaultNavItems, SubNav } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { WorkingAtAce } from "../components/working-at-ace/working-at-ace";
import { useCartCount } from "../lib/cart/use-cart-count";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

export default function Careers() {
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
          <h1>Work with us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque gravida rutrum mattis.
          </p>
        </VideoWithCardCover>
        <WorkingAtAce />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
