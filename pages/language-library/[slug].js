import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LanguageLibraryResourcePage } from "../../components/language-library-resource-page/language-library-resource-page";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import {
  getAllSlugs,
  getLanguageLibraryResource,
} from "../../lib/language-library";

export default function LanguageLibrary({ resource }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LanguageLibraryResourcePage resource={resource} />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const { resources } = await getAllSlugs();

  return {
    paths: resources.nodes.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const resource = await getLanguageLibraryResource(slug);

  if (!resource.databaseId) return { notFound: true };

  return {
    revalidate: 60,
    props: {
      resource,
      seo: { dontIndex: true, title: resource.title },
    },
  };
};
