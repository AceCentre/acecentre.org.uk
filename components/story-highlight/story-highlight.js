import { useState } from "react";
import styles from "./story-highlight.module.css";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Button } from "../button/button";
import Avatar from "@material-ui/core/Avatar";
import { VideoPopover } from "../video-popover/video-popover";
import { ImageWithLoader as Image } from "../image";

export const StoryHighlight = ({
  summary,
  title,
  slug,
  youtubeVideo,
  featuredImage,
  imageClassName = "",
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
              className={imageClassName}
            />
          </div>
        </div>
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

const makeBold = (item, keyword) => {
  var re = new RegExp(keyword, "g");
  return item.replace(re, "<strong>" + keyword + "</strong>");
};

const OverlayCard = ({ summary, slug, className, title }) => {
  const boldedSummary = makeBold(summary, title);

  return (
    <div className={className}>
      <div
        className={styles.cardDescription}
        dangerouslySetInnerHTML={{ __html: boldedSummary }}
      ></div>
      <div>
        <Button
          className={styles.readFullStory}
          href={`/people-we-support/case-study/${slug}`}
        >
          Read full story
        </Button>
      </div>
    </div>
  );
};
