import Link from "next/link";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../lib/global-props/inject";
import { getLanguageLibraryResources } from "../../lib/language-library";

export default function LanguageLibrary({ resources }) {
  const { currentYear } = useGlobalProps();

  console.log(resources);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <ul>
          {resources.map((resource) => {
            return (
              <li key={resource.slug}>
                <Link href={`/language-library/${resource.slug}`}>
                  {resource.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalPropsNoRevalidate(async () => {
  const resources = await getLanguageLibraryResources();

  return {
    props: {
      resources,
      seo: { dontIndex: true, title: "Language Library" },
    },
  };
});
