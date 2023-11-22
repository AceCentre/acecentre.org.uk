import { Button } from "../components/button/button";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { Footer } from "../components/footer/footer";
import { CONTACT_FORM, FormModal } from "../components/ms-form";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { getAllPostCards } from "../lib/posts/get-posts";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import styles from "../styles/at-scholar.module.css";
import Link from "next/link";

export default function AtScholar({ posts }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} atScholar />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/atscholar-banner.jpg"
          alt="A child laughing"
          atScholar
          heightClass={styles.coverHeight}
        >
          <p className={styles.cardDescription}>
            AT Scholar funds top AT professionals to experience the world’s top
            assistive technology event.
          </p>
          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButtonContainer}>
                <Button onClick={onClick} className={styles.cardButton}>
                  Ask us a question
                </Button>
              </div>
            )}
          </FormModal>
        </VideoWithCardCover>

        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>A nice heading here</h2>
            <p>
              We have a strong and developing engineering and technical team
              that can support and enhance your own multi-disciplinary team. Our
              skills can compliment those you already offer in areas such as:
            </p>
            <ul className={styles.list}>
              <ListItem>Point 1</ListItem>
              <ListItem>Point 1</ListItem>
              <ListItem>Point 1</ListItem>
              <ListItem>Point 1</ListItem>
            </ul>
            <p>
              Using our in-house workshops that we complement with external
              partners and consultants we are able to manufacture a wide range
              of devices and bespoke assistive technologies including:
            </p>
            <ul className={styles.list}>
              <ListItem>
                Custom moulded access devices such as switches and joystick tops
                using digital manufacturing including 3D scanning and 3D
                printing.
              </ListItem>
              <ListItem>Complex mounting and positioning systems</ListItem>
              <ListItem>Specialist seating and mobility components</ListItem>
            </ul>
            <p>
              We can enhance your team with Rehabilitation Engineering or other
              technical support on a contract basis for a defined period of time
              to cover absence, for a specific number of hours per month or to
              increase the capacity of your service for the short or medium
              term. All members of our team who provide this support have had an
              enhanced DBS check, are fully competent and registered where
              appropriate.
            </p>
            <p>This type of support of ideally suited to:</p>
            <ul className={styles.list}>
              <ListItem>NHS Wheelchair services</ListItem>
              <ListItem>
                Commercial seating, mobility, assistive technology and postural
                management service providers
              </ListItem>
              <ListItem>Charitable organisations</ListItem>
            </ul>
            <p>
              For more information please do{" "}
              <FormModal form={CONTACT_FORM}>
                {({ onClick }) => (
                  <a className={styles.clickableLink} onClick={onClick}>
                    get in touch with us using this form
                  </a>
                )}
              </FormModal>{" "}
              or <Link href="/contact">contact us.</Link>
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;AT Scholar is great. I really enjoyed it. its brilliant.
                  AT Scholar is great. I really enjoyed it. its brilliant.&quot;
                </p>
                <div>
                  <p>
                    <strong>John Smith</strong>
                  </p>
                  <p>Person</p>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <ContentPasteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>Application</h3>
                <p>
                  Fill out the application to be considered for next years round
                  of AT Scholar
                </p>
                <div className={styles.downloadButtonContainer}>
                  <Button href="/">Application</Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2>Pricing</h2>
            <p>
              We’ve provided below our standard pricing and guide pricing for
              additional services. Please do get in touch for more information
              and a detailed quotation.
            </p>
            <div className={styles.pricingButton}>
              <Button newTab href="/engineering-pricing.pdf">
                Download pricing
              </Button>
            </div>
          </div>
        </div>

        <FeaturedPosts title="AT Scholar Blog" posts={posts} />
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
  const blogPosts = (await getAllPostCards()).filter(
    (x) => x.mainCategoryName == "AT Scholar"
  );

  return {
    props: {
      posts: blogPosts,
      seo: { title: "AT Scholar" },
    },
  };
};
