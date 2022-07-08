import { Button } from "@chakra-ui/button";
import Avatar from "@material-ui/core/Avatar";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { useState } from "react";
import { VimeoPopover } from "../video-popover/video-popover";
import styles from "./landing-page-cover.module.css";
import { ImageWithLoader as Image } from "../image";

const VIDEO_URL = "https://vimeo.com/679038419/e6ae889eff";

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
            src="/landing-page-cover.jpeg"
            alt="Ace Centre engineer fitting an AAC device"
          />
        </div>
        <div className={styles.card}>
          <p className={styles.tagLine}>
            We work with people of all ages who use or need{" "}
            <strong>Augmentative and Alternative Communication </strong>
            (AAC) and <strong>Assistive Technology</strong> (AT) to communicate
          </p>
          {VIDEO_URL && (
            <>
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
            </>
          )}
        </div>
      </div>
      {VIDEO_URL && (
        <VimeoPopover
          isPopoverOpen={isPopoverOpen}
          vimeoUrl={VIDEO_URL}
          title="Feedback of the acecentre"
          onClose={() => setIsPopoverOpen(false)}
        />
      )}
    </>
  );
};
