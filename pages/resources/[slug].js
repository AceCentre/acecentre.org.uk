import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllProducts } from "../../lib/products/get-products";

export default function ResourceDetail({ resource }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <pre>{JSON.stringify(resource, null, 2)}</pre>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export async function getStaticPaths() {
  const allProducts = await getAllProducts();

  if (!allProducts) throw new Error("Could not get all the products");

  return {
    paths: allProducts.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const allProducts = await getAllProducts();

  if (!allProducts) throw new Error("Could not get all the products");

  const currentResource = allProducts.find((product) => product.slug === slug);

  return {
    props: {
      resource: currentResource,
    },
  };
});
