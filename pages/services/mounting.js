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
              Building and creating individual solutions – we don’t believe in
              ‘can’t’
            </h2>
            <p>
              Our highly skilled multi-disciplinary team design and develop
              innovative assistive technology solutions. We use the latest tools
              for design and manufacture to maximise the simplicity and
              effectiveness of the solution and minimise costs. We’re completely
              client-focussed and understand the challenging requirements of
              assistive technologies.
            </p>
            <p>
              In addition to supporting our work providing the NHS England
              Specialised AAC Service in the North West and Thames Valley and
              Wessex, we provide a wide range of services directly to
              individuals and families, charities, service providers, education
              and commercial organisations.
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
            <div className={styles.inlineCard}>
              <h2>Individuals and families</h2>
              <ul className={styles.list}>
                <ListItem>Design and development of bespoke solutions</ListItem>
                <ListItem>
                  Advice on how to develop or manufacture a solution you’ve come
                  up with
                </ListItem>
                <ListItem>
                  Signposting to useful organisations or developing and
                  implementing access solutions to mainstream devices; using a
                  powerchair joystick to control a tablet for example.
                </ListItem>
                <ListItem>
                  Mounting and positioning assistive technologies and access
                  devices.
                </ListItem>
                <ListItem>Simply helping with ideas!</ListItem>
              </ul>
            </div>
            <div className={styles.inlineCard}>
              <h2>Charities and service providers</h2>
              <ul className={styles.list}>
                <ListItem>
                  Integration of assistive technologies to enhance access to
                  work, education or leisure activities
                </ListItem>
                <ListItem>Training and competency development</ListItem>
                <ListItem>
                  Carrying out or supporting assessments of complex access to
                  assistive technologies such as powered mobility, environmental
                  control and computer access
                </ListItem>
                <ListItem>
                  Mounting and positioning assistive technologies and access
                  devices.
                </ListItem>
                <ListItem>Consultancy for regulatory compliance</ListItem>
              </ul>
            </div>
            <div className={styles.inlineCard}>
              <h2>Commercial organisations</h2>
              <ul className={styles.list}>
                <ListItem>Early stage advice</ListItem>
                <ListItem>
                  Supporting your product development programme with a
                  multi-disciplinary team with wide-ranging skills and knowledge
                  of assistive technology
                </ListItem>
                <ListItem>Training and development</ListItem>
                <ListItem>Targeted user testing and focus groups</ListItem>
                <ListItem>
                  Consultancy for national and European regulatory compliance
                </ListItem>
              </ul>
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
