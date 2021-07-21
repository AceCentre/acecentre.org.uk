import styles from "./course-categories-grid.module.css";
import { ImageWithLoader as Image } from "../image";
import { Avatar } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Link from "next/link";

export const CourseCategoriesGrid = ({ productCategories }) => {
  return (
    <ul className={styles.container}>
      {productCategories.map((category) => {
        return (
          <CategorySquare
            key={`category-square-${category.name}`}
            category={category}
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
              objectFit="cover"
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

export const CategorySquare = ({ category }) => {
  return (
    <GridSquare
      href={`/resources/all?category=${category.slug}`}
      image={category.image}
      name={category.name}
    />
  );
};
