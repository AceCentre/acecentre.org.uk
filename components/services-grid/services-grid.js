import { GridSquare } from "../course-categories-grid/course-categories-grid";
import styles from "./services-grid.module.css";

export const ServicesGrid = () => {
  return (
    <ul className={styles.container}>
      {gridItems.map((item) => (
        <GridSquare
          key={`services-grid-${item.name}`}
          href={item.href}
          image={item.image}
          name={item.name}
          overlayColor="rgba(132,186,220,0.3)"
          textBackground="rgba(132,186,220,0.8)"
          textColor="#ffffff"
        />
      ))}
    </ul>
  );
};

const gridItems = [
  {
    name: "NHS Services",
    href: "/getting-started/what-is-aac",
    image: {
      src: "/what-is-aac.jpeg",
      alt: "A woman wearing a tracking dot on her forehead",
    },
  },
  {
    name: "Ace Centre Learning",
    href: "/getting-started/how-can-i-access-my-computer",
    image: {
      src: "/computer-access.jpeg",
      alt: "Someone using a touch screen device to communicate",
    },
  },
  {
    name: "Engineering",
    href: "/getting-started/finding-the-right-aid",
    image: {
      src: "/right-aid.jpeg",
      alt: "A communication device",
    },
  },
  {
    name: "Assessments",
    href: "/getting-started/resources-to-get-started",
    image: {
      src: "/resources-to-get-started.jpeg",
      alt: "Someone using a paper based communication device",
    },
  },
  {
    name: "Advice & Information",
    href: "/getting-started/resources-to-get-started",
    image: {
      src: "/resources-to-get-started.jpeg",
      alt: "Someone using a paper based communication device",
    },
  },
  {
    name: "Research",
    href: "/getting-started/resources-to-get-started",
    image: {
      src: "/resources-to-get-started.jpeg",
      alt: "Someone using a paper based communication device",
    },
  },
  {
    name: "Partnerships",
    href: "/getting-started/resources-to-get-started",
    image: {
      src: "/resources-to-get-started.jpeg",
      alt: "Someone using a paper based communication device",
    },
  },
];
