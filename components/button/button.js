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
      <Link href={href}>
        <a
          {...newTabProps}
          onClick={onClick}
          className={`${styles.button} ${className}`}
          download={download}
        >
          {children}
        </a>
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
      {...props}
    >
      {children}
    </button>
  );
};
