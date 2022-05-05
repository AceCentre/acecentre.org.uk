import { useEffect, useState } from "react";
import { Button } from "../button/button";
import styles from "./launchpad-generate.module.css";
import { RgbStringColorPicker } from "react-colorful";
import { launchpadUrl } from "../../lib/config";

export const LaunchpadGenerate = ({ template }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [answers, setAnswers] = useState({});

  const setVariableValue = (id, value) => {
    setAnswers({ ...answers, [id]: value });
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
  const [color, setColor] = useState("rgb(0,0,0)");

  useEffect(() => {
    setVariableValue(variable.id, "rgb(0,0,0)");
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

const TemplateVariable = ({ variable, setVariableValue }) => {
  if (variable.type == "color") {
    return (
      <ColorPicker setVariableValue={setVariableValue} variable={variable} />
    );
  }

  console.warn(`Unknown variable type: ${variable.type}`);

  return null;
};
