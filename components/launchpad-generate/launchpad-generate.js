import { useCallback, useEffect, useState } from "react";
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
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { useLaunchpad } from "../../lib/use-launchpad";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { Avatar, LinearProgress } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { ResourcesImage } from "../resources-image/resources-image";
import { ResourcesDescription } from "../resources-description/resources-description";
import { ResourcesShare } from "../resources-share/resources-share";
import { ResourceList } from "../resource-list/resource-list";
import Link from "next/link";
import { BlockPicker } from "react-color";

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

  return (
    <>
      <LinearProgress
        className={styles.progress}
        variant="determinate"
        value={value}
      />
    </>
  );
};

const DownloadModal = ({ modalOpen, onClose, name, errorMessage }) => {
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
              <Progress totalTime={8000} />
            )}
            <p>The download will begin automatically</p>
            <p>
              While you wait, why not sign up to our free newsletter to stay up
              to date with the latest resources from Ace Centre
            </p>
          </div>

          <div className={styles.newsletterContainer}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
#mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
 We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<style type="text/css">
#mc-embedded-subscribe-form input[type=checkbox]{display: inline; width: auto;margin-right: 10px;}
#mergeRow-gdpr {margin-top: 20px;}
#mergeRow-gdpr fieldset label {font-weight: normal;}
#mc-embedded-subscribe#mc-embedded-subscribe {
background-color: #00537F;
}
#mc-embedded-subscribe-form .mc_fieldset{border:none;min-height: 0px;padding-bottom:0px;}
</style>
<div id="mc_embed_signup">
<form action="https://acecentre.us7.list-manage.com/subscribe/post?u=d05eb11e79c97878b9f10fd9c&amp;id=ec5a06da07&SIGNUP=free-resource" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
<div id="mc_embed_signup_scroll">
<input aria-label="Email address for mailing list" type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email address" required>
<!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
<div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_d05eb11e79c97878b9f10fd9c_ec5a06da07" tabindex="-1" value=""></div>
<div class="clear"><input type="submit" value="Subscribe" onClick="if(gtag) gtag('event', 'conversion', {'send_to': 'AW-10885468875/afp9CKKuv7QDEMulzMYo'});" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
</div>
</form>
</div>

<!--End mc_embed_signup-->`,
              }}
            ></div>
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
  } = useLaunchpad(launchpadTemplate);

  return (
    <>
      <div className={styles.topArea}>
        <div className={styles.leftTopArea}>
          <ResourcesImage
            resource={{
              name: launchpadTemplate.templateName,
              image: { src: launchpadTemplate.templateImageUrl },
            }}
            priority
          />
        </div>
        <div className={styles.rightTopArea}>
          <ResourcesDescription
            resource={{
              name: launchpadTemplate.templateName,
              shortDescription: launchpadTemplate.templateDescription,
            }}
          />
          <Button
            className={styles.downloadButton}
            disabled={downloadDisabled}
            onClick={() => {
              triggerDownload();
              setModalOpen(true);
            }}
          >
            Free download
          </Button>
        </div>
      </div>

      <LaunchpadGenerate
        template={launchpadTemplate}
        triggerDownload={triggerDownload}
        downloadDisabled={downloadDisabled}
        errorMessage={errorMessage}
        looseVariableProps={looseVariableProps}
        variableGroupsProps={variableGroupsProps}
        defaultSelected={defaultSelected}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
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
}) => {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <div className={styles.container}>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <div className={styles.share}>
        <ResourcesShare />
      </div>
      {template.templateVariables.length > 0 && (
        <p>
          Edit the board by selecting different options below then press
          download to generate your board.
        </p>
      )}
      <div className={styles.variablesGrid}>
        {looseVariableProps.map((current) => (
          <TemplateVariable {...current} key={current.id} />
        ))}
      </div>
      <Accordion
        onChange={(selectedItems) => setSelected(selectedItems)}
        preExpanded={selected}
        allowMultipleExpanded
        allowZeroExpanded
      >
        {variableGroupsProps.map((currentGroup) => {
          return (
            <VariableGroup
              selected={selected}
              key={currentGroup.id}
              currentGroup={currentGroup}
            />
          );
        })}
      </Accordion>
      <div></div>

      <DownloadModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        name={template.templateName}
        errorMessage={errorMessage}
      />
    </div>
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
    <p>
      An unknown error occurred. Check back soon or{" "}
      <Link href="/contact">Contact Us</Link>
    </p>
  );
};

const VariableGroup = ({ currentGroup, selected }) => {
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
