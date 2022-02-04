import { Button } from "../components/button/button";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../styles/communication-works.module.css";
import { getSimpleStory } from "../lib/story/get-story";
// import { FeaturedStory } from "../components/featured-story/featured-story";
import { InformationDays } from "../components/information-days/information-days";
import { getAllProducts } from "../lib/products/get-products";
import { getAllProductCategories } from "../lib/products/get-all-categories";
import { filterProducts } from "../lib/products/filter-products";
import { ResourceList } from "../components/resource-list/resource-list";
import { FormModal, INFO_APP_FEEDBACK } from "../components/ms-form";

export default function EngineeringPage({
  // featuredStory,
  gettingStartedResources,
}) {
  const { currentYear } = useGlobalProps();

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
              Whether you are just starting out or you are an experienced AAC
              /AT user ready to move on, we offer remote and face to face
              support so you can chat about your needs with members of the Ace
              Centre team.
            </p>
            <h2>Free Advice Line</h2>
            <p>
              Perhaps you have a problem or a question about AAC/AT or you are
              worried about someone you know? Using AAC/AT and stuck? New to
              AAC/AT?
            </p>
            <p>
              Give our helpline a call or send an email. Our clinical staff are
              pleased to help you find solutions
            </p>
            <p>For professionals, service users, carers or others.</p>
            <h2>Information appointments:</h2>
            <ul className={styles.list}>
              <ListItem>Free</ListItem>
              <ListItem>Twice a month</ListItem>
              <ListItem>Appointments last one hour</ListItem>
            </ul>
            <p>
              Whether you are just starting out or you are an experienced AAC
              /AT user ready to move on, book in for an informal chat about your
              needs with members of the Ace Centre team.
            </p>
            <p>
              Please note that this appointment is NOT an assessment, but
              instead it is an opportunity to reflect on a range of AAC /
              AT-related issues with members of our service delivery team.
            </p>
            <p>
              At Ace Centre, we believe that information should be accessible to
              all, up-to-date, unbiased and, ideally, free at source to people
              in need. This is why we provide free information appointments
              every month. Information Appointments are offered on 2 days per
              month. Each information day consists of five separate one hour
              appointments which are completely free. These appointments do not
              provide a full AT/AAC assessment, but they are an opportunity to
              meet informally with our staff and discuss your needs. So, whether
              you are new to AAC/AT and trying to find a starting point, or you
              are already using AAC/AT and want to know how to move on, book in
              for a video-call session with our staff. You may also be offered
              an information appointment if your referral for assessment through
              the Specialised AAC Services has been unsuccessful. If so,
              appointments could be used to discuss other options for funding,
              to gather more information to help with your referral to Ace
              Centre, and/or to consider other possible next steps.
            </p>

            <div className={styles.inlineCard}>
              <h2>Information appointment feedback</h2>
              <p>
                We will use the information you provide solely to monitor and
                evaluate our services, and we will not share the data with
                anyone else.
              </p>

              <FormModal form={INFO_APP_FEEDBACK}>
                {({ onClick }) => (
                  <Button onClick={onClick}>Leave feedback</Button>
                )}
              </FormModal>
            </div>
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
        <ResourceList
          title="Resources to get started"
          viewAllLink="/resources/all?category=getting-started"
          products={gettingStartedResources}
        />
        <InformationDays />
        {/* <div className={styles.extraSpacing}>
          <FeaturedStory {...featuredStory} />
        </div> */}
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
  const featuredStory = await getSimpleStory("paul");

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
      featuredStory,
      gettingStartedResources: resources.slice(0, 4),
      seo: {
        title: "Advice & information",
        description:
          "Whether you are just starting out or you are an experienced AAC /AT user ready to move on, we offer remote and face to face support so you can chat about your needs with members of the Ace Centre team.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
