import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { Card } from "../../components/latest-from-blog/latest-from-blog";
import { ResourcesShare } from "../../components/resources-share/resources-share";
import { FormModal, RESOURCE_FEEDBACK } from "../../components/ms-form";
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

  // Customization state
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [devicePhoto, setDevicePhoto] = useState(null);
  const [uploadError, setUploadError] = useState(null);
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
        setSwitchImages(switchesData);
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
        (guide) => guide.category === selectedCategory
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
        selectedGuides.has(product.id)
      );

      console.log(
        `Creating bulk download for ${selectedGuideProducts.length} guides...`
      );

      // Upload photos first if they exist
      let photoPaths = {};
      if (userPhoto || devicePhoto) {
        setUploadError(null); // Clear previous errors
        const formData = new FormData();
        if (userPhoto) {
          formData.append("userPhoto", userPhoto);
          console.log(
            `Uploading user photo: ${userPhoto.name} (${formatFileSize(
              userPhoto.size
            )})`
          );
        }
        if (devicePhoto) {
          formData.append("devicePhoto", devicePhoto);
          console.log(
            `Uploading device photo: ${devicePhoto.name} (${formatFileSize(
              devicePhoto.size
            )})`
          );
        }

        try {
          const uploadResponse = await fetch(
            `${config.launchpadUrl}/api/upload-photos`,
            {
              method: "POST",
              body: formData,
            }
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
              "Network error: Could not connect to server. Please check your connection and try again."
            );
          } else if (
            error.message.includes("413") ||
            error.message.includes("Request Entity Too Large")
          ) {
            setUploadError(
              "File too large: The server rejected the upload. Please try a smaller image or contact support."
            );
          } else {
            setUploadError(
              error.message || "Failed to upload photos. Please try again."
            );
          }
          throw error;
        }
      }

      // Use the new bulk download endpoint with customization
      const requestBody = {
        templateIds: selectedGuideProducts.map((product) => product.slug),
        userName: userName || "User",
        userPhotoPath: photoPaths.userPhotoPath,
        devicePhotoPath: photoPaths.devicePhotoPath,
        selectedSwitchImage: selectedSwitchImage || null,
      };

      console.log("Sending to bulk download:", requestBody);

      const bulkResponse = await fetch(
        `${config.launchpadUrl}/api/activity-book/bulk-download`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (bulkResponse.ok) {
        let bulkData;
        try {
          bulkData = await bulkResponse.json();
        } catch (jsonError) {
          console.error("Error parsing bulk response JSON:", jsonError);
          throw new Error("Invalid response from server. Please try again.");
        }

        if (!bulkData.pdfLocation) {
          console.error("No PDF location in response:", bulkData);
          throw new Error(
            "Server did not return a PDF location. Please try again."
          );
        }

        // Download the PDF file
        try {
          const pdfResponse = await fetch(bulkData.pdfLocation);

          if (!pdfResponse.ok) {
            throw new Error(
              `Failed to fetch PDF: ${pdfResponse.status} ${pdfResponse.statusText}`
            );
          }

          const pdfBlob = await pdfResponse.blob();

          // Verify it's actually a PDF
          if (pdfBlob.type !== "application/pdf" && pdfBlob.size === 0) {
            throw new Error(
              "Downloaded file is not a valid PDF. Please try again."
            );
          }

          const pdfUrl = window.URL.createObjectURL(pdfBlob);
          const pdfLink = document.createElement("a");
          pdfLink.href = pdfUrl;
          pdfLink.download = "activity-book-with-customization.pdf";
          document.body.appendChild(pdfLink);
          pdfLink.click();
          document.body.removeChild(pdfLink);
          window.URL.revokeObjectURL(pdfUrl);

          console.log(
            `PDF download completed for ${selectedGuideProducts.length} guides`
          );
          setSelectedGuides(new Set()); // Clear selection after download
        } catch (pdfError) {
          console.error("Error downloading PDF:", pdfError);
          throw new Error(
            `Failed to download PDF: ${pdfError.message || "Unknown error"}`
          );
        }
      } else {
        let errorMessage = "Unknown error occurred";
        try {
          const errorData = await bulkResponse.json();
          console.error("Server error:", errorData);

          // Avoid duplicate error messages
          if (errorData.error) {
            // If error already contains "Failed to create PDF", use it as-is
            errorMessage = errorData.error.includes("Failed to create PDF")
              ? errorData.error
              : `Failed to create PDF: ${errorData.error}`;
          } else if (errorData.message) {
            errorMessage = errorData.message.includes("Failed to create PDF")
              ? errorData.message
              : `Failed to create PDF: ${errorData.message}`;
          } else if (errorData.details) {
            errorMessage = `Failed to create PDF: ${errorData.details}`;
          } else {
            errorMessage = `Failed to create PDF: Server returned ${bulkResponse.status} ${bulkResponse.statusText}`;
          }
        } catch (jsonError) {
          // If we can't parse the error response, use status info
          console.error("Error parsing error response:", jsonError);
          errorMessage = `Failed to create PDF: Server returned ${bulkResponse.status} ${bulkResponse.statusText}`;
        }

        setUploadError(errorMessage);
        alert(errorMessage);
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
              Click{" "}
              <a
                href="/activity-book/example-activity-page.png"
                target="_blank"
              >
                here
              </a>{" "}
              to view an example of an activity guide.
            </p>
            <p>
              <br />
              The activity guides are part of the FUNctional Switching approach,
              a collaboration between CENMAC and Ace Centre, designed to develop
              switch skills. This approach uses a &apos;Gear&apos; analogy to
              show the level a learner is working at and how to support their
              progress. To learn more about the Gears and building switch skills{" "}
              <a href="https://functionalswitching.com">here.</a>
            </p>
            <p>
              <br />
              Each activity is designed to develop a range of skills that the
              learner can apply to other FUNctional tasks like controlling a
              communication device, accessing the school curriculum, using a
              computer, and much more.
            </p>
            <div style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}>
              <FormModal form={RESOURCE_FEEDBACK}>
                {({ onClick }) => (
                  <a
                    href={RESOURCE_FEEDBACK.url}
                    onClick={(event) => {
                      event.preventDefault();
                      onClick(event);
                    }}
                  >
                    Click here to share your feedback on this resource
                  </a>
                )}
              </FormModal>

              <div style={{ marginTop: "1rem" }}>
                <ResourcesShare />
              </div>
            </div>
            <p>
              <br />
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
            <p>
              <b>Hover</b> on the tiles below to see a description of the
              activity.
            </p>
            <p>
              <b>Select the checkbox</b> to include an activity guide in the
              download.
            </p>
            <p>
              Click on the <b>Download</b> button to generate your Switch
              Activity Book.
            </p>
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
          </div>

          <div className={styles.results}>
            <p className={styles.resultsCount}>
              {filteredGuides.length} guide
              {filteredGuides.length !== 1 ? "s" : ""} found
            </p>

            {/* Customization Section */}
            <div className={styles.customizationSection}>
              <h3>Personalize Your Activity Book (Optional)</h3>
              <p>
                Add the learner’s name and photos of how their switches are set
                up to personalise the activity guides. Maximum file size: 5MB
                per image. Supported formats: JPG, PNG, GIF
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
            </div>

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
                    onClick={downloadSelectedGuides}
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
