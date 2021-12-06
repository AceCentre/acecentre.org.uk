import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

import styles from "../../styles/finding-the-right-aid.module.css";
import { getSimpleStory } from "../../lib/story/get-story";
import { CardHighlight } from "../../components/project-highlight/project-highlight";
import { ResourceList } from "../../components/resource-list/resource-list";
import { getAllProducts } from "../../lib/products/get-products";
import { getAllProductCategories } from "../../lib/products/get-all-categories";
import { filterProducts } from "../../lib/products/filter-products";
import { GettingStartedQuote } from "../../components/getting-started-quote/getting-started-quote";

export default function GettingStartedLanding({ story, resources }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <VideoWithCardCover
          src="/computer-access.jpeg"
          alt="Someone using a touch screen device to communicate"
          heightClass={styles.computerAccessCover}
        >
          <h1>How can I access my computer better?</h1>
          <p className={styles.description}>
            Access to screen based technology such as computers and tablets is
            vitally important.
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.allContent}>
            <h2 className={styles.heading}>
              How can I access my computer better?
            </h2>
            <div className={styles.content}>
              <p>
                Not everyone who needs a communication aid is able to press
                buttons or use a touchscreen effectively.&nbsp; Ace Centre
                specialises in identifying and supporting alternative ways of
                accessing technology.
              </p>
              <p>
                Access to screen based technology such as computers and tablets
                is vitally important.&nbsp; It’s about more than controlling a
                communication aid effectively, although that is pretty
                crucial!&nbsp; It’s also about being able to engage with digital
                age – be that government websites, banking, learning resources,
                games, social media, etc., etc.
              </p>
              <p>
                Through our assessment service, Ace Centre can help to identify
                how best to access and control communication aids and screen
                based technology if use of a standard mouse, keyboard or
                touchscreen is tricky.&nbsp; As well as helping with technology
                such as mouse alternatives, eye gaze and switches, Ace Centre
                can support with optimising how information is presented
                onscreen to make life easier.
              </p>
              <CardHighlight
                title="Our assessment services"
                description="Our assessment and training team will work with the individual, family and involved professionals to identify and achieve goals to support the development of communication and learning, and facilitate greater independence."
                viewText="View service"
                href="/services/assessments"
              />
              <p>
                It’s not just about expensive solutions.&nbsp; With each new
                version of the operating system that runs your computer, laptop,
                tablet or smart phone, there is an ever-increasing&nbsp;number
                of settings and options that can be used to make it
                more&nbsp;accessible – for free!
              </p>
              <p>
                There are inbuilt settings which can increase access for users
                who experience vision, hearing, motor or cognitive
                difficulties.&nbsp; You can find out more about them and how
                they work in the&nbsp; My Computer My Way guide from AbilityNet
              </p>

              <CardHighlight
                title="My Computer My Way (AbilityNet)"
                description="Your step-by-step guide to individual adjustments you can make to your computer, laptop, tablet or smart phone to make it easier to use."
                viewText="Go to AbilityNet"
                href="https://mcmw.abilitynet.org.uk/"
              />
            </div>
          </div>
          <GettingStartedQuote pronoun="her" story={story} />
        </div>
        <ResourceList
          title="Resources to get started"
          viewAllLink="/resources/all?category=getting-started"
          products={resources}
          className={styles.resourcesList}
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const story = await getSimpleStory("jess");

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
        title: "How can I access my computer better?",
        description:
          "Access to screen based technology such as computers and tablets is vitally important. It’s about more than controlling a communication aid effectively, although that is pretty crucial!  It’s also about being able to engage with digital age – be that government websites, banking, learning resources, games and social media.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
