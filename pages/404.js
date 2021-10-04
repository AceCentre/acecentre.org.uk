import Link from "next/link";
import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { defaultNavItems } from "../components/sub-nav/sub-nav";
import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

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
        <span>404</span>
        <h1>Not found</h1>
        <p>
          We can&apos;t find what you are looking for. If you think there should
          be something here then{" "}
          <Link href="/contact">
            <a>Contact Us</a>
          </Link>
        </p>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
