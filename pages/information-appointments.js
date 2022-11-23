import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { FormModal, INFORMATION_RESERVE } from "../components/ms-form";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";
import Link from "next/link";
import styles from "../styles/information-appointments.module.css";

export default function Contact() {
  const { currentYear } = useGlobalProps();

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
            Our Information Appointments are offered on the belief that
            information should be accessible to all, up-to-date, unbiased and,
            ideally, free at source to people in need.{" "}
          </p>
          <p>
            Hour long online meetings with Ace Centre clinical staff are
            provided twice a month and are completely free. They are an
            opportunity to meet informally with our staff to discuss your needs.
            Please note, these sessions do not provide a full AT/AAC assessment.{" "}
            <Link href="/services/assessments">
              Click here for more information about assessments.
            </Link>
          </p>

          <p>
            These appointments are also offered to those who have had an
            unsuccessful referral to our Specialised AAC Services. The session
            can be used to discuss other options for funding, to gather more
            information to help with future referrals to Ace Centre and/or to
            consider other possible next steps.
          </p>

          <p>
            So whether you are new to AAC/AT and trying to find a starting
            point, or you are already using AAC/AT and want to know how to move
            on, book in for a video-call session with our staff.
          </p>
          {/* 
          <p>
            <Link href="/contact/oldham">
              <a>
                See directions to our <strong>North</strong> office here.
              </a>
            </Link>
          </p>
          <p>
            <Link href="/contact/abingdon">
              <a>
                See directions to our <strong>South</strong> office here.
              </a>
            </Link>
          </p> */}
          <h2>Booking an appointment</h2>
          <p>
            To book your appointment complete the form below. Follow these
            steps:
          </p>
          <ol>
            <li>
              Select the month you want to have the appointment. Dates with
              available appointments will be shown. Select the time that works
              for you.
            </li>
            <li>Fill in your details so we can contact you.</li>
            <li>
              Answer all the questions about the appointment so we can come
              prepared with all the information you might need
            </li>
          </ol>
          <p>
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
          </p>
          <p>
            If you prefer you can{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://outlook.office365.com/owa/calendar/AceCentre@acecentre.org.uk/bookings/s/Bki6azf24k--6merN0obQA2"
            >
              click this link to open the booking form in a new page
            </a>
          </p>
          <>
            <style jsx>{`
              .info-frame {
                height: 3100px;
              }

              @media (max-width: 1132px) {
                .info-frame {
                  height: 3700px;
                }
              }
            `}</style>
            <div
              className={"info-frame"}
              dangerouslySetInnerHTML={{
                __html:
                  "<iframe title='Book an information appointment' src='https://outlook.office365.com/owa/calendar/AceCentre@acecentre.org.uk/bookings/s/Bki6azf24k--6merN0obQA2' width='100%' height='100%' scrolling='yes' style='border:0'></iframe>",
              }}
            ></div>
          </>
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        title: "Information appointment",
        description:
          "Whether you are just starting out or you are an experienced AAC /AT user ready to move on, book in for an informal chat about your needs with members of the Ace Centre team.",
      },
    },
  };
});
