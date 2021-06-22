import styles from "./featured-story.module.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "../button/button";

import Link from "next/link";
import { Avatar } from "@material-ui/core";
import { VideoPopover } from "../video-popover/video-popover";
import { useState } from "react";

export const FeaturedStory = ({
  summary,
  title,
  slug,
  youtubeVideo,
  featuredImage,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div>
        <div className={styles.imageContainer}>
          <div className={styles.overlay}>
            <button
              className={styles.playButton}
              onClick={() => setIsPopoverOpen(true)}
            >
              <Avatar className={styles.playAvatar}>
                <PlayArrowIcon className={styles.playIcon} />
              </Avatar>
            </button>
            <OverlayCard
              className={styles.desktopCard}
              slug={slug}
              title={title}
              summary={summary}
            />
          </div>
          <div className={styles.gradientCover}></div>
          <div className={styles.backgroundOverlay}></div>
          <img className={styles.image} src={featuredImage.src} />
        </div>
        <OverlayCard
          className={styles.mobileCard}
          slug={slug}
          title={title}
          summary={summary}
        />
      </div>
      <VideoPopover
        youtubeUrl={youtubeVideo}
        isPopoverOpen={isPopoverOpen}
        onClose={() => setIsPopoverOpen(false)}
      />
    </>
  );
};

const OverlayCard = ({ title, summary, slug, className }) => {
  return (
    <div className={className}>
      <p className={styles.greenSpan}>Stories</p>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div
        className={styles.cardDescription}
        dangerouslySetInnerHTML={{ __html: summary }}
      ></div>
      <div className={styles.cardLinkContainer}>
        <Button className={styles.readFullStory} href={`/stories/${slug}`}>
          Read full story
        </Button>
        <Link href="/stories">
          <a className={styles.allStories}>
            All Stories
            <ChevronRightIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};
