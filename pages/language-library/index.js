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

export default function LanguageLibrary({ languages, featuredPosts }) {
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
        <GenericFaqs faqs={LANGUAGE_LIBRARY_FAQS} />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const props = await getLanguageLibraryLandingPageData();

  return {
    revalidate: 60,
    props: {
      ...props,
      seo: {
        dontIndex: true,
        title: "AAC Language Library",
        description: "A library of AAC resources catalogued by language.",
      },
    },
  };
};
