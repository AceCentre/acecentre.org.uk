import styles from "./blog-meta.module.css";
import Avatar from "@material-ui/core/Avatar";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from "../../lib/config";

const SHARE_TEXT = "Checkout this post from Ace Centre";

export const BlogMeta = ({
  date,
  shareCta = "Share this article",
  shareText = SHARE_TEXT,
}) => {
  return (
    <div className={styles.container}>
      <span>{date}</span>
      <ShareButtons shareCta={shareCta} shareText={shareText} />
    </div>
  );
};

export const ShareButtons = ({
  avatarClassName = "",
  shareCta = "Share this article",
  shareText = SHARE_TEXT,
  className = "",
}) => {
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    if (config.environment === "development") {
      setCurrentUrl("https://google.com");
    } else {
      setCurrentUrl(location.href);
    }
  });

  if (!currentUrl) return null;

  return (
    <div className={`${styles.socials} ${className}`}>
      <span className={styles.shareText}>{shareCta}</span>
      <Link
        href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`}
      >
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter logo"
          className={styles.avatarLink}
        >
          <Avatar className={`${styles.roundedAvatar} ${avatarClassName}`}>
            <TwitterIcon className={styles.logo} />
          </Avatar>
        </a>
      </Link>

      <Link
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
      >
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn logo"
          className={styles.avatarLink}
        >
          <Avatar className={`${styles.roundedAvatar} ${avatarClassName}`}>
            <LinkedInIcon className={styles.logo} />
          </Avatar>
        </a>
      </Link>
      <Link href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}>
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook logo"
          className={styles.avatarLink}
        >
          <Avatar className={`${styles.roundedAvatar} ${avatarClassName}`}>
            <FacebookIcon className={styles.logo} />
          </Avatar>
        </a>
      </Link>
    </div>
  );
};
