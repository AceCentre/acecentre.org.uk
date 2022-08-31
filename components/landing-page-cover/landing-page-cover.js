import { Button } from "@chakra-ui/button";
import Avatar from "@material-ui/core/Avatar";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useEffect, useRef, useState } from "react";
import { VideoPopover } from "../video-popover/video-popover";
import styles from "./landing-page-cover.module.css";

import { rawLoader } from "../../lib/image-loader";
import { useHighlight } from "../sub-nav/sub-nav";

const VIDEO_URL = "https://www.youtube.com/watch?v=cSLZUBqlB04";

export const LandingPageCover = () => {
  const videoRef = useRef();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [hasBeenHighlighted, setHasBeenHighlighted] = useState(false);
  const { highlightProps, isHighlighted } = useHighlight();

  useEffect(() => {
    if (isHighlighted) {
      console.log("isHighlighted");
      setHasBeenHighlighted(true);
    }
  }, [isHighlighted]);

  useEffect(() => {
    if (videoRef && videoRef.current && hasBeenHighlighted) {
      videoRef.current.addEventListener("canplaythrough", () => {
        console.log("Video can play through fired");
        if (videoRef && videoRef.current) {
          videoRef.current.play();
        }
      });
      console.log("Source has been set");

      videoRef.current.src = "./banner-video.mp4";
    }
  }, [videoRef, hasBeenHighlighted]);

  return (
    <>
      <div {...highlightProps}>
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
              ref={videoRef}
              preload="auto"
              muted
              loop
              poster={rawLoader({ src: "/video-placeholder.webp" })}
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
