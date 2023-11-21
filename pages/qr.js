import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { QrReader } from "../components/qr-reader/qr-reader";
import { defaultNavItems } from "../components/sub-nav/sub-nav";

export default function QrPage() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <QrReader />
      </main>
      <Footer />
    </>
  );
}
export const getStaticProps = async () => {
  return {
    props: {
      seo: { dontIndex: true, title: "QR Code" },
    },
  };
};
