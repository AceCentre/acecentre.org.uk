import { CombinedNav } from "../../../components/combined-nav/combined-nav";
import { Footer } from "../../../components/footer/footer";
import { defaultNavItems } from "../../../components/sub-nav/sub-nav";
import { useGlobalProps } from "../../../lib/global-props/hook";
import { withGlobalProps } from "../../../lib/global-props/inject";

export default function NHSLanding() {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} nhs />
      </header>
      <main></main>
      <Footer currentYear={currentYear} />
    </>
  );
}

export const getStaticProps = withGlobalProps();
