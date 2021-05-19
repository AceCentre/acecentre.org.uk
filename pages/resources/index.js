import { Footer } from "../../components/footer/footer";
import { Nav } from "../../components/nav/nav";
import { ResourcesSearch } from "../../components/resources-search/resources-search";
import { defaultNavItems, SubNav } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

export default function Resources() {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main>
        <ResourcesSearch />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
