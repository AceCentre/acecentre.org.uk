import Link from "next/link";
import {
  Card,
  usePostsWithoutImageCounters,
} from "../latest-from-blog/latest-from-blog";
import featuredStyles from "../featured-posts/featured-posts.module.css";
import cardStyles from "../latest-from-blog/latest-from-blog.module.css";

export const ServiceSearchResults = ({ services, title = "Services" }) => {
  const servicesWithImageCounters = usePostsWithoutImageCounters(services);

  if (!servicesWithImageCounters.length) return null;

  return (
    <div className={featuredStyles.container}>
      <div className={featuredStyles.titleContainer}>
        <h2 className={featuredStyles.title}>{title}</h2>
        <Link href="/services" className={featuredStyles.viewAllLink}>
          View all services &gt;
        </Link>
      </div>
      <ul className={featuredStyles.postList}>
        {servicesWithImageCounters.map((service) => (
          <Card
            key={`service-search-${service.href}`}
            href={service.href}
            featuredImage={service.featuredImage}
            title={service.title}
            subtitle="Services"
            noImagePostCount={service.noImagePostCount}
            imageContainerClassName={cardStyles.smallCards}
            className={cardStyles.smallCardContainer}
          >
            <p className={cardStyles.postTitle}>{service.title}</p>
          </Card>
        ))}
      </ul>
    </div>
  );
};
