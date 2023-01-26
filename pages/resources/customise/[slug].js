import { BackToLink } from "../../../components/back-to-link/back-to-link";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { LaunchpadPage } from "../../../components/launchpad-generate/launchpad-generate";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav-items";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalPropsNoRevalidate } from "../../../lib/global-props/inject";
import { getLaunchpadTemplate } from "../../../lib/launchpad";
import { getAllProducts } from "../../../lib/products/get-products";

export default function ResourceDetail({
  resource,
  relatedResources,
  attachedResources,
  launchpadTemplate,
}) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="all resources" href="/resources/all" />

        <LaunchpadPage
          launchpadTemplate={launchpadTemplate}
          resource={resource}
          attachedResources={attachedResources}
          relatedResources={relatedResources}
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getServerSideProps = withGlobalPropsNoRevalidate(
  async ({ params: { slug } }) => {
    const allProducts = await getAllProducts(true);

    if (!allProducts) throw new Error("Could not get all the products");

    const currentResource = allProducts.find(
      (product) => product.slug === slug
    );

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
        mainCategoryName: product.category.name,
        featuredImage: product.image,
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

    if (!currentResource.isLaunchpadTemplate) {
      return {
        redirect: {
          destination: `/resources/${currentResource.slug}`,
          permanent: true,
        },
      };
    }
    const launchpadTemplate = await getLaunchpadTemplate(currentResource.slug);
    return {
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
  }
);

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
