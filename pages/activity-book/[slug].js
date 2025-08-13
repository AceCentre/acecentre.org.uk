import { useRouter } from "next/router";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { getGuideTemplate, getGuideProducts } from "../../lib/activity-book";
import { GuidePage } from "../../components/guide-generate/guide-generate";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import Head from "next/head";

export default function GuideSlug({
  currentResource,
  guideTemplate,
  attachedResources,
  relatedResources,
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>{currentResource.name} - ACE Centre</title>
        <meta name="description" content={currentResource.description} />
        <meta property="og:title" content={currentResource.name} />
        <meta property="og:description" content={currentResource.description} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://acecentre.org.uk/activity-book/${currentResource.slug}`}
        />
        <meta property="og:image" content={currentResource.image?.src} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentResource.name} />
        <meta
          name="twitter:description"
          content={currentResource.description}
        />
        <meta name="twitter:image" content={currentResource.image?.src} />
      </Head>

      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>

      <main id="mainContent">
        <BackToLink where="all guides" href="/activity-book/all" />

        <GuidePage
          resource={currentResource}
          guideTemplate={guideTemplate}
          attachedResources={attachedResources}
          relatedResources={relatedResources}
        />
      </main>

      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const guides = await getGuideProducts();

  const paths = guides.map((guide) => ({
    params: { slug: guide.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const guides = await getGuideProducts();
  const currentResource = guides.find((guide) => guide.slug === params.slug);

  if (!currentResource) {
    return {
      notFound: true,
    };
  }

  const guideTemplate = await getGuideTemplate(currentResource.guideSlug);
  const attachedResources = currentResource.attachedResources || [];
  const relatedResources = guides
    .filter((guide) => guide.slug !== params.slug)
    .slice(0, 3);

  return {
    props: {
      currentResource,
      guideTemplate,
      attachedResources,
      relatedResources,
    },
    revalidate: 60,
  };
}
