import Link from "next/link";
import styles from "./button.module.css";

export const Button = ({
  className = "",
  children,
  href,
  onClick = () => {},
  newTab = false,
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

  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};
