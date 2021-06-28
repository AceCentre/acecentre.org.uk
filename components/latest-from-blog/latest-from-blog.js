import { ChevronRight } from "@material-ui/icons";
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
          Read the latest from AceCentre company news to project updates
        </p>
        <Link href="/blog">
          <a className={styles.visitBlogLink}>
            Visit the blog <ChevronRight />
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

export const BlogCard = ({ post, category = "blog" }) => {
  return (
    <li className={styles.flexItem}>
      <Link href={`/blog/${post.slug}`}>
        <a className={styles.listLink}>
          {post.featuredImage ? (
            <div className={styles.imageContainer}>
              <Image
                src={post.featuredImage.src}
                alt={`An thumbnail for the post: ${post.title}`}
                className={styles.image}
                layout="fill"
              />
            </div>
          ) : (
            <NoImage post={post} />
          )}
          <p className={styles.blogTag}>{category}</p>
          <div className={styles.postTitleContainer}>
            <p className={styles.postTitle}>{post.title}</p>
          </div>
        </a>
      </Link>
    </li>
  );
};

const NoImage = ({ post }) => {
  if (post.noImagePostCount % 2 === 0) {
    return (
      <div className={styles.fakeImageContainer}>
        <div className={styles.blueCover}>{post.title}</div>
        <Image
          src="/generic-busy-office.jpeg"
          layout="fill"
          objectFit="cover"
          className={styles.fakeImage}
          alt={`An thumbnail for the post: ${post.title}`}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.fakeImageContainer}>
        <div className={styles.backgroundColorForLighthouse}></div>
        <Image
          src="/green-background.png"
          layout="fill"
          objectFit="cover"
          alt={`An thumbnail for the post: ${post.title}`}
          // className={styles.fakeImage}
        />
        <div className={styles.fakeImageCover}>{post.title}</div>
      </div>
    );
  }
};
