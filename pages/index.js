import { Nav } from "../components/nav/nav";
import { defaultNavItems, SubNav } from "../components/sub-nav/sub-nav";

export default function Home() {
  return (
    <>
      <header>
        <Nav />
        <SubNav navItems={defaultNavItems} />
      </header>
      <main></main>
    </>
  );
}
