import Link from "next/link";
import { useGlobalProps } from "../../lib/global-props/hook";
import { CombinedNav } from "../combined-nav/combined-nav";
import { Footer } from "../footer/footer";
import { defaultNavItems } from "../sub-nav/sub-nav-items";

export const UncaughtError = ({ error }) => {
  const { currentYear } = useGlobalProps();

  console.warn(error);

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
        <h1>An unexpected error occurred</h1>
        <p>
          An error happened while trying to perform the operation. Please try
          again or{" "}
          <Link href="/contact">
            <a>Contact Us</a>
          </Link>
        </p>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
};
