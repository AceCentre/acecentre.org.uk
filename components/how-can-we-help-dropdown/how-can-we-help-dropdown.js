import styles from "./how-can-we-help-dropdown.module.css";

import { Select } from "@chakra-ui/select";
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
        placeholder="Select your issue."
        aria-label="Select your issue"
      >
        {HOW_CAN_WE_HELP.map((entry) => {
          return (
            <option value={entry.question} key={`question-${entry.question}`}>
              {entry.question}
            </option>
          );
        })}
      </Select>
      {selectedQuestion && <div>{selectedQuestion.answer}</div>}
    </div>
  );
};

const ProductSupplier = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const onChange = (event) => {
    const supplier = SUPPLIERS.find((q) => q.supplier === event.target.value);
    setSelectedSupplier(supplier);
  };

  return (
    <>
      <h3>Already know your supplier?</h3>
      <p>Choose your supplier from the dropdown below for useful links.</p>
      <Select
        maxWidth={200}
        width="100%"
        borderRadius={25}
        backgroundColor="#F5F5F5"
        onChange={onChange}
        placeholder="Select your supplier."
        aria-label="Select your supplier"
      >
        {SUPPLIERS.map((entry) => {
          return (
            <option value={entry.supplier} key={`suppliers-${entry.supplier}`}>
              {entry.supplier}
            </option>
          );
        })}
      </Select>
      {selectedSupplier && <div>{selectedSupplier.resources}</div>}
    </>
  );
};

const productSupplier = (
  <>
    <h3>You should contact your product supplier.</h3>
    <p>
      You will find the name and contact details of your product supplier on
      your provision of equipment form.
    </p>
    <p>
      You will need to know your device name and serial number. You may need to
      be connected to the internet to troubleshoot by remote access.
    </p>
    <ProductSupplier />
  </>
);

const productSupplierOrLocalService = (
  <>
    <h3>You should contact your product supplier or local AAC professional.</h3>
    <p>
      You will find the name and contact details of your product supplier and
      local AAC professional on your provision of equipment form.
    </p>
    <p>
      You will need to know your device name and serial number. You may need to
      be connected to the internet to troubleshoot by remote access.
    </p>
    <ProductSupplier />
  </>
);

const aceCentreOrLocalService = (
  <>
    <h3>You should contact Ace Centre or your local AAC professional.</h3>
    <p>
      <Link href="/contact">
        <a className={styles.link}>Contact Ace Centre &gt;</a>
      </Link>
    </p>
    <p>
      Call us on: <strong>0800 080 3115</strong>
    </p>
    <p>
      You will find the name and contact details of your product supplier and
      local AAC professional on your provision of equipment form.
    </p>
    <p>
      You will need to know your device name and serial number. You may need to
      be connected to the internet to troubleshoot by remote access.
    </p>
  </>
);

const aceCentre = (
  <>
    <h3>You should contact Ace Centre.</h3>
    <Link href="/contact">
      <a className={styles.link}>Contact Ace Centre &gt;</a>
    </Link>
    <p>
      Call us on: <strong>0800 080 3115</strong>
    </p>
  </>
);

const SUPPLIERS = [
  {
    supplier: "Smartbox",
    resources: (
      <p>
        <Link href="https://thinksmartbox.com/smart-support/">
          <a className={styles.link}>Smartbox support centre &gt;</a>
        </Link>
      </p>
    ),
  },
  {
    supplier: "Tobii Dynavox",
    resources: (
      <p>
        <Link href="https://uk.tobiidynavox.com/pages/contact-us">
          <a target="_blank" rel="noreferrer" className={styles.link}>
            Contact Tobii Dynavox &gt;
          </a>
        </Link>
      </p>
    ),
  },
  {
    supplier: "Liberator",
    resources: (
      <p>
        <Link href="https://www.liberator.co.uk/support">
          <a target="_blank" rel="noreferrer" className={styles.link}>
            Liberator support centre &gt;
          </a>
        </Link>
      </p>
    ),
  },
  {
    supplier: "Techcess",
    resources: (
      <p>
        <Link href="https://www.techcess.co.uk/support/">
          <a target="_blank" rel="noreferrer" className={styles.link}>
            Techess support page &gt;
          </a>
        </Link>
      </p>
    ),
  },
];

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
    answer: productSupplierOrLocalService,
  },
  {
    question:
      "You have difficulties with your device accessories (e.g. eye gaze, switch, joystick, mounting).",
    answer: aceCentreOrLocalService,
  },
  {
    question:
      "You need support to use your device for functional communication.",
    answer: aceCentreOrLocalService,
  },
  {
    question: "You need additional training.",
    answer: aceCentreOrLocalService,
  },
  {
    question: "Your needs have changed and you need review.",
    answer: aceCentreOrLocalService,
  },
  {
    question: "Your device is lost, stolen or damaged.",
    answer: aceCentre,
  },
  {
    question: "You change address or your contact details change.",
    answer: aceCentre,
  },
  {
    question: "You no longer need the equipment.",
    answer: aceCentre,
  },
  {
    question:
      "You do not have a local AAC service/professional to support you, or you have been discharged from your local service.",
    answer: aceCentre,
  },
  {
    question: "Your supplier/local AAC service cannot help you.",
    answer: aceCentre,
  },
];
