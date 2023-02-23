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
          src="/finding-the-right-aid-cover.jpg"
          alt="An individual using a head tracking AAC device"
          imageClassName={styles.findingTheRightAidCover}
        >
          <h1>Which is the right communication aid for me?</h1>
          <p className={styles.description}>
            The problem is that there is no ‘one size fits all’ communication
            aid solution.
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.allContent}>
            <h2 className={styles.heading}>
              Which is the right communication aid for me?
            </h2>
            <div className={styles.content}>
              <p>
                Without doubt, AT such as communication aids can be
                life-changing!&nbsp; The problem is that there is no ‘one size
                fits all’ communication aid solution.&nbsp; It’s vital that an
                assessment is carried out before a communication aid is chosen,
                and we’re not just saying that to drum up business for
                ourselves!
              </p>
              <p>
                Ace Centre offers an interdisciplinary assessment which enables
                us to consider variables such as seating, mobility, access,
                motivation, individual preference, educational / workplace needs
                and cognitive levels.&nbsp; It’s essential to build up an
                accurate picture of a person’s abilities before trying to
                identify a suitable communication aid.
              </p>
              <CardHighlight
                title="Our assessment services"
                description="Our assessment and training team will work with the individual, family and involved professionals to identify and achieve goals to support the development of communication and learning, and facilitate greater independence."
                viewText="View service"
                href="/services/assessments"
              />
              <p>
                It also makes sense&nbsp;to try out a communication aid before
                making a decision about purchase or provision. We have an
                extensive loan library of equipment that we can call upon.&nbsp;
                Sometimes the people that we assess need to trial more than one
                option before we all feel in a position to make a decision on
                the best way forward.
              </p>
              <p>
                Communication aids can most definitely improve quality of life,
                but using AT to help fulfil potential is a lifelong journey that
                requires teamwork throughout.&nbsp;&nbsp; Very few people manage
                to get the most from AT in isolation:&nbsp; individuals,
                families and professionals all need to work together from the
                first step of identifying a need, through to
                the&nbsp;ongoing&nbsp;support of the&nbsp;long-term goals of the
                individual.
              </p>
              <p>
                Once a communication aid has been purchased or provided,
                everyone involved with the individual – family, carers,
                teachers, therapists etc. – will need to know how to operate and
                support use of the communication aid.&nbsp; Here we can offer
                help through our training service. Not only do we give technical
                skills training in the operation of the communication aid, but,
                perhaps more importantly, we consider how to support and develop
                its effective use.
              </p>
              <p>
                Skills and abilities change over time, and so too does
                technology!&nbsp; With this in mind, ongoing review of the
                suitability of a communication aid is essential.
              </p>
              <CardHighlight
                title="Ace Centre Learning"
                description="Our courses focus on the use of Assistive Technology to enable independence, access to education, learning and leisure activities, and communication."
                viewText="View service"
                href="/learning"
              />
            </div>
          </div>
          <GettingStartedQuote pronoun="his" story={story} />
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
        title: "Which is the right communication aid for me?",
        description:
          "Without doubt, AT such as communication aids can be life-changing!  The problem is that there is no ‘one size fits all’ communication aid solution.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
