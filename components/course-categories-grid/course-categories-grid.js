import styles from "./course-categories-grid.module.css";
import { ImageWithLoader as Image } from "../image";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Link from "next/link";

export const CourseCategoriesGrid = ({
  productCategories,
  overlayColor = "rgba(138, 217, 202, 0.2)",
  textBackground = "rgba(227,190,189,0.8)",
  textColor = "#333333",
  objectFit = "cover",
}) => {
  const isEven = productCategories.length % 2 === 0;

  return (
    <ul className={`${styles.container} ${isEven ? styles.evenContainer : ""}`}>
      {productCategories.map((category) => {
        return (
          <CategorySquare
            overlayColor={overlayColor}
            textBackground={textBackground}
            textColor={textColor}
            key={`category-square-${category.name}`}
            category={category}
            objectFit={objectFit}
            className={styles.backgroundColor}
          />
        );
      })}
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
        <Link href={href}>
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
      href={`/learning/search?category=${category.slug}`}
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
