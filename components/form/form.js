import styles from "./form.module.css";
import { FormiumForm, defaultComponents } from "@formium/react";
import { memo, useState } from "react";
import {
  Input as ChakraInput,
  Textarea as ChakraTextarea,
} from "@chakra-ui/react";
import { Button } from "../button/button";

const TextInput = memo(function TextInput({ type, ...props }) {
  if (type == "text") {
    return <ChakraInput className={styles.input} {...props} />;
  }

  if (type == "email") {
    return <ChakraInput className={styles.input} type={type} {...props} />;
  }

  if (type == "url") {
    return <ChakraInput className={styles.input} type={type} {...props} />;
  }

  console.warn(
    `<TextInput /> doesn't have an implementation for specified type of ${type}.`
  );
  return <ChakraInput className={styles.input} type={type} {...props} />;
});

const FormControl = memo(function FormControl({
  children,
  description,
  error,
  label,
  labelFor,
  required,
}) {
  return (
    <div className={styles.formControl}>
      {label && (
        <label className={styles.label} htmlFor={labelFor}>
          {label}
          {required && "(*)"}:
        </label>
      )}
      {description && <div>{description}</div>}
      {children}
      {error && <div className={styles.errorMessage}>{error}</div>}
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
  return <ChakraTextarea className={styles.textArea} {...props} />;
};

const SubmitButton = ({ ...props }) => {
  return <Button {...props} />;
};

const Header = ({ page }) => {
  return <h3 className={styles.title}>{page.title}</h3>;
};

const myComponents = {
  ...defaultComponents,
  TextInput,
  FormControl,
  Radio,
  Checkbox,
  Textarea,
  SubmitButton,
  Header,
};

export const Form = ({ form, formium, slug, className }) => {
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success ? (
        <p>Success!</p>
      ) : (
        <div className={className}>
          <FormiumForm
            data={form}
            components={myComponents}
            onSubmit={async (values) => {
              // Send form values to Formium
              await formium.submitForm(slug, values);
              setSuccess(true);
            }}
          />
        </div>
      )}
    </>
  );
};
