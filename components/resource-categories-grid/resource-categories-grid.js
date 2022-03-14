import styles from "./resource-categories-grid.module.css";
import { ImageWithLoader as Image } from "../image";
import Avatar from "@material-ui/core/Avatar";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Link from "next/link";

export const ResourceCategoriesGrid = ({ productCategories }) => {
  const categoriesWithImages = productCategories.filter(
    (cat) => cat.image?.src
  );

  return (
    <ul className={styles.container}>
      {categoriesWithImages.map((category) => {
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
            objectFit="contain"
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
