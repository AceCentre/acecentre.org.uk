import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../lib/global-props/inject";
import { getLanguageLibraryLandingPageData } from "../../lib/language-library";
import { LanguageLibraryHeader } from "../../components/language-library-header/language-library-header";
import { LanguageLibraryLandingSearch } from "../../components/language-library-landing-search/language-library-landing-search";
import { LanguageLibrarySubtitles } from "../../components/language-library-subtitles/language-library-subtitles";
import { LanguageLibraryCredits } from "../../components/language-library-credits/language-library-credits";

export default function LanguageLibrary({ languages }) {
  const { currentYear } = useGlobalProps();

  console.log(languages);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LanguageLibraryHeader />
        <LanguageLibraryLandingSearch languages={languages.nodes} />
        <LanguageLibrarySubtitles />
        <h2 style={{ textAlign: "center" }}>
          List of features resources will go here
        </h2>
        <LanguageLibraryCredits />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalPropsNoRevalidate(async () => {
  const props = await getLanguageLibraryLandingPageData();

  return {
    props: {
      ...props,
      seo: { dontIndex: true, title: "Language Library" },
    },
  };
});
