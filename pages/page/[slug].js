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

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
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
  {
    slug: "cookies",
    description:
      "Ace Centre is a registered national charity (no. 1089313) dedicated to the support of individuals with complex communication and physical difficulties, and we have always been committed to protecting the privacy and security of the personal data of our clients.",
  },
  {
    slug: "privacy",
    description:
      "Ace Centre is a registered national charity (no. 1089313) dedicated to the support of individuals with complex communication and physical difficulties, and we have always been committed to protecting the privacy and security of the personal data of our clients.",
  },
  {
    slug: "ace-centre-privacy-policy-3",
    description:
      "Ace Centre is a registered national charity (no. 1089313) dedicated to the support of individuals with complex communication and physical difficulties, and we have always been committed to protecting the privacy and security of the personal data of our service users.",
  },
  {
    slug: "safeguarding-policies",
    description:
      "At Ace Centre, we regard safeguarding of our clients a top priority.",
  },
  {
    slug: "purchase-terms-and-conditions",
    description: "Terms and Conditions for all purchases made",
  },
  {
    slug: "copyright-and-licence-terms-for-non-profit-items",
    description: "Copyright and Licence terms for Non-Profit items",
  },
  {
    slug: "meet-paul-transcript",
    description: "Transcript of Paul's case study",
  },
  {
    slug: "pasco-support",
    description: "Support for the Pasco app",
  },
];

export async function getStaticPaths() {
  const paths = ALL_PAGES.map((page) => ({ params: { slug: page.slug } }));

  return {
    paths,
    // Currently this is ignored by Netlify so we have to use `notFound`
    // Ref: https://github.com/netlify/netlify-plugin-nextjs/issues/1179
    fallback: false,
  };
}

export const getStaticProps = withGlobalProps(async ({ params: { slug } }) => {
  const page = await getPage(slug);
  const hardCodedPage = ALL_PAGES.find((page) => page.slug === slug);

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      slug,
      page,
      seo: {
        title: page.title,
        description: hardCodedPage.description,
      },
    },
  };
});
