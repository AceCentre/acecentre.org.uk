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

import styles from "../../styles/mounting.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { getAllFullPosts } from "../../lib/posts/get-posts";
import { CONTACT_FORM, FormModal } from "../../components/ms-form";
import Link from "next/link";

export default function MountingPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/services/mounting.jpeg"
          alt="Person with an AAC device mounted to their wheelchair"
          imageClassName={styles.coverImage}
          heightClass={styles.coverHeight}
        >
          <h1 className={styles.cardTitle}>Mount Installation</h1>
          <p className={styles.cardDescription}>
            Fitting mounts to allow you to take your device with you.
            [PLACEHOLDER TEXT]
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
            <h2>
              Mounting AAC Devices give an individual freedom. [PLACEHOLDER]
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>Rehadapt Mounts</h2>
            <p>
              We work in partnership with Rehadapt to fit mounts purchased from
              them. Follow the steps below to get a Rehadapt mount and have us
              fit it for you.
            </p>
            <ol className={styles.orderedList}>
              <OrderedListItem>
                Go to the Rehadapt website and{" "}
                <Link href="https://rehadapt.com/vms/">
                  complete their virtual mounting application.
                </Link>
              </OrderedListItem>
              <OrderedListItem>
                Rehadapt engineers will create a mounting solution for you that
                you then approve and purchase
              </OrderedListItem>
              <OrderedListItem>
                Contact us at Ace Centre{" "}
                <FormModal form={CONTACT_FORM}>
                  {({ onClick }) => (
                    <a className={styles.clickableLink} onClick={onClick}>
                      using this form
                    </a>
                  )}
                </FormModal>{" "}
                to book a time for us to come and install the mount for you.
              </OrderedListItem>
              <OrderedListItem>
                Start enjoying your mounted AAC Device!
              </OrderedListItem>
            </ol>
            <p>
              Whilst these technologies sound complex, they help us to keep
              things simple! We consider all options during development,
              including solutions that are already available.
            </p>
            <h2>Mounts and more</h2>
            <p>
              We work in partnership with Mounts and more by providing a fitting
              service to individuals in the UK. Follow the steps below to get
              your mounts and more mount fitted by Ace Centre.
            </p>
            <ol className={styles.orderedList}>
              <OrderedListItem>
                <FormModal form={CONTACT_FORM}>
                  {({ onClick }) => (
                    <a className={styles.clickableLink} onClick={onClick}>
                      Contact us using this form
                    </a>
                  )}
                </FormModal>{" "}
                and let us know what your mounting needs are.
              </OrderedListItem>
              <OrderedListItem>
                We will get back to you with suggestions about what mount you
                should buy from Mounts and more.
              </OrderedListItem>
              <OrderedListItem>
                You will then order the mound directly from mounts and more.
              </OrderedListItem>
              <OrderedListItem>
                We will book in a time for us to come and install the mount for
                you.
              </OrderedListItem>
              <OrderedListItem>
                Start enjoying your mounted AAC Device!
              </OrderedListItem>
            </ol>
            <div className={styles.inlineCard}>
              <h2>Pricing</h2>
              <ul className={styles.list}>
                <ListItem>One mount is a thousand million pounds</ListItem>
                <ListItem>Every additional mount is one pound</ListItem>
                <ListItem>One pound per mile travelled</ListItem>
                <ListItem>Additional fee for short notice appointment</ListItem>
              </ul>
              <p>
                <i>
                  *These prices are just a guide, once you get in contact we
                  will give a specific quote and invoice for your installation.
                </i>
              </p>
            </div>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam.&quot;
                </p>
                <div>
                  <p>
                    <strong>Bill Gates</strong>
                  </p>
                  <p>AAC User</p>
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
        title: "Mount Installation",
        description: "[PLACEHOLDER]",
      },
    },
  };
});
