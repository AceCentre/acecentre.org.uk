import { GridSquare } from "../course-categories-grid/course-categories-grid";
import styles from "./services-grid.module.css";

export const ServicesGrid = ({ gridItems = defaultGridItems }) => {
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

const defaultGridItems = [
  {
    name: "NHS Services",
    href: "/services/nhs",
    image: {
      src: "/services/nhs.jpg",
      alt: "A client communicating",
    },
  },
  {
    name: "Ace Centre Learning",
    href: "/learning",
    image: {
      src: "/services/learning.jpeg",
      alt: "A room with people presenting at the front",
    },
  },
  {
    name: "Engineering",
    href: "/services/engineering",
    image: {
      src: "/services/engineering.jpg",
      alt: "An Ace Centre engineer using a 3D printer",
    },
  },
  {
    name: "Assessments",
    href: "/services/assessments",
    image: {
      src: "/services/assessments.jpg",
      alt: "Ace Centre staff helping a client use their communication device",
    },
  },
  {
    name: "Advice & Information",
    href: "/services/advice-information",
    image: {
      src: "/services/advice.jpg",
      alt: "A woman smiling whilst taking a call on a headset",
    },
  },
  {
    name: "Research",
    href: "/services/research",
    image: {
      src: "/services/research.jpg",
      alt: "A communication device",
    },
  },
  {
    name: "Partnerships",
    href: "/services/partnerships",
    image: {
      src: "/services/partnership.jpg",
      alt: "Two people looking at a communication device",
    },
  },
  {
    name: "Device Mounting",
    href: "/services/mounting",
    image: {
      src: "/services/mounting.jpeg",
      alt: "Two people looking at a communication device",
    },
  },
];
