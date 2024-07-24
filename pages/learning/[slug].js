import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { redirect } from "next/navigation";

export default function LearningDetail() {
  redirect("https://acecentre.arlo.co/w/events/");

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent"></main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export const getServerSideProps = async ({ res }) => {
  res.writeHead(301, { Location: "https://acecentre.arlo.co/w/events/" });
  res.end();

  return { props: {} };
};
