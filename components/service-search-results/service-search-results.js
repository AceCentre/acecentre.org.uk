import Link from "next/link";
import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";
import featuredStyles from "../featured-posts/featured-posts.module.css";
import cardStyles from "../latest-from-blog/latest-from-blog.module.css";

export const ServiceSearchResults = ({
  items,
  title = "Services",
  subtitle = "Services",
  viewAllLink = "/services",
  viewAllText = "View all services",
  keyPrefix = "search",
}) => {
  const itemsWithImageCounters = usePostsWithoutImageCounters(items);

  if (!itemsWithImageCounters.length) return null;

  return (
    <div className={featuredStyles.container}>
      <div className={featuredStyles.titleContainer}>
        <h2 className={featuredStyles.title}>{title}</h2>
        <Link href={viewAllLink} className={featuredStyles.viewAllLink}>
          {viewAllText} &gt;
        </Link>
      </div>
      <ul className={featuredStyles.postList}>
        {itemsWithImageCounters.map((item) => (
          <Card
            key={`${keyPrefix}-${item.href}`}
            href={item.href}
            featuredImage={item.featuredImage}
            title={item.title}
            subtitle={subtitle}
            noImagePostCount={item.noImagePostCount}
            imageContainerClassName={cardStyles.smallCards}
            className={cardStyles.smallCardContainer}
          >
            <p className={cardStyles.postTitle}>{item.title}</p>
          </Card>
        ))}
      </ul>
    </div>
  );
};
