import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getPage } from "../../lib/generic-pages/get-page";
import styles from "../../styles/generic-page.module.css";
import { PageContent } from "../../components/page-content/page-content";
import { useRouter } from "next/router";

export default function GenericPage({ page }) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

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
      <Footer />
    </>
  );
}

const ALL_PAGES = [
  {
    slug: "cookies",
    altSlugs: [],
    description:
      "Ace Centre is a registered national charity (no. 1089313) dedicated to the support of individuals with complex communication and physical difficulties, and we have always been committed to protecting the privacy and security of the personal data of our clients.",
  },

  {
    slug: "ace-centre-privacy-policy-3",
    altSlugs: ["privacy"],
    description:
      "Ace Centre is a registered national charity (no. 1089313) dedicated to the support of individuals with complex communication and physical difficulties, and we have always been committed to protecting the privacy and security of the personal data of our service users.",
  },
  {
    slug: "safeguarding-policies",
    altSlugs: [],
    description:
      "At Ace Centre, we regard safeguarding of our clients a top priority.",
  },
  {
    slug: "purchase-terms-and-conditions",
    altSlugs: [],
    description: "Terms and Conditions for all purchases made",
  },
  {
    slug: "copyright-and-licence-terms-for-non-profit-items",
    altSlugs: ["copyright"],
    description: "Copyright and Licence terms for Non-Profit items",
  },
  {
    slug: "meet-paul-transcript",
    altSlugs: [],
    description: "Transcript of Paul's case study",
  },
  {
    slug: "pasco-support",
    altSlugs: [],
    description: "Support for the Pasco app",
  },
  {
    slug: "service-leads-ms-bookings-calendars",
    altSlugs: [],
    description: "Book some time with Service Leads",
    replaceBackendLinks: true,
  },
  {
    slug: "service-lead-bookings-assessments",
    altSlugs: [],
    description: "Book some time with Ace Centre Assessments",
  },
  {
    slug: "service-lead-bookings-partnerships",
    altSlugs: [],
    description: "Book some time with Partnerships",
  },
  {
    slug: "service-lead-bookings-ace-centre-learning",
    altSlugs: [],
    description: "Book some time with ACL",
  },
  {
    slug: "service-lead-bookings-laaces-north",
    altSlugs: [],
    description: "Book some time with LAACES North",
  },
  {
    slug: "service-lead-bookings-laaces-south",
    altSlugs: [],
    description: "Book some time with LAACES South",
  },
  {
    slug: "service-lead-bookings-research-and-development",
    altSlugs: [],
    description: "Book some time with Research and Development",
  },
  {
    slug: "new-acl",
    altSlugs: [],
    description: "Find out about the latest Ace Centre Learning platform",
  },
];

export async function getStaticPaths() {
  const paths = ALL_PAGES.map((page) => ({ params: { slug: page.slug } }));

  const altPaths = ALL_PAGES.flatMap((page) => page.altSlugs).map((slug) => ({
    params: { slug },
  }));

  return {
    paths: [...paths, ...altPaths],
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { slug: urlSlug } }) => {
  let realSlug = urlSlug;

  for (const page of ALL_PAGES) {
    if (page.altSlugs.includes(urlSlug.toLowerCase())) {
      realSlug = page.slug;
    }
  }

  const hardCodedPage = ALL_PAGES.find((page) => page.slug === realSlug);

  const page = await getPage(realSlug, hardCodedPage?.replaceBackendLinks);

  if (!page) {
    return { notFound: true };
  }

  return {
    revalidate: 60,
    props: {
      page,
      seo: {
        title: page.title,
        description:
          hardCodedPage?.description ||
          "Ace Centre is a registered charity (No. 1089313) providing Assistive Technology and Augmentative and Alternative Communication services for people with complex needs.",
      },
    },
  };
};
