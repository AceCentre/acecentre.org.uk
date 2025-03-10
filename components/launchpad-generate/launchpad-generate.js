import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../button/button";
import styles from "./launchpad-generate.module.css";
import { launchpadUrl } from "../../lib/config";
import {
  FormControl,
  Input as ChakraInput,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useLaunchpad } from "../../lib/use-launchpad";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { ResourcesImage } from "../resources-image/resources-image";
import { ResourcesDescription } from "../resources-description/resources-description";
import { ResourcesShare } from "../resources-share/resources-share";
import { ResourceList } from "../resource-list/resource-list";
import Link from "next/link";
import { BlockPicker } from "react-color";
import { FormModal, RESOURCE_FEEDBACK } from "../ms-form";
import { NewsletterSignup } from "../resources-download/resources-download";
import { ProductFaqs } from "../product-faqs/product-faqs";

const storageKey = "newsletter-opt-in";

const COLOURS = [
  "#B9ffB9",
  "#ffffff",
  "#000000",
  "#FFFF00",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#D9E3F0",
  "#F47373",
  "#697689",
  "#37D67A",
  "#2CCCE4",
  "#555555",
  "#dce775",
  "#ff8a65",
  "#ba68c8",
];

const LOADING_MESSAGES = [
  "Gathering information about your new chart.....",
  "Setting up your new chart.....",
  "Building your custom chart.....",
  "Saving your new custom chart.....",
];

const Progress = ({ totalTime }) => {
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
  }, []);

  const interval = 100 / LOADING_MESSAGES.length;
  const currentMessageIndex = Math.min(
    Math.floor(value / interval),
    LOADING_MESSAGES.length - 1
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

const DownloadModal = ({
  modalOpen,
  onClose,
  name,
  errorMessage,
  slug,
  resource,
  triggerDownload,
}) => {
  const hasOptedInToNewsletter = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) == "true";
    } else {
      return false;
    }
  }, []);

  if (resource.popupFormBehaviour == "donation") {
    return (
      <DonationModal
        modalOpen={modalOpen}
        onClose={onClose}
        name={name}
        errorMessage={errorMessage}
        slug={slug}
      />
    );
  }

  if (resource.popupFormBehaviour == "no-popup") {
    return (
      <OptionalEmailDownloadModal
        modalOpen={modalOpen}
        onClose={onClose}
        name={name}
        errorMessage={errorMessage}
        slug={slug}
      />
    );
  }

  if (resource.popupFormBehaviour == "optional-email") {
    return (
      <OptionalEmailDownloadModal
        modalOpen={modalOpen}
        onClose={onClose}
        name={name}
        errorMessage={errorMessage}
        slug={slug}
      />
    );
  }

  if (
    resource.popupFormBehaviour == "forced-email" &&
    !hasOptedInToNewsletter
  ) {
    return (
      <ForcedEmailDownloadModal
        modalOpen={modalOpen}
        onClose={onClose}
        name={name}
        errorMessage={errorMessage}
        slug={slug}
        triggerDownload={triggerDownload}
      />
    );
  }

  return (
    <OptionalEmailDownloadModal
      modalOpen={modalOpen}
      onClose={onClose}
      name={name}
      errorMessage={errorMessage}
      slug={slug}
    />
  );
};

const ForcedEmailDownloadModal = ({
  modalOpen,
  onClose,
  name,
  errorMessage,
  slug,
  triggerDownload,
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
              You can access this content by joining our mailing list to stay up
              to date with the latest resources from Ace Centre
            </p>
          </div>

          <div className={styles.newsletterContainer}>
            <NewsletterSignup
              tags={[{ name: slug }]}
              signUpIdentifier="launchpad"
              withNames
              onSuccess={() => {
                triggerDownload();
                localStorage.setItem(`${storageKey}-${slug}`, true);
              }}
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
              signUpIdentifier="launchpad"
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

export const LaunchpadPage = ({
  resource,
  launchpadTemplate,
  attachedResources,
  relatedResources,
}) => {
  const {
    triggerDownload,
    downloadDisabled,
    errorMessage,
    looseVariableProps,
    variableGroupsProps,
    defaultSelected,
    modalOpen,
    setModalOpen,
    freshTemplate,
    loading,
  } = useLaunchpad(launchpadTemplate);

  return (
    <>
      <LaunchpadGenerate
        loading={loading}
        template={freshTemplate}
        triggerDownload={triggerDownload}
        downloadDisabled={downloadDisabled}
        errorMessage={errorMessage}
        looseVariableProps={looseVariableProps}
        variableGroupsProps={variableGroupsProps}
        defaultSelected={defaultSelected}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        resource={resource}
      />
      {resource.faqs.length > 0 && <ProductFaqs faqs={resource.faqs} />}
      <ResourceList
        className={styles.resourcesList}
        title={"Other resources you might like"}
        viewAllLink={"/resources/all"}
        viewAllText="View all resources"
        products={[...attachedResources, ...relatedResources].slice(0, 4)}
      />
    </>
  );
};

export const LaunchpadGenerate = ({
  template,
  errorMessage,
  looseVariableProps,
  variableGroupsProps,
  defaultSelected,
  modalOpen,
  setModalOpen,
  loading,
  resource,
  downloadDisabled,
  triggerDownload,
}) => {
  const [selected, setSelected] = useState(defaultSelected);
  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected]);

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
      <div className={styles.container}>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

        {!loading && looseVariableProps && selected && (
          <>
            <h2 className={styles.subheading}>Customise your resource</h2>
            {template.templateVariables.length > 0 && (
              <p className={styles.italic}>
                Edit the chart by selecting different options below then press
                download to generate your chart.
              </p>
            )}
            <div className={styles.variablesGrid}>
              {looseVariableProps.map((current) => (
                <TemplateVariable {...current} key={current.id} />
              ))}
            </div>
            <Button
              className={styles.downloadButton}
              disabled={downloadDisabled}
              onClick={() => {
                if (
                  resource.popupFormBehaviour !== "forced-email" ||
                  hasOptedInToNewsletter
                ) {
                  triggerDownload();
                }
                setModalOpen(true);
              }}
            >
              Download your customised resource
            </Button>

            <Accordion
              onChange={(selectedItems) => setSelected(selectedItems)}
              preExpanded={selected}
              allowMultipleExpanded
              allowZeroExpanded
            >
              {variableGroupsProps.map((currentGroup) => {
                return (
                  <VariableGroup
                    resource={resource}
                    selected={selected}
                    key={currentGroup.id}
                    currentGroup={currentGroup}
                    triggerDownload={triggerDownload}
                    setModalOpen={setModalOpen}
                    downloadDisabled={downloadDisabled}
                  />
                );
              })}
            </Accordion>
            <div></div>

            <DownloadModal
              triggerDownload={triggerDownload}
              resource={resource}
              modalOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              name={template.templateName}
              errorMessage={errorMessage}
              slug={resource.slug}
            />
          </>
        )}
      </div>
    </>
  );
};

const ErrorMessage = ({ errorMessage }) => {
  console.warn(errorMessage);

  if (errorMessage === "Failed to fetch")
    return (
      <p className={styles.errorMessage}>
        Couldn&apos;t reach the server. Check back soon or{" "}
        <Link href="/contact">Contact Us</Link>
      </p>
    );

  return (
    <p className={styles.errorMessage}>
      An unknown error occurred. Check back soon or{" "}
      <Link href="/contact">Contact Us</Link>
    </p>
  );
};

const VariableGroup = ({
  currentGroup,
  selected,
  triggerDownload,
  setModalOpen,
  downloadDisabled,
  resource,
}) => {
  const hasOptedInToNewsletter = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(storageKey) == "true";
    } else {
      return false;
    }
  }, []);

  return (
    <AccordionItem uuid={currentGroup.id} key={currentGroup.id}>
      <AccordionItemHeading>
        <AccordionItemButton className={styles.itemButton}>
          <Avatar className={styles.avatar}>
            {selected.includes(currentGroup.id) ? (
              <KeyboardArrowDownIcon className={styles.icon} />
            ) : (
              <ChevronRightIcon className={styles.icon} />
            )}
          </Avatar>
          <div className={styles.titles}>
            <h2>{currentGroup.name}</h2>
            <p>{currentGroup.description}</p>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel className={styles.itemPanel}>
        <div className={styles.variablesGrid}>
          {currentGroup.variableGroupsProps.map((current) => (
            <TemplateVariable {...current} key={current.id} />
          ))}
        </div>
        <Button
          className={styles.downloadButton}
          disabled={downloadDisabled}
          onClick={() => {
            if (
              resource.popupFormBehaviour !== "forced-email" ||
              hasOptedInToNewsletter
            ) {
              triggerDownload();
            }
            setModalOpen(true);
          }}
        >
          Download your customised resource
        </Button>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

const ColorPicker = ({ value, id, onChange, name, description }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <div className={styles.centerPicker}>
        <BlockPicker
          colors={COLOURS}
          className={styles.blockPicker}
          color={value}
          triangle="hide"
          name={id}
          onChange={(event) => {
            onChange({
              target: {
                value: `rgb(${event.rgb.r}, ${event.rgb.g}, ${event.rgb.b})`,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

const FreeText = ({
  value,
  id,
  onChange,
  name,
  description,
  placeholder,
  maxLength,
}) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <div>
        <FormControl className={styles.formControl} id={id}>
          <ChakraInput
            className={styles.input}
            backgroundColor={"#F5F5F5"}
            placeholder={placeholder}
            aria-label={description}
            onChange={onChange}
            maxLength={maxLength}
            value={value}
          />
        </FormControl>
      </div>
    </div>
  );
};

const Number = ({
  value,
  id,
  onChange,
  name,
  description,
  placeholder,
  min,
  max,
}) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <div>
        <FormControl className={styles.formControl} id={id}>
          <ChakraInput
            className={styles.input}
            backgroundColor={"#F5F5F5"}
            placeholder={placeholder}
            aria-label={description}
            onChange={onChange}
            value={value}
            type="number"
            min={min}
            max={max}
          />
        </FormControl>
      </div>
    </div>
  );
};

const ImageUploader = ({ onChange, name, description }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);

    var formData = new FormData();

    if (acceptedFiles.length !== 1) {
      setError("You uploaded an incompatible file");
    }

    const file = acceptedFiles[0];
    formData.append("image", file);

    const upload = async () => {
      try {
        const result = await fetch(`${launchpadUrl}/image-upload`, {
          method: "POST",
          body: formData,
        });

        const response = await result.json();

        if (response.success === true && response.name) {
          console.log(response);
          onChange({ target: { value: `./${response.name}` } });
          setFileName(file.name);
          setIsUploading(false);
        } else {
          setError("Failed to upload image");
          setIsUploading(false);
        }
      } catch (err) {
        console.warn(err);
        setError("Failed to upload image");
        setIsUploading(false);
      }
    };

    upload();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/*": [] },
    disabled: isUploading,
  });

  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      {error && <p className={styles.error}>{error}</p>}
      {fileName ? (
        <>
          <p>Successfully uploaded!</p>
          <div className={styles.dropzone}>
            <InsertDriveFileIcon className={styles.fileIcon} />
            <p>{fileName}</p>
          </div>
        </>
      ) : (
        <>
          {isUploading ? (
            <div className={styles.spinner}>
              <Spinner></Spinner>
              <p>Uploading</p>
            </div>
          ) : (
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps({ name: "image" })} />
              <p>
                Drag and drop the image you want to use here or{" "}
                <strong>click</strong> in this box to select an image.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Options = ({ value, onChange, name, description, options }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <Select
        backgroundColor="#F5F5F5"
        value={value}
        aria-label={"Select " + name}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option value={option.value} key={`${option.value}`}>
              {option.label}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

const Preset = ({ value, onChange, name, description, presets }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <Select
        backgroundColor="#F5F5F5"
        value={value}
        aria-label={"Select " + name}
        onChange={onChange}
      >
        {presets.map((option) => {
          return (
            <option value={option.value} key={`${option.value}`}>
              {option.label}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

const BooleanOptions = ({
  value,
  onChange,
  name,
  description,
  trueLabel,
  falseLabel,
}) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{description}</p>
      <Select
        backgroundColor="#F5F5F5"
        value={value}
        aria-label={"Select " + name}
        onChange={onChange}
      >
        <option value={"true"}>{trueLabel}</option>
        <option value={"false"}>{falseLabel}</option>
      </Select>
    </div>
  );
};

const TemplateVariable = ({ type, ...rest }) => {
  if (type == "color") {
    return <ColorPicker type={type} {...rest} />;
  }

  if (type == "freeText") {
    return <FreeText type={type} {...rest} />;
  }

  if (type == "imageUrl") {
    return <ImageUploader type={type} {...rest} />;
  }

  if (type == "option") {
    return <Options type={type} {...rest} />;
  }

  if (type == "preset") {
    return <Preset type={type} {...rest} />;
  }

  if (type == "boolean") {
    return <BooleanOptions type={type} {...rest} />;
  }

  if (type == "number") {
    return <Number type={type} {...rest} />;
  }

  console.warn(`Unknown variable type: ${type}`);

  return null;
};
