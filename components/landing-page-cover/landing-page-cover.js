import { Button } from "@chakra-ui/react";
import { Avatar } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Image from "next/image";
import styles from "./landing-page-cover.module.css";

export const LandingPageCover = () => {
  return (
    <div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="/landing-page-cover.png"
          // width={1441}
          // height={942}
        />
      </div>
      <div className={styles.card}>
        <p className={styles.tagLine}>
          We work with people of all ages to overcome{" "}
          <strong>communication challenges</strong>
          with <strong>Augmentative and Alternative Communication</strong> (AAC)
          and <strong>Assistive Technology</strong> (AT)
        </p>
        <p className={styles.ctaText}>Watch our video</p>
        <Button variant="unstyled" className={styles.ctaButton}>
          <Avatar className={styles.ctaAvatar}>
            <PlayArrowIcon className={styles.ctaIcon} />
          </Avatar>
        </Button>
      </div>
    </div>
  );
};
