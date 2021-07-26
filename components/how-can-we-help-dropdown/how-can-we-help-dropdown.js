import styles from "./how-can-we-help-dropdown.module.css";

import { Select } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

export const HowCanWeHelpDropdown = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const onChange = (event) => {
    const question = HOW_CAN_WE_HELP.find(
      (q) => q.question === event.target.value
    );
    setSelectedQuestion(question);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Who should you contact?</h2>
      <p className={styles.tagline}>
        Select your current issue from the dropdown below to find out who to
        contact for advice.
      </p>
      <Select
        maxWidth={900}
        width="100%"
        borderRadius={25}
        backgroundColor="#F5F5F5"
        onChange={onChange}
        placeholder="Select the question you are having problems with"
      >
        {HOW_CAN_WE_HELP.map((entry) => {
          return (
            <option value={entry.question} key={`question-${entry.question}`}>
              {entry.question}
            </option>
          );
        })}
      </Select>
      {selectedQuestion && <p>{selectedQuestion.answer}</p>}
    </div>
  );
};

const productSupplier = (
  <>
    <h3>You should contact your product supplier</h3>
    <p>
      You will need the device name and serial number. You may need to be
      connected to the internet to troubleshoot by remote access.
    </p>
  </>
);

const HOW_CAN_WE_HELP = [
  { question: "The device is not working properly.", answer: productSupplier },
  {
    question: "Your device needs repair by the product supplier.",
    answer: productSupplier,
  },
  {
    question: "There are intermittent technical problems.",
    answer: productSupplier,
  },
  {
    question: "You want to backup/restore user files.",
    answer: productSupplier,
  },
  {
    question: "You need help to edit the communication software.",
    answer: productSupplier,
  },
  {
    question:
      "You need help to update the operating system or communication software.",
    answer: productSupplier,
  },
  {
    question:
      "You need help to change device settings or use features of the device, (e.g. volume, access settings).",
    answer: productSupplier,
  },
  {
    question:
      "You need help to personalise the content of your communication software.",
    answer: productSupplier,
  },
  {
    question:
      "You have difficulties with your device accessories (e.g. eye gaze, switch, joystick, mounting).",
    answer: productSupplier,
  },
  {
    question:
      "You need support to use your device for functional communication.",
    answer: productSupplier,
  },
  {
    question: "You need additional training.",
    answer: productSupplier,
  },
  {
    question: "Your needs have changed and you need review.",
    answer: productSupplier,
  },
  {
    question: "Your device is lost, stolen or damaged.",
    answer: productSupplier,
  },
  {
    question: "You change address or your contact details change.",
    answer: productSupplier,
  },
  {
    question: "You no longer need the equipment.",
    answer: productSupplier,
  },
  {
    question:
      "You do not have a local AAC service/professional to support you, or you have been discharged from your local service.",
    answer: productSupplier,
  },
  {
    question: "Your supplier/local AAC service cannot help you.",
    answer: productSupplier,
  },
];
