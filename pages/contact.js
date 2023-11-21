import { CombinedNav } from "../components/combined-nav/combined-nav";
import { ContactCards } from "../components/contact-cards/contact-cards";
import { FindOurOffices } from "../components/find-our-offices/find-our-offices";
import { Footer } from "../components/footer/footer";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

export default function Contact() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="Contact us"
          description="If you think Ace Centre can help you or someone you know please get in touch"
        />
        <ContactCards />

        <FindOurOffices />
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      seo: {
        title: "Contact us",
        description:
          "If you think Ace Centre can help you or someone you know please get in touch",
      },
    },
  };
};
