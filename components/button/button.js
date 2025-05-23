import Link from "next/link";
import styles from "./button.module.css";

export const Button = ({
  className = "",
  children,
  href,
  onClick = () => {},
  type,
  newTab = false,
  disabled = false,
  download = false,
  ...props
}) => {
  const newTabProps = newTab ? { target: "_blank", rel: "noreferrer" } : {};

  if (href)
    return (
      <Link
        href={href}
        {...newTabProps}
        onClick={onClick}
        className={`${styles.button} ${className}`}
        download={download}
      >
        {children}
      </Link>
    );

  if (type == "submit") {
    return (
      <button
        type={type}
        {...props}
        className={`${styles.button} ${className} ${
          disabled ? styles.disabled : ""
        }`}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};
