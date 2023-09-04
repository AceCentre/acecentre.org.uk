import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../lib/global-props/inject";
import { getLanguageLibraryResource } from "../../lib/language-library";

export default function LanguageLibrary({ resource }) {
  const { currentYear } = useGlobalProps();

  console.log(resource);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <pre>{JSON.stringify(resource, null, 2)}</pre>
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
