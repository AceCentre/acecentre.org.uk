import styles from "./story-cover-image.module.css";
import { ImageWithLoader as Image } from "../image";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Avatar from "@material-ui/core/Avatar";
import { useState } from "react";
import { VideoPopover } from "../video-popover/video-popover";

const isPortrait = ({ width, height }) => {
  return height > width;
};

export const StoryCoverImage = ({ story }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <Image
          src={story.image.src}
          alt={story.image.alt}
          layout="fill"
          objectFit={isPortrait(story.image) ? "contain" : "cover"}
          objectPosition="top"
        />
        <div className={styles.blueBackground} />

        {story.youtubeVideo && (
          <div className={styles.buttonContainer}>
            <button
              onClick={() => setIsPopoverOpen(true)}
              aria-label={`Play video about: ${story.title}`}
              className={styles.button}
            >
              <Avatar className={styles.playAvatar}>
                <PlayArrowIcon className={styles.playIcon} />
              </Avatar>
            </button>
          </div>
        )}
      </div>
      {story.youtubeVideo && (
        <VideoPopover
          youtubeUrl={story.youtubeVideo}
          isPopoverOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
        />
      )}
    </>
  );
};
