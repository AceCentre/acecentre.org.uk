import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Avatar from "@material-ui/core/Avatar";

import AccessibleIcon from "@material-ui/icons/Accessible";

import styles from "../../styles/mounting.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";

export default function MountingPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/rehadapt.png"
          alt="Person with an AAC device mounted to their wheelchair"
          imageClassName={styles.coverImageRehadapt}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Rehadapt</h1>
          <p className={styles.cardDescription}>
            We can fit mounting systems specified by the Rehadapt Virtual
            Mounting System.
          </p>

          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButton}>
                <Button onClick={onClick}>Enquire about mounting</Button>
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
              Rehadapt design, manufacture and supply a wide range of mounting
              solutions for a number of environments. They provide a Virtual
              Mounting Service (VMS) – a quick and easy way to specify a
              wheelchair mount that will exactly meet your needs.{" "}
              <a href="https://rehadapt.com/360-degrees-of-mounting/">
                This is part of their 360 degrees of Mounting approach.
              </a>
            </p>
            <p>
              Our Ace Centre engineers and technicians can fit the specified
              mounting system for you either at one of our sites in Oldham or
              Abingdon or at your location.
            </p>
            <p>
              There are many factors to consider and a holistic assessment can
              be extremely important. We’re really careful to consider other
              factors too such as portability and weight. We’re fully aware how
              important it is that equipment is practical, easy to use, store
              and where appropriate adjust. Systems need to look good, be
              reliable and robust!
            </p>
            <h2>How does it work?</h2>
            <p>It’s a really simple process:</p>
            <ol className={styles.orderedList}>
              <OrderedListItem>
                Contact Rehadapt using their{" "}
                <a href="https://rehadapt.com/vms/">Virtual Mounting Service</a>
              </OrderedListItem>
              <OrderedListItem>
                Order the mounting system specified through your preferred
                reseller
              </OrderedListItem>
              <OrderedListItem>
                Order the fitting service through us. If you would like a
                written quotation,{" "}
                <FormModal form={CONTACT_FORM}>
                  {({ onClick }) => (
                    <a className={styles.clickableLink} onClick={onClick}>
                      please contact us using this form.
                    </a>
                  )}
                </FormModal>{" "}
              </OrderedListItem>
              <OrderedListItem>
                Appointment confirmed once purchase order or payment received
              </OrderedListItem>
              <OrderedListItem>
                Fitting appointments carried out which will include training{" "}
              </OrderedListItem>
              <OrderedListItem>
                Follow up documentation provided by email where required.{" "}
              </OrderedListItem>
            </ol>

            <h2>Pricing</h2>
            <ul className={styles.list}>
              <ListItem>
                £295 for the first system and £95 for each additional system at
                your location within UK mainland.
              </ListItem>
              <ListItem>
                For locations more than 2 hours from our Oldham or Abingdon
                office locations, please contact us to confirm pricing.
              </ListItem>
            </ul>
            <p>
              As part of this service we’ll carefully check that any
              requirements from your wheelchair provider are met and complete an
              appropriate risk assessment for you or your organisation. We will
              provide appropriate training on how the use the mounting system.
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AccessibleIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>Rehadapt Virtual Mounting Service</h3>
                <p>
                  This is a quick and easy way to your custom made wheelchair
                  mount
                </p>
                <div className={styles.downloadButtonContainer}>
                  <Button href="https://rehadapt.com/vms/">
                    Virtual Mounting Service
                  </Button>
                </div>
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

const OrderedListItem = ({ children }) => {
  return <li className={styles.orderedListItem}>{children}</li>;
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
        title: "Rehadapt Mount Fitting",
        description:
          "We can fit mounting systems specified by the Rehadapt Virtual Mounting System.",
      },
    },
  };
});
