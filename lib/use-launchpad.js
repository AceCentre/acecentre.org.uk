import { useMemo, useState } from "react";
import { launchpadUrl } from "./config";

export const useLaunchpad = (template) => {
  const [downloadDisabled, setDownloadDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // This only cares about live user values, we will reconcile them properly before submitting
  const [values, setValues] = useState(() => {
    let temp = {};
    const inOrderVariables = template.templateVariables.sort((a, b) => {
      if (a.type === "preset" && b.type !== "preset") {
        return 1;
      }
      if (a.type !== "preset" && b.type === "preset") {
        return -1;
      }
      return 0;
    });
    for (const variable of inOrderVariables) {
      if (variable.hidden) continue;
      if (variable.type === "option") temp[variable.id] = variable.defaultValue;
      if (variable.type === "color") temp[variable.id] = variable.defaultValue;
      if (variable.type === "boolean")
        temp[variable.id] = variable.defaultValue;

      if (variable.type === "preset") {
        temp[variable.id] = variable.defaultValue;

        const selectedPreset = variable.presets.find(
          (x) => x.value == variable.defaultValue
        );

        for (const override of selectedPreset.variableValues) {
          temp[override.id] = override.value;
        }
      }
    }
    return temp;
  });

  const onChanges = useMemo(() => {
    let temp = {};

    for (const variable of template.templateVariables) {
      if (variable.hidden) continue;

      temp[variable.id] = (event) => {
        const newValue = event.target.value;
        let overrides = { [variable.id]: newValue };

        if (variable.type === "preset") {
          const selectedPreset = variable.presets.find(
            (x) => x.value == newValue
          );

          for (const override of selectedPreset.variableValues) {
            overrides[override.id] = override.value;
          }
        }

        setValues((currentValues) => {
          return { ...currentValues, ...overrides };
        });
      };
    }

    return temp;
  });

  const { variableGroupsProps, looseVariables, defaultSelected } =
    useMemo(() => {
      let looseVariables = [];
      let variableGroups = [];
      let variablesInGroup = template.templateVariableGroups.flatMap(
        (x) => x.variables
      );

      for (const variable of template.templateVariables) {
        if (variable.hidden) continue;
        if (variablesInGroup.includes(variable.id)) continue;

        looseVariables.push({
          type: variable.type,
          value: values[variable.id],
          onChange: onChanges[variable.id],
          id: variable.id,
          name: variable.name,
          description: variable.description,
          placeholder: variable.defaultValue,
          maxLength: variable.maxLength,
          options: variable.options,
          presets: variable.presets,
          trueLabel: variable.trueLabel,
          falseLabel: variable.falseLabel,
        });
      }

      let defaultSelected = [];

      for (const current of template.templateVariableGroups) {
        let variablesInGroup = [];

        if (current.openByDefault) {
          defaultSelected.push(current.id);
        }

        for (const variableId of current.variables) {
          const currentVariable = template.templateVariables.find(
            (x) => x.id === variableId
          );

          variablesInGroup.push({
            type: currentVariable.type,
            value: values[currentVariable.id],
            onChange: onChanges[currentVariable.id],
            id: currentVariable.id,
            name: currentVariable.name,
            description: currentVariable.description,
            placeholder: currentVariable.defaultValue,
            maxLength: currentVariable.maxLength,
            options: currentVariable.options,
            presets: currentVariable.presets,
            trueLabel: currentVariable.trueLabel,
            falseLabel: currentVariable.falseLabel,
          });
        }

        variableGroups.push({
          ...current,
          variableGroupsProps: variablesInGroup,
        });
      }

      return {
        looseVariables,
        variableGroupsProps: variableGroups,
        defaultSelected,
      };
    }, [values]);

  const triggerDownload = () => {
    setDownloadDisabled(true);
    setErrorMessage(null);

    const arrayAnswers = template.templateVariables.map((current) => {
      return {
        id: current.id,
        value: values[current.id] ?? current.defaultValue,
      };
    });

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
        setDownloadDisabled(false);
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
      setDownloadDisabled(false);
    });
  };

  return {
    triggerDownload,
    downloadDisabled,
    errorMessage,
    looseVariableProps: looseVariables,
    variableGroupsProps,
    defaultSelected,
  };
};
