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

const CategorySquare = ({ category }) => {
  return (
    <li className={styles.listItem} key={`browse-articles-${category.slug}`}>
      <Link href={`/resources/all?category=${category.slug}`}>
        <a className={styles.link}>
          <Image
            src={category.image.src}
            alt={category.image.alt}
            layout="fill"
            objectFit="cover"
          />
          <div className={styles.yellowTint} />
          <div className={styles.blueBannerContainer}>
            <div className={styles.blueBanner}>
              <p>{category.name}</p>
              <Avatar className={styles.avatar}>
                <ArrowForwardIcon className={styles.icon} />
              </Avatar>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};
