import { GridSquare } from "../course-categories-grid/course-categories-grid";
import styles from "./getting-started-grid.module.css";

export const GettingStartedGrid = () => {
  return (
    <ul className={styles.container}>
      {gridItems.map((item) => (
        <GridSquare
          key={`getting-started-grid-${item.name}`}
          href={item.href}
          image={item.image}
          name={item.name}
          overlayColor="rgba(227,190,189,0.2)"
          textBackground="rgba(227,190,189,0.8)"
        />
      ))}
    </ul>
  );
};

const gridItems = [
  {
    name: "What is AAC / What is AT?",
    href: "/getting-started/what-is-aac-what-is-at",
    image: {
      src: "/what-is-aac.jpeg",
      alt: "A woman wearing a tracking dot on her forehead",
    },
  },
  {
    name: "How can I access my computer better?",
    href: "/getting-started/i-difficulty-accessing-computer-i",
    image: {
      src: "/computer-access.jpeg",
      alt: "Someone using a touch screen device to communicate",
    },
  },
  {
    name: "Which is the right communication aid for me?",
    href: "/getting-started/find-right-communication-aid",
    image: {
      src: "/right-aid.jpeg",
      alt: "A communication device",
    },
  },
];
