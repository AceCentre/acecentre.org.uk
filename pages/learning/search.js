import { redirect } from "next/navigation";

import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";

export default function LearningSearchPage() {
  redirect("https://acecentre.arlo.co/w/events/");

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <Footer />
    </>
  );
}

export const getServerSideProps = async ({ res }) => {
  res.writeHead(301, { Location: "https://acecentre.arlo.co/w/events/" });
  res.end();

  return { props: {} };
};
