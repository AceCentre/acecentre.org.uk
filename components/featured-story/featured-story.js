import styles from "./featured-story.module.css";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "../button/button";

import Link from "next/link";
import { Avatar } from "@material-ui/core";
import { VideoPopover } from "../video-popover/video-popover";
import { useState } from "react";

import { ImageWithLoader as Image } from "../image";

export const FeaturedStory = ({
  summary,
  title,
  slug,
  youtubeVideo,
  featuredImage,
  nhs = false,
  objectPosition = "50%",
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
              aria-label={`Play video about: ${title}`}
            >
              <Avatar
                className={`${styles.playAvatar} ${
                  nhs ? styles.nhsBackground : styles.normalBackground
                }`}
              >
                <PlayArrowIcon className={styles.playIcon} />
              </Avatar>
            </button>
            <OverlayCard
              className={styles.desktopCard}
              slug={slug}
              title={title}
              summary={summary}
              nhs={nhs}
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
              objectPosition={objectPosition}
            />
          </div>
        </div>
        <OverlayCard
          className={styles.mobileCard}
          slug={slug}
          title={title}
          summary={summary}
          nhs={nhs}
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

const OverlayCard = ({ title, summary, slug, className, nhs = false }) => {
  return (
    <div className={className}>
      <p
        className={`${styles.greenSpan} ${
          nhs ? styles.nhsBackground : styles.normalBackground
        }`}
      >
        Stories
      </p>
      <h2 className={styles.cardTitle}>{title}</h2>
      <div
        className={styles.cardDescription}
        dangerouslySetInnerHTML={{ __html: summary }}
      ></div>
      <div className={styles.cardLinkContainer}>
        <Button
          className={`${styles.readFullStory} ${
            nhs ? styles.nhsBackground : styles.normalBackground
          }`}
          href={`/people-we-support/case-study/${slug}`}
        >
          Read full story
        </Button>
        <Link href="/people-we-support">
          <a className={styles.allStories}>
            All Stories
            <ChevronRightIcon />
          </a>
        </Link>
      </div>
    </div>
  );
};
