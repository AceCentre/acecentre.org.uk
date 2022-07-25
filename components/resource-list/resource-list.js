import Link from "next/link";
import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";

import styles from "./resource-list.module.css";

export const ResourceList = ({
  title,
  viewAllLink,
  viewAllText = "View all",
  products,
  className = "",
  showPrice = false,
  tagline,
}) => {
  const productsWithoutImageCounters = usePostsWithoutImageCounters(products);

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.titleContainer}>
        <div>
          {title && <h2 className={styles.title}>{title}</h2>}
          {tagline && (
            <p className={styles.tagline}>
              <i>{tagline}</i>
            </p>
          )}
        </div>

        {viewAllLink && (
          <Link href={viewAllLink}>
            <a className={styles.viewAllLink}>{viewAllText} &gt;</a>
          </Link>
        )}
      </div>
      <ul className={styles.postList}>
        {productsWithoutImageCounters.map((product) => {
          return (
            <Card
              className={styles.card}
              postTitleContainerClassName={
                showPrice ? styles.postTitleContainer : ""
              }
              imageContainerClassName={styles.imageContainer}
              href={`/resources/${product.slug}`}
              key={`${title}-card-${product.slug}`}
              noImagePostCount={product.noImagePostCount}
              subtitle={product.mainCategoryName}
              featuredImage={product.featuredImage}
              title={product.title}
              ribbonText={shouldShowRibbon(product)}
            >
              {showPrice && <Price product={product} />}
              <p className={styles.productTitle}>{product.title}</p>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

export const LaunchpadList = ({ title, templates, className = "" }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.titleContainer}>
        <div>{title && <h2 className={styles.title}>{title}</h2>}</div>
      </div>
      <ul className={styles.postList}>
        {templates.map((template) => {
          return (
            <Card
              className={styles.card}
              imageContainerClassName={styles.imageContainer}
              href={`/launchpad/${template.templateId}`}
              key={`${title}-card-${template.templateId}`}
              noImagePostCount={0}
              subtitle="Launchpad"
              featuredImage={{ src: template.templateImageUrl }}
              title={template.templateName}
            >
              <p className={styles.productTitle}>{template.templateName}</p>
            </Card>
          );
        })}
      </ul>
    </div>
  );
};

const shouldShowRibbon = (product) => {
  if (product?.isLaunchpadTemplate) {
    return "Customise";
  }

  if (product?.instantDownloadAvailable) {
    return "Download";
  }

  const variations = product.variations || [];
  const downloadableVariations = variations.filter(
    (x) => x?.instantDownloadAvailable
  );

  if (
    downloadableVariations.length > 0 &&
    downloadableVariations.length == variations.length
  ) {
    return "Download";
  }

  if (product.ebook) return "Download";

  return false;
};

const Price = ({ product }) => {
  let cost = "Free";

  // If minPrice and maxPrice are present
  if (product.minPrice !== undefined && product.maxPrice !== undefined) {
    const minPrice = product.minPrice === 0 ? "Free" : `£${product.minPrice}`;
    cost = `${minPrice} - £${product.maxPrice}`;
  }

  if (product.price && product.price > 0) {
    cost = `£${product.price}`;
  }

  return <p className={styles.price}>{cost}</p>;
};
