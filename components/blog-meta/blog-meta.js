import styles from "./blog-meta.module.css";
import { Avatar } from "@material-ui/core";

import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Link from "next/link";
import { useEffect, useState } from "react";
import config from "../../lib/config";

const SHARE_TEXT = "Checkout this awesome post";

export const BlogMeta = ({
  date,
  shareCta = "Share this article",
  shareText = SHARE_TEXT,
}) => {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (config.environment === "development") {
      setCurrentUrl("https://google.com");
    } else {
      setCurrentUrl(location.href);
    }
  });

  return (
    <div className={styles.container}>
      <span>{date}</span>

      {currentUrl && (
        <div className={styles.socials}>
          <span className={styles.shareText}>{shareCta}</span>
          <Link
            href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`}
          >
            <a
              target="_blank"
              rel="noopener"
              aria-label="Twitter logo"
              className={styles.avatarLink}
            >
              <Avatar className={styles.roundedAvatar}>
                <TwitterIcon className={styles.logo} />
              </Avatar>
            </a>
          </Link>

          <Link
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
          >
            <a
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn logo"
              className={styles.avatarLink}
            >
              <Avatar className={styles.roundedAvatar}>
                <LinkedInIcon className={styles.logo} />
              </Avatar>
            </a>
          </Link>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
          >
            <a
              target="_blank"
              rel="noopener"
              aria-label="Facebook logo"
              className={styles.avatarLink}
            >
              <Avatar className={styles.roundedAvatar}>
                <FacebookIcon className={styles.logo} />
              </Avatar>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};
