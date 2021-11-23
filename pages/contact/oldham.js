import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import { BackToLink } from "../../components/back-to-link/back-to-link";

import styles from "../../styles/contact.module.css";
import { ImageWithLoader as Image } from "../../components/image";

import LiteYouTubeEmbed from "react-lite-youtube-embed";

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
          heading="Oldham office"
          description="Details if you are planning a visit to our Oldham office."
        />
        <div className={styles.youtubeVideo}>
          <LiteYouTubeEmbed
            id={"AZ3lJohANmU"}
            title={"Visiting Ace Centre - Oldham office"}
            noCookie={true}
          />
        </div>
        <div className={styles.officeInfoContainer}>
          <div>
            <h2>North office address</h2>
            <div className={styles.address}>
              <p>Hollinwood Business Centre</p>
              <p>Albert Street Oldham</p>
              <p>OL8 3QL</p>
            </div>
            <h2>By Car</h2>
            <ul>
              <li>
                Exit M60 at junction 22 and follow signs for Manchester City
                Centre on A62.
              </li>
              <li>
                At first set of lights, immediately after motorway junction,
                turn left into Hollins Road.
              </li>
              <li>
                Take the third exit at the mini roundabout onto Albert Street.
              </li>
              <li>
                Hollinwood Business Centre is on your right. There is plenty of
                available parking as you enter the Business Centre
              </li>
            </ul>
            <p>
              Please report to reception when you arrive and a member of staff
              will come and meet you
            </p>
            <p>
              Disabled parking spaces are available close to the Business Centre
              main entrance.
            </p>
            <h2>By Train / Tram</h2>
            <p>
              The nearest Tram stop to Ace Centre is <strong>Hollinwood</strong>{" "}
              Tram stop – on <strong>Line 2</strong> (East Didbsury – Rochdale).
              The centre is a short walk (approximatley 5 minutes)
            </p>
            <h2>By Bus</h2>
            <p>
              Buses 180, 184 and 76 go along Oldham Road. Get off in Hollinwood
              (by the Voujon restaurant), cross the road at the lights and walk
              down past the roundabout to your left. Our building is the
              “BizSpace” building.
            </p>
          </div>
          <div>
            <div className={styles.imageContainer}>
              <Image
                layout="fill"
                src="/oldham.png"
                objectFit="contain"
                alt="Oldham office on a map"
              ></Image>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18978.568799359775!2d-2.143133!3d53.516322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe36d5bb9c7211631!2sACE+Centre!5e0!3m2!1sen!2suk!4v1504703467876"
              width="100%"
              height="350"
              title="North office on google maps"
            ></iframe>
          </div>
        </div>
        <h2 className={styles.changingPlaceTitle}>Changing Places</h2>
        <div className={styles.officeInfoContainer}>
          <div>
            <p>
              Please note, Changing Places bathrooms are currently not open.
              Keep an eye out on this page for updates.
            </p>
            <p>
              Ross Care Independent Living offer a Changing Places bathroom
              available for use, located 1 mile from the Ace Centre. The managed
              bathroom is located on the ground floor level access from car
              parking with accessible spaces.
            </p>
            <div className={styles.address}>
              <p>Ross Care Independent Living Centre</p>
              <p>Keppel Health Centre</p>
              <p>Ashton Road West</p>
              <p>Failsworth</p>
              <p>Oldham</p>
              <p>M35 0AD</p>
            </div>
            <div className={styles.imageGrid}>
              <ChangingPlaceImage
                src="/oldham-changing-place/entrance.png"
                description="Ground level bathroom with free accessible parking"
              />
              <ChangingPlaceImage
                src="/oldham-changing-place/toilet.png"
                description="Peninsular toilet with grab rails"
              />
              <ChangingPlaceImage
                src="/oldham-changing-place/screen.png"
                description="Privacy screen"
              />
              <ChangingPlaceImage
                src="/oldham-changing-place/hoist.png"
                description="Ceiling hoist"
              />
            </div>
          </div>
          <div>
            <p>Changing place features include:</p>
            <ul>
              <li>Height adjustable, adult sized, free standing bench</li>
              <li>Hoist – ceiling loop</li>
              <li>Peninsular (space either side) toilet</li>
              <li>Large 13 sq.m bathroom with non-slip flooring</li>
              <li>Emergency alarm</li>
              <li>Privacy screen</li>
              <li>Paper roll</li>
            </ul>

            <p>
              You can find out{" "}
              <a href="https://rosscare.co.uk/pages/independent-living-centre">
                more details about Ross Care Independent Living Centre on their
                website.
              </a>
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d3990.119223349406!2d-2.149516217699645!3d53.51237769196053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x487bb73bf70b74e5%3A0x8f85e82bba77c9f6!2sFailsworth%2C+Oldham+OL8+3QL%2C+UK!3m2!1d53.5165882!2d-2.1430048999999998!4m5!1s0x487bb72dc4252afd%3A0x6af45b7752c134a8!2sFailsworth+Health+Centre%2C+Ashton+Rd+W%2C+Failsworth%2C+Manchester+M35+0HN!3m2!1d53.5099235!2d-2.1565266!5e0!3m2!1sen!2suk!4v1528814120922"
              width="100%"
              height="450"
              title="Ross Care Independent Living Centre on google maps"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const ChangingPlaceImage = ({ src, description }) => {
  return (
    <div>
      <div className={styles.changingPlaceImage}>
        <Image objectFit="contain" src={src} layout="fill" alt={description} />
      </div>
      <p>{description}</p>
    </div>
  );
};

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        title: "Oldham office",
        description:
          "Details if you are planning a visit to our Oldham office.",
      },
    },
  };
});
