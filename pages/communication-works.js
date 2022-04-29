import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import Avatar from "@material-ui/core/Avatar";

import styles from "../styles/communication-works.module.css";

import { Image } from "../components/image";
import { MailingList } from "../components/service-finder-mailing-list/service-finder-mailing-list";
import Link from "next/link";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EventIcon from "@material-ui/icons/Event";
import { getPage } from "../lib/generic-pages/get-page";

export default function CommunicationWorks({ page }) {
  const { currentYear } = useGlobalProps();

  console.log(page);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.imageContainer}>
          <Image
            src="/CW2022-2.png"
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
                <p>26 May 2022 | 10am-4pm</p>
                <p>New Bridge School, Roman Road, Oldham OL8 3PH</p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/255181132637">
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
                      Download the Agenda here
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
                <p>19 May 2022 | 10am-4pm</p>
                <p>
                  Charlton Athletic Football Stadium, The Valley, Charlton,
                  London SE7 8BL
                </p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/252057730457">
                    Register for free here.
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

export const getStaticProps = withGlobalProps(async () => {
  const page = await getPage("communication-works");

  return {
    props: {
      page,

      seo: {
        title: "Communication Works 2022",
        description:
          "Communication Works 2022 is a free live event allowing attendees the opportunity to see first-hand a range of assistive and accessible technology, communication tools, digital strategies, and person-centred approaches.",
      },
    },
  };
});
