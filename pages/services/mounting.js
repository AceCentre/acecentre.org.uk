import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import AccessibleIcon from "@material-ui/icons/Accessible";

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
          <h1 className={styles.cardTitle}>
            Mount Assessment and Installation
          </h1>
          <p className={styles.cardDescription}>
            Our engineers can assess for and supply a wide range of mounting
            solutions.
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
            <h2>Good technology mounting and positioning gives freedom.</h2>
            <p>
              We are able to supply and fit a wide range of mounting and
              positioning systems for assistive technologies and other devices
              such as mobile phones and tablets. A device that is carefully
              positioned in a consistent, repeatable location can make a huge
              difference and will maximise efficiency.
            </p>
            <p>
              There is a wide range of mounting systems that allow devices to be
              used while in a wheelchair, when in bed or at a desk or table.
              Some mounting systems give a lot of flexibility as they can be
              used in more than one location or position.
            </p>
            <p>
              There are many factors to consider and a holistic assessment can
              be extremely important. We’re really careful to consider other
              factors too such as portability and weight. We’re fully aware how
              important it is that equipment is practical, easy to use, store
              and where appropriate adjust. Systems need to look good, be
              reliable and be robust!
            </p>
            <div className={styles.inlineCard}>
              <h2>Devices we can mount:</h2>
              <ul className={styles.list}>
                <ListItem>AAC and EC devices</ListItem>
                <ListItem>
                  Switches and access devices including joysticks
                </ListItem>
                <ListItem>Mobile phones</ListItem>
                <ListItem>Tablets and laptops</ListItem>
                <ListItem>Smart home devices</ListItem>
              </ul>
            </div>

            <h2>Wheelchair Mounting</h2>
            <p>
              We fit a wide range of mounts and systems including those from{" "}
              <a href="https://rehadapt.com/">Rehadapt</a>,{" "}
              <a href="https://www.aacmounts.com/mmweb/">Daessy</a>,{" "}
              <a href="https://www.mountnmover.com/">Mount'n Mover</a>,{" "}
              <a href="https://www.mo-vis.com/products/mounting-systems">
                Mo-vis
              </a>{" "}
              and{" "}
              <a href="https://ideasfil.com/lift-and-lock.html">
                Ideas for Independent Living.
              </a>
            </p>
            <p>
              Typically we would carry out an assessment and produce a
              specification of the system that best met the client needs. You
              could either purchase that yourself and we would fit it, or we
              could supply it on your behalf.{" "}
              <Link href="/services/rehadapt">
                We’re able to fit mounting systems specified as part of the
                Rehadapt Virtual Mounting Service.
              </Link>
            </p>
            <h2>Specialist Mounting</h2>
            <p>
              Sometimes it’s necessary to consider more specialised mounting
              systems.
            </p>
            <p>
              If the technology is used primarily in one room, a wall-mounted or
              ceiling mount such as those manufactured by{" "}
              <a href="https://www.ergotron.com/">Ergotron</a> may be
              appropriate. Powered mounts can be useful to enable a
              communication device (perhaps the Pow!r Mounts from{" "}
              <a href="https://www.mountnmover.com/products/powr-mounts">
                Mount'n Mover
              </a>
              ) or access device (perhaps using a{" "}
              <a href="https://www.mo-vis.com/products/mounting-systems/multi-swing">
                Multi Swing from Mo-vis
              </a>
              ) to be moved out of the way using a switch.{" "}
            </p>
            <h2>How can I order this?</h2>
            <p>
              Arranging an assessment for fitting of a mounting system is really
              simple. We have standard prices for fitting, but we can arrange a
              quotation to assess for, supply and fit a mounting system.
            </p>
            <ol className={styles.orderedList}>
              <OrderedListItem>
                <FormModal form={CONTACT_FORM}>
                  {({ onClick }) => (
                    <a className={styles.clickableLink} onClick={onClick}>
                      Request a quotation using this form.
                    </a>
                  )}
                </FormModal>
              </OrderedListItem>
              <OrderedListItem>
                Appointment confirmed once purchase order or payment received
              </OrderedListItem>
              <OrderedListItem>
                Assessment and fitting appointments carried out and will include
                training
              </OrderedListItem>
              <OrderedListItem>
                Follow up documentation provided by email where required.
              </OrderedListItem>
            </ol>
            <h2>Pricing</h2>
            <p>
              We have a simple pricing structure. We can complete the activity
              at either of our centres in Oldham or Abingdon or at your address.
            </p>
            <ul className={styles.list}>
              <ListItem>
                £295 to fit the first system and £95 for each additional system
                at your location
              </ListItem>
              <ListItem>
                £295 to provide an assessment, supply and fit the first system
                and £95 for each additional system at one of our assessment
                centres.
              </ListItem>
              <ListItem>
                £395 to provide an assessment, supply and fit for the first
                client and £150 for each additional client at your location.
              </ListItem>
              <ListItem>
                Prices for equipment varies, but a standard wheelchair mounting
                system is likely to cost between £250 and £750 depending on the
                weight of the device being mounted.
              </ListItem>
            </ul>
            <p>
              Fitting includes training in the use of the equipment, supply of
              relevant documentation and a risk assessment document.
            </p>
            <p>
              We are also able to carry out additional support services
              including servicing, maintenance and adjustments when required.
              Please do{" "}
              <FormModal form={CONTACT_FORM}>
                {({ onClick }) => (
                  <a className={styles.clickableLink} onClick={onClick}>
                    get in touch using this form
                  </a>
                )}
              </FormModal>{" "}
              for more information.
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AccessibleIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <h3>Rehadapt Mounting Service</h3>
                <p>
                  Ace Centre engineers and technicians can fit Rehadapt mounting
                  system. Checkout our Rehadapt mounting service.
                </p>
                <div className={styles.downloadButtonContainer}>
                  <Button href="/services/rehadapt">
                    Rehadapt Mounting Service
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
        title: "Mount Installation",
        description:
          "Our engineers can assess for and supply a wide range of mounting solutions.",
      },
    },
  };
});
