import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { QrReader } from "../components/qr-reader/qr-reader";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

import { useGlobalProps } from "../lib/global-props/hook";
import { withGlobalProps } from "../lib/global-props/inject";

export default function QrPage() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <QrReader />
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps(async () => {
  return {
    props: {
      seo: { dontIndex: true, title: "QR Code" },
    },
  };
});
