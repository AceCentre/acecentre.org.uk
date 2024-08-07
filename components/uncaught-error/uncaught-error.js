import Link from "next/link";
import { CombinedNav } from "../combined-nav/combined-nav";
import { Footer } from "../footer/footer";
import { defaultNavItems } from "../sub-nav/sub-nav-items";

export const UncaughtError = ({ error, trace }) => {
  console.warn(error);
  console.warn(trace);

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
          <Link href="/contact" legacyBehavior>
            <a>Contact Us</a>
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
};
