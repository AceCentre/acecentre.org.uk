import styles from "./resource-categories-grid.module.css";
import { ImageWithLoader as Image } from "../image";
import Avatar from "@mui/material/Avatar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
      <li className={styles.listItem} key={"lang-lib"}>
        <Link href={"/language-library"} className={styles.link}>
          <Image src="/lang-lib.png" layout="fill" objectFit="contain" />
          <div className={styles.yellowTint} />
          <div className={styles.blueBannerContainer}>
            <div className={styles.blueBanner}>
              <p>Language Library</p>
              <Avatar className={styles.avatar}>
                <ArrowForwardIcon className={styles.icon} />
              </Avatar>
            </div>
          </div>
        </Link>
      </li>
    </ul>
  );
};

const CategorySquare = ({ category }) => {
  return (
    <li className={styles.listItem} key={`browse-articles-${category.slug}`}>
      <Link
        href={`/resources/all?category=${category.slug}`}
        className={styles.link}
      >
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
      </Link>
    </li>
  );
};
