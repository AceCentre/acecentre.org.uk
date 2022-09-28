import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

// import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Avatar from "@material-ui/core/Avatar";
import { Image } from "../../../components/image";

import styles from "../../../styles/nhs-assessment.module.css";
// import { FeaturedStory } from "../../../components/featured-story/featured-story";
import { InformationDays } from "../../../components/information-days/information-days";
import BuildIcon from "@material-ui/icons/Build";
import { getAllProducts } from "../../../lib/products/get-products";
import { getAllProductCategories } from "../../../lib/products/get-all-categories";
import { filterProducts } from "../../../lib/products/filter-products";
import { ResourceList } from "../../../components/resource-list/resource-list";
import { CONTACT_FORM, FormModal } from "../../../components/ms-form";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

export default function Laaces({ gettingStartedResources }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav
          nhsTitle="NHS England Local AAC Services"
          defaultNavItems={defaultNavItems}
          nhs
        />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/laaces-cropped.png"
          alt="A child laughing using a communication book"
          nhs
          heightClass={styles.coverHeight}
          imageClassName={styles.imageClassNameLaaces}
          coverImageContainerClassName={styles.coverImageContainerLaaces}
        >
          <h1 className={styles.cardTitle}>Local AAC Services</h1>
          <p className={styles.cardDescription}>
            Supporting local AAC Services in the the North West and Thames
            Valley & Wessex regions
          </p>

          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButtonContainer}>
                <Button onClick={onClick} className={styles.cardButton}>
                  Make an online enquiry
                </Button>
              </div>
            )}
          </FormModal>
          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}></div>
          <div>
            <div className={styles.serviceProvidedByContainer}>
              <p>Service provided by:</p>
              <Image
                height={152}
                width={290}
                maxHeight={90}
                src={"/nav-logo.png"}
                alt="The Ace Centre logo"
              ></Image>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;LAACES is a great thing that we use lots. This should be
                  a real quote from pretty much anyone&quot;
                </p>
                <div>
                  <p>
                    <strong>Jane Smith</strong>
                  </p>
                  <p>Local Service SaLT</p>
                </div>
              </div>
            </div>

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <BuildIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>AAC Services Toolkit</strong>
                </p>
                <p>
                  The Local Services Working Party created a Local AAC Services
                  Commissioning Toolkit to signpost professionals working in the
                  field to useful resources, which can support the establishment
                  of a local AAC service
                </p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://localaactools.co.uk/"
                  >
                    View toolkit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays nhs />
        <ResourceList
          title="Resources to get started"
          viewAllLink="/resources/all?category=getting-started"
          products={gettingStartedResources}
          className={styles.resourcesList}
        />
        {/* <FeaturedStory nhs {...featuredStory} /> */}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const products = await getAllProducts();
  const productCategories = await getAllProductCategories();

  const { results: gettingStartedResources } = filterProducts(
    products,
    productCategories,
    {
      page: 0,
      productsPerPage: 1000,
      category: "getting-started",
    }
  );
  const resources = gettingStartedResources.map((product) => ({
    title: htmlDecode(product.name),
    mainCategoryName: product.category.name,
    featuredImage: product.image,
    ...product,
  }));

  return {
    props: {
      gettingStartedResources: resources.slice(0, 4),

      seo: {
        title: "LAACES",
        description:
          "Ace Centre is committed to help support the establishment and development of local AAC services in both the Thames Valley & Wessex and Northwest regions within which we provide the NHSE Specialised AAC Services.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
