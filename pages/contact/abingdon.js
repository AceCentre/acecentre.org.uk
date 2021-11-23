import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { BackToLink } from "../../components/back-to-link/back-to-link";

import styles from "../../styles/contact.module.css";
import { ImageWithLoader as Image } from "../../components/image";

export default function Contact() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="contact" href="/contact" />
        <PageTitle
          className={styles.officePageTitle}
          heading="Abingdon office"
          description="Details if you are planning a visit to our Abingdon office."
        />

        <div className={styles.officeInfoContainer}>
          <div>
            <h2>South office address</h2>
            <div className={styles.address}>
              <p>Ace Centre (South office)</p>
              <p>5 Hitching Court</p>
              <p>Blacklands Way</p>
              <p>Abingdon Business Park</p>
              <p>Oxfordshire</p>
              <p>OX14 1RG</p>
            </div>
            <h2>By Car</h2>
            <p>
              Satnav You can use a satnav if you wish. Use{" "}
              <strong>“Ox141RG“</strong>. Just note that it can take you around
              the wrong side of the business park. If this happens, follow the
              road back round to enter it down Colwell drive rather than
              Nuffield way.
            </p>
            <ul>
              <li>
                <strong>From M4</strong>, leave at Junction 13 to join the A34
                Northbound. Take the A415 exit at the roundabout take the 3rd
                exit onto Marcham Road (A415). Carry on straight over the next
                roundabout. At the 2nd roundabout take the 1st exit onto Colwell
                Drive. At the following roundabout take the 1st exit on to
                Blacklands Way and then the 1st left.
              </li>
              <li>
                <strong>From M40</strong>, leave at junction 9 to join the A34
                Southbound. Take the A415 exit at the roundabout take the 1st
                exit onto Marcham Road (A415). Carry on straight over the next
                roundabout. At the 2nd roundabout take the 1st exit onto Colwell
                Drive. At the following roundabout take the 1st exit on to
                Blacklands Way and then the 1st left.
              </li>
            </ul>
            <p>
              <strong>Parking</strong> – Drive around to the left of the
              building and park in an Ace Centre designated space. Enter the
              building via the front entrance and you will find us on the ground
              floor. Please call us for information on accessible parking and
              wheelchair access.
            </p>
            <h2>By Public Transport</h2>
            <p>
              The nearest train stations are Didcot Parkway, Radley or Culham.
              From there bus services or taxi services are available. The
              nearest bus stop is Colwell drive or the Community Hospital.
            </p>
          </div>
          <div>
            <div className={styles.imageContainer}>
              <Image
                layout="fill"
                src="/abingdon.png"
                objectFit="contain"
                alt="South office on a map"
              ></Image>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.3182418245624!2d-1.302991248549268!3d51.67231760635251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c582ed724631%3A0x3b752ab45ce336a8!2sAce%20Centre!5e0!3m2!1sen!2suk!4v1630572149317!5m2!1sen!2suk"
              width="100%"
              height="350"
              title="South office on a map"
            ></iframe>
          </div>
        </div>
        <h2 className={styles.changingPlaceTitle}>Changing Places</h2>
        <div className={styles.officeInfoContainer}>
          <div>
            <p>
              A changing place if required can be found at{" "}
              <a href="https://www.better.org.uk/leisure-centre/vale-of-white-horse/white-horse-leisure-and-tennis-centre">
                White Horse Leisure & Tennis Centre.
              </a>
            </p>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d19790.959313012452!2d-1.2964408763810698!3d51.68052415172159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x4876b87995ebbe5b%3A0x73fb83e7a73a0c7f!2sOX14%201RG%2C%20Abingdon!3m2!1d51.672306299999995!2d-1.3011882!4m5!1s0x4876b8a6d2c6e5b1%3A0xc2036b57c9b72135!2sAbingdon%20OX14%203PJ!3m2!1d51.6735955!2d-1.2605596!5e0!3m2!1sen!2suk!4v1630572295242!5m2!1sen!2suk"
              width="100%"
              height="450"
              title="White Horse Leisure & Tennis Centre on google maps"
            ></iframe>
          </div>
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
        title: "Abingdon office",
        description:
          "Details if you are planning a visit to our Abingdon office.",
      },
    },
  };
});
