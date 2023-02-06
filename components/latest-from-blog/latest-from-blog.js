import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Link from "next/link";
import styles from "./latest-from-blog.module.css";
import { ImageWithLoader as Image } from "../image";

export const usePostsWithoutImageCounters = (posts) => {
  let imageCounter = 1;
  const postsWithoutImageCounters = posts.map((post) => {
    if (post.featuredImage) {
      return { ...post };
    }

    const newPost = { ...post, noImagePostCount: imageCounter };

    imageCounter++;
    return newPost;
  });

  return postsWithoutImageCounters;
};

export const LatestFromBlog = ({ posts }) => {
  const postsWithoutImageCounters = usePostsWithoutImageCounters(posts);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest from the blog</h1>
      <div className={styles.tagLineContainer}>
        <p className={styles.tagLine}>
          Read the latest from Ace Centre news to project updates
        </p>
        <Link href="/blog">
          <a className={styles.visitBlogLink}>
            Visit the blog <ChevronRightIcon />
          </a>
        </Link>
      </div>
      <ul className={styles.list}>
        {postsWithoutImageCounters.map((post) => (
          <BlogCard key={`latest-${post.slug}`} post={post} />
        ))}
      </ul>
    </div>
  );
};

export const Card = ({
  noImagePostCount,
  subtitle = "blog",
  href,
  featuredImage,
  title,
  background = false,
  children,
  className = "",
  imageContainerClassName = "",
  postTitleContainerClassName = "",
  ribbonText,
  showSubtitle = true,
}) => {
  return (
    <li className={`${styles.flexItem} ${className}`}>
      {ribbonText && (
        <div
          className={`${styles.ribbon} ${styles.ribbonTopRight} ${
            ribbonText === "Download"
              ? styles.downloadRibbon
              : styles.launchpadRibbon
          }`}
        >
          <span>{ribbonText}</span>
        </div>
      )}
      <Link href={href}>
        <a className={styles.listLink}>
          {featuredImage ? (
            <div
              className={`${styles.imageContainer} ${imageContainerClassName}`}
            >
              <Image
                src={featuredImage.src}
                alt={`An thumbnail for the post: ${title}`}
                className={styles.image}
                layout="fill"
              />
              {background && <div className={styles.background} />}
            </div>
          ) : (
            <NoImage
              imageContainerClassName={imageContainerClassName}
              title={title}
              noImagePostCount={noImagePostCount}
            />
          )}
          {showSubtitle && <p className={styles.blogTag}>{subtitle}</p>}
          <div
            className={`${styles.postTitleContainer} ${postTitleContainerClassName}`}
          >
            {children}
          </div>
        </a>
      </Link>
    </li>
  );
};

export const BlogCard = ({
  post,
  category = "blog",
  linkPrefix = "blog",
  smallCards = false,
}) => {
  const href = `/${linkPrefix}/${post.slug}`;
  const featuredImage = post.featuredImage;
  const title = post.title;

  return (
    <Card
      featuredImage={featuredImage}
      title={title}
      href={href}
      subtitle={category}
      noImagePostCount={post.noImagePostCount}
      imageContainerClassName={smallCards ? styles.smallCards : ""}
      className={smallCards ? styles.smallCardContainer : ""}
    >
      <p className={styles.postTitle}>{title}</p>
    </Card>
  );
};

export const NoImage = ({
  noImagePostCount,
  title,
  imageContainerClassName = "",
}) => {
  if (noImagePostCount % 2 === 0) {
    return (
      <div
        className={`${styles.fakeImageContainer} ${imageContainerClassName}`}
      >
        <div className={styles.blueCover}>{title}</div>
        <Image
          src="/generic-busy-office.jpeg"
          layout="fill"
          objectFit="cover"
          className={styles.fakeImage}
          alt={`An thumbnail for the post: ${title}`}
        />
      </div>
    );
  } else {
    return (
      <div
        className={`${styles.fakeImageContainer} ${imageContainerClassName}`}
      >
        <div className={styles.backgroundColorForLighthouse}></div>
        <Image
          src="/green-background.png"
          layout="fill"
          objectFit="cover"
          alt={`An thumbnail for the post: ${title}`}
          // className={styles.fakeImage}
        />
        <div className={styles.fakeImageCover}>{title}</div>
      </div>
    );
  }
};
