import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllProducts } from "../../lib/products/get-products";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import { NewsletterSignup } from "../../components/resources-download/resources-download";

import styles from "../../styles/resources-detail.module.css";
import { ProjectHighlight } from "../../components/project-highlight/project-highlight";
import { ResourceList } from "../../components/resource-list/resource-list";
import { ResourceFullDescription } from "../../components/resource-full-description/resource-full-description";
import { ProductFaqs } from "../../components/product-faqs/product-faqs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Image } from "../../components/image";

export default function ResourceDetail({
  resource,
  relatedResources,
  attachedResources,
}) {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelLink, setModelLink] = useState(
    "https://docs.acecentre.org.uk/look2talk/"
  );
  const router = useRouter();
  const { query } = router;

  const storageKey = "look2talk-opt-in";

  // eslint-disable-next-line no-unused-vars
  const openPopup = (newModelLink) => {
    if (localStorage.getItem(storageKey) === "true") {
      router.push(newModelLink);
    } else {
      setModelOpen(true);
      setModelLink(newModelLink);
    }
  };

  useEffect(() => {
    console.log("EFFECT RUNNING", query.look2talk, query);
    if (query.look2talk !== undefined) {
      setModelOpen("https://docs.acecentre.org.uk/look2talk/");
    }
  }, [query.look2talk]);
  const onClose = () => setModelOpen(false);

  const { currentYear } = useGlobalProps();

  const project = resource.projects[0] || null;

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="3xl"
        isCentered
        isOpen={modelOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody style={{ padding: "2rem" }}>
            <div className={styles.topSection}>
              <h2>Look2Talk + Newsletter</h2>
              <p>To access content join our mailing list. Placeholder text</p>
            </div>

            <div className={styles.newsletterContainer}>
              <NewsletterSignup
                withNames
                signUpIdentifier={"look2talk"}
                tags={[{ name: "look2talk" }]}
                onSuccess={() => {
                  localStorage.setItem(storageKey, true);
                  router.push(modelLink);
                }}
              />
            </div>
            <div className={styles.bottomContainer}>
              <button className={styles.closeButton} onClick={onClose}>
                Close window
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="all resources" href="/resources/all" />
        <div className={styles.bannerArea}>
          <Image
            layout="fill"
            objectFit="cover"
            src="/look2talk-banner.jpg"
            alt={
              "Look2Talk logo at the top. Below is a communication easel with a Look2Talk chart. In the middle is a guidebook. On the right is boardmaker with the templates open."
            }
          />
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
      </main>
      <Footer currentYear={currentYear} />
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

export const getStaticProps = withGlobalProps(async () => {
  const slug = "look2talk";
  const allProducts = await getAllProducts(true);

  if (!allProducts) throw new Error("Could not get all the products");

  const currentResource = allProducts.find((product) => product.slug === slug);

  console.log(currentResource);

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

  const seoPrice = currentResource.price;
  const seoInStock = currentResource.inStock;

  return {
    props: {
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
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
