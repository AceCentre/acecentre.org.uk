import styles from "./course-categories-grid.module.css";
import { ImageWithLoader as Image } from "../image";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";

export const CourseCategoriesGrid = ({
  overlayColor = "rgba(138, 217, 202, 0.2)",
  textBackground = "rgba(227,190,189,0.8)",
  textColor = "#333333",
  objectFit = "cover",
}) => {
  return (
    <ul className={`${styles.container} ${styles.evenContainer}`}>
      <CategorySquare
        overlayColor={overlayColor}
        textBackground={textBackground}
        textColor={textColor}
        category={{
          name: "Access",
          image: {
            src: "/access.png",
            alt: "Access Logo",
          },
          href: "https://acecentre.arlo.co/w/events/cat-4-access/",
        }}
        objectFit={objectFit}
        className={styles.backgroundColor}
      />
      <CategorySquare
        overlayColor={overlayColor}
        textBackground={textBackground}
        textColor={textColor}
        category={{
          name: "Communication",
          image: {
            src: "/communication.png",
            alt: "Communication Logo",
          },
          href: "https://acecentre.arlo.co/w/events/cat-2-communication/",
        }}
        objectFit={objectFit}
        className={styles.backgroundColor}
      />
      <CategorySquare
        overlayColor={overlayColor}
        textBackground={textBackground}
        textColor={textColor}
        category={{
          name: "Education",
          image: {
            src: "/education.png",
            alt: "Education Logo",
          },
          href: "https://acecentre.arlo.co/w/events/cat-6-education/",
        }}
        objectFit={objectFit}
        className={styles.backgroundColor}
      />
      <CategorySquare
        overlayColor={overlayColor}
        textBackground={textBackground}
        textColor={textColor}
        category={{
          name: "Engineering",
          image: {
            src: "/engineering.png",
            alt: "Engineering Logo",
          },
          href: "https://acecentre.arlo.co/w/events/cat-7-engineering/",
        }}
        objectFit={objectFit}
        className={styles.backgroundColor}
      />
    </ul>
  );
};

export const GridSquare = ({
  href,
  image,
  name,
  overlayColor = "rgba(138, 217, 202, 0.2)",
  textBackground = "rgba(227,190,189,0.8)",
  textColor = "#333333",
  objectFit = "cover",
  className,
}) => {
  return (
    <>
      <style jsx>{`
        .overlayTint {
          background-color: ${overlayColor};
        }

        .banner {
          background-color: ${textBackground};
        }

        .textColor {
          color: ${textColor};
        }
      `}</style>
      <li className={styles.listItem} key={`browse-articles-${href}`}>
        <Link href={href} legacyBehavior>
          <a className={styles.link}>
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              objectFit={objectFit}
              className={`${className ? className : ""}`}
            />
            <div className={`${styles.yellowTint} overlayTint`} />
            <div className={styles.blueBannerContainer}>
              <div className={`${styles.blueBanner} banner`}>
                <p className="textColor">{name}</p>
                <Avatar className={styles.avatar}>
                  <ArrowForwardIcon className={styles.icon} />
                </Avatar>
              </div>
            </div>
          </a>
        </Link>
      </li>
    </>
  );
};

export const CategorySquare = ({
  category,
  overlayColor = "rgba(138, 217, 202, 0.2)",
  textBackground = "rgba(227,190,189,0.8)",
  textColor = "#333333",
  objectFit = "cover",
  className,
}) => {
  return (
    <GridSquare
      href={
        category.href
          ? category.href
          : `/learning/search?category=${category.slug}`
      }
      image={category.image}
      name={category.name}
      overlayColor={overlayColor}
      textBackground={textBackground}
      textColor={textColor}
      objectFit={objectFit}
      className={className}
    />
  );
};
