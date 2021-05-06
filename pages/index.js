import { Nav } from "../components/nav/nav";
import { defaultNavItems, SubNav } from "../components/sub-nav/sub-nav";
import { useCartCount } from "../lib/cart/use-cart-count";

export default function Home() {
  const cartCount = useCartCount();

  return (
    <>
      <header>
        <Nav numberOfItemsInCart={cartCount} />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main></main>
    </>
  );
}
