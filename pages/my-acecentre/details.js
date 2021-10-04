import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { DetailsForm } from "../../components/details-form/details-form";
import { Footer } from "../../components/footer/footer";
import { PageTitle } from "../../components/page-title/page-title";
import { defaultNavItems } from "../../components/sub-nav/sub-nav-items";
import { getUserDetails } from "../../lib/auth/get-user";
import withSession from "../../lib/auth/with-session";
import { useGlobalProps } from "../../lib/global-props/hook";
// import styles from "../../styles/my-acecentre.module.css";

export default function DetailsPage({ details }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <PageTitle
          heading="My details"
          description="A summary of your account details"
        />
        <DetailsForm details={details} />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

// Redirect if you are signed in
export const getServerSideProps = withSession(async ({ req }) => {
  const user = req.session.get("user");

  if (!user || !user.authToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const details = await getUserDetails(req, user);

  return { props: { details } };
});
