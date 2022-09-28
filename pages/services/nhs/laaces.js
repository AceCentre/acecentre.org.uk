import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

import Avatar from "@material-ui/core/Avatar";
import { Image } from "../../../components/image";

import styles from "../../../styles/laaces.module.css";
import { InformationDays } from "../../../components/information-days/information-days";
import BuildIcon from "@material-ui/icons/Build";
import { getAllProducts } from "../../../lib/products/get-products";
import { getAllProductCategories } from "../../../lib/products/get-all-categories";
import { filterProducts } from "../../../lib/products/filter-products";
import { ResourceList } from "../../../components/resource-list/resource-list";
import { FormModal, LAACES } from "../../../components/ms-form";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Link from "next/link";

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
          <h1 className={styles.cardTitle}>
            L<span className={styles.normalWeight}>ocal</span> AAC S
            <span className={styles.normalWeight}>ervices</span> (LAACES)
          </h1>
          <p className={styles.cardDescription}>
            Supporting local AAC Services in the the North West and Thames
            Valley & Wessex regions
          </p>

          <FormModal form={LAACES}>
            {({ onClick }) => (
              <div className={styles.cardButtonContainer}>
                <Button onClick={onClick} className={styles.cardButton}>
                  Join LAACES
                </Button>
              </div>
            )}
          </FormModal>
          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <p>
              This page should be light on content. Should be engaging and easy
              to see at a glance what services people can access through LAACES.
              We should try to push people into the &apos;register with
              LAACES&apos; as much as possible.
            </p>
            <h2>What kind of support can Ace Centre offer?</h2>
            Ace Centre can support you with a variety of things to help you run
            an effective service. We can help you with:
            <ul className={styles.list}>
              <ListItem>Gathering data to use as evidence</ListItem>
              <ListItem>Approaching commissioners</ListItem>
              <ListItem>Strategic Development</ListItem>
              <ListItem>Service Implementation</ListItem>
            </ul>
            <h2>How does Ace Centre provide support?</h2>
            <p>
              You can access the support Ace Centre provides in a few ways, such
              as:
            </p>
            <ul className={styles.list}>
              <ListItem>Meetings</ListItem>
              <ListItem>Access to training opportunities</ListItem>
              <ListItem>Joint assessments</ListItem>
              <ListItem>Advice Sessions</ListItem>
            </ul>
            <div className={styles.inlineCard}>
              <h2>LAACES Loan Bank</h2>
              <p>
                We offer a loan bank service to local services where we loan
                local services devices to use with their clients. To access our
                loan bank enquire to join the LAACES program
              </p>
              <FormModal form={LAACES}>
                {({ onClick }) => (
                  <Link href="#">
                    <a
                      onClick={(event) => {
                        event.preventDefault();
                        onClick(event);
                      }}
                      className={styles.link}
                    >
                      Join now &gt;
                    </a>
                  </Link>
                )}
              </FormModal>
            </div>
          </div>
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
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const ListItem = ({ children }) => {
  return (
    <li className={styles.listItem}>
      <Avatar className={styles.listAvatar}>
        <ChevronRightIcon />
      </Avatar>
      {children}
    </li>
  );
};

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
