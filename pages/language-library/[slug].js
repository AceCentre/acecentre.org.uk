import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LanguageLibraryResourcePage } from "../../components/language-library-resource-page/language-library-resource-page";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../lib/global-props/inject";
import { getLanguageLibraryResource } from "../../lib/language-library";

export default function LanguageLibrary({ resource }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LanguageLibraryResourcePage resource={resource} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalPropsNoRevalidate(
  async ({ params: { slug } }) => {
    const resource = await getLanguageLibraryResource(slug);

    return {
      props: {
        resource,

        seo: { dontIndex: true, title: resource.title },
      },
    };
  }
);
