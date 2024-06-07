import { Button } from "../components/button/button";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../components/featured-posts/featured-posts";
import { Footer, NewsletterModal } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../components/video-with-card-cover/video-with-card-cover";
import { getAllPostCards } from "../lib/posts/get-posts";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import styles from "../styles/at-scholar.module.css";
import Link from "next/link";
import { useState } from "react";

export default function AtScholar({ posts }) {
  const [modelOpen, setModelOpen] = useState(false);
  const onClose = () => setModelOpen(false);

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} atScholar />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/atscholar-banner.jpg"
          alt="A child laughing"
          atScholar
          heightClass={styles.coverHeight}
        >
          <p className={styles.cardDescription}>
            Funding top British AT professionals to experience the world’s best
            assistive technology events.
          </p>

          <div className={styles.cardButtonContainer}>
            <Button
              href="mailto:info@atscholar.co.uk"
              className={styles.cardButton}
            >
              Ask us a question
            </Button>
          </div>
        </VideoWithCardCover>

        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>About AT Scholars</h2>
            <p>
              Established in 2020, the British Assistive Technology Scholarship
              funds AT Scholars, talented UK professionals working in the field
              of Assistive Technology (ATech) and Augmentative and Alternative
              Communication (AAC), to experience the world’s top events in the
              field.
            </p>
            <p>
              AT Scholars are selected to attend events to learn from and share
              best practice on the international stage. To facilitate this the
              British Assistive Technology Scholarship funds:{" "}
            </p>
            <ul className={styles.list}>
              <ListItem>Travel </ListItem>
              <ListItem>Accommodation</ListItem>
              <ListItem>Conference fees</ListItem>
            </ul>
            <p>
              On their return AT Scholars will disseminate their findings via
              reports to our partners (see below) and through UK based event.
            </p>
            <h2>How it began</h2>
            <p>
              Started by Martin Littler FRSA, a co-founder of Inclusive
              Technology, championed AT Scholars since 2020. This has been by
              sending them to Assistive Technology Industry Association
              Conference held annually in Orland, USA where most global advances
              in assistive technology are showcased and first evaluated.{" "}
            </p>
            <p>
              Originally organised through Inclusive Technology, over 30
              professionals have attended events in person or online. In 2023
              Ace Centre took on the administration of the program and with the
              continued support of our partners and Martin Littler we hope to
              grow the AT Scholar program from strength to strength.{" "}
            </p>

            <p>British Assistive Technology Scholarship Partners: </p>

            <ul className={styles.list}>
              <ListItem>
                <Link href="https://www.policyconnect.org.uk/appgat">
                  All Party Parliamentary Group for Assistive Technology
                  (APPGAT)
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.bataonline.org.uk/">
                  British Assistive Technology Association (BATA)
                </Link>
              </ListItem>

              <ListItem>
                <Link href="https://www.communicationmatters.org.uk">
                  Communication Matters
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://cenmac.com/">CENMAC</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.inclusive.com/uk/">
                  Inclusive Technology
                </Link>
              </ListItem>
            </ul>
            <p>
              <Link href="/blog/at-scholar-history">
                Read more about the history by clicking here
              </Link>
            </p>
            <h2>Get involved</h2>
            <p>
              The British Assistive Technology Scholarship welcomes applications
              from any UK based professional actively working in the field of
              ATech and/or AAC. The judging panel looks for those who have a
              passion for learning more, sharing information on and promoting
              use of assistive technology.
            </p>
            <p>
              <strong>
                Now accepting applications for the 2025 Scholar Program!{" "}
                <Link href="/blog/at-scholar-2025">Click here to apply.</Link>
              </strong>
            </p>
            <p>
              <strong>Deadline is midnight on the 5th of July 2024.</strong>
            </p>
            <p>
              Please check this website for more information or{" "}
              <a
                onClick={() => setModelOpen(true)}
                className={styles.buttonAsLink}
              >
                sign up to receive updates by clicking here.
              </a>
            </p>

            <NewsletterModal
              modelOpen={modelOpen}
              onClose={onClose}
              signUpIdentifier={"at-scholar"}
              tags={["at-scholar"]}
            />
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FormatQuoteIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p className={styles.quoteContent}>
                  &quot;AT scholars could spread the word about the latest
                  developments elsewhere on the planet, which would benefit
                  disabled people here.&quot;
                </p>
                <div>
                  <p>
                    <strong>Martin Littler</strong>
                  </p>
                  <p>AT Scholar Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeaturedPosts title="AT Scholar Blog" posts={posts} />
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
  const blogPosts = (await getAllPostCards()).filter(
    (x) => x.mainCategoryName == "AT Scholar"
  );

  return {
    props: {
      posts: blogPosts,
      seo: { title: "AT Scholar" },
    },
  };
};
