import { useState, useEffect } from "react";
import { Footer } from "../../components/footer/footer";
import { defaultNavItems } from "../../components/sub-nav/sub-nav";
import { CombinedNav } from "../../components/combined-nav/combined-nav";
import { BackToLink } from "../../components/back-to-link/back-to-link";
import { Card } from "../../components/latest-from-blog/latest-from-blog";
import styles from "../../styles/activity-book.module.css";
import config from "../../lib/config";

export default function GuideSelect() {
  const [guides, setGuides] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [switchImages, setSwitchImages] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSwitchImage, setSelectedSwitchImage] = useState("");
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuides, setSelectedGuides] = useState(new Set());
  const [downloading, setDownloading] = useState(false);

  // Customization state
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [devicePhoto, setDevicePhoto] = useState(null);
  // to connect to local change the config.launchpadUrl to http://localhost:4000
  // eg fetch(`${config.launchpadUrl}/api/activity-book`), to fetch(`http://localhost:4000/api/activity-book`)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [guidesRes, subcategoriesRes, switchesRes] = await Promise.all([
          fetch(`${config.launchpadUrl}/api/activity-book`),
          fetch(`${config.launchpadUrl}/api/activity-book/subcategories`),
          fetch(`${config.launchpadUrl}/api/activity-book/switches`),
        ]);

        const guidesData = await guidesRes.json();
        const subcategoriesData = await subcategoriesRes.json();
        const switchesData = await switchesRes.json();

        console.log("Fetched guides:", guidesData);
        console.log("Fetched subcategories:", subcategoriesData);
        console.log("Fetched switch images:", switchesData);

        setGuides(guidesData);
        setSubcategories(subcategoriesData);
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

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (guide) => guide.subcategory === selectedSubcategory
      );
    }

    setFilteredGuides(filtered);
  }, [guides, selectedSubcategory]);

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSwitchImageChange = (e) => {
    setSelectedSwitchImage(e.target.value);
  };

  const clearFilters = () => {
    setSelectedSubcategory("");
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

  // File upload handlers
  const handleUserPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUserPhoto(file);
    }
  };

  const handleDevicePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setDevicePhoto(file);
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
        const formData = new FormData();
        if (userPhoto) {
          formData.append("userPhoto", userPhoto);
        }
        if (devicePhoto) {
          formData.append("devicePhoto", devicePhoto);
        }

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
          }
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
        const bulkData = await bulkResponse.json();

        // Download the PDF file
        const pdfResponse = await fetch(bulkData.pdfLocation);
        const pdfBlob = await pdfResponse.blob();
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
      } else {
        const errorData = await bulkResponse.json();
        console.error("Server error:", errorData);
        alert(`Failed to create PDF: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating bulk download:", error);
      alert(`Error creating bulk download: ${error.message}`);
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
    category: { name: guide.category },
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
    subcategory: guide.subcategory,
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
          <div className={styles.header}>
            <h1>Activity Book</h1>
            <p>
              Use the filters below to find guides that match your needs. Select
              a subcategory to see relevant guides.
            </p>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="subcategory">Subcategory:</label>
              <select
                id="subcategory"
                value={selectedSubcategory}
                onChange={handleSubcategoryChange}
                className={styles.select}
              >
                <option value="">All Subcategories</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
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
                Add your name and photos to make your activity book more
                personal
              </p>

              <div className={styles.customizationForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="userName">Your Name:</label>
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
                      ✓ {userPhoto.name} selected
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
                      ✓ {devicePhoto.name} selected
                    </p>
                  )}
                </div>
              </div>
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
            title="Available Guides"
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
                <Card
                  className={styles.card}
                  imageContainerClassName={styles.imageContainer}
                  href="#"
                  noImagePostCount={0}
                  subtitle={product.subcategory}
                  featuredImage={product.image}
                  title={product.title}
                >
                  <p className={styles.productTitle}>{product.title}</p>
                  {product.badgeText && (
                    <span className={styles.badge}>{product.badgeText}</span>
                  )}
                </Card>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
