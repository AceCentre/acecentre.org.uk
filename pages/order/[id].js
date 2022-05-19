import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../lib/global-props/hook";
import { withGlobalProps } from "../../lib/global-props/inject";

// pages/404.js
export default function Custom404() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <style jsx>{`
        span {
          font-size: 100px;
        }

        main {
          text-align: center;
          width: 90%;
          margin: 0 auto;
          max-width: 1024px;
          padding: 6rem 0;
        }

        h1 {
          font-weight: normal;
        }
      `}</style>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <span>Sorry</span>
        <h1>We are down for scheduled maintenance right now.</h1>
        <p>
          We are hard at work making our systems super reliable. Check back in
          an hour.
        </p>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
