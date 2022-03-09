import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Avatar } from "@material-ui/core";

import styles from "../styles/communication-works.module.css";
import { getSimpleStory } from "../lib/story/get-story";

import { getAllProducts } from "../lib/products/get-products";
import { getAllProductCategories } from "../lib/products/get-all-categories";
import { filterProducts } from "../lib/products/filter-products";
import { Image } from "../components/image";
import { MailingList } from "../components/service-finder-mailing-list/service-finder-mailing-list";
import Link from "next/link";
import AssignmentIcon from "@material-ui/icons/Assignment";
export default function CommunicationWorks() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <div className={styles.imageContainer}>
          <Image
            src="/CW2022.png"
            alt="Communication works banner"
            width={1640}
            height={924}
          />
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.leftContent}>
            <h2>Communication Works 2022 #GetSeen</h2>
            <p>
              Ace Centre is delighted to be partnering with{" "}
              <Link href="https://cenmac.com/">CENMAC</Link> to host
              Communication Works 2022. This successful event was established in
              London 2011 and we&apos;ve been working with New Bridge School in
              Oldham to offer it for the first time in the North of England.
            </p>
            <p>
              Communication Works 2022 is a free live event allowing attendees
              the opportunity to see first-hand a range of assistive and
              accessible technology, communication tools, digital strategies,
              and person-centred approaches. We&apos;ve invited new and
              established innovators to present and exhibit a diverse selection
              of AT and AAC products and strategies to support students in
              mainstream education and SEND, including those with physical
              difficulties, vision and/or hearing impairments, dyslexia,
              communications needs, or requiring curriculum support.
            </p>
            <h2>Guest Speaker | Toby Hewson</h2>
            <p>
              &quot;Toby Hewson who founded Sussex-based charity Just Different
              in 2008 has been listed as one of the Top 100 Inspirational People
              in Sussex by regional magazine ETC, part of the JPIMedia Group.
              After experiencing difficulties in being accepted in the
              workplace, he vowed to set up an organisation that not only helped
              to educate young people on the important area of understanding
              disability and difference - but to create opportunities at the
              same time for disabled people to work and progress in meaningful
              careers.&quot; - Sussex Local (2019)
            </p>
            <MailingList
              signUpIdentifier="communication-works"
              description="Sign up to our free newsletter to get emails about other Ace Centre events and news."
            />
            <h2>Exhibitors</h2>
            <ul className={styles.list}>
              <ListItem>Ace Centre</ListItem>
              <ListItem>
                <Link href="https://cenmac.com/">CENMAC*</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.ability-world.com/">Ability World</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.facebook.com/AbdiEnterprises">
                  Adbi Enterprises*
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.brightsignglove.com/">
                  Brightsign Glove
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.calibreaudio.org.uk/">
                  Calibre Audio*
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://candleaac.com/">CandLE</Link>
              </ListItem>
              <ListItem>
                <Link href="https://en.commtap.org/">Commtap</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.filisia.com/">Cosmo by Filisia</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.cricksoft.com/uk">Crick Software</Link>
              </ListItem>
              <ListItem>
                <Link href="https://yourdolphin.com/en-gb/products/individuals/easyreader-app">
                  Dolphin
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://eyetechds.com/focus-areas/aac-communication/">
                  EyeTech
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.humanware.com/en-united_kingdom/home">
                  Humanware
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.inspiration-at.com/">Inspiration</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.jabbla.co.uk/">Jabbla UK</Link>
              </ListItem>
              <ListItem>Just Different</ListItem>
              <ListItem>
                <Link href="https://kaz-type.com/">Kaz-type</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.liberator.co.uk/">Liberator</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.merushop.org/">Meru*</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.noisolation.com/av1">
                  No Isolation*
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.orcam.com/en/">Orcam</Link>
              </ListItem>
              <ListItem>
                <Link href="http://www.pcbyvoice.com/">PCByVoice*</Link>
              </ListItem>
              <ListItem>
                <Link href="https://luxai.com/robot-for-teaching-children-with-autism-at-home">
                  QTrobot*
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://readingwise.com/">Readingwise</Link>
              </ListItem>
              <ListItem>
                <Link href="https://rixresearchandmedia.org/">Rix Centre</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.scanningpens.co.uk/">
                  Scanning Pens
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.scribeasy.com/">Scribeasy</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.seeability.org/">SeeAbility</Link>
              </ListItem>
              <ListItem>
                <Link href="https://thinksmartbox.com/">Smartbox</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.texthelp.com/en-gb/">Texthelp</Link>
              </ListItem>
              <ListItem>
                <Link href="https://uk.tobiidynavox.com/">Tobii Dynavox</Link>
              </ListItem>
              <ListItem>
                <Link href="https://www.widgit.com/">Widgit*</Link>
              </ListItem>
              <ListItem>
                <Link href="https://sensoryguru.com/">Sensory Guru</Link>
              </ListItem>
            </ul>
            <p>
              <i>*Exhibiting at the South event only </i>
            </p>
            <p>
              <i>
                More companies to be confirmed and the seminar programme will be
                shared at the beginning of May 2022.{" "}
              </i>
            </p>
          </div>
          <div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AssignmentIcon className={styles.icon} />
              </Avatar>
              <div>
                <h3>Communication Works NORTH</h3>
                <p>26 May 2022 | 10am-4pm</p>
                <p>New Bridge School, Roman Road, Oldham OL8 3PH</p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/255181132637">
                    Register for free here.
                  </Link>
                </p>
              </div>
            </div>
            <div className={styles.quote}>
              <Avatar className={styles.avatar}>
                <AssignmentIcon className={styles.icon} />
              </Avatar>
              <div>
                <h3>Communication Works SOUTH</h3>
                <p>19 May 2022 | 10am-4pm</p>
                <p>
                  Charlton Athletic Football Stadium, The Valley, Charlton,
                  London SE7 8BL
                </p>
                <p>
                  <Link href="https://www.eventbrite.co.uk/e/252057730457">
                    Register for free here.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer currentYear={currentYear} />
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
        title: "Communication Works 2022",
        description:
          "Communication Works 2022 is a free live event allowing attendees the opportunity to see first-hand a range of assistive and accessible technology, communication tools, digital strategies, and person-centred approaches.",
      },
    },
  };
});

function htmlDecode(input) {
  return input.replace(/&amp;/g, "&");
}
