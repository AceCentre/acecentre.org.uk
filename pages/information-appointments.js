import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { PageTitle } from "../components/page-title/page-title";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

// import styles from "../styles/information-appointments.module.css";

export default function Contact() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle
          heading="Information appointment"
          description="Book in for an informal chat about your needs with members of the Ace Centre team."
        />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: {
        title: "Information appointment",
        description:
          "Whether you are just starting out or you are an experienced AAC /AT user ready to move on, book in for an informal chat about your needs with members of the Ace Centre team.",
      },
    },
  };
});
