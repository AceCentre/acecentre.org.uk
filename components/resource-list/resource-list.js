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
          <Link href={viewAllLink} className={styles.viewAllLink}>
            {viewAllText} &gt;
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
              href={
                product.href ||
                (product.slug === "language-library"
                  ? "/language-library"
                  : `/resources/${product.slug}`)
              }
              key={`${title}-card-${product.slug}`}
              noImagePostCount={product.noImagePostCount}
              subtitle={product.mainCategoryName}
              featuredImage={product.thumbnailImage || product.featuredImage}
              title={product.title}
              ribbonText={shouldShowRibbon(product)}
            >
              {showPrice && <Price product={product} />}
              <p className={styles.productTitle}>{product.title}</p>
              {/* {product.isGuideTemplate && (
                <span className={styles.badge}>{product.name}</span>
              )} */}
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

const shouldShowRibbon = () => {
  return false;
};

const formatGbp = (amount) => {
  if (amount === 0) return "Free";
  if (amount == null) return null;

  const value = Number(amount);
  if (Number.isNaN(value)) return null;

  return Number.isInteger(value) ? `£${value}` : `£${value.toFixed(2)}`;
};

const formatRange = (min, max) => {
  const minLabel = min === 0 ? "Free" : formatGbp(min);
  return `${minLabel} - ${formatGbp(max)}`;
};

const Price = ({ product }) => {
  // If minPrice and maxPrice are present (variable products)
  if (product.minPrice !== undefined && product.maxPrice !== undefined) {
    const current = formatRange(product.minPrice, product.maxPrice);
    const showPrevious =
      product.onSale &&
      product.minRegularPrice != null &&
      product.maxRegularPrice != null &&
      (product.minRegularPrice > product.minPrice ||
        product.maxRegularPrice > product.maxPrice);

    return (
      <p className={styles.price}>
        {showPrevious && (
          <span className={styles.wasPrice}>
            {formatRange(product.minRegularPrice, product.maxRegularPrice)}
          </span>
        )}
        <span className={showPrevious ? styles.salePrice : undefined}>
          {current}
        </span>
      </p>
    );
  }

  const current = formatGbp(product.price ?? 0) || "Free";
  const showPrevious =
    product.onSale &&
    product.regularPrice != null &&
    product.regularPrice > product.price;

  return (
    <p className={styles.price}>
      {showPrevious && (
        <span className={styles.wasPrice}>{formatGbp(product.regularPrice)}</span>
      )}
      <span className={showPrevious ? styles.salePrice : undefined}>
        {current}
      </span>
    </p>
  );
};
