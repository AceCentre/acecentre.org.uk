import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import styles from "../../styles/finding-the-right-aid.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { ResourceList } from "../../components/resource-list/resource-list";
import { getAllProducts } from "../../lib/products/get-products";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { filterProducts } from "../../lib/products/filter-products";
import { GettingStartedQuote } from "../../components/getting-started-quote/getting-started-quote";
import { GenericFaqs } from "../../components/getting-started-faqs/getting-started-faqs";

export default function GettingStartedLanding({ story, resources }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/what-is-aac.jpeg"
          alt="A woman wearing a tracking dot on her forehead"
          imageClassName={styles.whatIsAacImage}
          heightClass={styles.whatIsAacCover}
        >
          <h1>What is AAC / AT?</h1>
          <p className={styles.description}>
            Assistive Technology is all about making life easier and helping
            people to be more independent
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.allContent}>
            <h2 className={styles.heading}>What is AAC / AT?</h2>
            <div className={styles.content}>
              <p>
                Well we do all love a good acronym!&nbsp; <strong>AT</strong>{" "}
                stands for <strong>Assistive Technology</strong> and{" "}
                <strong>AAC</strong> stands for{" "}
                <strong>Augmentative and Alternative Communication</strong>
                .&nbsp; They are basically what Ace Centre is all about.
              </p>
              <p>
                AT (Assistive Technology) is all about making life easier and
                helping people to be more independent.&nbsp; It&nbsp;is any form
                of software, hardware or system that helps a person to maintain,
                improve or increase their capabilities.
              </p>
              <p>
                AT covers a really broad range of things.&nbsp; It might help
                someone to continue to work by providing an alternative way of
                controlling their computer, or it might enable someone to open
                the windows and doors in their own home.
              </p>
              <p>
                AAC (Augmentative and Alternative Communication) is one, very
                important, type of AT.&nbsp; AAC is there to help people with
                communication challenges.&nbsp; It is all about providing
                strategies and communication aids that support or replace
                someone’s speech when they can’t rely upon it to
                communicate.&nbsp; Communication aids that ‘talk’ are sometimes
                called&nbsp;
                <strong>Voice Output Communication Aids</strong>&nbsp;(VOCAs) or{" "}
                <strong>Speech Output Devices</strong>.
              </p>
            </div>
          </div>
          <GettingStartedQuote pronoun="his" story={story} />
        </div>
        <ResourceList
          title="Resources to get started"
          viewAllLink="/all?category=getting-started"
          products={resources}
        />
        <GenericFaqs faqs={FAQS} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const FAQS = [
  {
    question: "What are symbol based charts and books?",
    answer: `
        <p>
          Symbol based charts and books enable someone to communicate by
          pointing to or looking at pictures or special symbols printed on paper
          or other materials.&nbsp; Charts and books can be tailor-made to suit
          the individual and can be used everywhere as there are no batteries to
          run low or screens to break.&nbsp; While you still need to learn what
          the symbols mean, there is no need to be able to read or spell to
          communicate.
        </p>
        `,
  },
  {
    question: "What are alphabet charts?",
    answer: `
      <p>
        Alphabet charts can provide a quick way of communicating for individuals
        who are able to spell. They can be highly customised to meet the needs
        of an individual, whether it’s ensuring that the letters are organised
        in a familiar QWERTY layout or putting an image of the badge of
        someone’s football team behind the letters. Like symbol based charts and
        books, they can be used everywhere as there are no batteries to run low
        or screens to break.
      </p>
    `,
  },
  {
    question: "What are Simple Voice Output Communication Aids (VOCAs)?",
    answer: `
        <p>
          The simplest VOCAs tend to be sturdy battery-powered devices with
          built-in microphones for recording messages. They are sometimes known
          as light tech communication aids. They can be a great introduction to
          using a VOCA and can be a powerful tool for developing communication
          skills.
        </p>
        <p>
          These devices are easy to operate and quick to update and change. Some
          can store words in ‘layers’, giving access to more vocabulary, but
          they all tend to be fairly restricted in terms of the total amount of
          vocabulary they can store. As they rely on pre-recorded speech, they
          are intended to be used by people who are not able to spell what they
          want to say.
        </p>
        <p>
          Some simple VOCAs offer alternative ways of selecting messages for
          those that find pressing the buttons difficult.
        </p>
      `,
  },
  {
    question: "What are Complex Voice Output Communication Aids (VOCAs)?",
    answer: `
        <p>
          Complex VOCAs tend to make use of synthetic (i.e. computer generated)
          speech, although many offer the capacity to pre-record messages
          too.&nbsp; Synthetic speech now sounds much less robotic than it did
          in the past with more regional accents becoming available.&nbsp; The
          great thing about synthetic speech is that you can say new things with
          it – messages don’t have to be pre-recorded.
        </p>
        <p>
          Complex VOCAs tend to be based around computer technology and have
          touchscreens of varying sizes, although there are a few keyboard based
          options around.&nbsp; Some are based around mainstream technology
          while others are purpose built.
        </p>
        <p>
          They are suitable for use by people who can spell, but most can also
          be used by people who rely on symbols.&nbsp; &nbsp;Lots of options are
          available for people who find using a touchscreen difficult.
        </p>
        <p>
          Complex VOCAs often offer additional features such as access to email,
          mobile phone and environmental control.
        </p>
        `,
  },
];

export const getStaticProps = withGlobalProps(async () => {
  const story = await getSimpleStory("glyn");

  const products = await getAllProducts();
  const productCategories = await getAllProductCategories();

  const { results: gettingStartedResources } = filterProducts(
    products,
    productCategories,
    {
      page: 0,
      productsPerPage: 1000,
      category: "getting-started",
    }
  );

  const resources = gettingStartedResources.map((product) => ({
    title: htmlDecode(product.name),
    mainCategoryName: product.category.name,
    featuredImage: product.image,
    ...product,
  }));

  return {
    props: {
      story,
      resources,
      seo: {
        title: "What is AAC?",
        description:
          "AT stands for Assistive Technology and AAC stands for Augmentative and Alternative Communication.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
