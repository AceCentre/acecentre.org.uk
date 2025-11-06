import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import Avatar from "@mui/material/Avatar";

import styles from "../styles/communication-works.module.css";

import { ImageWithLoader } from "../components/image";
import { MailingList } from "../components/service-finder-mailing-list/service-finder-mailing-list";
import Link from "next/link";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";
import { getPage } from "../lib/generic-pages/get-page";
import Head from "next/head";

export default function CommunicationWorks({ page }) {
  return (
    <>
      <Head>
        <script
          defer
          data-domain="scecentre.org.uk/communication-works-2025"
          src="https://stats.scecentre.org.uk/js/script.js"
        ></script>
      </Head>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.imageContainer}>
          <ImageWithLoader
            src="/comm-works-2025.png"
            alt="Communication works banner"
            width={6912}
            height={3456}
          />
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <div
              className={styles.pageContent}
              dangerouslySetInnerHTML={{ __html: page.content }}
            ></div>
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
                <p>Friday, 16 May 2025</p>
                <p>New Bridge Academy, Oldham, OL8 3PH</p>

                <p>
                  <Link href="https://www.eventbrite.co.uk/e/communication-works-2025-north-tickets-1070433809339">
                    Register for free here.
                  </Link>
                </p>
              </div>
            </div>
            {page.communicationWorksUrl && (
              <div className={styles.quote}>
                <Avatar className={styles.avatar}>
                  <EventIcon className={styles.icon} />
                </Avatar>
                <div>
                  <h3>Seminar Agenda NORTH</h3>
                  <p>
                    <Link href={page.communicationWorksUrl}>
                      Download the NORTH Agenda here
                    </Link>
                  </p>
                </div>
              </div>
            )}
            {page.communicationWorksSouthUrl && (
              <div className={styles.quote}>
                <Avatar className={styles.avatar}>
                  <EventIcon className={styles.icon} />
                </Avatar>
                <div>
                  <h3>Seminar Agenda SOUTH</h3>
                  <p>
                    <Link href={page.communicationWorksSouthUrl}>
                      Download the SOUTH Agenda here
                    </Link>
                  </p>
                </div>
              </div>
            )}
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AssignmentIcon className={styles.icon} />
              </Avatar>
              <div>
                <h3>Communication Works SOUTH</h3>
                <p>Thursday, 22 May 2025</p>
                <p>Charlton Athletic Football Club, London SE7 8BL</p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/communication-works-2025-south-tickets-1026780567317">
                    Register for free here.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const page = await getPage("communication-works-2025");

  return {
    revalidate: 60,
    props: {
      page,

      seo: {
        title: "Communication Works 2025",
        description:
          "Communication Works 2025 is a free live event allowing attendees the opportunity to see first-hand a range of assistive and accessible technology, communication tools, digital strategies, and person-centred approaches.",
      },
    },
  };
};
