import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import styles from "../../styles/atun.module.css";

export default function Atun() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/atun-cover.jpeg"
          alt="A child laughing"
          heightClass={styles.coverHeight}
          imageClassName={styles.image}
        >
          <p className={styles.cardDescription}>
            The <strong>Assistive Tech User&apos;s Network (ATUN)</strong> puts
            users at the heart of innovation.
          </p>

          <div className={styles.cardButtonContainer}>
            <Button
              href="mailto:wwade@acecentre.org.uk?subject=Joining%20ATUN&body=Hi%20Will%0D%0A%0D%0AI%20would%20like%20to%20join%20the%20Accessible%20Tech%20User'%20Network.%0D%0A%0D%0AThanks"
              className={styles.cardButton}
            >
              Join the Network
            </Button>
          </div>
        </VideoWithCardCover>

        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Our Vision</h2>
            <p>
              Ace Centre&apos;s vision is a society where everyone is given the
              support they need to communicate, be understood and fulfil their
              potential. We believe that this vision can only be achieved by
              open and collaborative working.
            </p>
            <p>How we aim to achieve this goal by:</p>
            <ul className={styles.list}>
              <ListItem>
                Open Development. We work with organisations (Academic, Business
                or Non-Profit) who share our goal and wish to collaborate on
                innovation in the field. This may be in service delivery or
                products. We may support this by providing services such as
                clinical trial support or insights into learnings from our work.
                Equally, there may be times when the Charity supports teams
                directly with its financial contributions.
              </ListItem>
              <ListItem>
                Putting Users at the heart of innovation. Providing a space for
                different key stakeholder groups to contribute to the planning,
                development, trial and evaluation of products, resources and/or
                services, i.e. all stages of development. Having an authentic
                voice to drive the development of the sector
              </ListItem>
              <ListItem>
                Valuing knowledge. We feel it is imperative that we actively
                value end users of AT. This is a two-way process. To fully value
                members means giving them meaningful and purposeful roles within
                the network. We will support members to help develop and improve
                the network and ongoing outcomes
              </ListItem>
              <ListItem>
                Providing a forum for end users and professionals in the sector
                to meet and share experiences. We value the need for both
                face-to-face and distance communication.
              </ListItem>
            </ul>
            <p>
              To meet these aims, we feel that a new members network to help
              facilitate the development of the field is essential. Ace Centre
              is well suited to do this, being a charity and where we can fund
              the administration of such a group where other organisations may
              struggle to do this for the long term. We want to facilitate the
              members to shape the organisation. Ultimately, we plan to recruit
              to the Assitive Tech User&apos;s Network(ATUN) - from three main
              groups:
            </p>

            <ul className={styles.list}>
              <ListItem>
                Users - people who use Assistive Technology (AT). Focusing on
                electronic Assistive Technology.
              </ListItem>
              <ListItem>
                Supporters - including family members and caregivers
              </ListItem>
              <ListItem>
                Professionals - education, health and social care professionals
                working to provide local, regional and national Assistive
                Technology services and support
              </ListItem>
            </ul>

            <h2>Why ATUN?</h2>
            <p>
              As mentioned above, this is a working title. We settled on this
              after a discussion with end users and staff. But really this
              discussion group has been a small group to this point hence
              leaving it flexible. However, we needed something to get started.
            </p>
            <ul className={styles.list}>
              <ListItem>
                We wanted it to be owned by end users. As much as Ace Centre is
                keen to invest in end users&apos; opinions and lived experience,
                the charity does not own their views. So, for this reason, we
                felt removing the Ace Centre&apos;s name from the title was
                important (an earlier version was &quot;Ace Centre Experts
                Network&apos;).
              </ListItem>
              <ListItem>
                As such, it&apos;s not about Assistive Technology. The focus is
                on the end users&apos; experience and interactions with
                technology. We felt keeping to &quot;accessible&quot; tech
                rather than &quot;assistive&quot; made this differentiation
                clearer. It&apos;s about anything that makes technology
                accessible. A game controller isn&apos;t per se an assistive
                technology - but it might make your iPad accessible if you have
                difficulties controlling your hands.{" "}
              </ListItem>
              <ListItem>
                ATUN is Spanish (Atún, at least) for Tuna. Atun is also a name
                meaning Educator, Teacheress, One who Teaches or New - used
                principally in Malayalam, Marathi, Arabic, Tamil, Telugu, Oriya,
                Gujarati, Bengali, Hindi and Kannada has its origin in the
                Arabic language. We are keen on supporting all nationalities and
                languages, so again, we feel this is a fitting name.
              </ListItem>
              <ListItem>
                &quot;In Native American culture, tuna symbolises good luck and
                abundance. The fish is also associated with strength, courage,
                and perseverance. Tuna is also a popular totem animal. A totem
                is an animal that is revered and respected by a particular group
                of people. In some cultures, it is believed that a person can
                take on the qualities of their totem animal.&quot;
              </ListItem>
            </ul>
          </div>

          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;The network is great, i find it a valuable asset to the
                  community.&quot;
                </p>
                <div>
                  <p>
                    <strong>John Smith</strong>
                  </p>
                  <p>Network Member</p>
                </div>
              </div>
            </div>

            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <MenuBookIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  Check out our easy read guide about the network and how to
                  join.
                </p>
                <div className={styles.buttonPadding}>
                  <Button download href={"/easy-read-atun.pdf"}>
                    Download Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
  return {
    props: {
      seo: { title: "Assistive Tech User's Network (ATUN)" },
    },
  };
};
