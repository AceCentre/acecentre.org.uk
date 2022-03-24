import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { Button } from "../button/button";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import styles from "./video-popover.module.css";

export const VideoPopover = ({ isPopoverOpen, onClose, youtubeUrl, title }) => {
  const videoId = urlToVideoId(youtubeUrl);

  return (
    <Modal size="6xl" isCentered isOpen={isPopoverOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <LiteYouTubeEmbed
            id={videoId}
            title={`A youtube video about: ${title}`}
            noCookie={true}
          />
          <div className={styles.buttonContainer}>
            <Button onClick={onClose}>Close video</Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const urlToVideoId = (url) => {
  return new URL(url).searchParams.get("v");
};
