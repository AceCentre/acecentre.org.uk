import { Aacinfo } from "../components/aacinfo/aacinfo";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import { getAllProductsByPopularity } from "../lib/products/get-products";

export default function AACInfoPage({ featuredResources }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <Aacinfo featuredResources={featuredResources}></Aacinfo>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const allProducts = await getAllProductsByPopularity();

  const featuredResources = allProducts
    .filter((resource) => resource.featured)
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }));

  return {
    props: {
      featuredResources,
      seo: { dontIndex: true, title: "AACInfo Monthly" },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
