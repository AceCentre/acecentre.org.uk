import { CombinedNav } from "../components/combined-nav/combined-nav";
import { Footer } from "../components/footer/footer";
import { LoginCheckout } from "../components/login-and-register-boxes/login-and-register-boxes";
import { defaultNavItems } from "../components/sub-nav/sub-nav-items";

export default function LoginPage() {
  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <LoginCheckout />
      </main>
      <Footer />
    </>
  );
}
