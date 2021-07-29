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
  ...props
}) => {
  const newTabProps = newTab ? { target: "_blank", rel: "noopener" } : {};

  if (href)
    return (
      <Link href={href}>
        <a {...newTabProps} className={`${styles.button} ${className}`}>
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
