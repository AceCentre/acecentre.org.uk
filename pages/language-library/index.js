import Link from "next/link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../lib/global-props/inject";
import {
  getLanguageLibraryLandingPageData,
  getLanguageLibraryResources,
} from "../../lib/language-library";
import { SearchBox } from "../../components/search-box/search-box";
import { LanguageLibraryHeader } from "../../components/language-library-header/language-library-header";
import { LanguageLibraryLandingSearch } from "../../components/language-library-landing-search/language-library-landing-search";

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
        {/* <ul>
          {resources.map((resource) => {
            return (
              <li key={resource.slug}>
                <Link href={`/language-library/${resource.slug}`}>
                  {resource.title}
                </Link>
              </li>
            );
          })}
        </ul> */}
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
