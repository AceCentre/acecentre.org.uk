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

export const LaunchpadGenerate = ({ template }) => {
  const { triggerDownload, downloadDisabled, errorMessage, variableProps } =
    useLaunchpad(template);

  return (
    <div className={styles.container}>
      {template.templateVariables.length > 0 && (
        <p>
          Enter a value for each of the following options. Then press{" "}
          <strong>&apos;download&apos;</strong> to generate your board.
        </p>
      )}
      <div className={styles.variablesGrid}>
        {variableProps.map((current) => (
          <TemplateVariable {...current} key={current.id} />
        ))}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Button disabled={downloadDisabled} onClick={triggerDownload}>
        Download
      </Button>
    </div>
  );
};

const ColorPicker = ({ value, id, onChange, name, description }) => {
  return (
    <div className={styles.card}>
      <h2>{name}</h2>
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
      <h2>{name}</h2>
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
      <h2>{name}</h2>
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
      <h2>{name}</h2>
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
      <h2>{name}</h2>
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

  console.warn(`Unknown variable type: ${type}`);

  return null;
};
