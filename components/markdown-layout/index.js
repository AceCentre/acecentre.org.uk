import { useGlobalProps } from "../../lib/global-props/hook";
import { CombinedNav } from "../combined-nav/combined-nav";
import { Footer } from "../footer/footer";
import { PageTitle } from "../page-title/page-title";
import { defaultNavItems } from "../sub-nav/sub-nav-items";

import styles from "./styles.module.css";

export default function MarkdownLayout({ children, title, subtitle }) {
  const { currentYear } = useGlobalProps();

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main>
        <PageTitle heading={title} description={subtitle} />
        <div className={styles.container}>{children}</div>
      </main>
      <Footer currentYear={currentYear} />
    </>
  );
}
