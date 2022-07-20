import { PeopleList } from "../people-list/people-list";
import styles from "./staff-list.module.css";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";

import { CropToSquareAroundFace } from "../image";
import { useState } from "react";
import Phone from "@material-ui/icons/Phone";
import { useRouter } from "next/router";

export const StaffList = ({ staffList, currentActive }) => {
  return (
    <PeopleList peopleList={staffList}>
      {(person, index) => (
        <StaffCard
          person={person}
          index={index}
          currentActive={currentActive}
        />
      )}
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

const listOfBackgrounds = [
  styles.blueGradient,
  styles.yellowGradient,
  styles.redGradient,
  styles.orangeGradient,
  styles.redGradient,
  styles.orangeGradient,
  styles.blueGradient,
  styles.yellowGradient,
];

const StaffCard = ({ person, index = 0, currentActive = "" }) => {
  const router = useRouter();

  const location = LOCATION_MAP[person.location.trim().toLowerCase()];

  if (!location) throw new Error("Could not get a location for", person);

  const backgroundClass =
    listOfBackgrounds[index == 0 ? 0 : index % listOfBackgrounds.length];

  return (
    <>
      <button
        className={styles.staffButton}
        onClick={() => router.push(`/about/staff/${person.slug}`)}
      >
        <div className={styles.imageContainer}>
          {person.image ? (
            <CropToSquareAroundFace
              alt={`Head shot of ${person.name}`}
              width={200}
              height={200}
              src={person.image.src}
              className={`${backgroundClass} ${styles.image}`}
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
        isModalOpen={currentActive === person.slug}
        onClose={() => router.push("/about/staff")}
        person={person}
        location={location}
        backgroundClass={backgroundClass}
      />
    </>
  );
};

const TrusteeCard = ({ person }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClose = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
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
        isModalOpen={isModalOpen}
        onClose={onClose}
        person={person}
      />
    </>
  );
};

const TrusteeDetail = ({ isModalOpen, onClose, person }) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={isModalOpen}
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

const StaffDetail = ({
  isModalOpen,
  onClose,
  person,
  location,
  backgroundClass = "",
}) => {
  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={isModalOpen}
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
                  className={`${backgroundClass} ${styles.image}`}
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
