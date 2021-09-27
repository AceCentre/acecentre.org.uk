import { Button } from "../../../components/button/button";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { VideoWithCardCover } from "../../../components/video-with-card-cover/video-with-card-cover";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

// import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import { Avatar } from "@material-ui/core";
import { Image } from "../../../components/image";

import styles from "../../../styles/nhs-assessment.module.css";
import { getSimpleStory } from "../../../lib/story/get-story";
// import { FeaturedStory } from "../../../components/featured-story/featured-story";
import { InformationDays } from "../../../components/information-days/information-days";
import Link from "next/link";
import BuildIcon from "@material-ui/icons/Build";
import { getAllProducts } from "../../../lib/products/get-products";
import { getAllProductCategories } from "../../../lib/products/get-all-categories";
import { filterProducts } from "../../../lib/products/filter-products";
import { ResourceList } from "../../../components/resource-list/resource-list";
import { CONTACT_FORM, FormModal } from "../../../components/ms-form";

export default function Laaces({ gettingStartedResources }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav
          nhsTitle="NHS England Local AAC Services"
          defaultNavItems={defaultNavItems}
          nhs
        />
      </header>
      <main>
        <VideoWithCardCover
          src="/LAACES.png"
          alt="A child laughing using a communication book"
          nhs
          heightClass={styles.coverHeight}
          imageClassName={styles.imageClassNameLaaces}
          coverImageContainerClassName={styles.coverImageContainerLaaces}
          enableOverlay={false}
        >
          <h1 className={styles.cardTitle}>Local AAC Services</h1>
          <p className={styles.cardDescription}>
            Supporting local AAC Services in the the North West and Thames
            Valley & Wessex regions
          </p>

          <FormModal form={CONTACT_FORM}>
            {({ onClick }) => (
              <div className={styles.cardButtonContainer}>
                <Button onClick={onClick} className={styles.cardButton}>
                  Make an online enquiry
                </Button>
              </div>
            )}
          </FormModal>
          <p className={styles.cardContact}>
            or call our advice line on <strong>0800 048 7642</strong>
          </p>
        </VideoWithCardCover>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Local AAC Services</h2>
            <p className={styles.inlineQuoteContainer}>
              <span className={styles.inlineQuote}>
                “It is estimated that 0.5% of the population would benefit from
                AAC generally and 0.05% could benefit from powered communication
                aids… The technologies are there. But commissioning of services,
                funding arrangements and underpinning knowledge and expertise of
                healthcare professionals have not risen to the challenge.”
              </span>{" "}
              -{" "}
              <a href="https://www.communicationmatters.org.uk/app/uploads/2019/01/2013_Shining_a_Light_on_AAC.pdf">
                Source
              </a>
            </p>

            <p>
              Since the NHS England Specialised AAC Services were established,
              it has become apparent that there is significant variation across
              regions in the provision of local AAC services. Based on the data
              offered in the{" "}
              <a href="https://www.communicationmatters.org.uk/app/uploads/2019/01/2013_Shining_a_Light_on_AAC.pdf">
                Shining a light on Augmentative and Alternative Communication,
                Communication Matters: an AAC Evidence Base research project –
                final report
              </a>{" "}
              (April 2013), local AAC services are responsible for meeting the
              need of 0.5% of the population in their region. In some areas, it
              is recognised that there are long established and commissioned
              local AAC services, which meet the requirements as suggested in
              the NHSE document{" "}
              <a href="https://www.england.nhs.uk/commissioning/wp-content/uploads/sites/12/2016/03/guid-comms-aac.pdf">
                “Guidance for commissioning AAC services and equipment”
              </a>{" "}
              however, in many areas there is no commissioned local AAC service
              at all.
            </p>

            <p>
              Ace Centre is committed to help support the establishment and
              development of local AAC services in both the Thames Valley &
              Wessex and Northwest regions within which we provide the NHSE
              Specialised AAC Services. Ace Centre values the importance of
              local AAC services, not only to improve the equity and quality of
              local AAC provision but to also ensure the appropriate referral
              and support to clients with the most complex communication needs
              to the NHSE Specialised AAC Service. The proposed ‘Hub and Spoke’
              model for AAC Services, as described in Guidance for commissioning
              AAC services and equipment (NHS England, March 2016), can only
              work effectively if local AAC services are commissioned with a
              defined budget and a commitment to increasing the knowledge and
              skills of the local AAC workforce.
            </p>

            <h2>What support can Ace Centre offer?</h2>
            <h3>Service development</h3>
            <p>
              The Local Services Working Party was established in 2018 and
              together, the working party (made up of representatives from each
              NHSE Specialised Service) created a{" "}
              <a href="https://localaactools.co.uk/">
                Local AAC Services Commissioning Toolkit
              </a>
              . The purpose of the toolkit is to signpost professionals working
              in the field to useful resources, which can support the
              establishment of a local AAC service. Topics covered within the
              toolkit include:
            </p>
            <ul>
              <li>
                Data Gathering: This section aims to outline important minimum
                data which will be helpful for approaching commissioners,
                alongside highlighting factors to consider when collecting data.
                Suggestions for formats for data collection and a data
                collection tool, which can be customised to meet local needs are
                provided within this section.
              </li>
              <li>
                Approaching Commissioners: This section aims to provide
                information regarding commissioning arrangements within the NHS
                and provides an outline of the role of Commissioning Support
                Units (CSU). The section includes a guide to business case
                writing and an explanation of how the Individual Funding
                Requests (IFR)/Evidence Based Intervention Request (EBI) process
                works and the role of the Effective Use of Resources panel (EUR)
                alongside tips for completing an IFR & how to find locally
                relevant information.
              </li>
              <li>
                Strategic Development: This section aims to give an overview of
                a typical structure of a local AAC service and provide
                signposting to resources which can help with the strategic
                development of a service. The resources include an overview of
                the remit of a local AAC service & how they interact with
                Specialised AAC Services nationally. Documents containing useful
                information regarding statistics and prevalence to support with
                service planning are signposted along with quality standards and
                tables to RAG rate against these standards. A range of sample
                service specifications, pathways and levels of service provision
                are also provided.
              </li>
              <li>
                Service Implementation: This section includes practical elements
                to consider when setting up a service e.g. sample referral
                forms, leaflets, infection control and data protection
                considerations etc. Sample Standard Operating Procedures (SOPs)
                and suggestions for equipment management and outcome measures
                are included
              </li>
            </ul>
            <p>
              Ace Centre can offer support to local teams within the Thames
              Valley & Wessex and Northwest regions to implement the toolkit in
              their region.
            </p>
            <p>Support could include:</p>
            <ul>
              <li>
                Attending meetings (either face to face or virtually) to discuss
                the four aspects of service development described above and how
                to apply the examples to individual local service needs.{" "}
              </li>
              <li>
                Help and advice with data collection and analysis methods
                including exploration of software such as Microsoft Power BI for
                this purpose.
              </li>
              <li>
                Advice and support to profile the professional development needs
                of the local AAC workforce.
              </li>
              <li>
                Access to training opportunities via{" "}
                <Link href="/learning">Ace Centre Learning.</Link>
              </li>
              <li>
                Joint assessment/advice sessions to local clients who may not be
                eligible for the NHSE Specialised AAC Service.
              </li>
            </ul>

            <h3>LAACES Loan Bank</h3>
            <p>
              To assist local teams with the evidencing of AAC need at a local
              level, Ace Centre offers a loan bank of equipment. A variety of
              AAC resources can be loaned from Ace Centre on a short-term basis
              to assist local AAC practitioners in building up evidence to
              submit Individual Funding Requests where there is no current local
              AAC budget. Equipment can also be loaned by AAC practitioners to
              develop their own skills and knowledge of hardware and software
              they may be less familiar with.
            </p>
          </div>
          <div>
            <div className={styles.serviceProvidedByContainer}>
              <p>Service provided by:</p>
              <Image
                height={152}
                width={290}
                maxHeight={90}
                src={"/nav-logo.png"}
                alt="The Ace Centre logo"
              ></Image>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <BuildIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>AAC Services Toolkit</strong>
                </p>
                <p>
                  The Local Services Working Party created a Local AAC Services
                  Commissioning Toolkit to signpost professionals working in the
                  field to useful resources, which can support the establishment
                  of a local AAC service
                </p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://localaactools.co.uk/"
                  >
                    View toolkit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <InformationDays nhs />
        <ResourceList
          title="Resources to get started"
          viewAllLink="/resources/all?category=getting-started"
          products={gettingStartedResources}
          className={styles.resourcesList}
        />
        {/* <FeaturedStory nhs {...featuredStory} /> */}
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  const featuredStory = await getSimpleStory("paul");

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
      featuredStory,
      gettingStartedResources: resources.slice(0, 4),

      seo: {
        title: "LAACES",
        description:
          "Ace Centre is committed to help support the establishment and development of local AAC services in both the Thames Valley & Wessex and Northwest regions within which we provide the NHSE Specialised AAC Services.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
