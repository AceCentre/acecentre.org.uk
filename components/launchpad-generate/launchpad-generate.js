import { useState } from "react";
import { Button } from "../button/button";
import styles from "./launchpad-generate.module.css";

export const LaunchpadGenerate = ({ template }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const downloadResource = () => {
    setLoading(true);
    setErrorMessage(null);
    const asyncWork = async () => {
      const response = await fetch(
        "https://aac-launchpad-2mtuk.ondigitalocean.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operationName: "generateBoard",
            variables: { answers: [], templateId: template.templateId },
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
        }
      );
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
      {errorMessage && <p>{errorMessage}</p>}
      <Button disabled={loading} onClick={downloadResource}>
        Download
      </Button>
    </div>
  );
};
