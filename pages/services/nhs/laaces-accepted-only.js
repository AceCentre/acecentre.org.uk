import Link from "next/link";
import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { GenericFaqs } from "../../../components/getting-started-faqs/getting-started-faqs";
import { SearchBox } from "../../../components/search-box/search-box";
import { ImportantCallout } from "../../../components/service-cards/service-cards";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav-items";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

import styles from "../../../styles/laaces-private.module.css";

export default function Laaces() {
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
      <main id="mainContent">
        <SearchBox
          includeSearch={false}
          title="Local AAC Services"
          description="Explore the services offered to Local AAC Services in North West and Thames Valley & Wessex regions"
          backgroundImage="/nhs-wave.svg"
          backgroundColor="#ffffff"
          textColor="#ffffff"
          dashColor="white"
        />
        <ImportantCallout>
          This page is for service already approved to access LAACES resources
          from Ace Centre. DO NOT SHARE this webpage directly with other
          services. They must request to join on their own.{" "}
          <Link href="/services/nhs/laaces">
            If you have not joined LAACES, visit this page to join.
          </Link>
        </ImportantCallout>
        <div className={styles.narrowContainer}>
          <h2>Loan bank</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante
            blandit, pretium dui vitae, euismod leo. Nunc luctus pellentesque
            lorem ac tempus. Aliquam erat volutpat. Vestibulum lacus nunc,
            tempor ut sapien et, condimentum viverra lorem. Nam fringilla nisi
            et justo sagittis, quis suscipit eros volutpat. Duis risus ante,
            feugiat quis elit vitae, accumsan efficitur arcu. Suspendisse
            eleifend, metus eu posuere feugiat, tellus urna vehicula diam, eu
            ultrices nunc ligula et sapien. Sed consectetur est ac augue
            iaculis, vel fermentum nunc aliquet. Duis vel euismod quam, at
            ullamcorper ex. Sed ut iaculis augue. Nullam ac odio vitae ipsum
            dictum sollicitudin nec eu quam.
          </p>

          <p>
            Mauris sed neque quis dui faucibus ornare eleifend in turpis.
            Pellentesque porta elit in eleifend hendrerit. Nam pellentesque
            condimentum odio, at commodo sem blandit eu. Quisque congue
            sollicitudin est quis venenatis. Maecenas faucibus, est aliquet
            porta malesuada, neque mauris finibus neque, at faucibus velit dui
            vel sem. Pellentesque suscipit condimentum sapien. Proin venenatis
            egestas mi. Duis diam quam, tincidunt vel est et, blandit pharetra
            elit. Aenean lacinia sem eget lorem sodales luctus. Duis eu mi ac
            metus maximus gravida eu eu enim. Etiam scelerisque nunc et tortor
            volutpat lacinia. Donec iaculis sit amet tellus ut facilisis. Morbi
            posuere eu risus ac molestie.
          </p>
          <p>Watch a tutorial here:</p>
          <div className={styles.video}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube-nocookie.com/embed/cSLZUBqlB04"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <h2>Training oppertunities</h2>
          <p>
            Quisque sit amet fringilla orci, id blandit risus. Aliquam
            consectetur ante lectus, at faucibus lacus fermentum sit amet.
            Aenean at fringilla eros. Suspendisse luctus mollis ante ac
            vestibulum. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Maecenas leo urna, tempus
            quis risus et, commodo tincidunt nisi. Cras ornare dapibus sem id
            bibendum. Ut ullamcorper libero id congue ultrices. Nunc euismod
            malesuada odio, et rutrum urna tempus at.
          </p>

          <p>
            Nullam eu tellus vitae turpis vulputate fermentum. Duis non lacinia
            nunc, vitae vestibulum mi. Mauris blandit nunc sit amet dui
            efficitur blandit. Nunc imperdiet leo turpis, a imperdiet ligula
            pellentesque ut. Sed volutpat massa mi, vel rutrum tortor placerat
            et. Proin porttitor augue orci, in convallis quam iaculis sed.
            Aenean mattis erat ac metus auctor posuere. Quisque interdum justo
            dolor, eu viverra nisl facilisis condimentum. Mauris in dui pretium,
            consequat nulla sed, aliquet velit.
          </p>

          <p>
            Sed nec laoreet sapien. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Etiam pharetra neque ut
            ex molestie, a gravida augue interdum. Maecenas molestie accumsan
            lectus sed ornare. Nunc id luctus massa. In consequat felis eu
            viverra efficitur. Integer sed erat et nisl congue faucibus. Mauris
            quis hendrerit lorem. Maecenas tristique eget libero at accumsan.
            Donec mi nulla, tempor nec mi ac, finibus mollis ligula. Ut mattis,
            mauris sit amet posuere efficitur, lectus quam varius lectus, sit
            amet tempor eros ex id ligula. Aliquam molestie diam ut tellus
            gravida, nec pulvinar nibh vehicula. Praesent id varius arcu, eu
            tristique ex. Cras sollicitudin, lorem quis sollicitudin sodales,
            nisi sapien venenatis ipsum, quis lacinia lacus risus quis lacus. Ut
            et nunc id dolor sodales viverra.
          </p>
        </div>
        <GenericFaqs nhs faqs={laacesFaqs} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

const laacesFaqs = [
  {
    question: "Should I keep the box?",
    answer: (
      <>
        <p>Yes</p>
      </>
    ),
  },
  {
    question: "What do I do when i need tech support?",
    answer: (
      <>
        <p>Call someone</p>
      </>
    ),
  },
  {
    question: "What kind of services can you tell me about?",
    answer: (
      <>
        <p>
          Currently we have data on AAC Services, EC services and Wheelchair
          services. We also only have data for UK services.
        </p>
        <p>If you think we should include more services then </p>
      </>
    ),
  },
  {
    question: "We can have as many of these as we want",
    answer: (
      <>
        <p>Call someone</p>
      </>
    ),
  },
];

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        noIndex: true,
        title: "LAACES",
        description:
          "Ace Centre is committed to help support the establishment and development of local AAC services in both the Thames Valley & Wessex and Northwest regions within which we provide the NHSE Specialised AAC Services.",
      },
    },
  };
});
