import { useState } from "react";
import styles from "./docs-sidebar.module.css";

export const DocsSidebar = ({ activeLink, topLevel }) => {
  return (
    <ul className={styles.docList}>
      {topLevel.map((item) => {
        const isActive = item.link === activeLink;
        const hasSubPages = item.sub && item.sub.length > 0;
        const { sub = [] } = item;
        const isSubPageActive = !!sub.find((x) => x.link === activeLink);
        const [dropDownActive, setDropDownActive] = useState(
          (isActive || isSubPageActive) && hasSubPages
        );

        return (
          <li key={item.link} className={styles.listItem}>
            <a
              className={`${styles.link} ${isActive && styles.activeLink}`}
              href={item.link}
            >
              {item.title}
            </a>
            {hasSubPages && (
              <button
                className={styles.unstyledButton}
                onClick={() => setDropDownActive(!dropDownActive)}
              >
                {dropDownActive ? <DownChevron /> : <RightChevron />}
              </button>
            )}
            {dropDownActive && (
              <ul className={styles.subDocList}>
                {item.sub.map((subItem) => {
                  const isSubActive = subItem.link === activeLink;
                  return (
                    <li key={subItem.link} className={styles.listItem}>
                      <a
                        className={isSubActive && styles.activeLink}
                        href={subItem.link}
                      >
                        {subItem.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const DownChevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};

const RightChevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};
