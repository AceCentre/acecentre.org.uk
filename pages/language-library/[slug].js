import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LanguageLibraryResourcePage } from "../../components/language-library-resource-page/language-library-resource-page";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import {
  getAllSlugs,
  getLanguageLibraryResource,
} from "../../lib/language-library";

export default function LanguageLibrary({ resource, randomNumber }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LanguageLibraryResourcePage
          resource={resource}
          randomNumber={randomNumber}
        />
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();

  return {
    paths: slugs.map((x) => ({ params: { slug: x } })),
    fallback: false,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const resource = await getLanguageLibraryResource(slug);

  return {
    revalidate: 60,
    props: {
      resource,
      randomNumber: Math.floor(Math.random() * 8),
      seo: { dontIndex: true, title: resource.post.post_title },
    },
  };
};
