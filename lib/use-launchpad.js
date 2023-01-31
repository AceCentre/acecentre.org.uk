import { useEffect, useMemo, useState } from "react";
import config, { launchpadUrl } from "./config";

export const useLaunchpad = (template) => {
  const [loading, setLoading] = useState(true);
  const [freshTemplate, setFreshTemplate] = useState(null);
  const [downloadDisabled, setDownloadDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch template once
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(config.launchpadUrl, {
          headers: {
            "content-type": "application/json",
          },
          referrer: "https://aac-launchpad-2mtuk.ondigitalocean.app/",
          body: `{"operationName":"getTemplates","variables":{"id":"${template.templateId}"},"query":"query getTemplates($id: String!) {\\n  template(id: $id) {\\n    templateShortDescription\\n    templateId\\n    templateName\\n    templateDescription\\n    templateDateCreated\\n    templateImageUrl\\n    templateCategory\\n    templateSubcategory\\n    templateFeatured\\n    templateVariableGroups {\\n      id\\n      variables\\n      name\\n      description\\n      openByDefault\\n    }\\n    templateVariables {\\n      ... on TemplateVariable {\\n        id\\n        description\\n        type\\n        name\\n        defaultValue\\n        hidden\\n      }\\n      ... on OptionTemplateVariable {\\n        options {\\n          value\\n          label\\n          description\\n        }\\n      }\\n      ... on FreeTextTemplateVariable {\\n        maxLength\\n      }\\n      ... on NumberTemplateVariable {\\n        min\\n        max\\n      }\\n      ... on PresetTemplateVariable {\\n        presets {\\n          value\\n          label\\n          variableValues {\\n            id\\n            value\\n          }\\n        }\\n      }\\n      ... on BooleanTemplateVariable {\\n        trueLabel\\n        falseLabel\\n      }\\n    }\\n  }\\n}\\n"}`,
          method: "POST",
        });

        const result = await response.json();

        setFreshTemplate(result.data.template);
        setLoading(false);
      } catch (fetchErr) {
        setDownloadDisabled(true);
        setErrorMessage(fetchErr);
      }
    })();
  }, [template]);

  // This only cares about live user values, we will reconcile them properly before submitting
  const [values, setValues] = useState();
  useEffect(() => {
    if (!freshTemplate) return;

    let temp = {};

    // The [...array] hack creates a copy so sort doesn't mutate the original array
    const inOrderVariables = [...freshTemplate.templateVariables].sort(
      (a, b) => {
        if (a.type === "preset" && b.type !== "preset") {
          return 1;
        }
        if (a.type !== "preset" && b.type === "preset") {
          return -1;
        }
        return 0;
      }
    );
    for (const variable of inOrderVariables) {
      if (variable.hidden) continue;
      if (variable.type === "option") temp[variable.id] = variable.defaultValue;
      if (variable.type === "number") temp[variable.id] = variable.defaultValue;
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
    setValues(temp);
  }, [freshTemplate]);

  const onChanges = useMemo(() => {
    let temp = {};

    if (!freshTemplate) return;

    for (const variable of freshTemplate.templateVariables) {
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
  }, [freshTemplate]);

  const { variableGroupsProps, looseVariables, defaultSelected } =
    useMemo(() => {
      if (!values)
        return {
          looseVariables: null,
          variableGroupsProps: null,
          defaultSelected: null,
        };
      let looseVariables = [];
      let variableGroups = [];
      let variablesInGroup = freshTemplate.templateVariableGroups.flatMap(
        (x) => x.variables
      );

      for (const variable of freshTemplate.templateVariables) {
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
          max: variable.max,
          min: variable.min,
          options: variable.options,
          presets: variable.presets,
          trueLabel: variable.trueLabel,
          falseLabel: variable.falseLabel,
        });
      }

      let defaultSelected = [];

      for (const current of freshTemplate.templateVariableGroups) {
        let variablesInGroup = [];

        if (current.openByDefault) {
          defaultSelected.push(current.id);
        }

        for (const variableId of current.variables) {
          const currentVariable = freshTemplate.templateVariables.find(
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
            min: currentVariable.min,
            max: currentVariable.max,
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
    }, [values, freshTemplate]);

  const triggerDownload = () => {
    setDownloadDisabled(true);
    setErrorMessage(null);

    const arrayAnswers = freshTemplate.templateVariables.map((current) => {
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
        credentials: "include",
        body: JSON.stringify({
          operationName: "generateBoard",
          variables: {
            answers: arrayAnswers,
            templateId: freshTemplate.templateId,
          },
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
    downloadDisabled: loading || downloadDisabled,
    errorMessage,
    looseVariableProps: looseVariables,
    variableGroupsProps,
    defaultSelected,
    modalOpen,
    setModalOpen,
    loading,
    freshTemplate,
  };
};
