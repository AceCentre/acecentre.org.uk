import { Button } from "@chakra-ui/react";
import { Avatar } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useState } from "react";
import { VideoPopover } from "../video-popover/video-popover";
import styles from "./landing-page-cover.module.css";
import { ImageWithLoader as Image } from "../image";

export const LandingPageCover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            objectFit="cover"
            layout="fill"
            src="/landing-page-cover.png"
            alt="Cover image of a male looking happy to be communicating with an AAC device."
          />
        </div>
        <div className={styles.card}>
          <p className={styles.tagLine}>
            We work with people of all ages to overcome{" "}
            <strong>communication challenges </strong>
            with <strong>
              Augmentative and Alternative Communication
            </strong>{" "}
            (AAC) and <strong>Assistive Technology</strong> (AT)
          </p>
          <p className={styles.ctaText}>Watch our video</p>
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
      </div>
      <VideoPopover
        isPopoverOpen={isPopoverOpen}
        youtubeUrl="https://www.youtube.com/watch?v=v1kUX_BVYKw"
        title="Feedback of the acecentre"
        onClose={() => setIsPopoverOpen(false)}
      />
    </>
  );
};
