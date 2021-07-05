import styles from "./form.module.css";
import { FormiumForm } from "@formium/react";

export const Form = ({ form, formium, slug }) => {
  return (
    <div className={styles.container}>
      <FormiumForm
        data={form}
        onSubmit={async (values) => {
          // Send form values to Formium
          await formium.submitForm(slug, values);
        }}
      />
    </div>
  );
};
