import styles from "./button.module.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? styles.primary : styles.secondary;
  const sizeClass = styles[size];

  return (
    <>
      <button
        type="button"
        className={`${styles.base} ${mode} ${sizeClass}`}
        style={backgroundColor && { backgroundColor }}
        {...props}
      >
        {label}
      </button>
    </>
  );
};
