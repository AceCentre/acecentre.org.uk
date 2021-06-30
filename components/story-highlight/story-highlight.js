import Link from "next/link";
import { useState } from "react";
import styles from "./story-highlight.module.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "../button/button";
import { Avatar } from "@material-ui/core";
import { VideoPopover } from "../video-popover/video-popover";
import { ImageWithLoader as Image } from "../image";

export const StoryHighlight = ({
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
            {youtubeVideo && (
              <button
                className={styles.playButton}
                onClick={() => setIsPopoverOpen(true)}
                aria-label={`Play video about: ${title}`}
              >
                <Avatar className={styles.playAvatar}>
                  <PlayArrowIcon className={styles.playIcon} />
                </Avatar>
              </button>
            )}
            <OverlayCard
              className={styles.desktopCard}
              slug={slug}
              title={title}
              summary={summary}
            />
          </div>
          <div className={styles.gradientCover}></div>
          <div className={styles.backgroundOverlay}></div>
          <div className={styles.nextImageContainer}>
            <Image
              alt={`An image of: ${title}`}
              src={featuredImage.src}
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>
        </div>
        <OverlayCard
          className={styles.mobileCard}
          slug={slug}
          title={title}
          summary={summary}
        />
      </div>
      {youtubeVideo && (
        <VideoPopover
          youtubeUrl={youtubeVideo}
          isPopoverOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
        />
      )}
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
