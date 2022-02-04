import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import styles from "../styles/communication-works.module.css";
import { getSimpleStory } from "../lib/story/get-story";

import { getAllProducts } from "../lib/products/get-products";
import { getAllProductCategories } from "../lib/products/get-all-categories";
import { filterProducts } from "../lib/products/filter-products";
import { Image } from "../components/image";
import { MailingList } from "../components/service-finder-mailing-list/service-finder-mailing-list";
import Link from "next/link";
import AssignmentIcon from "@material-ui/icons/Assignment";
export default function CommunicationWorks() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.imageContainer}>
          <Image
            src="/CW2022.png"
            alt="Communication works banner"
            width={1640}
            height={924}
          />
        </div>
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

            <MailingList
              signUpIdentifier="communication-works"
              description="Sign up to our free newsletter to get emails about other Ace Centre events and news."
            />
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AssignmentIcon className={styles.icon} />
              </Avatar>
              <div>
                <h3>Communication Works NORTH</h3>
                <p>26 May 2022 | 10am-4pm</p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/255181132637">
                    Register Here
                  </Link>
                </p>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AssignmentIcon className={styles.icon} />
              </Avatar>
              <div>
                <h3>Communication Works SOUTH</h3>
                <p>19 May 2022 | 10am-4pm</p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/252057730457">
                    Register Here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
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
        title: "Communication Works 2022",
        description: "Description needed",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
