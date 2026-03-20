import { useState, useEffect } from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { Card } from "../../components/latest-from-blog/latest-from-blog";
import { FormModal, RESOURCE_FEEDBACK } from "../../components/ms-form";
import { NewsletterSignup } from "../../components/resources-download/resources-download";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "../../styles/activity-book.module.css";
import config from "../../lib/config";

// Simple Text Tooltip Component
const TextTooltip = ({ text }) => {
  if (!text) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipText}>{text}</div>
    </div>
  );
};

// Guide Card with Tooltip Component
const GuideCardWithTooltip = ({ product, styles, Card }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Custom tooltip text - you can customize this per product
  const tooltipText =
    product.tooltipText ||
    product.description ||
    `Click to select ${product.title}`;

  return (
    <div
      className={styles.cardWithTooltip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={styles.card}
        imageContainerClassName={styles.imageContainer}
        href="#"
        noImagePostCount={0}
        subtitle={product.category}
        featuredImage={product.image}
        title={product.title}
      >
        <p className={styles.productTitle}>{product.title}</p>
        {product.badgeText && (
          <span className={styles.badge}>{product.badgeText}</span>
        )}
      </Card>
      {/* Hover Tooltip with Custom Text */}
      {isHovered && <TextTooltip text={tooltipText} />}
    </div>
  );
};

const LOADING_MESSAGES = [
  "Gathering information about your activity book.....",
  "Setting up your activity book.....",
  "Building your custom activity book.....",
  "Saving your new custom activity book.....",
];

const ActivityBookProgress = ({ totalTime }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const tempId = setInterval(() => {
      setValue((current) => {
        if (current >= 100) {
          clearInterval(tempId);
          return 100;
        }
        return current + 1;
      });
    }, totalTime / 100);

    return () => clearInterval(tempId);
  }, [totalTime]);

  const interval = 100 / LOADING_MESSAGES.length;
  const currentMessageIndex = Math.min(
    Math.floor(value / interval),
    LOADING_MESSAGES.length - 1,
  );
  const currentMessage = LOADING_MESSAGES[currentMessageIndex];

  return (
    <>
      <LinearProgress
        className={styles.progress}
        variant="determinate"
        value={value}
      />
      <p className={styles.loadingMessage}>{currentMessage}</p>
    </>
  );
};

const ActivityBookDownloadModal = ({ modalOpen, onClose }) => {
  const name = "your Switch Activity Book";
  const slug = "switch-activity-book";

  return (
    <Modal
      scrollBehavior="inside"
      size="3xl"
      isCentered
      isOpen={modalOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody style={{ padding: "2rem" }}>
          <div className={styles.topSection}>
            <h2>Preparing {name} for download</h2>

            <ActivityBookProgress totalTime={10000} />
            <p>
              While you wait, why not sign up to our free newsletter to stay up
              to date with the latest resources from Ace Centre
            </p>
          </div>

          <div className={styles.newsletterContainer}>
            <NewsletterSignup
              tags={[{ name: slug }]}
              signUpIdentifier="activity-book"
            />
          </div>
          <div className={styles.bottomContainer}>
            <button className={styles.closeButton} onClick={onClose}>
              Close window
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default function GuideSelect() {
  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [switchImages, setSwitchImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSwitchImage, setSelectedSwitchImage] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuides, setSelectedGuides] = useState(new Set());
  const [downloading, setDownloading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Customization state
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [devicePhoto, setDevicePhoto] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const normalizeSwitchImageName = (name) => {
    const key = String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    // Rename dropdown labels only (do not change filenames/paths).
    const renameMap = {
      "dog talking buttons": "recordable button",
      "talking tilles crop": "Talking tile",
      "big step by step": "Big step-by-step",
      "little step by step": "Little step-by-step",
      "little syep-by-step": "Little step-by-step",
      "little mack": "Little mack",
      "smooth talker with levels": "Smooth talker",
    };

    return renameMap[key] ?? name;
  };

  // to connect to local change the config.launchpadUrl to http://localhost:4000
  // eg fetch(`${config.launchpadUrl}/api/activity-book`), to fetch(`http://localhost:4000/api/activity-book`)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidesRes, categoriesRes, switchesRes] = await Promise.all([
          fetch(`${config.launchpadUrl}/api/activity-book`),
          fetch(`${config.launchpadUrl}/api/activity-book/categories`),
          fetch(`${config.launchpadUrl}/api/activity-book/switches`),
        ]);

        const guidesData = await guidesRes.json();
        const categoriesData = await categoriesRes.json();
        const switchesData = await switchesRes.json();

        console.log("Fetched guides:", guidesData);
        console.log("Fetched categories:", categoriesData);
        console.log("Fetched switch images:", switchesData);

        setGuides(guidesData);
        setCategories(categoriesData);
        setSwitchImages(
          Array.isArray(switchesData)
            ? switchesData.map((s) => ({
                ...s,
                displayName: normalizeSwitchImageName(s?.displayName),
              }))
            : switchesData,
        );
        setFilteredGuides(guidesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = guides;

    if (selectedCategory) {
      filtered = filtered.filter(
        (guide) => guide.category === selectedCategory,
      );
    }

    setFilteredGuides(filtered);
  }, [guides, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSwitchImageChange = (e) => {
    setSelectedSwitchImage(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedSwitchImage("");
  };

  const handleGuideSelection = (guideId) => {
    const newSelected = new Set(selectedGuides);
    if (newSelected.has(guideId)) {
      newSelected.delete(guideId);
    } else {
      newSelected.add(guideId);
    }
    setSelectedGuides(newSelected);
  };

  const selectAllGuides = () => {
    const allGuideIds = filteredGuides.map((guide, index) => index + 1);
    setSelectedGuides(new Set(allGuideIds));
  };

  const clearAllGuides = () => {
    setSelectedGuides(new Set());
  };

  // Compress image if over ~800KB to stay under App Platform 1MB limit
  const compressIfNeeded = async (file) => {
    const THRESHOLD_BYTES = 800 * 1024;
    if (!file || file.size <= THRESHOLD_BYTES) return file;
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.9,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      return compressed;
    } catch (err) {
      console.warn("Image compression failed, using original:", err);
      return file;
    }
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // File upload handlers
  const handleUserPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUserPhoto(file);
      setUploadError(null); // Clear any previous errors
    } else if (file) {
      setUploadError("Please select an image file");
    }
  };

  const handleDevicePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setDevicePhoto(file);
      setUploadError(null); // Clear any previous errors
    } else if (file) {
      setUploadError("Please select an image file");
    }
  };

  const downloadSelectedGuides = async () => {
    if (selectedGuides.size === 0) {
      alert("Please select at least one guide to download.");
      return;
    }

    setDownloading(true);
    try {
      const selectedGuideProducts = guideProducts.filter((product) =>
        selectedGuides.has(product.id),
      );

      console.log(
        `Creating bulk download for ${selectedGuideProducts.length} guides...`,
      );

      // Upload photos first if they exist
      let photoPaths = {};
      if (userPhoto || devicePhoto) {
        setUploadError(null); // Clear previous errors
        const formData = new FormData();
        const userFile = userPhoto ? await compressIfNeeded(userPhoto) : null;
        const deviceFile = devicePhoto
          ? await compressIfNeeded(devicePhoto)
          : null;
        if (userFile) {
          formData.append("userPhoto", userFile);
          console.log(
            `Uploading user photo: ${userFile.name} (${formatFileSize(
              userFile.size,
            )})`,
          );
        }
        if (deviceFile) {
          formData.append("devicePhoto", deviceFile);
          console.log(
            `Uploading device photo: ${deviceFile.name} (${formatFileSize(
              deviceFile.size,
            )})`,
          );
        }

        try {
          const uploadResponse = await fetch(
            `${config.launchpadUrl}/api/upload-photos`,
            {
              method: "POST",
              body: formData,
            },
          );

          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            if (uploadData.success) {
              photoPaths = uploadData.paths;
              console.log("Photo paths received from upload:", photoPaths);
            } else {
              const errorMsg =
                uploadData.error ||
                uploadData.message ||
                "Failed to upload photos";
              setUploadError(errorMsg);
              throw new Error(errorMsg);
            }
          } else {
            // Try to get error message from response
            let errorMsg = "Failed to upload photos";
            try {
              const errorData = await uploadResponse.json();
              errorMsg =
                errorData.error ||
                errorData.message ||
                `Server returned ${uploadResponse.status}: ${uploadResponse.statusText}`;
            } catch (e) {
              errorMsg = `Server returned ${uploadResponse.status}: ${uploadResponse.statusText}`;
            }
            setUploadError(errorMsg);
            throw new Error(errorMsg);
          }
        } catch (error) {
          console.error("Error uploading photos:", error);
          if (
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
          ) {
            setUploadError(
              "Network error: Could not connect to server. Please check your connection and try again.",
            );
          } else if (
            error.message.includes("413") ||
            error.message.includes("Request Entity Too Large")
          ) {
            setUploadError(
              "File too large: The server rejected the upload. Please try a smaller image or contact support.",
            );
          } else {
            setUploadError(
              error.message || "Failed to upload photos. Please try again.",
            );
          }
          throw error;
        }
      }

      // Use the async bulk download endpoint with customization
      const requestBody = {
        templateIds: selectedGuideProducts.map((product) => product.slug),
        userName: userName || "User",
        userPhotoPath: photoPaths.userPhotoPath,
        devicePhotoPath: photoPaths.devicePhotoPath,
        selectedSwitchImage: selectedSwitchImage || null,
      };

      console.log("Sending to bulk download:", requestBody);

      const createResponse = await fetch(
        `${config.launchpadUrl}/api/activity-book/bulk-download`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        },
      );

      if (!createResponse.ok) {
        let errorMessage = "Failed to create bulk download job";
        try {
          const errorData = await createResponse.json();
          errorMessage =
            errorData.error ||
            errorData.message ||
            `Server returned ${createResponse.status} ${createResponse.statusText}`;
        } catch (_e) {
          errorMessage = `Server returned ${createResponse.status} ${createResponse.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const createData = await createResponse.json();

      // Backend returns pdfLocation directly (synchronous) or jobId for async polling
      let pdfLocation = createData.pdfLocation || null;

      if (!pdfLocation && createData.jobId) {
        // Async flow: poll for job completion
        const pollIntervalMs = 2000;
        const maxWaitMs = 5 * 60 * 1000; // one hour
        const startTime = Date.now();

        while (Date.now() - startTime < maxWaitMs) {
          try {
            const statusResponse = await fetch(
              `${config.launchpadUrl}/api/activity-book/bulk-download/${createData.jobId}`,
            );

            if (!statusResponse.ok) {
              let errorMessage = "Failed to check bulk download status";
              try {
                const errorData = await statusResponse.json();
                errorMessage =
                  errorData.error ||
                  errorData.message ||
                  `Server returned ${statusResponse.status} ${statusResponse.statusText}`;
              } catch (_e) {
                errorMessage = `Server returned ${statusResponse.status} ${statusResponse.statusText}`;
              }
              console.error(errorMessage);
              await new Promise((resolve) =>
                setTimeout(resolve, pollIntervalMs),
              );
              continue;
            }

            const statusData = await statusResponse.json();

            if (statusData.status === "error") {
              throw new Error(
                statusData.error || "Failed to create PDF on the server",
              );
            }

            if (statusData.status === "done" && statusData.pdfLocation) {
              pdfLocation = statusData.pdfLocation;
              break;
            }
          } catch (statusError) {
            console.error("Error checking bulk download status:", statusError);
          }

          await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        }

        if (!pdfLocation) {
          throw new Error(
            "Timed out waiting for the server to generate the PDF. Please try again.",
          );
        }
      } else if (!pdfLocation) {
        throw new Error(
          "Server did not return a PDF location. Please try again.",
        );
      }

      // Download the PDF file by navigating directly to the URL.
      // This avoids loading a ~400MB+ Blob into JS memory, which can cause "Load failed" errors.
      try {
        const pdfLink = document.createElement("a");
        pdfLink.href = pdfLocation;
        pdfLink.download = "activity-book-with-customization.pdf";
        document.body.appendChild(pdfLink);
        pdfLink.click();
        document.body.removeChild(pdfLink);

        console.log(
          `PDF download triggered for ${selectedGuideProducts.length} guides`,
        );
        setSelectedGuides(new Set()); // Clear selection after download
      } catch (pdfError) {
        console.error("Error downloading PDF:", pdfError);
        throw new Error(
          `Failed to download PDF: ${pdfError.message || "Unknown error"}`,
        );
      }
    } catch (error) {
      console.error("Error creating bulk download:", error);
      // If uploadError is already set, it will be displayed in the UI
      // Otherwise show a generic error
      if (!uploadError) {
        setUploadError(error.message || "An error occurred. Please try again.");
        alert(`Error creating bulk download: ${error.message}`);
      } else {
        // Upload error is already displayed, just show alert for download error
        alert(`Error: ${uploadError}`);
      }
    } finally {
      setDownloading(false);
    }
  };

  // Convert guides to product format for ActivityBookList component
  const guideProducts = filteredGuides.map((guide, index) => ({
    id: index + 1,
    slug: guide.templateId,
    date: new Date().toISOString(),
    name: guide.title,
    description:
      guide.sections
        .map((s) => s.body)
        .join(" ")
        .substring(0, 200) + "...",
    shortDescription:
      guide.sections[0]?.body?.substring(0, 100) + "..." ||
      "A helpful guide for communication and activities.",
    attachedResources: [],
    featured: false,
    totalSales: 0,
    price: 0,
    variations: [],
    gallery: [],
    inStock: true,
    activityType: { name: guide.activityType },
    projects: [],
    ebook: null,
    instantDownloadAvailable: true,
    image: {
      src: guide.mainImage
        ? `${config.launchpadUrl}/${guide.mainImage.replace(/^\/?/, "")}`
        : "/images/default-guide.png",
      alt: `Guide: ${guide.title}`,
    },
    isGuideTemplate: true,
    guideSlug: guide.title,
    badgeText: guide.badgeText,
    title: guide.title,
    category: guide.category,
    tooltipText: guide.tooltipText, // Include tooltipText from guide data
  }));

  if (loading) {
    return (
      <>
        <header>
          <CombinedNav defaultNavItems={defaultNavItems} />
        </header>
        <main id="mainContent">
          <div className={styles.container}>
            <p>Loading guides...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <header>
        <CombinedNav defaultNavItems={defaultNavItems} />
      </header>
      <main id="mainContent">
        <BackToLink where="home" href="/" />

        <div className={styles.container}>
          <div className={styles.header} style={{ textAlign: "left" }}>
            <h1>Create a Switch Activity Book</h1>
            <p>
              This resource generates a downloadable PDF book with activity
              guides that introduce switches and help build understanding of how
              they work and what they can do through fun, motivating activities.{" "}
              See an{" "}
              <a
                href="/activity-book/example-activity-page.png"
                target="_blank"
              >
                example activity guide.
              </a>{" "}
            </p>
            <p>
              <br />
              The activity guides are part of the FUNctional Switching approach,
              a collaboration between CENMAC and Ace Centre, designed to develop
              switch skills. This approach uses a &apos;Gear&apos; analogy to
              show the level a learner is working at and how to support their
              progress.{" "}
              <Link href="/resources/functional-switching">
                Learn more about the Gears and building switch skills.
              </Link>
            </p>
            <p>
              <br />
              Each activity is designed to develop a range of skills that the
              learner can apply to other FUNctional tasks like controlling a
              communication device, accessing the school curriculum, using a
              computer, and much more.{" "}
              <FormModal form={RESOURCE_FEEDBACK}>
                {({ onClick }) => (
                  <a
                    href={RESOURCE_FEEDBACK.url}
                    onClick={(event) => {
                      event.preventDefault();
                      onClick(event);
                    }}
                  >
                    We would really appreciate feedback.
                  </a>
                )}
              </FormModal>
            </p>
            <br />
            <p>
              See{" "}
              <Link
                href="/activity-book/Types-of-Switches-FUNctional-Switching-2.26.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                examples of equipment used in the activities.
              </Link>
              <br /> <br />
              <br />
            </p>
            <div className={styles.results}>
              {/* Customization Section */}
              <div className={styles.customizationSection}>
                <h3>Personalize Your Activity Book (Optional)</h3>
                <p>
                  Add the learner’s name and photos of how their switches are
                  set up to personalise the activity guides. Maximum file size:
                  5MB per image. Supported formats: JPG, PNG, GIF
                </p>

                <div className={styles.customizationForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="userName">
                      Name: enter learner’s name (in text box){" "}
                    </label>
                    <input
                      type="text"
                      id="userName"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className={styles.textInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="userPhoto">
                      1 Switch Setup Photo (Optional):
                    </label>
                    <input
                      type="file"
                      id="userPhoto"
                      accept="image/*"
                      onChange={handleUserPhotoChange}
                      className={styles.fileInput}
                    />
                    {userPhoto && (
                      <p className={styles.fileInfo}>
                        ✓ {userPhoto.name} selected (
                        {formatFileSize(userPhoto.size)})
                      </p>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="devicePhoto">
                      2 Switch Setup Photo (Optional):
                    </label>
                    <input
                      type="file"
                      id="devicePhoto"
                      accept="image/*"
                      onChange={handleDevicePhotoChange}
                      className={styles.fileInput}
                    />
                    {devicePhoto && (
                      <p className={styles.fileInfo}>
                        ✓ {devicePhoto.name} selected (
                        {formatFileSize(devicePhoto.size)})
                      </p>
                    )}
                  </div>
                </div>
                {uploadError && (
                  <div
                    className={styles.errorMessage}
                    style={{
                      marginTop: "1rem",
                      padding: "0.75rem",
                      backgroundColor: "#fee",
                      border: "1px solid #fcc",
                      borderRadius: "4px",
                      color: "#c33",
                    }}
                  >
                    ⚠ {uploadError}
                  </div>
                )}
                <p className={styles.privacyNote}>
                  <strong>Privacy note:</strong> The name and photos you provide
                  are used only to generate your personalised PDF. They are
                  stored temporarily on our server and are automatically deleted
                  within 15 minutes.
                </p>
              </div>
              <p>
                <b>To generate a Switch Activity Book</b>
              </p>
              <p>Use the drop-down menus to:</p>
              <ul>
                <li>
                  <b>Category:</b> filter the activity guides by areas of
                  interest.
                </li>
                <li>
                  <b>Switch Image:</b> insert an image of a specific switch into
                  the guide.
                </li>
              </ul>
            </div>
            <div className={styles.filters}>
              <div className={styles.filterGroup}>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className={styles.select}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label htmlFor="switchImage">Switch Image:</label>
                <select
                  id="switchImage"
                  value={selectedSwitchImage}
                  onChange={handleSwitchImageChange}
                  className={styles.select}
                >
                  <option value="">Default Images</option>
                  {switchImages.map((switchImage) => (
                    <option key={switchImage.filename} value={switchImage.path}>
                      {switchImage.displayName}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={clearFilters} className={styles.clearButton}>
                Clear Filters
              </button>
              <p className={styles.resultsCount}>
                {filteredGuides.length} guide
                {filteredGuides.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <p>
              <b>Hover</b> on the tiles below to see a description of the
              activity.
            </p>{" "}
            <br />
            <p>
              <b>Select the checkbox</b> to include an activity guide in the
              download.
            </p>
            <p>
              Click on the <b>Download</b> button to generate your Switch
              Activity Book.
            </p>
            {filteredGuides.length > 0 && (
              <div className={styles.bulkActions}>
                <div className={styles.selectionControls}>
                  <button
                    onClick={selectAllGuides}
                    className={styles.actionButton}
                    disabled={downloading}
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearAllGuides}
                    className={styles.actionButton}
                    disabled={downloading}
                  >
                    Clear All
                  </button>
                  <span className={styles.selectionCount}>
                    {selectedGuides.size} of {filteredGuides.length} selected
                  </span>
                </div>

                {selectedGuides.size > 0 && (
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      downloadSelectedGuides();
                    }}
                    className={styles.downloadButton}
                    disabled={downloading}
                  >
                    {downloading
                      ? "Downloading..."
                      : `Download ${selectedGuides.size} Guides`}
                  </button>
                )}
              </div>
            )}
          </div>

          <ActivityBookList
            title="Activity  Guides"
            products={guideProducts}
            className={styles.guidesList}
            selectedGuides={selectedGuides}
            onGuideSelection={handleGuideSelection}
            downloading={downloading}
          />

          <ActivityBookDownloadModal
            modalOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

// Custom ActivityBookList component that uses /activity-book/ URLs
const ActivityBookList = ({
  title,
  products,
  className = "",
  selectedGuides,
  onGuideSelection,
  downloading,
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.titleContainer}>
        <div>{title && <h2 className={styles.title}>{title}</h2>}</div>
      </div>
      <ul className={styles.postList}>
        {products.map((product) => (
          <li
            key={`${title}-card-${product.slug}`}
            className={styles.guideItem}
          >
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                id={`guide-${product.id}`}
                checked={selectedGuides.has(product.id)}
                onChange={() => onGuideSelection(product.id)}
                disabled={downloading}
                className={styles.guideCheckbox}
              />
              <label
                htmlFor={`guide-${product.id}`}
                className={styles.checkboxLabel}
              >
                <GuideCardWithTooltip
                  product={product}
                  styles={styles}
                  Card={Card}
                />
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
