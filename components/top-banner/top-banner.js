import styles from "./top-banner.module.css";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useState } from "react";

export const TopBanner = () => {
  const [modelOpen, setModelOpen] = useState(false);

  const onClose = () => setModelOpen(false);

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="3xl"
        isCentered
        isOpen={modelOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody style={{ padding: "2rem" }}>
            <div className={styles.topSection}>
              <h2>Christmas Hours</h2>
              <div className={styles.listSpacing}>
                <p>26th Dec: closed</p>
                <p>27th Dec: closed</p>
                <p>28th Dec: 9:00 - 17:00</p>
                <p>29th Dec: 9:00 - 17:00</p>
                <p>30th Dec: 9:00 - 17:00</p>
                <p>2nd Jan: closed</p>
              </div>
            </div>

            <div className={styles.bottomContainer}>
              <button className={styles.closeButton} onClick={onClose}>
                Close window
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={styles.container}>
        <p>
          🎅 Our opening hours will change over the Christmas period.{" "}
          <a
            href="#"
            onClick={() => setModelOpen(true)}
            className={styles.modalLink}
          >
            Click here to see more.
          </a>
        </p>
      </div>
    </>
  );
};
