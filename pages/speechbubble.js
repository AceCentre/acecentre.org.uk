import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { Speechbubble } from "../components/speechbubble/speechbubble";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import { getAllProductsByPopularity } from "../lib/products/get-products";

export default function SpeechBubblePage({ featuredResources }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <Speechbubble featuredResources={featuredResources}></Speechbubble>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  const allProducts = await getAllProductsByPopularity();

  const featuredResources = allProducts
    .filter((resource) => resource.featured)
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category?.name || "",
      featuredImage: product.image || null,
      slug: product.slug || "",
      id: product.id || "",
      price: product.price || null,
      shortDescription: product.shortDescription || "",
      featured: product.featured || false,
      totalSales: product.totalSales || 0,
    }));

  return {
    props: {
      featuredResources,
      seo: { dontIndex: true, title: "SpeechBubble" },
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
