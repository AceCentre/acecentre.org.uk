import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./nav.module.css";

export const Nav = () => {
  return (
    <div className={styles.header}>
      <HomeImage />
      <div>
        <NavList>
          <NavItem>About</NavItem>
          <NavItem>Blog</NavItem>
          <NavItem>Contact</NavItem>
          <NavItem>
            <NavIcon icon={faUser} />
            My AceCentre
          </NavItem>
          <NavItem>
            <NavIcon icon={faSearch} />
            Search
          </NavItem>
          <NavItem>
            <NavIcon icon={faShoppingCart} />
            Checkout
          </NavItem>
          <NavItem>
            <DonateButton />
          </NavItem>
        </NavList>
      </div>
    </div>
  );
};

const NavIcon = ({ icon }) => {
  return <FontAwesomeIcon className={styles.navIcon} icon={icon} />;
};

const HomeImage = () => {
  return <span className={styles.homeImage}>Home</span>;
};

const DonateButton = () => {
  return <button>Donate</button>;
};

const NavList = ({ children }) => {
  return <ul className={styles.list}>{children}</ul>;
};

const NavItem = ({ children }) => {
  return <li className={styles.listItem}>{children}</li>;
};
