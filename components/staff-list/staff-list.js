import { PeopleList } from "../people-list/people-list";
import styles from "./staff-list.module.css";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

import { CropToSquareAroundFace } from "../image";
import { useState } from "react";
import Phone from "@material-ui/icons/Phone";

export const StaffList = ({ staffList }) => {
  return (
    <PeopleList peopleList={staffList}>
      {(person) => <StaffCard person={person} />}
    </PeopleList>
  );
};

export const TrusteeList = ({ trusteeList }) => {
  return (
    <PeopleList peopleList={trusteeList}>
      {(person) => <TrusteeCard person={person} />}
    </PeopleList>
  );
};

const LOCATION_MAP = {
  oldham: "North office",
  abingdon: "South office",
  remote: "Remote",
};

const StaffCard = ({ person }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const onClose = () => setIsModelOpen(false);
  const location = LOCATION_MAP[person.location.trim().toLowerCase()];

  if (!location) throw new Error("Could not get a location for", person);

  return (
    <>
      <button
        className={styles.staffButton}
        onClick={() => setIsModelOpen(true)}
      >
        <div className={styles.imageContainer}>
          {person.image ? (
            <CropToSquareAroundFace
              alt={`Head shot of ${person.name}`}
              width={200}
              height={200}
              src={person.image.src}
              className={styles.image}
            />
          ) : (
            <CropToSquareAroundFace
              alt={`Placeholder head shot for ${person.name}`}
              width={200}
              height={200}
              src="/account_circle_black_48dp.svg"
              className={`${styles.image} ${styles.placeholder}`}
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.personName}>{person.firstName}</p>
          <p className={styles.job}>{person.role.trim()}</p>
          <div className={styles.locationContainer}>
            <span className={styles.location}>{location}</span>
          </div>
        </div>
      </button>
      <StaffDetail
        isModelOpen={isModelOpen}
        onClose={onClose}
        person={person}
        location={location}
      />
    </>
  );
};

const TrusteeCard = ({ person }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const onClose = () => setIsModelOpen(false);

  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className={styles.staffButton}
      >
        <div className={styles.imageContainer}>
          {person.image ? (
            <CropToSquareAroundFace
              alt={`Head shot of ${person.name}`}
              width={200}
              height={200}
              src={person.image.src}
              className={styles.image}
            />
          ) : (
            <CropToSquareAroundFace
              alt={`Placeholder head shot for ${person.name}`}
              width={200}
              height={200}
              src="/account_circle_black_48dp.svg"
              className={`${styles.image} ${styles.placeholder}`}
            />
          )}
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.personName}>{person.name}</p>
          <p className={styles.job}>{person.role.trim()}</p>
        </div>
      </button>
      <TrusteeDetail
        isModelOpen={isModelOpen}
        onClose={onClose}
        person={person}
      />
    </>
  );
};

const TrusteeDetail = ({ isModelOpen, onClose, person }) => {
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
          <div className={styles.topContainer}>
            <div className={styles.imageContainer}>
              {person.image ? (
                <CropToSquareAroundFace
                  alt={`Head shot of ${person.name}`}
                  width={200}
                  height={200}
                  src={person.image.src}
                  className={styles.image}
                />
              ) : (
                <CropToSquareAroundFace
                  alt={`Placeholder head shot for ${person.name}`}
                  width={200}
                  height={200}
                  src="/account_circle_black_48dp.svg"
                  className={`${styles.image} ${styles.placeholder}`}
                />
              )}
            </div>
            <div className={styles.modalTop}>
              <p className={styles.modalName}>{person.name}</p>
              <p className={styles.modalJob}>{person.role.trim()}</p>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <p
              className={styles.longDescription}
              dangerouslySetInnerHTML={{ __html: person.about }}
            ></p>

            <button className={styles.closeButton} onClick={onClose}>
              Close profile
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const StaffDetail = ({ isModelOpen, onClose, person, location }) => {
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
          <div className={styles.topContainer}>
            <div className={styles.imageContainer}>
              {person.image ? (
                <CropToSquareAroundFace
                  alt={`Head shot of ${person.name}`}
                  width={155}
                  height={155}
                  src={person.image.src}
                  className={styles.image}
                />
              ) : (
                <CropToSquareAroundFace
                  alt={`Placeholder head shot for ${person.name}`}
                  width={200}
                  height={200}
                  src="/account_circle_black_48dp.svg"
                  className={`${styles.image} ${styles.placeholder}`}
                />
              )}
            </div>
            <div className={styles.modalTop}>
              <p className={styles.modalName}>{person.name}</p>
              <p className={styles.modalJob}>{person.role.trim()}</p>
              <div className={styles.locationContainer}>
                <span className={styles.location}>{location}</span>
              </div>
            </div>
          </div>
          <div className={styles.bottomContainer}>
            <div
              className={styles.longDescription}
              dangerouslySetInnerHTML={{ __html: person.longDescription }}
            ></div>
            {person.directLine && (
              <PhoneNumber directLine={person.directLine} />
            )}

            <button className={styles.closeButton} onClick={onClose}>
              Close profile
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const PhoneNumber = ({ directLine }) => {
  const splitNumber = directLine
    .toLowerCase()
    .split("ext")
    .map((x) => x.trim());

  return (
    <div className={styles.phoneNumber}>
      <Phone className={styles.phoneIcon} />
      <span className={styles.boldNumber}>{splitNumber[0]}</span>
      <span> ext {splitNumber[1]}</span>
    </div>
  );
};
