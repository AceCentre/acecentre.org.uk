import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { getAllProducts } from "../../lib/products/get-products";
import { BackToLink } from "../../components/back-to-link/back-to-link";

import { NewsletterSignup } from "../../components/resources-download/resources-download";

import styles from "../../styles/resources-detail.module.css";
import { ProjectHighlight } from "../../components/project-highlight/project-highlight";
import { ResourceList } from "../../components/resource-list/resource-list";
import { ProductFaqs } from "../../components/product-faqs/product-faqs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Image } from "../../components/image";
import { Button } from "../../components/button/button";
import Avatar from "@mui/material/Avatar";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EmojiSymbolsIcon from "@mui/icons-material/EmojiSymbols";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Link from "next/link";

export default function ResourceDetail({
  resource,
  relatedResources,
  attachedResources,
}) {
  const [modelOpen, setModelOpen] = useState(false);
  const [modelLink, setModelLink] = useState(
    "https://docs.acecentre.org.uk/look2talk/"
  );
  const router = useRouter();
  const { query } = router;

  const storageKey = "newsletter-opt-in";

  const openPopup = (newModelLink) => {
    if (localStorage.getItem(storageKey) === "true") {
      router.push(newModelLink);
    } else {
      setModelOpen(true);
      setModelLink(newModelLink);
    }
  };

  useEffect(() => {
    console.log({
      look2talkquery: query.look2talk !== undefined,
      localstorage: localStorage.getItem(storageKey) === "true",
    });

    if (query.look2talk !== undefined) {
      if (localStorage.getItem(storageKey) === "true") {
        router.push(modelLink);
      } else {
        setModelOpen(true);
      }
    }
  }, [query.look2talk]);
  const onClose = () => setModelOpen(false);

  const project = resource.projects[0] || null;

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="3xl"
        isCentered
        isOpen={modelOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody style={{ padding: "2rem" }}>
            <div className={styles.topSection}>
              <h2>Learn more!</h2>
              <p>
                You can access this content by joining our mailing list to hear
                about Ace Centre Learning courses on Look2Talk and other
                training opportunities.
              </p>
            </div>

            <div className={styles.newsletterContainer}>
              <NewsletterSignup
                withNames
                signUpIdentifier={"look2talk"}
                tags={[{ name: "look2talk" }]}
                onSuccess={() => {
                  localStorage.setItem(storageKey, true);
                  router.push(modelLink);
                }}
              />
            </div>
            <div className={styles.bottomContainer}>
              <button className={styles.closeButton} onClick={onClose}>
                Close window
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

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
            src="/look2talk-banner.jpg"
            alt={
              "Look2Talk logo at the top. Below is a communication easel with a Look2Talk chart. In the middle is a guidebook. On the right is boardmaker with the templates open."
            }
          />
        </div>
        <div className={styles.descriptionContainer}>
          <p>
            Look2Talk is the award-winning guide for carers, parents and
            professionals who need to make and use a communication book for
            people who communicate using their eyes.
          </p>
          <p>
            When speech can not be understood, and using hands or fingers to
            point is difficult, eye pointing to symbols or text can be a fast
            and effective way of communicating a wide range of messages. The
            Look2Talk guide is a step-by-step system that introduces symbols at
            a speed that suits both the learner and their communication
            partner(s). It emphasises the importance of learning together in
            fun, relaxed activities where the learner can take control.
          </p>
        </div>
        <div className={styles.pageContainer}>
          <div className={styles.left}>
            <h2>Look2Talk Package</h2>
            <p>
              Look2Talk guidebook is the main element of a complete package
              containing several elements which include:
            </p>
            <ul>
              <li>
                <strong>Guidebook</strong>
                <strong>:&nbsp;</strong>Free online eBook or download as PDF
              </li>
              <li>
                <strong>Demonstration Pages:&nbsp;</strong>Free to view
                electronically or download and print
              </li>
              <li>
                <strong>Templates: </strong>Free to download as Boardmaker7 or
                InPrint 3 (coming soon) file
              </li>
              <li>
                <strong>Communication Easel:&nbsp;</strong>A4 and A3 options
                available from Ability World
              </li>
              <li>
                <strong>Training:</strong>&nbsp;Introductory and Developing
                levels from Ace Centre Learning&nbsp;
              </li>
            </ul>
            <h2>
              <b>Look2Talk Guidebook </b>
            </h2>
            <p>
              The original Look2Talk guide was based upon experience gained from
              the <em>Look2Talk Project</em>, a two year project run by Ace
              Centre to support and learn from six children and their families
              who either used or were learning to use their eyes to access
              symbol communication. The guide was awarded the Sternberg Award
              for Clinical Innovation in 2008.
            </p>
            <p>
              This edition of the Look2Talk guide has been fully revised and
              updated, drawing upon the clinical experience of the full Ace
              Centre team.
            </p>
            <p>
              Available as a free online eBook, which can also be printed as a
              PDF, and supported by video tutorials and real-life example clips
              throughout. The guidebook covers all of the essential questions
              that need to be answered when creating an eye pointing
              communication book, such as:
            </p>
            <ul>
              <li>What vocabulary do I put in the book?</li>
              <li>How many pictures or symbols do I use on a page?</li>
              <li>Where and when do I start to use the book?</li>
              <li>How do I develop the book over time?</li>
            </ul>
            <p>
              Look2Talk&nbsp;Guidebook complements Ace
              Centre&apos;s&nbsp;popular&nbsp;Developing and Using a
              Communication Book manual for people who can finger-point, and
              both books have similar key concepts:
            </p>
            <ul>
              <li>
                A stable core vocabulary, that is always available and develops
                through five stages. The suggested core vocabulary, ranging from
                two symbols at Stage One to forty-one symbols at Stage Five, is
                drawn from a developmental model of spoken language acquisition,
                but does not stick rigidly to it.
              </li>

              <li>
                Guidance on choosing personalised topic vocabulary designed to
                meet an individual&apos;s interests, needs and varied
                environments.
              </li>
              <li>
                An emphasis on the role of the communication partner who is
                shown, throughout the process, how to use and model the symbols
                during communication and to support and scaffold the
                learner&apos;s own communication attempts.
              </li>
            </ul>
            <p>
              We know of no other resource that provides such specific and
              comprehensive guidance to help this small but important group of
              people who struggle to communicate.
            </p>
            <h2>Look2Talk Demonstration Pages</h2>
            <p>
              The Look2Talk Demonstration Pages contains example communication
              book pages that aim to bring to life the practices and principles
              described in the Look2Talk guide. It is designed to be used
              alongside the guide which provides detailed information about each
              stage, ideas around readiness, and aims for both the communication
              partner and the learner.
            </p>
            <p>
              Interactive versions are available to view online or to view and
              use in PowerPoint. There is also a printable PDF option if you
              wish to assemble an example communication book.
            </p>
            <h2>Look2Talk Communication Book Templates</h2>
            <p>
              Free downloadable files for creating, personalising and printing
              pages for an eye pointing communication book.
            </p>
            <p>
              Compatible with Boardmaker 7 to access Picture Communication
              Symbols (PCS) and InPrint 3 for Widgit symbols.
            </p>
            <p>
              Please note: these files download as a .zip files. Please extract
              the individual template files before opening in your symbol
              software.
            </p>
            <h2>Look2Talk Communication Easel</h2>
            <p>
              An eye pointing communication book is best viewed by the
              communication book user and their partner when it is displayed on
              an easel file. As the book can get quite big (and heavy!) it is
              best that a sturdy easel file is used. We recommend the
              Communication Easel by Ability World which is available in an A4
              as well as A3 version should larger pages be needed.
            </p>
            <p>
              <a href="https://www.ability-world.com/a4-communication-easel-5395-p.asp">
                Click here to view the Ability World A4 Communication Easel
              </a>
            </p>
            <p>
              <a href="https://www.ability-world.com/a3-communication-easel-5397-p.asp">
                Click here to view the Ability World A3 Communication Easel
              </a>
            </p>
            <h2>Look2Talk Introductory Stage Symbols</h2>
            <p>
              Download and print loose “more” and “stop” symbols to use while
              helping the learner to understand that they can use their eyes to
              communicate.
            </p>
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
                <p>Free online eBook or download as PDF</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    onClick={() => {
                      openPopup("https://docs.acecentre.org.uk/look2talk/");
                    }}
                  >
                    View Guidebook
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
                  <strong>Demo Pages</strong>
                </p>
                <p>Example of communication book pages</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    onClick={() => {
                      openPopup(
                        "https://acecentreuk.sharepoint.com/:p:/s/AnonymousShares/EfexZJSb6gNAt8Q1BtwCK-4BHhgqo2D5jFKBFUTiIoL_jg"
                      );
                    }}
                  >
                    View Demo Pages
                  </Button>
                </div>
                <Link
                  href="#"
                  onClick={() => {
                    openPopup(
                      "https://backend.acecentre.org.uk/wp-content/uploads/2023/09/Look2Talk-Demonstration-Book-9.23.ppsx"
                    );
                  }}
                >
                  Download interactive Demo Pages
                </Link>
                <Link
                  href="#"
                  onClick={() => {
                    openPopup(
                      "https://backend.acecentre.org.uk/wp-content/uploads/2024/04/Look2Talk-Printable-Demonstration-Book-9.25.pdf"
                    );
                  }}
                >
                  Download printable Demo Pages
                </Link>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <DashboardIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Templates</strong>
                </p>
                <p>
                  Free downloadable files for creating, personalising and
                  printing pages
                </p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    onClick={() => {
                      openPopup(
                        "https://backend.acecentre.org.uk/wp-content/uploads/2017/09/Look2Talk-Communication-Book-Templates-Ace-Centre-June23.zip"
                      );
                    }}
                  >
                    Boardmaker 7 (PCS)
                  </Button>
                </div>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    onClick={() => {
                      openPopup(
                        "https://backend.acecentre.org.uk/wp-content/uploads/2024/06/Look2Talk-InPrint-Templates-AceCentre-June2024.zip"
                      );
                    }}
                  >
                    InPrint 3 (Widgit)
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <EmojiSymbolsIcon className={styles.icon} />
              </Avatar>
              <div className={styles.quoteText}>
                <p>
                  <strong>Symbols</strong>
                </p>
                <p>Download and print loose “more” and “stop” symbols</p>
                <div className={styles.downloadFormButtonContainer}>
                  <Button
                    className={styles.downloadFormButton}
                    onClick={() => {
                      openPopup(
                        "https://backend.acecentre.org.uk/wp-content/uploads/2017/09/Look2Talk-Introductory-Stage-More-Stop-6.23.zip"
                      );
                    }}
                  >
                    Download Symbols
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {project && <ProjectHighlight project={project} />}
        {resource.faqs.length > 0 && <ProductFaqs faqs={resource.faqs} />}
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
  const slug = "look2talk";
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
