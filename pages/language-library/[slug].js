import { useRouter } from "next/router";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { LanguageLibraryResourcePage } from "../../components/language-library-resource-page/language-library-resource-page";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import {
  getAllSlugs,
  getLanguageLibraryResource,
  getFields,
} from "../../lib/language-library";

export default function LanguageLibrary({ resource, fields, randomNumber }) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LanguageLibraryResourcePage
          resource={resource}
          randomNumber={randomNumber}
          fields={fields}
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
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const resource = await getLanguageLibraryResource(slug);
  const fields = await getFields();

  return {
    revalidate: 60,
    props: {
      fields,
      resource,
      randomNumber: Math.floor(Math.random() * 8),
      seo: { dontIndex: true, title: resource.post.post_title },
    },
  };
};
