import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../button/button";
import styles from "./guide-generate.module.css";
import {
  FormControl,
  Input as ChakraInput,
  Select,
  Spinner,
} from "@chakra-ui/react";
import LinearProgress from "@mui/material/LinearProgress";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { ResourcesImage } from "../resources-image/resources-image";
import { ResourcesDescription } from "../resources-description/resources-description";
import { ResourcesShare } from "../resources-share/resources-share";
import { ResourceList } from "../resource-list/resource-list";
import { FormModal, RESOURCE_FEEDBACK } from "../ms-form";
import { NewsletterSignup } from "../resources-download/resources-download";
import { ProductFaqs } from "../product-faqs/product-faqs";

const storageKey = "newsletter-opt-in";

const LOADING_MESSAGES = [
  "Gathering information about your guide.....",
  "Setting up your guide.....",
  "Building your custom guide.....",
  "Saving your new custom guide.....",
];

const Progress = ({ totalTime }) => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, totalTime / 100);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [totalTime]);

  return (
    <div className={styles.progressContainer}>
      <LinearProgress
        variant="determinate"
        value={progress}
        className={styles.progressBar}
      />
      <p className={styles.loadingMessage}>{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  );
};

const ErrorMessage = ({ errorMessage }) => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorMessage}>{errorMessage}</p>
    </div>
  );
};

const DonationModal = ({ modalOpen, onClose, name, errorMessage }) => {
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

            {errorMessage ? (
              <ErrorMessage errorMessage={errorMessage} />
            ) : (
              <Progress totalTime={10000} />
            )}
            <p>
              If you found this resource helpful then please consider donating
              so we can continue to make valuable resources.
            </p>
          </div>

          <div className={styles.donateButton}>
            <Button href="/get-involved/donate">Donate</Button>
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

const OptionalEmailDownloadModal = ({
  modalOpen,
  onClose,
  name,
  errorMessage,
  slug,
}) => {
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

            {errorMessage ? (
              <ErrorMessage errorMessage={errorMessage} />
            ) : (
              <Progress totalTime={10000} />
            )}
            <p>
              While you wait, why not sign up to our free newsletter to stay up
              to date with the latest resources from Ace Centre
            </p>
          </div>

          <div className={styles.newsletterContainer}>
            <NewsletterSignup
              tags={[{ name: slug }]}
              signUpIdentifier="guide"
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

// Placeholder GuidePage component - replace with actual implementation when ready

export const GuidePage = ({
  resource,
  guideTemplate,
  attachedResources,
  relatedResources,
}) => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{resource?.name || "Guide"}</h1>
      <p>{resource?.description || "Guide content coming soon..."}</p>

      {guideTemplate && (
        <div>
          <h2>{guideTemplate.title}</h2>
          {guideTemplate.sections?.map((section, index) => (
            <div key={index} style={{ marginBottom: "2rem" }}>
              {section.heading && <h3>{section.heading}</h3>}
              <p>{section.body}</p>
              {section.image && (
                <img
                  src={section.image}
                  alt={section.heading || "Guide image"}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "3rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>Note:</strong> This guide functionality is under development.
          The full interactive guide will be available soon.
        </p>
      </div>
    </div>
  );
};

export const GuideGenerate = ({
  template,
  errorMessage,
  modalOpen,
  setModalOpen,
  loading,
  resource,
  downloadDisabled,
  triggerDownload,
}) => {
  const hasOptedInToNewsletter = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) == "true";
    } else {
      return false;
    }
  }, []);

  return (
    <>
      <div className={styles.topArea}>
        <div className={styles.leftTopArea}>
          <ResourcesImage resource={resource} priority />
        </div>
        <div className={styles.rightTopArea}>
          <ResourcesDescription resource={resource} />
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

          <div className={styles.share}>
            <ResourcesShare />
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Customize Your Guide</h2>
            <p>Fill in the details below to create your personalized guide.</p>
          </div>

          {loading ? (
            <div className={styles.loadingContainer}>
              <Spinner size="xl" />
              <p>Loading guide template...</p>
            </div>
          ) : (
            <>
              <div className={styles.formSection}>
                <h3>Guide Information</h3>
                <div className={styles.formGrid}>
                  <FormControl>
                    <label>Guide Title</label>
                    <ChakraInput
                      placeholder="Enter guide title"
                      defaultValue={template?.title || ""}
                    />
                  </FormControl>
                  <FormControl>
                    <label>Category</label>
                    <Select placeholder="Select category">
                      <option value="activity">Activity Book</option>
                      <option value="communication">Communication</option>
                      <option value="education">Education</option>
                      <option value="therapy">Therapy</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <label>Level</label>
                    <Select placeholder="Select level">
                      <option value="1">Level 1</option>
                      <option value="2">Level 2</option>
                      <option value="3">Level 3</option>
                      <option value="4">Level 4</option>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className={styles.formSection}>
                <h3>Guide Content</h3>
                <div className={styles.sectionsContainer}>
                  {template?.sections?.map((section, index) => (
                    <div key={index} className={styles.sectionItem}>
                      <h4>Section {index + 1}</h4>
                      <FormControl>
                        <label>Heading</label>
                        <ChakraInput
                          placeholder="Section heading"
                          defaultValue={section.heading || ""}
                        />
                      </FormControl>
                      <FormControl>
                        <label>Content</label>
                        <textarea
                          className={styles.textarea}
                          placeholder="Section content"
                          defaultValue={section.body || ""}
                          rows={4}
                        />
                      </FormControl>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.downloadSection}>
                <Button
                  onClick={() => {
                    if (hasOptedInToNewsletter) {
                      triggerDownload();
                    } else {
                      setModalOpen(true);
                    }
                  }}
                  disabled={downloadDisabled}
                  className={styles.downloadButton}
                >
                  {loading ? "Generating..." : "Generate Guide PDF"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {hasOptedInToNewsletter ? (
        <DonationModal
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          name={resource.name}
          errorMessage={errorMessage}
        />
      ) : (
        <OptionalEmailDownloadModal
          modalOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          name={resource.name}
          errorMessage={errorMessage}
          slug={resource.slug}
        />
      )}
    </>
  );
};

// Custom hook for guide functionality
const useGuide = (template) => {
  const [loading, setLoading] = useState(true);
  const [freshTemplate, setFreshTemplate] = useState(null);
  const [downloadDisabled, setDownloadDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Simulate template loading
  useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock template data based on the guide structure
        const mockTemplate = {
          templateId: template?.templateId || "guide-template",
          title: template?.title || "Custom Guide",
          category: template?.category || "Activity Book",
          level: template?.level || 1,
          sections: template?.sections || [
            {
              heading: "Introduction",
              body: "This is an introduction to your guide...",
            },
            {
              heading: "Getting Started",
              body: "Here's how to get started with this guide...",
            },
          ],
        };

        setFreshTemplate(mockTemplate);
      } catch (error) {
        setErrorMessage("Failed to load guide template");
      } finally {
        setLoading(false);
      }
    };

    if (template) {
      loadTemplate();
    }
  }, [template]);

  const triggerDownload = useCallback(async () => {
    setDownloadDisabled(true);
    setModalOpen(true);

    try {
      // Collect form data
      const formData = {
        title: template?.title || "Custom Guide",
        category: template?.category || "Activity Book",
        level: template?.level || 1,
        sections: template?.sections || [],
      };

      // Call the API to generate the PDF
      const response = await fetch("/api/activity-book/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template?.templateId || "guide-template",
          formData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const result = await response.json();

      if (result.success) {
        // In a real implementation, this would trigger the actual download
        // For now, we'll simulate it
        console.log("PDF generated successfully:", result);

        // Simulate download
        const link = document.createElement("a");
        link.href = result.downloadUrl;
        link.download = result.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        throw new Error(result.message || "Failed to generate PDF");
      }

      setModalOpen(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setErrorMessage("Failed to generate guide PDF: " + error.message);
    } finally {
      setDownloadDisabled(false);
    }
  }, [template]);

  return {
    triggerDownload,
    downloadDisabled: loading || downloadDisabled,
    errorMessage,
    looseVariableProps: [],
    variableGroupsProps: [],
    defaultSelected: [],
    modalOpen,
    setModalOpen,
    loading,
    freshTemplate,
  };
};
