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
          description="Book in for an informal chat about your needs with members of the Ace Centre team."
        />
        <div className={styles.container}>
          <p>
            Please note that this appointment is NOT an assessment, but instead
            it is an opportunity to reflect on a range of AAC / AT-related
            issues with members of our service delivery team.
          </p>
          <p>
            At Ace Centre, we believe that information should be accessible to
            all, up-to-date, unbiased and, ideally, free at source to people in
            need.
          </p>
          <p>
            Please note that these appointments are now on offer face-to-face or
            virtually. We can also offer a hybrid appointment allowing some
            people to attend in person and others via video call.
          </p>
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
          </p>
          <h2>Booking an appointment</h2>
          <p>
            To book your appointment complete the form below. Follow the
            following steps:
          </p>
          <ol>
            <li>
              Select the time and date that you want to have the appointment. It
              will automatically select the next available date in the selected
              month.
            </li>
            <li>Fill in your details so we can contact you if we need to.</li>
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
