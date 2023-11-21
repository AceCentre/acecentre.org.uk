import { Aacinfo } from "../components/aacinfo/aacinfo";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import { getAllProductsByPopularity } from "../lib/products/get-products";

export default function AACInfoPage({ featuredResources }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <Aacinfo featuredResources={featuredResources}></Aacinfo>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
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
    revalidate: 60,
    props: {
      featuredResources,
      seo: { dontIndex: true, title: "AACInfo Monthly" },
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
