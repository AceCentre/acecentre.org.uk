import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { CombinedNav } from "../../components/combined-nav/combined-nav";

export default function FormPage({ slug }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>{slug}</main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "test" } }],
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  return {
    props: {
      slug,
    },
  };
});
