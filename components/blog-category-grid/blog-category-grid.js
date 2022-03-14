import styles from "./blog-category-grid.module.css";
import { ImageWithLoader as Image } from "../image";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";

export const BlogCategoryGrid = ({ blogCategories }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Browse articles by category</h2>
      <ul className={styles.list}>
        {blogCategories.map((category) => {
          return (
            <li
              className={styles.listItem}
              key={`browse-articles-${category.slug}`}
            >
              <Link href={`/blog/category/${category.slug}`}>
                <a className={styles.link}>
                  <Image
                    src={category.featuredImage.src}
                    alt={category.featuredImage.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className={styles.blueBannerContainer}>
                    <div className={styles.blueBanner}>
                      <p>{category.title}</p>
                      <Avatar className={styles.avatar}>
                        <ArrowForwardIcon className={styles.icon} />
                      </Avatar>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
