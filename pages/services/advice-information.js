import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import styles from "../../styles/advice-information.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { InformationDays } from "../../components/information-days/information-days";
import { getAllProducts } from "../../lib/products/get-products";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { filterProducts } from "../../lib/products/filter-products";
import { ResourceList } from "../../components/resource-list/resource-list";
import { FormModal, INFO_APP_FEEDBACK } from "../../components/ms-form";

export default function EngineeringPage({ ebookResources }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/advice.jpg"
          alt="Ace Centre employee smiling whilst wearing a headset"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Advice & Information</h1>
          <p className={styles.cardDescription}>
            The Ace Centre team offer you AAC and AT support at any and every
            stage of your journey
          </p>
          <div className={styles.cardButton}>
            <Button href="/information-appointments">
              Book information appointment
            </Button>
          </div>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Advice & information</h2>
            <p>
              Whether you are just starting out or are an experienced AAC /AT
              user ready to move on the Ace Centre team are here to help.
            </p>
            <h2>Free Advice Line</h2>
            <p>
              Our advice line connects you with our clinical staff who can help
              find answers to your AAC/AT questions.
            </p>
            <p>
              Whether you are a professional, service user or carer we can help
              if you are stuck using AAC/AT, worried about someone you know or
              are new to AAC/AT and have a query.
            </p>
            <p>
              Call our advice line at{" "}
              <a href="tel:08000803115">0800 080 3115</a> and we&apos;ll connect
              you with a member of our admin team, who will put you in touch
              with a clinical colleague as soon as possible. Or send an email at{" "}
              <a href="mailto:enquiries@acecentre.org.uk">
                enquiries@acecentre.org.uk
              </a>{" "}
              and we&apos;ll try our best to reply within 48hrs.
            </p>
            <h2>Information appointments:</h2>
            <ul className={styles.list}>
              <ListItem>Free</ListItem>
              <ListItem>Twice a month</ListItem>
              <ListItem>Online appointments</ListItem>
            </ul>
            <p>
              Book an informal chat about your needs with members of the Ace
              Centre team.
            </p>
            <p>
              <strong>
                Please note that this appointment is NOT an assessment, it is an
                opportunity to reflect on a range of AAC / AT-related issues
                with members of our service delivery team.
              </strong>
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;Met with these amazing people today. At an emotional
                  stage in our story they gave us hope for the future for our
                  lovely son who is unlikely to speak. Can’t wait to get started
                  with ‘modelling’ (now I finally know what it is!) and allow
                  him to learn his own special way of talking. &quot;
                </p>
                <div>
                  <p>
                    <strong>Katie Lees</strong>
                  </p>
                  <p>
                    Parent, who attended our Information Appointment service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ResourceList
          title="Resources to get started"
          viewAllLink="/resources/all?category=getting-started"
          products={gettingStartedResources}
        /> */}
        <InformationDays />

        <ResourceList
          title="Resources to get started"
          viewAllLink="resources/all?category=made-by-ace"
          products={ebookResources}
        />
        <div className={styles.inlineCard}>
          <h2>Been to an Information Appointment?</h2>
          <p>
            Please give us some feedback help us monitor and evaluate our
            services. We will not share the data provided with anyone else
          </p>

          <FormModal form={INFO_APP_FEEDBACK}>
            {({ onClick }) => <Button onClick={onClick}>Leave feedback</Button>}
          </FormModal>
        </div>
      </main>
      <Footer />
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

export const getStaticProps = async () => {
  const featuredStory = await getSimpleStory("paul");

  const products = await getAllProducts();
  const productCategories = await getAllProductCategories();

  let { results: gettingStartedResources } = filterProducts(
    products,
    productCategories,
    {
      page: 0,
      productsPerPage: 1000,
      category: "getting-started",
    }
  );

  let { results: ebookResources } = filterProducts(
    products,
    productCategories,
    {
      page: 0,
      productsPerPage: 1000,
      category: "made-by-ace",
      subcategory: "e-books",
    }
  );

  ebookResources = ebookResources
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }))
    .slice(0, 4);

  gettingStartedResources = gettingStartedResources
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }))
    .slice(0, 4);

  return {
    props: {
      featuredStory,
      gettingStartedResources,
      ebookResources,
      seo: {
        title: "Advice & information",
        description:
          "Whether you are just starting out or you are an experienced AAC /AT user ready to move on, we offer remote and face to face support so you can chat about your needs with members of the Ace Centre team.",
      },
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
