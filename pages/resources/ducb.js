import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllProducts } from "../../lib/products/get-products";
import { BackToLink } from "../../components/back-to-link/back-to-link";

// import { NewsletterSignup } from "../../components/resources-download/resources-download";

import styles from "../../styles/resources-detail.module.css";
// import { ProjectHighlight } from "../../components/project-highlight/project-highlight";
import { ResourceList } from "../../components/resource-list/resource-list";
// import { ProductFaqs } from "../../components/product-faqs/product-faqs";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Image } from "../../components/image";
import { Button } from "../../components/button/button";
import Avatar from "@mui/material/Avatar";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import SchoolIcon from '@mui/icons-material/School';
// import Link from "next/link";
import { School } from "@mui/icons-material";

import { ResourcesImage } from "../../components/resources-image/resources-image";
import { ResourcesDescription } from "../../components/resources-description/resources-description";
import { ResourcesDownload } from "../../components/resources-download/resources-download";
import { ResourcesShare } from "../../components/resources-share/resources-share";

export default function ResourceDetail({
  resource,
  relatedResources,
  attachedResources,
}) {


  return (
    <>
    
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="all resources" href="/resources/all" />
        <div className={styles.bannerArea}>
          <Image
            priority
            layout="fill"
            objectFit="contain"
            src="/DUCB-banner.png"
            alt={
              "DUCB banner Image."
            }
          />
        </div>
        <div className={styles.descriptionContainer}>
          <p>
            Developing and Using a Communication Book (DUCB) is a much-loved guide used by many carers, 
            parents and professionals who need to make and use a communication book for people who are
            preliterate and rely on symbols to support their communication. 
          </p>
          <p>
            This fully revised second edition builds on all that was good about the original guide, 
            incorporating the wealth of experience of the full Ace Centre team spanning nearly two decades 
            since it was first developed. 
          </p>
        </div>
        <div className={styles.pageContainer}>
          <div className={styles.left}>
            <h2>Developing and Using a Communication Book Package</h2>
            <p>
            DUCB package contains several elements which include:
            </p>
            <ul>
              <li>
                <strong>Guidebook</strong>
                <strong>:&nbsp;</strong>presented in an A5 file
              </li>
              <li>
                <strong>Demonstration Pages:&nbsp;</strong>included in the guidebook
              </li>
              <li>
                <strong>Templates: </strong>Free to download for Boardmaker, InPrint and Mindexpress
              </li>
              <li>
                <strong>Training:&nbsp;</strong> <a href="https://acecentre.arlo.co/w/events/17-how-to-develop-and-use-a-communication-book-ducb">Introductory and Developing
                levels from Ace Centre Learning&nbsp;</a>
              </li>
            </ul>
            <h2>
              <b>Developing and Using a Communication Book Guidebook:</b>
            </h2>
            <p>
            The guide offers clarity for parents, carers and professionals in developing 
            communication books that progressively helps people to communicate an increasing
             number of messages.   
            </p>
            <strong>The guide sets out:</strong>
            <ul>
              <li>An updated, stable core vocabulary that is available from every topic page to
                 promote its use.  The core vocabulary is developed through five stages and includes 
                 a newly simplified Stage One.</li>
              <li>Ideas for developing a fringe vocabulary that can meet an individual&apos;s interests, 
                needs and varied environments, with plenty of examples included.</li>
              <li>A continued promotion of the communication of rich ideas through symbols rather than 
                the production of grammatically correct sentences for face-to-face communication.</li>
              <li>A new approach to organising pages and accessing vocabulary with a suggested menu, tabs 
                and supports for navigating around the book.</li>
              <li>The importance of a communication partner who is taught, through the guide, to use 
                and model the symbols during communication and to support and scaffold the learner&apos;s 
                own communication attempts.</li>
            </ul>
            <h2>Developing and Using a Communication Book Demonstration Pages </h2>
            <p>
            The DUCB Demonstration Pages included in the Guidebook contain example communication book pages 
            that aim to bring to life the practices and principles described in the guide. It is designed 
            to be used alongside the guide which provides detailed information about each stage, ideas 
            around readiness, and aims for both the communication partner and the learner. 
            </p>

            <h2>
              <b>Developing and Using a Communication Book Template</b>
            </h2>
            <p>Free downloadable files for creating, personalising and printing pages for a communication
               book. Templates are available to download and are compatible with:</p>
            <ul>
              <li>Boardmaker 6 and Boardmaker 7 for Picture Communication Symbols (PCS)</li>
              <li>InPrint 3 (download) and InPrint 4 (within the software template picker) for Widgit 
                symbols</li>
              <li>MindExpress for PCS, Widgit and Symbol Stix</li>
            </ul>
            <p>
            Please note: these files download as a .zip files. 
            Please extract the individual template files before opening in your symbol software.
            </p>
            
            <h2>
              <b>Vocabulary Worksheet</b>
            </h2>
            <p>Support to help generate ideas about words and pages relevant to an individual which can 
              be used to personalise or expand their communication book.</p>

          </div>
          <div className={styles.topArea}>
            <div className={styles.leftTopArea}>
              <ResourcesImage resource={resource} priority />
            </div>
            <div className={styles.rightTopArea}>
              <ResourcesDescription resource={resource} />
              {resource.slug !== "look2talk" && (
                <ResourcesDownload resource={resource} />
              )}
              <ResourcesShare />
              {/* {resource.slug === "look2talk" && <ResourcesImageL2T />} */}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <LocalLibraryIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Guidebook</strong>
                </p>
                <p>Printed A5 Manual including Demo Pages</p>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <ResourcesDownload resource={resource} />
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <School className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Training</strong>
                </p>
                <p>Ace Centre Learning offers 2 levels of courses</p>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://acecentre.arlo.co/w/events/17-how-to-develop-and-use-a-communication-book-ducb" 
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <DashboardIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Boardmaker (PCS) Templates</strong>
                </p>
                <p>Free downloadable files for creating, personalising and printing pages</p>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://backend.acecentre.org.uk/wp-content/uploads/2017/09/Look2Talk-Communication-Book-Templates-Ace-Centre-June23.zip" // TODO: Add correct link
                    download
                  >
                    Boardmaker 7 (PCS)
                  </Button>
                </div>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://backend.acecentre.org.uk/wp-content/uploads/2024/06/Look2Talk-InPrint-Templates-AceCentre-June2024.zip" // TODO: Add correct link
                    download
                  >
                    Boardmaker 6 (PCS)
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <DashboardIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Widgit Templates</strong>
                </p>
                <p>Free downloadable files for creating, personalising and printing pages</p>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://acecentreuk.sharepoint.com/:p:/s/AnonymousShares/EfexZJSb6gNAt8Q1BtwCK-4BHhgqo2D5jFKBFUTiIoL_jg" // TODO: Add correct link
                  >
                    Inprint 3
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <DashboardIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>MindExpress Templates</strong>
                </p>
                <p>Free downloadable files for creating, personalising and printing pages</p>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://backend.acecentre.org.uk/wp-content/uploads/2017/09/Look2Talk-Introductory-Stage-More-Stop-6.23.zip" // TODO: Add correct link
                    download
                  >
                    MindExpress
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <FileCopyIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Vocabulary Templates</strong>
                </p>
                <p>Free downloadable worksheet for personalising a communication book</p>
                <div className={styles.downloadFormButtonContainer} style={{ marginTop: "1rem" }}>
                  <Button
                    className={styles.downloadFormButton}
                    href="https://acecentre.org.uk/resources/identifying-vocabulary-to-personalise-aac"
                    download
                  >
                    Free download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ResourceListSwitch
          resource={resource}
          attachedResources={attachedResources}
          relatedResources={relatedResources}
        />
      </main>
      <Footer />
    </>
  );
}

const ResourceListSwitch = ({
  resource,
  attachedResources,
  relatedResources,
}) => {
  const isEbook = resource.ebook;

  if (isEbook && attachedResources.length > 0) {
    return (
      <ResourceList
        className={styles.resourcesList}
        title={"Resources featured in this eBook"}
        tagline="Learn how to effectively use these resources from this eBook"
        products={attachedResources}
      />
    );
  }

  return (
    <ResourceList
      className={styles.resourcesList}
      title={"Other resources you might like"}
      viewAllLink={"/resources/all"}
      viewAllText="View all resources"
      products={[...attachedResources, ...relatedResources].slice(0, 4)}
    />
  );
};

export const getStaticProps = async () => {
  const slug = "developing-using-communication-book";
  const allProducts = await getAllProducts(true);

  if (!allProducts) throw new Error("Could not get all the products");

  const currentResource = allProducts.find((product) => product.slug === slug);

  console.log(currentResource);

  if (!currentResource) {
    return {
      notFound: true,
    };
  }

  const currentCategory = currentResource.category.name;

  const relatedResources = allProducts
    .filter((product) => product.slug !== slug)
    .map((product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    }))
    .sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      return aDate - bDate;
    })
    .sort((a, b) => {
      const catA = a.mainCategoryName;
      const catB = b.mainCategoryName;

      if (catA == currentCategory) {
        return -1;
      }

      if (catB == currentCategory) {
        return 1;
      }

      return 1;
    })
    .slice(0, 4);

  const attachedResources = currentResource.attachedResources.map(
    (product) => ({
      title: htmlDecode(product.name),
      mainCategoryName: product.category.name,
      featuredImage: product.image,
      ...product,
    })
  );

  const seoPrice = currentResource.price;
  const seoInStock = currentResource.inStock;

  return {
    revalidate: 60,
    props: {
      resource: currentResource,
      relatedResources: relatedResources.slice(0, 4),
      attachedResources: attachedResources.slice(0, 4),
      seo: {
        title: currentResource.name,
        description: currentResource.shortDescription,
        image: currentResource.image,
        product: {
          sku: currentResource.slug,
          image: currentResource?.image?.src || null,
          title: currentResource.name,
          description:
            currentResource.shortDescription ||
            `Checkout the ${currentResource.name} created by Ace Centre.`,
          url: `https://acecentre.org.uk/resources/${currentResource.slug}`,
          price: seoPrice,
          availability: seoInStock,
        },
      },
    },
  };
};

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
