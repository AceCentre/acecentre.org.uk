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

export default function CommunicationWorks({ page }) {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.imageContainer}>
          <ImageWithLoader
            src="/CW2023.png"
            alt="Communication works banner"
            width={1640}
            height={924}
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
                <p>Thursday, 23 May 2024</p>
                <p>New Bridge Academy, Oldham, OL8 3PH</p>

                <p>
                  <Link href="https://www.eventbrite.co.uk/e/communication-works-2024-north-tickets-764385857677?aff=oddtdtcreator">
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
                <p>Thursday, 6 June 2024</p>
                <p>Charlton Athletic Football Club, London SE7 8BL</p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/communication-works-2024-south-tickets-696507130577?aff=oddtdtcreator">
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
  const page = await getPage("communication-works-2024");

  return {
    revalidate: 60,
    props: {
      page,

      seo: {
        title: "Communication Works 2023",
        description:
          "Communication Works 2023 is a free live event allowing attendees the opportunity to see first-hand a range of assistive and accessible technology, communication tools, digital strategies, and person-centred approaches.",
      },
    },
  };
};
