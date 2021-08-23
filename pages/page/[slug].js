import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getPage } from "../../lib/generic-pages/get-page";
import styles from "../../styles/generic-page.module.css";
import { PageContent } from "../../components/page-content/page-content";

export default function GenericPage({ page }) {
  const { currentYear } = useGlobalProps();

  console.log(page.content);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <div className={styles.titleContainer}>
          <h1>{page.title}</h1>
        </div>
        <PageContent content={page.content} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const ALL_PAGES = [
  "privacy",
  "ace-centre-privacy-policy-2",
  "safeguarding-policies",
];

export async function getStaticPaths() {
  const paths = ALL_PAGES.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const page = await getPage(slug);
  return {
    props: {
      slug,
      page,
    },
  };
});
