import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useCartCount } from "../../lib/cart/use-cart-count";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllProducts } from "../../lib/products/get-products";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import { ResourcesImage } from "../../components/resources-image/resources-image";
import { ResourcesDescription } from "../../components/resources-description/resources-description";
import { ResourcesDownload } from "../../components/resources-download/resources-download";
import { ResourcesShare } from "../../components/resources-share/resources-share";

import styles from "../../styles/resources-detail.module.css";

export default function ResourceDetail({ resource }) {
  const cartCount = useCartCount();
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav cartCount={cartCount} defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <BackToLink where="all resources" href="/resources/all" />
        <div className={styles.topArea}>
          <div className={styles.leftTopArea}>
            <ResourcesImage />
          </div>
          <div className={styles.rightTopArea}>
            <ResourcesDescription />
            <ResourcesDownload />
            <ResourcesShare />
          </div>
        </div>
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
