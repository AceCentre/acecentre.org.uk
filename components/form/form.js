import styles from "./form.module.css";
import { FormiumForm, defaultComponents } from "@formium/react";
import { memo, useState } from "react";

const TextInput = memo(function TextInput({ type, ...props }) {
  if (type == "text") {
    return <input type={type} {...props} />;
  }

  if (type == "email") {
    return <input type={type} {...props} />;
  }

  if (type == "url") {
    return <input type={type} {...props} />;
  }

  console.warn(
    `<TextInput /> doesn't have an implementation for specified type of ${type}.`
  );
  return <input type={type} {...props} />;
});

const FormControl = memo(function FormControl({
  children,
  description,
  error,
  label,
  labelFor,
}) {
  return (
    <div>
      {label && <label htmlFor={labelFor}>{label}</label>}
      {description && <div>{description}</div>}
      {children}
      {error && <div>{error}</div>}
    </div>
  );
});

const Radio = ({ label, ...props }) => {
  return (
    <label>
      <input type="radio" {...props} />
      {label}
    </label>
  );
};

const Checkbox = ({ label, value, name, id, checked, onChange, ...props }) => {
  return (
    <label>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        {...props}
      />
      {label}
    </label>
  );
};

const Textarea = ({ ...props }) => {
  return <textarea {...props}></textarea>;
};

const myComponents = {
  ...defaultComponents,
  TextInput,
  FormControl,
  Radio,
  Checkbox,
  Textarea,
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
          components={myComponents}
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
