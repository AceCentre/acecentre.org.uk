import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { getLanguageLibraryLandingPageData } from "../../lib/language-library";
import { LanguageLibraryHeader } from "../../components/language-library-header/language-library-header";
import { LanguageLibraryLandingSearch } from "../../components/language-library-landing-search/language-library-landing-search";
import { LanguageLibrarySubtitles } from "../../components/language-library-subtitles/language-library-subtitles";
import { LanguageLibraryCredits } from "../../components/language-library-credits/language-library-credits";
import {
  GenericFaqs,
  LANGUAGE_LIBRARY_FAQS,
} from "../../components/getting-started-faqs/getting-started-faqs";
import { LanguageLibraryHowTo } from "../../components/language-library-how-to/language-library-how-to";
import { LanguageLibraryFeatured } from "../../components/language-library-featured/language-library-featured";
import { LanguageLibraryHelpfulLinks } from "../../components/language-library-helpful-links/language-library-helpful-links";
import { ResourceList } from "../../components/resource-list/resource-list";
import { getAllProducts } from "../../lib/products/get-products";

export default function LanguageLibrary({
  languages,
  featuredPosts,
  helpfulLinks,
  attachedResources,
}) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LanguageLibraryHeader />
        <LanguageLibraryLandingSearch languages={languages} />
        <LanguageLibrarySubtitles />
        <LanguageLibraryFeatured resources={featuredPosts} />
        <LanguageLibraryCredits />
        <LanguageLibraryHowTo />
        <LanguageLibraryHelpfulLinks helpfulLinks={helpfulLinks} />
        <GenericFaqs faqs={LANGUAGE_LIBRARY_FAQS} whiteBackground />
        {attachedResources.length > 0 && (
          <ResourceList
            title="Other resources you might like"
            viewAllLink="/resources/all"
            viewAllText="View all resources"
            products={attachedResources}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const props = await getLanguageLibraryLandingPageData();
  const attachedResources = await getLanguageLibraryAttachedResources();

  return {
    revalidate: 60,
    props: {
      ...props,
      attachedResources,
      seo: {
        dontIndex: true,
        title: "AAC Language Library",
        description: "A library of AAC resources catalogued by language.",
      },
    },
  };
};

const getLanguageLibraryAttachedResources = async () => {
  try {
    const allProducts = await getAllProducts();
    const languageLibraryProduct = allProducts.find(
      (product) => product.slug === "language-library"
    );

    if (!languageLibraryProduct?.attachedResources?.length) {
      return [];
    }

    return languageLibraryProduct.attachedResources
      .map((product) => ({
        title: htmlDecode(product.name || product.title),
        mainCategoryName: product.mainCategoryName || "",
        featuredImage: product.featuredImage || product.image,
        ...product,
      }))
      .slice(0, 4);
  } catch (error) {
    console.warn("Failed to load Language Library attached resources", error);
    return [];
  }
};

function htmlDecode(input) {
  if (!input) return "";
  return input.replace(/&amp;/g, "&");
}
