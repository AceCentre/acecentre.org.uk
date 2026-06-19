import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { Button } from "../components/button/button";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/information-appointments.module.css";

const BOOKING_URL =
  "https://outlook.office365.com/owa/calendar/AceCentre@acecentre.org.uk/bookings/s/Bki6azf24k--6merN0obQA2";

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="Information appointment"
          description="Book an informal chat to discuss your AAC/AT needs"
        />
        <div className={styles.container}>
          <p>
            Our Information Appointments are built on a simple belief: everyone
            should have access to information that is up-to-date, unbiased and,
            wherever possible, free at the point of use.
          </p>

          <p>
            That’s why we offer free online meetings with Ace Centre clinical
            staff. These informal sessions give you the opportunity to talk
            through your needs with members of our team in a supportive,
            no-pressure environment.
          </p>

          <p>
            Whether you’re new to AAC/AT and unsure where to start, or you’re
            already using it and looking for next steps, you’re welcome to book
            a video call with us—we’re here to help.
          </p>
          <br />
          <h2>Please note before booking: </h2>
          <p>
            <b>
              *For quicker support, call our Advice Helpline on 0800 080 3115
              (option 2), available Monday, Wednesday and Friday, 1–5pm, to
              speak directly with a team member.
            </b>
            <br />
            As you may need to wait a couple of months for an Information
            Appointment, take that time to invite the wider team around the
            AAC/AT user to the appointment as this can be particularly valuable.
          </p>
          <p>
            <b>
              *You do not need to book an Information Appointment to decide
              whether to refer for an NHS England assessment.{" "}
            </b>
            <br />
            <Link href="/services/nhs/referral-process" legacyBehavior>
              Our website has helpful guidance to support your decision-making
              around referrals, available to access at any time.
            </Link>
          </p>
          <p>
            <b>*These sessions are not a full AAC/AT assessment.</b> We can
            discuss your needs in general and signpost you to information and
            options to explore independently.
            <br />
            <Link href="/services/assessments" legacyBehavior>
              Ace Centre offers both NHS England and self-funded assessments.
            </Link>
          </p>
          {/* <p>
            If you have successfully booked an appointment but would prefer an
            earlier one,{" "}
            <FormModal form={INFORMATION_RESERVE}>
              {({ onClick }) => (
                <a className={styles.informationReserve} onClick={onClick}>
                  complete this form,
                </a>
              )}
            </FormModal>{" "}
            and we will add you to our cancellations waiting list.
          </p> */}

          <div className={styles.bookingSection}>
            {!bookingOpen ? (
              <Button
                className={styles.bookingButton}
                onClick={() => setBookingOpen(true)}
              >
                I&apos;m ready to book
              </Button>
            ) : (
              <div className={styles.bookingPanel}>
                <p>
                  If you prefer, you can{" "}
                  <a target="_blank" rel="noreferrer" href={BOOKING_URL}>
                    open the booking form in a new page
                  </a>
                  .
                </p>
                <div
                  className={styles.infoFrame}
                  dangerouslySetInnerHTML={{
                    __html: `<iframe title='Book an information appointment' src='${BOOKING_URL}' width='100%' height='100%' scrolling='yes' style='border:0'></iframe>`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      seo: {
        title: "Information appointment",
        description:
          "Whether you are just starting out or you are an experienced AAC /AT user ready to move on, book in for an informal chat about your needs with members of the Ace Centre team.",
      },
    },
  };
};
