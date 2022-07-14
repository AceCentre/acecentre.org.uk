import { Button } from "@chakra-ui/button";
import Avatar from "@material-ui/core/Avatar";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useState } from "react";
import { VideoPopover } from "../video-popover/video-popover";
import styles from "./landing-page-cover.module.css";

import { rawLoader } from "../../lib/image-loader";

const VIDEO_URL = "https://www.youtube.com/watch?v=cSLZUBqlB04";

export const LandingPageCover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div>
        <div>
          <div className={styles.buttonContainer}>
            <Button
              variant="unstyled"
              onClick={() => setIsPopoverOpen(true)}
              className={styles.ctaButton}
              aria-label="Play video about Ace Centre"
            >
              <Avatar className={styles.ctaAvatar}>
                <PlayArrowIcon className={styles.ctaIcon} />
              </Avatar>
            </Button>
          </div>
          <div className={styles.imageContainer}>
            <video
              className={styles.image}
              src="./banner-video.mp4"
              autoPlay
              muted
              loop
              poster={rawLoader({ src: "/video-placeholder.jpeg" })}
              title="Ace Centre promotional video"
            ></video>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.tagLine}>
            We work with people of all ages who use or need{" "}
            <strong>Augmentative and Alternative Communication </strong>
            (AAC) and <strong>Assistive Technology</strong> (AT) to communicate
          </p>
        </div>
      </div>
      {VIDEO_URL && (
        <VideoPopover
          isPopoverOpen={isPopoverOpen}
          youtubeUrl={VIDEO_URL}
          title="Feedback of the acecentre"
          onClose={() => setIsPopoverOpen(false)}
        />
      )}
    </>
  );
};
