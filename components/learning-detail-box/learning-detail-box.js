import styles from "./learning-detail-box.module.css";

import { ImageWithLoader as Image } from "../image";
import { Button } from "../button/button";
import { ShareButtons } from "../blog-meta/blog-meta";
import { useAddToCart } from "../resources-download/resources-download";
import Avatar from "@material-ui/core/Avatar";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import Link from "next/link";
import { NoImage } from "../latest-from-blog/latest-from-blog";

const useEnrollStatus = (courseSlug) => {
  const [isEnrolledOnCourse, setIsEnrolledOnCourse] = useState(false);
  const [moodleCourseId, setMoodleCourseId] = useState(123);

  useEffect(() => {
    const fetchEnrollStatus = async () => {
      const response = await fetch("/api/get-courses");
      const { courses } = await response.json();

      for (const current of courses) {
        if (current.slug === courseSlug) {
          setIsEnrolledOnCourse(true);
          setMoodleCourseId(current.moodleCourseId);
        }
      }
    };

    fetchEnrollStatus();
  }, []);

  return {
    isEnrolledOnCourse,
    moodleUrl: `/api/moodle?mdl_course_id=${moodleCourseId}`,
  };
};

export const LearningDetailBox = ({ course }) => {
  const { disabled, addToCart, error } = useAddToCart();
  const [isModalOpen, toggleModal] = useState(false);

  const purchaseOrderMin = 250;
  const price = parseInt(course.price);
  const quantityForPurchaseOrder = Math.ceil(purchaseOrderMin / price);

  const { isEnrolledOnCourse, moodleUrl } = useEnrollStatus(course.slug);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.imageContainer}>
            {course.image ? (
              <Image
                src={course.image.src}
                alt={
                  course.image.alt
                    ? course.image.alt
                    : `Thumbnail for ${course.title}`
                }
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <NoImage
                title={course.title}
                noImagePostCount={0}
                imageContainerClassName={styles.noImageContainer}
              />
            )}
          </div>
          <div className={styles.rightHandSide}>
            <div>
              <h3 className={styles.title}>{course.title}</h3>
              <p className={styles.tagLine}>From Ace Centre Learning</p>
            </div>
            <p className={styles.price}>{getPriceText(course.price)}</p>
            <div className={styles.learningLevelContainer}>
              <LearningLevel course={course} />
            </div>
            <CourseMeta course={course} bold withStockCount />
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <ShareButtons
            shareCta="Share this course"
            shareText={`Check out ${course.title} on Ace Centre Learning`}
            avatarClassName={styles.avatar}
            className={styles.shareButtons}
          />
          {isEnrolledOnCourse ? (
            <Button className={styles.bookButton} href={moodleUrl}>
              Go to course
            </Button>
          ) : (
            <Button
              className={styles.bookButton}
              disabled={disabled || !course.inStock}
              onClick={() => {
                toggleModal(true);
              }}
            >
              Book this course
            </Button>
          )}
        </div>
      </div>
      <Modal
        scrollBehavior="inside"
        size="3xl"
        isCentered
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody style={{ padding: "2rem" }}>
            <div className={styles.titleRow}>
              <h2>Booking this course</h2>
              <button
                className={styles.closeButton}
                onClick={() => toggleModal(false)}
              >
                Close window
              </button>
            </div>
            <h3>Bulk purchase</h3>
            {course.groupPurchase && course.allowQuantityEditing ? (
              <p>
                This course can be purchased for multiple people. Select the
                number of seats you want to add to your basket. At checkout you
                will be prompted to enter the emails of everyone you want to
                take part in the course. They will then be sent an email with
                instructions on how to login to the course.
              </p>
            ) : (
              <p>This course does not offer bulk purchase.</p>
            )}
            <h3>Delegated purchase</h3>
            {course.groupPurchase ? (
              <p>
                This course can be purchased for someone else. At checkout it
                will ask you if you would like to delegate the course to someone
                else. Tick the checkbox and enter the email of the person you
                want to take the course. They will then receive an email with
                instructions of how to login to the course.
              </p>
            ) : (
              <p>
                This course does not offer delegated purchase. The person taking
                the course must be the one to purchase it.
              </p>
            )}
            {price > 0 && (
              <>
                <h3>Purchase order (invoices)</h3>
                <p>
                  We will only accept purchase orders and issue an invoice for
                  orders over £250. You must be ordering at least{" "}
                  {quantityForPurchaseOrder}{" "}
                  {quantityForPurchaseOrder > 1 ? "seats" : "seat"} for this
                  course to qualify for a purchase order. To request a purchase
                  order <Link href="/contact">contact us via this form.</Link>
                </p>
              </>
            )}
            <form
              className={styles.bookButtonContainer}
              onSubmit={(event) => {
                event.preventDefault();

                const quantity = event?.target?.quantity?.value || 1;

                addToCart({
                  productId: course.id,
                  quantity,
                  isCourse: true,
                })(event);
              }}
            >
              {course.allowQuantityEditing && (
                <QuantityInput
                  placeholder="0"
                  name="quantity"
                  ariaLabel={`Quantity for ${course.name}`}
                  defaultValue={1}
                  max={course.stockQuantity || 99}
                />
              )}
              <p className={styles.error}>{error}</p>
              <Button
                className={styles.bookButton}
                disabled={disabled}
                type="submit"
              >
                Book this course
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const BundleDetailBox = ({ bundle }) => {
  const { disabled, addToCart, error } = useAddToCart();
  const [isModalOpen, toggleModal] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <div className={styles.imageContainer}>
            {bundle.image ? (
              <Image
                src={bundle.image.src}
                alt={
                  bundle.image.alt
                    ? bundle.image.alt
                    : `Thumbnail for ${bundle.title}`
                }
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <NoImage
                title={bundle.title}
                noImagePostCount={0}
                imageContainerClassName={styles.noImageContainer}
              />
            )}
          </div>
          <div className={styles.rightHandSide}>
            <div>
              <h3 className={styles.title}>{bundle.title}</h3>
              <p className={styles.tagLine}>From Ace Centre Learning</p>
            </div>
            <div className={styles.priceContainer}>
              <p className={styles.price}>{getPriceText(bundle.price)}</p>
              <p className={styles.fullPrice}>
                {getPriceText(bundle.fullPrice)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <ShareButtons
            shareCta="Share this course"
            shareText={`Check out ${bundle.title} on Ace Centre Learning`}
            avatarClassName={styles.avatar}
            className={styles.shareButtons}
          />

          <Button
            className={styles.bookButton}
            disabled={disabled || !bundle.inStock}
            onClick={() => {
              toggleModal(true);
            }}
          >
            Book this course
          </Button>
        </div>
      </div>
      <Modal
        scrollBehavior="inside"
        size="3xl"
        isCentered
        isOpen={isModalOpen}
        onClose={() => toggleModal(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody style={{ padding: "2rem" }}>
            <div className={styles.titleRow}>
              <h2>Buying this bundle</h2>
              <button
                className={styles.closeButton}
                onClick={() => toggleModal(false)}
              >
                Close window
              </button>
            </div>

            <h3>Bulk purchase</h3>
            <p>
              Some of these courses can be purchased for multiple people. At
              checkout you will be prompted to enter the emails of everyone you
              want to take part in the course. They will then be sent an email
              with instructions on how to login to the course.
            </p>

            <h3>Delegated purchase</h3>
            <p>
              Some of these courses course can be purchased for someone else. At
              checkout it will ask you if you would like to delegate the course
              to someone else. Tick the checkbox and enter the email of the
              person you want to take the course. They will then receive an
              email with instructions of how to login to the course.
            </p>

            <h3>Purchase order (invoices)</h3>
            <p>
              We will only accept purchase orders and issue an invoice for
              orders over £250. To request a purchase order{" "}
              <Link href="/contact">contact us via this form.</Link>
            </p>
            <form
              className={styles.bookButtonContainer}
              onSubmit={(event) => {
                event.preventDefault();

                addToCart({
                  productId: bundle.id,
                  quantity: 1,
                  isCourse: true,
                })(event);
              }}
            >
              <p className={styles.error}>{error}</p>
              <Button
                className={styles.bookButton}
                disabled={disabled}
                type="submit"
              >
                Add bundle to basket
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const QuantityInput = ({
  placeholder,
  name,
  ariaLabel,
  id,
  defaultValue,
  onChange,
  max,
}) => {
  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <FormLabel>Quantity:</FormLabel>
        <ChakraInput
          width="80px"
          className={styles.input}
          backgroundColor={"#F5F5F5"}
          placeholder={placeholder}
          name={name}
          type="number"
          aria-label={ariaLabel}
          textAlign="center"
          defaultValue={defaultValue === null ? "" : defaultValue}
          onChange={onChange}
          min={1}
          max={max}
        />
      </FormControl>
    </>
  );
};

export const levelsToNumberOfCircles = {
  introductory: 1,
  developing: 2,
  enhanced: 3,
  specialist: 4,
};

export const LearningLevel = ({ course, size = 20 }) => {
  const level = course.level || "introductory";
  const levelNumber = levelsToNumberOfCircles[level.toLowerCase()];

  return <LearningLevelRaw level={levelNumber} size={size} />;
};

export const LearningLevelRaw = ({ level, size = 20 }) => {
  const circles = [1, 2, 3, 4];
  const circleSize = size;
  const fullCircleWidth = circleSize * 2;
  const circleSpace = 10;
  const totalWidth =
    fullCircleWidth * circles.length + circleSpace * (circles.length - 1);
  const extraPadding = 6;

  return (
    <svg
      width={totalWidth + extraPadding}
      height={circleSize * 2 + extraPadding + 8}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {circles.map((circle, index) => {
          const toFill = index < level;

          return (
            <ellipse
              key={`circle-${circle}`}
              id={`circle-${circle}`}
              ry={circleSize}
              rx={circleSize}
              cy={circleSize + extraPadding / 2}
              cx={
                circleSize +
                circleSize * 2 * index +
                circleSpace * index +
                extraPadding / 2
              }
              stroke="#00537F"
              strokeWidth={2}
              fill={toFill ? "#94C64E" : "white"}
            />
          );
        })}

        {/* <ellipse
          ry={circleSize}
          rx={circleSize}
          id="circle2"
          cy={circleSize}
          cx="40"
          stroke="#000"
          fill="#fff"
        />
        <ellipse
          ry={circleSize}
          rx={circleSize}
          id="circle3"
          cy={circleSize}
          cx="60"
          stroke="#000"
          fill="#fff"
        />
        <ellipse
          ry={circleSize}
          rx={circleSize}
          id="circle3"
          cy={circleSize}
          cx="80"
          stroke="#000"
          fill="#fff"
        /> */}
      </g>
    </svg>
  );
};

export const CourseMeta = ({
  course,
  bold = false,
  withCost = false,
  withStockCount = false,
}) => {
  const dateText =
    course?.date?.type === "Scheduled"
      ? `Runs on: ${course.date.tagline}`
      : "On-demand";

  return (
    <ul className={styles.list}>
      <MetaListItem bold={bold}>{course.level} level</MetaListItem>

      {withCost && (
        <MetaListItem bold={bold}>{getPriceText(course.price)}</MetaListItem>
      )}
      {withStockCount && (
        <MetaListItem bold={bold}>{getStockText(course)}</MetaListItem>
      )}
      <MetaListItem bold={bold}>{dateText}</MetaListItem>
      <MetaListItem bold={bold}>{course.location.tagline}</MetaListItem>
    </ul>
  );
};

const getStockText = (course) => {
  // Stock quantity is 0 if the course is full
  if (!course.stockQuantity && course.inStock) return "Places available";
  if (!course.stockQuantity) return "No places remaining";
  if (course.stockQuantity === 1) return "1 place remaining";
  return `${course.stockQuantity} places remaining`;
};

const MetaListItem = ({ children, bold }) => {
  return (
    <li className={`${bold ? styles.bold : ""} ${styles.listItem}`}>
      <Avatar className={styles.bulletAvatar}>
        <ChevronRightIcon className={styles.icon}></ChevronRightIcon>
      </Avatar>
      {children}
    </li>
  );
};

const getPriceText = (price) => {
  if (price === 0) {
    return "Free";
  }

  return `£${price.toFixed(2)}`;
};
