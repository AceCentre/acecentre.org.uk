import Link from "next/link";
import { Button } from "../../components/button/button";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { FeaturedPosts } from "../../components/featured-posts/featured-posts";
import { Footer } from "../../components/footer/footer";
import { FundraisingIdeas } from "../../components/fundraising-ideas/fundraising-ideas";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";
import { getAllFullPosts } from "../../lib/posts/get-posts";

import styles from "../../styles/fundraise.module.css";

export default function GetInvolved({ allPosts }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="Fundraise"
          description="As a charity we depend on donations for vital services"
        />
        <FundraisingIdeas />
        {allPosts.length > 0 && (
          <div className={styles.extraSpacing}>
            <FeaturedPosts
              title="Fundraising on the blog"
              posts={allPosts}
              smallCards
            />
          </div>
        )}
        <GenericFaqs faqs={FAQS} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const FAQS = [
  {
    question: "Set up an on-line sponsorship page",
    answer: (
      <>
        <p>You can setup a sponsorship page on JustGiving.</p>
        <p>
          <Link href="https://www.justgiving.com/acecentre">
            <a>Visit our JustGiving page here.</a>
          </Link>
        </p>
      </>
    ),
  },
  {
    question: "Download paper sponsorship form",
    answer: (
      <>
        <p>
          Download the paper sponsorship form to collect sponsorships offline.
        </p>
        <div className={styles.buttonContainer}>
          <Button href="https://acecentre.org.uk/support-us/fundraise/sponsorship-form">
            Download sponsor form
          </Button>
        </div>
      </>
    ),
  },
  {
    question: "Pay in your offline donations",
    answer: (
      <>
        <p>
          If you raised money using JustGiving simply make sure you close down
          your page after receiving all your sponsorship. We’ll then receive all
          the sponsorship and gift aid raised on your page from Just Giving
          directly.
        </p>
        <p>
          If our online paying in form isn’t your cup of tea – no problem.
          Simply send us your sponsorship form and a cheque payable to “Ace
          Centre” with your sponsorship amount in the post to:
          <span>Ace Centre – offline donations</span>
          <span>Hollinwood Business Centre</span>
          <span>Albert Street</span>
          <span>Oldham</span>
          <span>OL8 3QL</span>
        </p>
        <p>
          Did you know that Gift Aid may be claimed on certain qualifying
          events. If your supporters are UK taxpayers then they will be able to
          raise an extra 25p for every £1 they donate by agreeing to Gift Aid.
        </p>
        <p>
          Not all events will qualify for Gift Aid for example Gift Aid cannot
          be claimed if:
        </p>
        <ul>
          <li>
            The money donated is not their own as it was raised by an office or
            bucket collection
          </li>
          <li>
            The proceeds are from a cake sale or proceeds of a raffle or similar
          </li>
          <li>
            The proceeds are from an the sale of tickets to an event e.g. a
            dinner or similar
          </li>
        </ul>
        <p>
          If you have a Just Giving page then your supporters will be asked to
          Gift Aid when they make their donation.
        </p>
        <p>
          Alternatively, you can request a paper sponsorship form which your
          supporters can complete their name and address and choose to tick the
          Gift Aid box.
        </p>
        <p>
          Please don’t forget to send your completed sponsorship forms to the
          address above so we can claim the Gift Aid
        </p>
      </>
    ),
  },
];

export const getStaticProps = withGlobalProps(async () => {
  const unfilteredPosts = await getAllFullPosts();

  const allPosts = unfilteredPosts
    .filter((x) => x.mainCategoryName === "Fundraising")
    .slice(0, 4);

  return {
    props: { allPosts },
  };
});
