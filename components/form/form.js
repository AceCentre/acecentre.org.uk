import styles from "./form.module.css";
import { FormiumForm, defaultComponents } from "@formium/react";
import { useState } from "react";

const myComponents = {
  ...defaultComponents,
};

export const Form = ({ form, formium, slug }) => {
  const [success, setSuccess] = useState(false);

  return (
    <div className={styles.container}>
      {success ? (
        <p>Success!</p>
      ) : (
        <FormiumForm
          data={form}
          myComponents={myComponents}
          onSubmit={async (values) => {
            // Send form values to Formium
            await formium.submitForm(slug, values);
            setSuccess(true);
          }}
        />
      )}
    </div>
  );
};
