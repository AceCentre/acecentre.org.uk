import { useCallback, useEffect, useState } from "react";
import { Button } from "../button/button";
import styles from "./launchpad-generate.module.css";
import { RgbStringColorPicker } from "react-colorful";
import { launchpadUrl } from "../../lib/config";
import { FormControl, Input as ChakraInput, Spinner } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

export const LaunchpadGenerate = ({ template }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [answers, setAnswers] = useState({});

  const setVariableValue = (id, value) => {
    setAnswers((upToDateAnswers) => {
      return { ...upToDateAnswers, [id]: value };
    });
  };

  const downloadResource = () => {
    setLoading(true);
    setErrorMessage(null);

    const arrayAnswers = Object.entries(answers).map(([id, value]) => ({
      id: id,
      value: value,
    }));

    const asyncWork = async () => {
      const response = await fetch(launchpadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: "generateBoard",
          variables: { answers: arrayAnswers, templateId: template.templateId },
          query: `
            mutation generateBoard($answers: [AnswerInput!]!, $templateId: String!) {
              generateBoard(answers: $answers, templateId: $templateId) {
                success
                message
                fileLocation
              }
            }          
          `,
        }),
      });
      const result = await response.json();

      if (
        result &&
        result.data &&
        result.data &&
        result.data.generateBoard &&
        result.data.generateBoard.success &&
        result.data.generateBoard.fileLocation
      ) {
        const link = document.createElement("a");
        link.href = result.data.generateBoard.fileLocation;
        link.download = new URL(
          result.data.generateBoard.fileLocation
        ).pathname.replace("/boards/", "");

        link.click();
        setLoading(false);
      } else if (
        result &&
        result.errors &&
        result.errors[0] &&
        result.errors[0].message
      ) {
        throw new Error(result.errors[0].message);
      } else {
        throw new Error("Something went wrong");
      }
    };

    asyncWork().catch((error) => {
      setErrorMessage(error.message || "An error occurred");
      setLoading(false);
    });
  };

  return (
    <div className={styles.container}>
      {template.templateVariables.length > 0 && (
        <p>
          Enter a value for each of the following options. Then press{" "}
          <strong>&apos;download&apos;</strong> to generate your board.
        </p>
      )}
      <div className={styles.variablesGrid}>
        {template.templateVariables.map((variable) => (
          <TemplateVariable
            setVariableValue={setVariableValue}
            key={variable.id}
            variable={variable}
          />
        ))}
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      <Button disabled={loading} onClick={downloadResource}>
        Download
      </Button>
    </div>
  );
};

const ColorPicker = ({ variable, setVariableValue }) => {
  const [color, setColor] = useState(variable.defaultValue);

  useEffect(() => {
    setVariableValue(variable.id, variable.defaultValue);
  }, []);

  return (
    <div className={styles.card}>
      <h2>{variable.name}</h2>
      <p>{variable.description}</p>
      <div className={styles.centerPicker}>
        <RgbStringColorPicker
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
            setVariableValue(variable.id, newColor);
          }}
          name={variable.id}
        />
      </div>
    </div>
  );
};

const FreeText = ({ variable, setVariableValue }) => {
  useEffect(() => {
    setVariableValue(variable.id, variable.defaultValue);
  }, []);

  return (
    <div className={styles.card}>
      <h2>{variable.name}</h2>
      <p>{variable.description}</p>
      <div>
        <FormControl className={styles.formControl} id={variable.id}>
          <ChakraInput
            className={styles.input}
            backgroundColor={"#F5F5F5"}
            placeholder={variable.defaultValue}
            aria-label={variable.description}
            onChange={(event) => {
              setVariableValue(variable.id, event.target.value);
            }}
            maxLength={variable.maxLength}
          />
        </FormControl>
      </div>
    </div>
  );
};

const ImageUploader = ({ variable, setVariableValue }) => {
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
          setVariableValue(variable.id, `./${response.name}`);
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
      <h2>{variable.name}</h2>
      <p>{variable.description}</p>
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

const TemplateVariable = ({ variable, setVariableValue }) => {
  if (variable.type == "color") {
    return (
      <ColorPicker setVariableValue={setVariableValue} variable={variable} />
    );
  }

  if (variable.type == "freeText") {
    return <FreeText setVariableValue={setVariableValue} variable={variable} />;
  }

  if (variable.type == "imageUrl") {
    return (
      <ImageUploader setVariableValue={setVariableValue} variable={variable} />
    );
  }

  console.warn(`Unknown variable type: ${variable.type}`);

  return null;
};
