import styles from "./button.module.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, size = "small", label, ...props }) => {
  const mode = primary ? styles.primary : styles.secondary;
  const sizeClass = styles[size];

  return (
    <>
      <button
        type="button"
        className={`${styles.base} ${mode} ${sizeClass}`}
        {...props}
      >
        {label}
      </button>
    </>
  );
};
