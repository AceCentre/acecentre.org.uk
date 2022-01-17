import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import styles from "../../styles/engineering.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { FeaturedStory } from "../../components/featured-story/featured-story";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";
import Link from "next/link";

export default function EngineeringPage({ featuredStory, allPosts }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/engineering.jpg"
          alt="An engineering using a 3D printer"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Engineering</h1>
          <p className={styles.cardDescription}>
            Engineering: Innovation, design and technology for everyone.
          </p>

          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Enquire about engineering</Button>
              </div>
            )}
          </FormModal>

          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 080 3115</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>
              Building and creating individual solutions – we don’t believe in
              ‘can’t’
            </h2>
            <p>
              We have a strong and developing engineering and technical team
              that can support and enhance your own multi-disciplinary team. Our
              skills can compliment those you already offer in areas such as:
            </p>
            <ul className={styles.list}>
              <ListItem>
                Powered wheelchair programming, integration and special controls
              </ListItem>
              <ListItem>
                Integration of powered mobility with other assistive
                technologies such as tablets, computers and mobile phones
              </ListItem>
              <ListItem>
                Multi disciplinary assessment with members of our or your teams
                for complex access or control solutions.
              </ListItem>
              <ListItem>
                Registered Rehabilitation Engineers to work with your
                multidisciplinary team in clinic in the provision of wheelchair,
                seating or other electronic assistive technologies.
              </ListItem>
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
              technical support on a contract basis for a period of time to
              cover absence, for a specific number of hours per month or to
              increase the capacity of your service for the short or medium
              term. All members of our team who provide this support have had an
              enhanced DBS check, are fully competent and registered where
              appropriate.
            </p>
            <p>This type of support of really well suited to:</p>
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
                  &quot;The challenges of mounting AAC devices and finding
                  access solutions for individuals with complex needs in a range
                  of settings drives my interest in engineering. We get the
                  opportunity to design and create bespoke components that
                  really make a difference to people&apos;s lives.&quot;
                </p>
                <div>
                  <p>
                    <strong>Diane Arthurs</strong>
                  </p>
                  <p>Senior AAC Engineer</p>
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
        <div className={styles.extraSpacing}>
          <FeaturedStory {...featuredStory} />
        </div>
        {allPosts.length > 0 && (
          <div className={styles.extraSpacing}>
            <FeaturedPosts
              title="Engineering on the blog"
              posts={allPosts}
              smallCards
            />
          </div>
        )}
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
  const featuredStory = await getSimpleStory("patrick");
  const unfilteredPosts = await getAllFullPosts();

  const allPosts = unfilteredPosts
    .filter((x) => x.mainCategoryName === "engineering")
    .slice(0, 4);

  return {
    props: {
      featuredStory,
      allPosts,
      seo: {
        title: "Engineering",
        description:
          "Our highly skilled multi-disciplinary team design and develop innovative assistive technology solutions. We use the latest tools for design and manufacture to maximise the simplicity and effectiveness of the solution and minimise costs.",
      },
    },
  };
});
