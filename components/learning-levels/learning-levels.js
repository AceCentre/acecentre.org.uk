import styles from "./learning-levels.module.css";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";

import { Button } from "../button/button";
import { useState } from "react";
import { LearningLevelRaw } from "../learning-detail-box/learning-detail-box";

export const LearningLevels = ({ levels }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container} id="levels">
        <h2 className={styles.title}>Course learning levels</h2>
        <p className={styles.body}>
          Organised across four levels, providing a range of opportunities for
          family members, carers, practitioners and professionals who are
          supporting people with physical disabilities and complex communication
          needs.
        </p>
        <Button onClick={() => setModalOpen(true)}>View learning levels</Button>
      </div>
      <LearningLevelPopup
        isModelOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        levels={levels}
      />
    </>
  );
};

export const LearningLevelPopup = ({
  isModelOpen,
  onClose,
  levels: unsortedLevels,
  defaultLevel = 1,
}) => {
  const levels = unsortedLevels.sort((a, b) => a.level - b.level);
  const [selected, setSelected] = useState(levels[defaultLevel - 1].slug);
  const fullSelected = levels.find((current) => current.slug == selected);

  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={isModelOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ padding: "2rem" }}>
          <div className={styles.topSection}>
            <h2>Ace Centre Learning Levels</h2>
            <p>
              Ace Centre learning offers a range of opportunities for family
              members, carers, practitioners and professionals. Courses focus on
              Assistive Technology to enable communication and learning and are
              organised across four different levels to provide the right
              training for you and your specific needs. All courses have
              learning outcomes that are linked to AT and AAC competencies.
            </p>
          </div>
          <ul className={styles.list}>
            {levels.map((level) => {
              return (
                <li key={level.slug}>
                  <button
                    onClick={() => setSelected(level.slug)}
                    className={`${styles.button} ${
                      level.slug == selected ? styles.selectedButton : ""
                    }`}
                  >
                    {level.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <div>
            <div className={styles.learningLevelCircles}>
              <LearningLevelRaw level={fullSelected.level} size={15} />
            </div>
            <h3>{fullSelected.subheading}</h3>

            <div
              dangerouslySetInnerHTML={{
                __html: fullSelected.intro
                  ? fullSelected.intro
                  : fullSelected.alternativeIntro,
              }}
            ></div>

            <div
              className={styles.focus}
              dangerouslySetInnerHTML={{ __html: fullSelected.focus }}
            ></div>

            <div className={styles.bottomContainer}>
              <button className={styles.closeButton} onClick={onClose}>
                Close profile
              </button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
