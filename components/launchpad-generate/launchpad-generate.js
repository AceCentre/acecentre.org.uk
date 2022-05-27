import { useCallback, useState } from "react";
import { Button } from "../button/button";
import styles from "./launchpad-generate.module.css";
import { RgbStringColorPicker } from "react-colorful";
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
import { Avatar } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

export const LaunchpadGenerate = ({ template }) => {
  const {
    triggerDownload,
    downloadDisabled,
    errorMessage,
    looseVariableProps,
    variableGroupsProps,
    defaultSelected,
  } = useLaunchpad(template);
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <div className={styles.container}>
      {template.templateVariables.length > 0 && (
        <p>
          Enter a value for each of the following options. Then press{" "}
          <strong>&apos;download&apos;</strong> to generate your board.
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
      {errorMessage && <p>{errorMessage}</p>}
      <Button disabled={downloadDisabled} onClick={triggerDownload}>
        Download
      </Button>
    </div>
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
        <RgbStringColorPicker
          color={value}
          onChange={(newColor) => {
            onChange({ target: { value: newColor } });
          }}
          name={id}
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

  console.warn(`Unknown variable type: ${type}`);

  return null;
};
