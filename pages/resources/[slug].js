import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllProducts } from "../../lib/products/get-products";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import { ResourcesImage } from "../../components/resources-image/resources-image";
import { ResourcesDescription } from "../../components/resources-description/resources-description";
import { ResourcesDownload } from "../../components/resources-download/resources-download";
import { ResourcesShare } from "../../components/resources-share/resources-share";

import styles from "../../styles/resources-detail.module.css";
import { ProjectHighlight } from "../../components/project-highlight/project-highlight";
import { ResourceList } from "../../components/resource-list/resource-list";
import { ResourceFullDescription } from "../../components/resource-full-description/resource-full-description";
import { getLaunchpadTemplate } from "../../lib/launchpad";
import { LaunchpadPage } from "../../components/launchpad-generate/launchpad-generate";
import { useRouter } from "next/router";
import { ProductFaqs } from "../../components/product-faqs/product-faqs";

export default function ResourceDetail({
  resource,
  relatedResources,
  attachedResources,
  launchpadTemplate,
}) {
  const { isFallback } = useRouter();

  if (isFallback) return null;

  const project = resource.projects[0] || null;

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="all resources" href="/resources/all" />
        {launchpadTemplate ? (
          <>
            <LaunchpadPage
              launchpadTemplate={launchpadTemplate}
              resource={resource}
              attachedResources={attachedResources}
              relatedResources={relatedResources}
            />
          </>
        ) : (
          <>
            <div className={styles.topArea}>
              <div className={styles.leftTopArea}>
                <ResourcesImage resource={resource} priority />
              </div>
              <div className={styles.rightTopArea}>
                <ResourcesDescription resource={resource} />
                {resource.slug !== "look2talk" && (
                  <ResourcesDownload resource={resource} />
                )}
                <ResourcesShare />
                {/* {resource.slug === "look2talk" && <ResourcesImageL2T />} */}
              </div>
            </div>
            {resource.description && (
              <ResourceFullDescription resource={resource} />
            )}
            {project && <ProjectHighlight project={project} />}
            {resource.faqs.length > 0 && <ProductFaqs faqs={resource.faqs} />}
            <ResourceListSwitch
              resource={resource}
              attachedResources={attachedResources}
              relatedResources={relatedResources}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

const ResourceListSwitch = ({
  resource,
  attachedResources,
  relatedResources,
}) => {
  const isEbook = resource.ebook;

  if (isEbook && attachedResources.length > 0) {
    return (
      <ResourceList
        className={styles.resourcesList}
        title={"Resources featured in this eBook"}
        tagline="Learn how to effectively use these resources from this eBook"
        products={attachedResources}
      />
    );
  }

  return (
    <ResourceList
      className={styles.resourcesList}
      title={"Other resources you might like"}
      viewAllLink={"/resources/all"}
      viewAllText="View all resources"
      products={[...attachedResources, ...relatedResources].slice(0, 4)}
    />
  );
};

export async function getStaticPaths() {
  let allProducts = await getAllProducts(true);

  allProducts = allProducts.filter(
    (x) =>
      x.slug !== "look2talk" && x.slug !== "developing-using-communication-book"
  );

  if (!allProducts) throw new Error("Could not get all the products");

  return {
    paths: allProducts.map((product) => ({
      params: {
        slug: product.slug,
      },
    })),
    fallback: true,
  };
}

export const getStaticProps = async ({ params: { slug } }) => {
  const allProducts = await getAllProducts(true);

  if (!allProducts) throw new Error("Could not get all the products");

  const currentResource = allProducts.find((product) => product.slug === slug);

  if (!currentResource) {
    return {
      notFound: true,
    };
  }

  const currentCategory = currentResource.category.name;

  const relatedResources = allProducts
    .filter((product) => product.slug !== slug)
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }))
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      return aDate - bDate;
    })
    .sort((a, b) => {
      const catA = a.mainCategoryName;
      const catB = b.mainCategoryName;

      if (catA == currentCategory) {
        return -1;
      }

      if (catB == currentCategory) {
        return 1;
      }

      return 1;
    })
    .slice(0, 4);

  const attachedResources = currentResource.attachedResources.map(
    (product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.mainCategoryName,
      featuredImage: product.featuredImage || product.image,
      ...product,
    })
  );

  const variations = currentResource.variations || [];
  const seoPrice =
    currentResource.price ||
    Math.max(...variations.map((variation) => variation.price));
  const seoInStock =
    currentResource.inStock ||
    variations.some((variation) => variation.inStock);

  let launchpadTemplate = null;
  if (currentResource.isLaunchpadTemplate) {
    try {
      const template = await getLaunchpadTemplate(
        currentResource.launchpadSlug
      );
      launchpadTemplate = template || null;
    } catch (error) {
      console.error(
        `Failed to get launchpad template for ${currentResource.slug}:`,
        error
      );
      launchpadTemplate = null;
    }
  }

  return {
    revalidate: 60,
    props: {
      launchpadTemplate,
      resource: currentResource,
      relatedResources: relatedResources.slice(0, 4),
      attachedResources: attachedResources.slice(0, 4),
      seo: {
        title: currentResource.name,
        description: currentResource.shortDescription,
        image: currentResource.image,
        product: {
          sku: currentResource.slug,
          image: currentResource?.image?.src || null,
          title: currentResource.name,
          description:
            currentResource.shortDescription ||
            `Checkout the ${currentResource.name} created by Ace Centre.`,
          url: `https://acecentre.org.uk/resources/${currentResource.slug}`,
          price: seoPrice,
          availability: seoInStock,
        },
      },
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
